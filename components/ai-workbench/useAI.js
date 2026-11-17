"use client";

import { useState, useCallback, useEffect } from "react";

/**
 * AI 调用层（BYOK —— 用户自带 API Key）
 *
 * 支持：
 *  - OpenAI / 任何 OpenAI 兼容端点（OpenRouter、DeepSeek、通义、本地 Ollama 等）
 *  - Google Gemini
 *
 * Key 存储在浏览器 localStorage，仅在本机使用，不经过本站服务器。
 * 未配置 Key 时降级为「本地规则引擎」并明确标注，绝不伪装成 AI 输出。
 */

const AI_CONFIG_KEY = "gth_ai_config";

export const AI_PROVIDERS = [
  {
    id: "openai",
    name: "OpenAI",
    baseUrl: "https://api.openai.com/v1",
    defaultModel: "gpt-4o-mini",
    docs: "platform.openai.com/api-keys",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    defaultModel: "gemini-2.0-flash",
    docs: "aistudio.google.com/apikey",
  },
  {
    id: "openrouter",
    name: "OpenRouter（多模型聚合）",
    baseUrl: "https://openrouter.ai/api/v1",
    defaultModel: "openai/gpt-4o-mini",
    docs: "openrouter.ai/keys",
  },
  {
    id: "custom",
    name: "自定义 OpenAI 兼容端点",
    baseUrl: "",
    defaultModel: "",
    docs: "填写 Base URL + Model",
  },
];

export function getAIConfig() {
  try {
    const raw = localStorage.getItem(AI_CONFIG_KEY);
    if (!raw) return null;
    const cfg = JSON.parse(raw);
    return cfg && cfg.apiKey ? cfg : null;
  } catch {
    return null;
  }
}

export function saveAIConfig(cfg) {
  try {
    localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(cfg));
    window.dispatchEvent(new Event("gth-ai-config-changed"));
  } catch {}
}

export function clearAIConfig() {
  try {
    localStorage.removeItem(AI_CONFIG_KEY);
    window.dispatchEvent(new Event("gth-ai-config-changed"));
  } catch {}
}

// -------------------- Prompt 构建 --------------------

const LANG_NAMES = {
  en: "English",
  es: "Spanish (Español)",
  pt: "Portuguese (Português)",
  ru: "Russian (Русский)",
  "zh-cn": "Simplified Chinese",
  ar: "Arabic",
  fr: "French",
  de: "German",
  ja: "Japanese",
  ko: "Korean",
  th: "Thai",
  vi: "Vietnamese",
  id: "Indonesian",
  tr: "Turkish",
};

function buildMessages(text, opts) {
  const task = opts?.task || "polish";
  const sys = {
    role: "system",
    content:
      "You are a professional assistant for cross-border e-commerce sellers. Always respond in the same language as the user's input unless asked otherwise. Use clean Markdown.",
  };

  switch (task) {
    case "polish":
      return [
        sys,
        {
          role: "user",
          content:
            "润色优化以下内容：提升表达专业度与可读性，修正语法与错别字，保留原意与结构。直接输出优化后的全文，不要附加解释：\n\n" + text,
        },
      ];
    case "summarize":
      return [
        sys,
        {
          role: "user",
          content:
            "精简总结以下内容：提炼核心要点（用编号列表），保留关键数据与结论，输出不超过原文 30% 的篇幅：\n\n" + text,
        },
      ];
    case "expand":
      return [
        sys,
        {
          role: "user",
          content:
            "重构并扩展以下内容：理顺逻辑结构（分点/分层），补充必要的论证与细节，使内容更完整专业。直接输出结果：\n\n" + text,
        },
      ];
    case "translate": {
      const to = LANG_NAMES[opts?.toLang] || opts?.toLang || "English";
      return [
        sys,
        {
          role: "user",
          content:
            `将以下内容完整翻译为${to}。仅输出译文，保留原有分段与格式：\n\n` + text,
        },
      ];
    }
    case "code-gen":
      return [
        {
          role: "system",
          content:
            "You are a senior full-stack engineer. Respond with complete, runnable, well-commented code in Markdown code blocks, followed by a brief usage note.",
        },
        { role: "user", content: "请实现以下需求（语言：" + (opts?.language || "javascript") + "）：\n\n" + text },
      ];
    case "code-debug":
      return [
        {
          role: "system",
          content:
            "You are a senior engineer debugging code. Identify root cause, provide fixed code and explain the fix briefly.",
        },
        { role: "user", content: "请排查并修复以下代码/报错：\n\n" + text },
      ];
    case "subtitle":
      return [
        sys,
        {
          role: "user",
          content:
            `以下是视频字幕内容（可能含 SRT 时间轴）。请逐条翻译为${LANG_NAMES[opts?.toLang] || "English"}，保留时间轴编号与时间戳格式不变，仅翻译文字部分：\n\n` + text,
        },
      ];
    default:
      return [sys, { role: "user", content: text }];
  }
}

// -------------------- API 调用 --------------------

async function callOpenAICompatible(cfg, messages, images) {
  const content = [];
  const last = messages[messages.length - 1];
  if (images && images.length) {
    content.push({ type: "text", text: last.content });
    for (const dataUrl of images) {
      content.push({ type: "image_url", image_url: { url: dataUrl } });
    }
    messages = [...messages.slice(0, -1), { role: "user", content }];
  }
  const resp = await fetch(cfg.baseUrl.replace(/\/$/, "") + "/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cfg.apiKey,
    },
    body: JSON.stringify({
      model: cfg.model,
      messages,
      temperature: 0.4,
    }),
  });
  if (!resp.ok) {
    const t = await resp.text().catch(() => "");
    throw new Error("AI 接口返回 " + resp.status + "：" + t.slice(0, 200));
  }
  const data = await resp.json();
  const out = data?.choices?.[0]?.message?.content;
  if (!out) throw new Error("AI 未返回内容");
  return out;
}

async function callGemini(cfg, messages, images) {
  const parts = [];
  for (const m of messages) {
    parts.push({ text: (m.role === "system" ? "[Instructions] " : "") + m.content });
  }
  if (images && images.length) {
    for (const dataUrl of images) {
      const [meta, b64] = dataUrl.split(",");
      const mime = meta.match(/data:(.*?);/)?.[1] || "image/png";
      parts.push({ inline_data: { mime_type: mime, data: b64 } });
    }
  }
  const model = cfg.model || "gemini-2.0-flash";
  const resp = await fetch(
    cfg.baseUrl.replace(/\/$/, "") + "/models/" + model + ":generateContent?key=" + cfg.apiKey,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts }] }),
    }
  );
  if (!resp.ok) {
    const t = await resp.text().catch(() => "");
    throw new Error("Gemini 接口返回 " + resp.status + "：" + t.slice(0, 200));
  }
  const data = await resp.json();
  const out = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("");
  if (!out) throw new Error("Gemini 未返回内容");
  return out;
}

// -------------------- 本地规则引擎（降级模式，诚实标注） --------------------

function localTextProcessor(text, opts) {
  const task = opts?.task || "polish";
  const targetLang = opts?.toLang || "en";
  if (!text || !text.trim()) {
    return { success: false, error: "请输入内容", text: "" };
  }
  const lines = text.split("\n").filter((l) => l.trim());
  const words = text.split(/[\s,。.!?]+/).filter((w) => w.trim());
  const chars = text.replace(/\s/g, "").length;
  const result = [];

  if (task === "summarize" || task === "pdf-summary") {
    result.push("【本地分析 · 结构化摘要】\n");
    const stopWords = ["是","的","在","我","有","和","就","不","人","都","一","一个","上","也","很","到","他","这","会","着","没有","看","好","自己","那","问题","要","怎么","这个","什么","可以","需要","the","a","is","it","to","of","and","in"];
    const freq = {};
    words.forEach((w) => {
      const key = w.toLowerCase();
      if (key.length < 2 || stopWords.includes(key)) return;
      freq[key] = (freq[key] || 0) + 1;
    });
    const topWords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 10);
    result.push("一、核心要点:");
    lines.slice(0, Math.min(5, lines.length)).forEach((l, i) => {
      if (l.trim().length > 5) result.push("  " + (i + 1) + ". " + l.trim().substring(0, 80) + (l.length > 80 ? "..." : ""));
    });
    result.push("\n二、高频关键词:");
    topWords.forEach((w) => result.push("  · " + w[0] + " (出现 " + w[1] + " 次)"));
    result.push("\n三、结构统计:");
    result.push("  · 段落 " + lines.length + " | 词数 " + words.length + " | 字符 " + chars);
    result.push("\n【说明】 本地分析模式：统计与结构分析真实有效，但语义摘要需配置 AI 才能生成。");
  } else if (task === "translate") {
    result.push("【本地模式 · 原文统计】\n");
    result.push("目标语言: " + (LANG_NAMES[targetLang] || targetLang));
    result.push("待翻译段落数: " + lines.length + "，字符数: " + chars);
    result.push("\n【说明】 本地模式不具备翻译能力。请在右上角「AI 设置」中配置 API Key 后使用真实 AI 翻译。");
  } else if (task === "ocr" || task === "image") {
    result.push("【本地模式】\n");
    result.push("已接收 " + (opts?.files?.length || 1) + " 个文件。");
    result.push("\n【说明】 本地模式无法识别图片文字。配置 AI API Key 后可进行真实 OCR 识别。");
  } else {
    result.push("【本地分析】\n");
    result.push("段落: " + lines.length + " | 词语: " + words.length + " | 字符: " + chars);
    result.push("\n【说明】 本地分析模式仅提供统计信息。配置 AI API Key 后可使用润色/翻译/生成等真实 AI 能力。");
  }
  return { success: true, text: result.join("\n"), mode: "本地分析模式" };
}

// -------------------- Hook --------------------

export function useAI() {
  const [service, setService] = useState("mock");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [aiReady, setAiReady] = useState(false);

  // 监听配置变化（设置弹窗保存后自动刷新状态）
  useEffect(() => {
    const sync = () => setAiReady(!!getAIConfig());
    sync();
    window.addEventListener("gth-ai-config-changed", sync);
    return () => window.removeEventListener("gth-ai-config-changed", sync);
  }, []);

  const process = useCallback(async (text, opts) => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const cfg = getAIConfig();
      const task = opts?.task || "polish";

      // 1) 真实 AI（已配置 Key）
      if (cfg) {
        try {
          const messages = buildMessages(text, opts);
          const images = opts?.images || (opts?.imageDataUrl ? [opts.imageDataUrl] : null);
          let output;
          if (cfg.provider === "gemini") {
            output = await callGemini(cfg, messages, images);
          } else {
            output = await callOpenAICompatible(cfg, messages, images);
          }
          setResult(output);
          setLoading(false);
          return output;
        } catch (e) {
          // AI 调用失败：明确报错，不伪装成功
          setError(
            "AI 调用失败：" +
              (e?.message || e) +
              "（已回退到本地分析模式）"
          );
        }
      }

      // 2) 本地规则引擎（诚实降级）
      await new Promise((resolve) => setTimeout(resolve, 400));
      const output = localTextProcessor(text, opts);
      if (!output.success) {
        setError(output.error || "处理失败");
        setLoading(false);
        return null;
      }
      setResult(output.text);
      setLoading(false);
      return output.text;
    } catch (e) {
      setError((e && e.message) || "处理失败");
      setLoading(false);
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError("");
    setResult(null);
  }, []);

  return {
    service,
    setService,
    apiKey,
    setApiKey,
    loading,
    error,
    result,
    process,
    reset,
    aiReady,
  };
}

export default useAI;
