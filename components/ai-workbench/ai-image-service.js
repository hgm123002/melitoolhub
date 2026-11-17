"use client";

/* ======================================================================
 * AI 图像服务层 - 统一管理三种处理模式:
 *   1. CLASSIC   - 传统 Lab+形态学 算法（零依赖，秒出）
 *   2. AI_LOCAL  - 本地 WASM U2Net 模型（40MB模型，首次下载）
 *   3. AI_CLOUD  - 云端大模型 API（用户自备 API Key）
 *
 * 工作流优先级：AI_LOCAL > CLASSIC > AI_CLOUD
 * ====================================================================== */

import { removeBackground } from "@imgly/background-removal";
import { mattingPro } from "./image-processor";

// -------------------- 状态管理 --------------------
const STORE_KEY = "gth_img_ai_config_v1";

export const AITool = {
  getConfig() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      mode: "AI_LOCAL",                  // AI_LOCAL | CLASSIC | AI_CLOUD
      cloudProvider: "aliyun",           // aliyun | tencent | openai
      apiKey: "",                        // 用户自备 key
      customEndpoint: "",                // 自定义 endpoint
    };
  },
  setConfig(cfg) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(cfg));
    } catch (e) {}
  },
};

// -------------------- 进度回调支持 --------------------
async function withProgress(promise, onProgress, total = 100) {
  let cur = 0;
  const tick = Math.max(1, Math.floor(total / 20));
  const timer = setInterval(() => {
    cur = Math.min(cur + tick, total - 5);
    onProgress && onProgress(cur);
  }, 120);
  try {
    const result = await promise;
    onProgress && onProgress(total);
    return result;
  } finally {
    clearInterval(timer);
  }
}

// -------------------- 模式 1: 本地 WASM AI 模型 --------------------
async function removeBgLocal(img, onProgress) {
  // img 可能是 HTMLImageElement 或 dataURL
  let blobOrURL;
  if (typeof img === "string") {
    blobOrURL = img;
  } else {
    // 把 canvas/image 转为 blob
    const c = document.createElement("canvas");
    c.width = img.naturalWidth || img.width;
    c.height = img.naturalHeight || img.height;
    const cc = c.getContext("2d");
    cc.drawImage(img, 0, 0);
    blobOrURL = await new Promise((res) => c.toBlob((b) => res(b), "image/png"));
  }

  const blob = await withProgress(
    removeBackground(blobOrURL, {
      progress: (key, current, total) => {
        // key: "fetch" (下载模型) 或 "compute" (推理)
        const pct = Math.floor((current / total) * 100);
        if (key === "fetch") onProgress && onProgress(Math.floor(pct * 0.6));  // 模型下载占 60%
        else onProgress && onProgress(60 + Math.floor(pct * 0.4));             // 推理占 40%
      },
    }),
    null,
  );

  // Blob → ImageData + Canvas
  const url = URL.createObjectURL(blob);
  const loaded = await new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = reject;
    im.src = url;
  });

  const canvas = document.createElement("canvas");
  canvas.width = loaded.naturalWidth;
  canvas.height = loaded.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(loaded, 0, 0);

  setTimeout(() => URL.revokeObjectURL(url), 5000);
  return canvas;
}

// -------------------- 模式 2: 传统算法 fallback --------------------
async function removeBgClassic(img, onProgress) {
  const result = mattingPro(img, 45);
  onProgress && onProgress(30);
  await new Promise((r) => setTimeout(r, 50));
  onProgress && onProgress(70);
  await new Promise((r) => setTimeout(r, 50));
  onProgress && onProgress(100);
  return result;
}

// -------------------- 模式 3: 云端 API（用户自备 Key）--------------------
// 支持：
//   阿里云 视觉智能开放平台  - 分割抠图 (segmentbody)
//   腾讯云 人像分割
//   OpenAI / 兼容接口: 用户自己搭建后端转发
async function removeBgCloud(img, config, onProgress) {
  // 把图片转为 base64
  const srcCanvas = document.createElement("canvas");
  srcCanvas.width = img.naturalWidth || img.width;
  srcCanvas.height = img.naturalHeight || img.height;
  srcCanvas.getContext("2d").drawImage(img, 0, 0);
  const base64 = srcCanvas.toDataURL("image/jpeg", 0.92).split(",")[1];

  onProgress && onProgress(10);

  // 调用用户的后端代理
  // 约定 endpoint 返回 { maskDataURL: "...", fgDataURL: "..." } 或直接返回 dataURL
  const endpoint = config.customEndpoint || "/api/ai/remove-bg";
  const body = {
    provider: config.cloudProvider,
    apiKey: config.apiKey,
    imageBase64: base64,
    format: "png",
    returnFormat: "canvas",
  };

  try {
    onProgress && onProgress(30);
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    onProgress && onProgress(75);

    const data = await resp.json();
    const url = data.dataURL || data.fgDataURL || data.url || data.image;
    if (!url) throw new Error("云端未返回图像");

    const loaded = await new Promise((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = reject;
      im.src = url.startsWith("data:") ? url : `data:image/png;base64,${url}`;
    });

    const canvas = document.createElement("canvas");
    canvas.width = loaded.naturalWidth;
    canvas.height = loaded.naturalHeight;
    canvas.getContext("2d").drawImage(loaded, 0, 0);
    onProgress && onProgress(100);
    return canvas;
  } catch (err) {
    console.warn("云端抠图失败，回退到本地 AI:", err);
    throw err;
  }
}

// -------------------- 主入口：自动降级策略 --------------------
export async function aiRemoveBackground(img, onProgress, modeOverride) {
  const cfg = AITool.getConfig();
  const mode = modeOverride || cfg.mode;

  // 策略链：先试当前模式，失败自动降级
  const strategies = [];
  if (mode === "AI_LOCAL") strategies.push({ name: "本地 AI 模型", fn: (p) => removeBgLocal(img, p) });
  if (mode === "AI_CLOUD") strategies.push({ name: "云端 AI", fn: (p) => removeBgCloud(img, cfg, p) });
  strategies.push({ name: "传统算法", fn: (p) => removeBgClassic(img, p) });

  // 如果模式是 AI_LOCAL，但云端已配置，可以把云端作为 fallback 加入
  if (mode === "AI_LOCAL" && cfg.apiKey && cfg.cloudProvider) {
    strategies.splice(1, 0, { name: "云端 AI", fn: (p) => removeBgCloud(img, cfg, p) });
  }

  let lastError = null;
  for (const s of strategies) {
    try {
      onProgress && onProgress(0, `正在使用 ${s.name}...`);
      const canvas = await s.fn((pct, msg) => onProgress && onProgress(pct, msg || s.name));
      return { canvas, mode: s.name };
    } catch (err) {
      console.warn(`${s.name} 失败:`, err);
      lastError = err;
      onProgress && onProgress(0, `${s.name}失败，尝试下一种...`);
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  throw lastError || new Error("所有抠图方案均失败");
}

// -------------------- 辅助：生成白底电商图 --------------------
export async function aiToWhiteBackground(img, onProgress, modeOverride) {
  const result = await aiRemoveBackground(img, (pct, msg) => onProgress && onProgress(pct * 0.9, msg), modeOverride);
  const matte = result.canvas;
  onProgress && onProgress(92, "合成白底...");

  // 智能白底填充：
  // - 如果抠图边缘有"灰边" → 用模糊 + 腐蚀再合成
  const out = document.createElement("canvas");
  out.width = matte.width;
  out.height = matte.height;
  const ctx = out.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.drawImage(matte, 0, 0);

  onProgress && onProgress(100, "完成");
  return { canvas: out, mode: result.mode };
}

// -------------------- 云端背景生成（AI 生成电商背景）--------------------
// 使用用户自备的 key，调用图像生成 API，然后把抠出的前景贴上去
export async function aiGenerateBackground(fgCanvas, prompt, config) {
  const cfg = config || AITool.getConfig();
  if (!cfg.apiKey) throw new Error("请先在设置中配置 API Key");

  const endpoint = cfg.customBgGenEndpoint || "/api/ai/generate-bg";
  const body = {
    provider: cfg.cloudProvider,
    apiKey: cfg.apiKey,
    prompt: prompt || "professional e-commerce product photography, clean white studio background, soft lighting",
    width: fgCanvas.width,
    height: fgCanvas.height,
  };

  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const data = await resp.json();
  const url = data.dataURL || data.image || data.url;
  if (!url) throw new Error("云端未返回图像");

  const bg = await new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = reject;
    im.src = url.startsWith("data:") ? url : `data:image/png;base64,${url}`;
  });

  // 把背景贴到画布，再贴前景
  const canvas = document.createElement("canvas");
  canvas.width = fgCanvas.width;
  canvas.height = fgCanvas.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(fgCanvas, 0, 0);
  return canvas;
}