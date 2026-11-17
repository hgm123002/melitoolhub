"use client";

export function loadImageAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function canvasToDataURL(canvas, format = "image/png", quality = 0.92) {
  const mime = format === "jpg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
  return canvas.toDataURL(mime, quality);
}

/* ============================================================
   平台预设尺寸配置
   ============================================================ */
export const PLATFORM_PRESETS = {
  mercadolibre: { name: "美客多主图", width: 1200, height: 1200, bg: "#ffffff", quality: 90 },
  amazon: { name: "亚马逊主图", width: 1500, height: 1500, bg: "#ffffff", quality: 90 },
  shopee: { name: "Shopee主图", width: 800, height: 800, bg: "#ffffff", quality: 85 },
  lazada: { name: "Lazada主图", width: 1200, height: 1200, bg: "#ffffff", quality: 85 },
  tiktok: { name: "TikTok Shop", width: 1000, height: 1000, bg: "#ffffff", quality: 90 },
};

/* ============================================================
   核心工具：颜色空间转换 & 辅助算法
   ============================================================ */

// sRGB → 线性 RGB
function _srgbToLinear(c) {
  c = c / 255;
  return c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
}

// sRGB → XYZ → CIE Lab
function rgbToLab(r, g, b) {
  const R = _srgbToLinear(r);
  const G = _srgbToLinear(g);
  const B = _srgbToLinear(b);
  let X = R * 0.4124564 + G * 0.3575761 + B * 0.1804375;
  let Y = R * 0.2126729 + G * 0.7151522 + B * 0.0721750;
  let Z = R * 0.0193339 + G * 0.1191920 + B * 0.9503041;
  X /= 0.95047; Y /= 1.00000; Z /= 1.08883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : (7.787 * t + 16 / 116));
  const fx = f(X); const fy = f(Y); const fz = f(Z);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

// HSL/HSV 辅助：计算饱和度 [0,1]
function rgbToSat(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2 / 255;
  if (max === min) return 0;
  const d = (max - min) / 255;
  return l > 0.5 ? d / (2 - l * 2 - (max + min) / 255 + 2 * l) : d / ((max + min) / 255);
}

/* ============================================================
   图像形态学操作：用于 alpha 蒙版去噪 & 收缩
   ============================================================ */

// 对 alpha 通道做盒模糊 (用于边缘羽化)
function boxBlurAlpha(data, iw, ih, radius, alphaOffset = 3) {
  if (radius < 1) return;
  const tmp = new Float32Array(iw * ih);

  // 读取 alpha
  for (let i = 0; i < iw * ih; i++) {
    tmp[i] = data[i * 4 + alphaOffset];
  }

  // 水平 pass
  const hblur = new Float32Array(iw * ih);
  for (let y = 0; y < ih; y++) {
    let sum = 0;
    for (let x = -radius; x <= radius; x++) {
      const xx = Math.max(0, Math.min(iw - 1, x));
      sum += tmp[y * iw + xx];
    }
    for (let x = 0; x < iw; x++) {
      hblur[y * iw + x] = sum / (radius * 2 + 1);
      const xAdd = Math.min(iw - 1, x + radius + 1);
      const xSub = Math.max(0, x - radius);
      sum += tmp[y * iw + xAdd] - tmp[y * iw + xSub];
    }
  }

  // 垂直 pass
  for (let x = 0; x < iw; x++) {
    let sum = 0;
    for (let y = -radius; y <= radius; y++) {
      const yy = Math.max(0, Math.min(ih - 1, y));
      sum += hblur[yy * iw + x];
    }
    for (let y = 0; y < ih; y++) {
      data[(y * iw + x) * 4 + alphaOffset] = sum / (radius * 2 + 1);
      const yAdd = Math.min(ih - 1, y + radius + 1);
      const ySub = Math.max(0, y - radius);
      sum += hblur[yAdd * iw + x] - hblur[ySub * iw + x];
    }
  }
}

// 最小滤波 (腐蚀操作) - 半径 r 内取最小值，用于移除边缘的背景残留点
function erodeAlpha(data, iw, ih, radius, alphaOffset = 3) {
  if (radius < 1) return;
  const tmp = new Uint8Array(iw * ih);
  for (let i = 0; i < iw * ih; i++) {
    tmp[i] = data[i * 4 + alphaOffset];
  }
  for (let y = 0; y < ih; y++) {
    for (let x = 0; x < iw; x++) {
      let minVal = 255;
      for (let dy = -radius; dy <= radius; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= ih) continue;
        for (let dx = -radius; dx <= radius; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= iw) continue;
          const v = tmp[yy * iw + xx];
          if (v < minVal) minVal = v;
        }
      }
      data[(y * iw + x) * 4 + alphaOffset] = minVal;
    }
  }
}

// 最大滤波 (膨胀操作)
function dilateAlpha(data, iw, ih, radius, alphaOffset = 3) {
  if (radius < 1) return;
  const tmp = new Uint8Array(iw * ih);
  for (let i = 0; i < iw * ih; i++) tmp[i] = data[i * 4 + alphaOffset];
  for (let y = 0; y < ih; y++) {
    for (let x = 0; x < iw; x++) {
      let maxVal = 0;
      for (let dy = -radius; dy <= radius; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= ih) continue;
        for (let dx = -radius; dx <= radius; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= iw) continue;
          const v = tmp[yy * iw + xx];
          if (v > maxVal) maxVal = v;
        }
      }
      data[(y * iw + x) * 4 + alphaOffset] = maxVal;
    }
  }
}

/* ============================================================
   辅助工具：图像亮度/对比度/饱和度 & 边缘锐化
   ============================================================ */
// 自动亮度对比度 - 基于直方图拉伸
function autoBrightnessContrast(imageData, strength = 0.8) {
  const data = imageData.data;
  const total = imageData.width * imageData.height;
  // 计算直方图
  const histR = new Uint32Array(256);
  const histG = new Uint32Array(256);
  const histB = new Uint32Array(256);
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 10) continue;
    histR[data[i]]++;
    histG[data[i + 1]]++;
    histB[data[i + 2]]++;
  }
  const findPercentile = (hist, pct) => {
    let acc = 0;
    const target = total * pct;
    for (let i = 0; i < 256; i++) {
      acc += hist[i];
      if (acc >= target) return i;
    }
    return 255;
  };
  const [loR, hiR] = [findPercentile(histR, 0.01), findPercentile(histR, 0.99)];
  const [loG, hiG] = [findPercentile(histG, 0.01), findPercentile(histG, 0.99)];
  const [loB, hiB] = [findPercentile(histB, 0.01), findPercentile(histB, 0.99)];
  const applyStretch = (v, lo, hi) => {
    if (hi <= lo) return v;
    const stretched = ((v - lo) / (hi - lo)) * 255;
    return v * (1 - strength) + stretched * strength;
  };
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, applyStretch(data[i], loR, hiR)));
    data[i + 1] = Math.min(255, Math.max(0, applyStretch(data[i + 1], loG, hiG)));
    data[i + 2] = Math.min(255, Math.max(0, applyStretch(data[i + 2], loB, hiB)));
  }
  return imageData;
}

// Unsharp Mask 锐化 - 提升产品边缘清晰度
function unsharpMask(imageData, amount = 0.5, radius = 1) {
  const { width: w, height: h, data } = imageData;
  const blurred = new Uint8ClampedArray(data);
  // 简易盒模糊
  const boxBlur = (src, dst, w, h, r) => {
    const tmp = new Uint8ClampedArray(src.length);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let rSum = 0, gSum = 0, bSum = 0, c = 0;
        for (let dy = -r; dy <= r; dy++) {
          const yy = Math.max(0, Math.min(h - 1, y + dy));
          for (let dx = -r; dx <= r; dx++) {
            const xx = Math.max(0, Math.min(w - 1, x + dx));
            const idx = (yy * w + xx) * 4;
            rSum += src[idx]; gSum += src[idx + 1]; bSum += src[idx + 2];
            c++;
          }
        }
        const oi = (y * w + x) * 4;
        tmp[oi] = rSum / c; tmp[oi + 1] = gSum / c; tmp[oi + 2] = bSum / c; tmp[oi + 3] = src[oi + 3];
      }
    }
    for (let i = 0; i < dst.length; i++) dst[i] = tmp[i];
  };
  boxBlur(data, blurred, w, h, radius);
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 10) continue;
    data[i] = Math.min(255, Math.max(0, data[i] + (data[i] - blurred[i]) * amount));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + (data[i + 1] - blurred[i + 1]) * amount));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + (data[i + 2] - blurred[i + 2]) * amount));
  }
  return imageData;
}

/* ============================================================
   连通域分析：保留主体（最大连通域）+ 去除小噪点
   使用 Two-Pass 算法，基于 alpha 阈值
   ============================================================ */
function connectedComponentsClean(alphaArr, iw, ih, minAreaRatio = 0.001) {
  const total = iw * ih;
  const labels = new Int32Array(total);
  const threshold = 32; // alpha > 32 视为前景
  let currentLabel = 0;

  // Pass 1: 打标签
  const parent = []; // 并查集
  parent[0] = 0;

  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  const union = (x, y) => {
    const xr = find(x);
    const yr = find(y);
    if (xr !== yr) parent[Math.min(xr, yr)] = Math.max(xr, yr);
  };

  for (let y = 0; y < ih; y++) {
    for (let x = 0; x < iw; x++) {
      const idx = y * iw + x;
      if (alphaArr[idx] <= threshold) continue;

      const nbs = [];
      // 左上邻居
      if (x > 0 && alphaArr[idx - 1] > threshold) nbs.push(labels[idx - 1]);
      if (y > 0 && alphaArr[idx - iw] > threshold) nbs.push(labels[idx - iw]);
      if (x > 0 && y > 0 && alphaArr[idx - iw - 1] > threshold) nbs.push(labels[idx - iw - 1]);
      if (x < iw - 1 && y > 0 && alphaArr[idx - iw + 1] > threshold) nbs.push(labels[idx - iw + 1]);

      if (nbs.length === 0) {
        currentLabel++;
        parent[currentLabel] = currentLabel;
        labels[idx] = currentLabel;
      } else {
        const minL = Math.min(...nbs);
        labels[idx] = minL;
        for (const l of nbs) if (l !== minL) union(minL, l);
      }
    }
  }

  // 压缩标签
  const areaMap = new Map();
  for (let i = 0; i < total; i++) {
    if (labels[i] === 0) continue;
    const root = find(labels[i]);
    areaMap.set(root, (areaMap.get(root) || 0) + 1);
  }

  // 找最大连通域
  let maxLabel = 0;
  let maxArea = 0;
  for (const [l, a] of areaMap) {
    if (a > maxArea) { maxArea = a; maxLabel = l; }
  }

  const minArea = Math.floor(total * minAreaRatio);
  const keepLabels = new Set();
  for (const [l, a] of areaMap) {
    if (l === maxLabel || a >= minArea) keepLabels.add(l);
  }

  // 处理：非主体且太小的连通域 → 设为背景 (alpha=0)
  for (let i = 0; i < total; i++) {
    if (labels[i] === 0) continue;
    const root = find(labels[i]);
    if (!keepLabels.has(root)) {
      alphaArr[i] = 0;
    }
  }
}

/* ============================================================
   边缘色污染修复（Decontaminate Colors）
   抠图后边缘像素常混合了背景色 → 根据 alpha 拉回主体色
   ============================================================ */
function decontaminateColors(data, iw, ih, bgColors, alphaArr) {
  // bgColors: [[L,a,b], ...] 采样到的背景色簇
  if (!bgColors || bgColors.length === 0) return;

  // 取背景色的平均
  let bgL = 0, bgA = 0, bgB = 0;
  for (const c of bgColors) { bgL += c[0]; bgA += c[1]; bgB += c[2]; }
  bgL /= bgColors.length; bgA /= bgColors.length; bgB /= bgColors.length;

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a === 0 || a >= 250) continue; // 完全透明或完全不透明跳过
    // 半透明区域：alpha 越低，越可能是背景色，需要去除污染
    const alpha = a / 255;

    // 估算：alpha * fg + (1-alpha) * bg = observed
    // fg = (observed - (1-alpha) * bg) / alpha
    const contamination = 1 - alpha; // 污染程度

    // 简化版：降低边缘像素中偏向背景色的部分
    // 对 RGB 处理：按 alpha 比例把颜色向"非背景色"拉
    const r = data[i], g = data[i + 1], b = data[i + 2];

    // 检测当前像素是否接近背景色
    const [pL, pA, pB2] = rgbToLab(r, g, b);
    const dL = pL - bgL, dA = pA - bgA, dB = pB2 - bgB;
    const distLab = Math.sqrt(dL * dL + dA * dA + dB * dB);

    if (distLab < 50) {
      // 边缘像素接近背景色，把它稍微推离背景色一点
      const push = contamination * 0.5;
      // 用相邻非背景像素的颜色（简化：向更饱和/更亮的方向推）
      const sat = rgbToSat(r, g, b);
      if (sat < 0.15) {
        // 低饱和度（灰边）→ 用亮度判断产品颜色
        // 简化：根据 alpha 减小灰边贡献
        data[i] = Math.min(255, r * (1 + push * 0.3));
        data[i + 1] = Math.min(255, g * (1 + push * 0.3));
        data[i + 2] = Math.min(255, b * (1 + push * 0.3));
      }
    }
  }
}

/* ============================================================
   背景色采样：沿边多采样 + 简化 K-means 聚类
   应对：渐变背景、光照不均、非纯色背景
   ============================================================ */
function sampleBackgroundColors(imageData, iw, ih, numClusters = 3) {
  const data = imageData.data;
  const samples = []; // 存 Lab 样本

  const bandW = Math.max(6, Math.floor(iw * 0.08));
  const bandH = Math.max(6, Math.floor(ih * 0.08));
  const step = Math.max(3, Math.floor(Math.min(iw, ih) / 60));

  // 上边缘
  for (let x = 0; x < iw; x += step) {
    for (let y = 0; y < bandH; y += step) {
      const idx = (y * iw + x) * 4;
      if (data[idx + 3] > 128) samples.push([data[idx], data[idx + 1], data[idx + 2]]);
    }
  }
  // 下边缘
  for (let x = 0; x < iw; x += step) {
    for (let y = ih - bandH; y < ih; y += step) {
      const idx = (y * iw + x) * 4;
      if (data[idx + 3] > 128) samples.push([data[idx], data[idx + 1], data[idx + 2]]);
    }
  }
  // 左边缘
  for (let y = bandH; y < ih - bandH; y += step) {
    for (let x = 0; x < bandW; x += step) {
      const idx = (y * iw + x) * 4;
      if (data[idx + 3] > 128) samples.push([data[idx], data[idx + 1], data[idx + 2]]);
    }
  }
  // 右边缘
  for (let y = bandH; y < ih - bandH; y += step) {
    for (let x = iw - bandW; x < iw; x += step) {
      const idx = (y * iw + x) * 4;
      if (data[idx + 3] > 128) samples.push([data[idx], data[idx + 1], data[idx + 2]]);
    }
  }

  if (samples.length === 0) {
    return [{ lab: [100, 0, 0], weight: 1 }];
  }

  // 转换到 Lab
  const labSamples = samples.map(([r, g, b]) => rgbToLab(r, g, b));

  // 简化 K-means：取 numClusters 个初始中心（等间距）
  const clusters = [];
  // 排序按 L+|a|+|b| 简化，然后等间距取
  labSamples.sort((a, b) => (a[0] + Math.abs(a[1]) + Math.abs(a[2])) - (b[0] + Math.abs(b[1]) + Math.abs(b[2])));
  for (let k = 0; k < numClusters; k++) {
    const idx = Math.floor((k + 0.5) * labSamples.length / numClusters);
    clusters.push({ L: labSamples[idx][0], a: labSamples[idx][1], b: labSamples[idx][2], count: 0 });
  }

  // 3 次迭代
  for (let iter = 0; iter < 3; iter++) {
    const sums = clusters.map(() => ({ L: 0, a: 0, b: 0, count: 0 }));
    for (const [L, a, b] of labSamples) {
      let bestK = 0;
      let bestD = Infinity;
      for (let k = 0; k < clusters.length; k++) {
        const dL = L - clusters[k].L;
        const dA = a - clusters[k].a;
        const dB = b - clusters[k].b;
        const d = dL * dL + dA * dA + dB * dB;
        if (d < bestD) { bestD = d; bestK = k; }
      }
      sums[bestK].L += L;
      sums[bestK].a += a;
      sums[bestK].b += b;
      sums[bestK].count++;
    }
    for (let k = 0; k < clusters.length; k++) {
      if (sums[k].count > 0) {
        clusters[k].L = sums[k].L / sums[k].count;
        clusters[k].a = sums[k].a / sums[k].count;
        clusters[k].b = sums[k].b / sums[k].count;
        clusters[k].count = sums[k].count;
      }
    }
  }

  // 返回非空的簇（按样本数降序）
  const total = labSamples.length;
  return clusters
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)
    .map((c) => ({ lab: [c.L, c.a, c.b], weight: c.count / total }));
}

/* ============================================================
   增强版抠图： mattingPro
   流程:
     1. 大图降采样加速
     2. 边缘多采样 + K-means 找多簇背景色（处理光照不均/渐变）
     3. Lab 空间逐像素距离 + 饱和度/亮度 辅助判别
     4. sigmoid 软阈值 → 平滑 alpha 蒙版
     5. 形态学开操作 (erode→dilate) 去噪 + 连通域去斑
     6. 高斯模糊 羽化边缘
     7. 边缘色污染修复 - 白边灰边消除
   ============================================================ */
export function mattingPro(img, tolerance = 40) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;

  // 对大图降采样加速
  const MAX_DIM = 1600;
  const scale = Math.min(1, MAX_DIM / Math.max(iw, ih));
  const sw = scale < 1 ? Math.floor(iw * scale) : iw;
  const sh = scale < 1 ? Math.floor(ih * scale) : ih;

  const srcCanvas = document.createElement("canvas");
  srcCanvas.width = iw; srcCanvas.height = ih;
  srcCanvas.getContext("2d").drawImage(img, 0, 0);

  const workCanvas = document.createElement("canvas");
  workCanvas.width = sw; workCanvas.height = sh;
  workCanvas.getContext("2d").drawImage(srcCanvas, 0, 0, sw, sh);
  const imageData = workCanvas.getContext("2d").getImageData(0, 0, sw, sh);
  const data = imageData.data;
  const total = sw * sh;

  // Step 2: 背景色聚类 (采样多簇)
  const bgClusters = sampleBackgroundColors(imageData, sw, sh, 4);
  const bgLabs = bgClusters.map((c) => c.lab);

  // Step 3: 全局统计 - 用于辅助判断
  let globalLumSum = 0, globalSatSum = 0;
  for (let i = 0; i < data.length; i += 4) {
    globalLumSum += (data[i] + data[i + 1] + data[i + 2]) / 3;
    globalSatSum += rgbToSat(data[i], data[i + 1], data[i + 2]);
  }
  const globalAvgLum = globalLumSum / total;
  const globalAvgSat = globalSatSum / total;

  const avgBgL = bgLabs.reduce((s, c) => s + c[0], 0) / bgLabs.length;
  const isBrightBg = avgBgL > 65;

  // 阈值：把容差映射为 Lab ΔE 范围
  const hardThreshold = tolerance * 1.0;
  const softThreshold = tolerance * 2.4;
  const softRange = softThreshold - hardThreshold;

  const sigmoid = (x) => 1 / (1 + Math.exp(-x));
  const alphaArr = new Float32Array(total);

  // 先计算每个像素到"最近背景簇"的 Lab 距离
  for (let p = 0; p < total; p++) {
    const i = p * 4;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const [L, a, bb] = rgbToLab(r, g, b);

    let minDist = Infinity;
    for (const [bL, bA, bB] of bgLabs) {
      const dL = L - bL, dA = a - bA, dB = bb - bB;
      // 色相关权重更高，亮度更轻 - 避免深浅变化误判
      const dist = Math.sqrt(dL * dL * 0.75 + (dA * dA + dB * dB) * 1.5);
      if (dist < minDist) minDist = dist;
    }

    const sat = rgbToSat(r, g, b);
    const lum = (r + g + b) / 3;

    // 基础 alpha
    let alpha;
    if (minDist < hardThreshold) {
      alpha = 0;
    } else if (minDist > softThreshold) {
      alpha = 255;
    } else {
      const t = (minDist - hardThreshold) / softRange;
      alpha = sigmoid((t - 0.5) * 7) * 255;
    }

    // 保护规则 A: 高饱和像素一定是产品
    if (sat > Math.max(0.15, globalAvgSat * 1.25)) {
      alpha = Math.max(alpha, Math.min(255, alpha + (sat - globalAvgSat) * 500));
    }

    // 保护规则 B: 亮背景下的暗区域一定是产品
    if (isBrightBg && lum < globalAvgLum * 0.75) {
      alpha = Math.max(alpha, 220);
    }

    // 保护规则 C: 暗背景下的亮区域
    if (!isBrightBg && lum > globalAvgLum * 1.25) {
      alpha = Math.max(alpha, 220);
    }

    // 边缘半透明 - 缩小硬边界（降低靠近边界的 alpha, 提升羽化效果）
    if (minDist > hardThreshold && minDist < softThreshold * 1.1) {
      alpha = alpha * 0.9 + Math.min(255, minDist / softThreshold * 255) * 0.1;
    }

    alphaArr[p] = alpha;
  }

  // Step 4: 形态学处理 - 腐蚀 → 膨胀 消除白边
  const morphData = new Uint8ClampedArray(total * 4);
  for (let i = 0; i < total; i++) morphData[i * 4 + 3] = Math.round(alphaArr[i]);
  erodeAlpha(morphData, sw, sh, 1, 3);
  dilateAlpha(morphData, sw, sh, 1, 3);
  for (let i = 0; i < total; i++) alphaArr[i] = morphData[i * 4 + 3];

  // Step 5: 连通域分析 - 去除孤立斑点
  connectedComponentsClean(alphaArr, sw, sh, 0.0003);

  // Step 6: 高斯模糊 羽化边缘 (半径 1-2px)
  const blurRadius = Math.max(1, Math.min(2, Math.floor(Math.min(sw, sh) / 350)));
  const finalData = new Uint8ClampedArray(total * 4);
  for (let i = 0; i < total; i++) {
    finalData[i * 4] = data[i * 4];
    finalData[i * 4 + 1] = data[i * 4 + 1];
    finalData[i * 4 + 2] = data[i * 4 + 2];
    finalData[i * 4 + 3] = Math.round(alphaArr[i]);
  }
  gaussianBlurAlpha(finalData, sw, sh, blurRadius, 3);

  // Step 7: 边缘色污染修复 - 消除白边/灰边
  decontaminateColors(finalData, sw, sh, bgLabs, alphaArr);

  // Step 8: 输出
  const out = document.createElement("canvas");
  out.width = sw; out.height = sh;
  out.getContext("2d").putImageData(new ImageData(finalData, sw, sh), 0, 0);

  if (scale < 1) {
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = iw; finalCanvas.height = ih;
    const fctx = finalCanvas.getContext("2d");
    fctx.imageSmoothingEnabled = true;
    fctx.imageSmoothingQuality = "high";
    fctx.drawImage(out, 0, 0, iw, ih);
    return finalCanvas;
  }
  return out;
}

/* ============================================================
   自动尺寸标准化 + 居中对齐 + 留白 (美客多 1200x1200 白底)
   - paddingRatio: 产品占画布的比例, 默认 0.85 (四周留 7.5%)
   - bgColor: 背景色
   - autoCrop: 是否先根据 alpha 自动裁剪产品区域
   ============================================================ */
export function standardizeImage(img, width = 1200, height = 1200, options = {}) {
  const {
    bgColor = "#ffffff",
    paddingRatio = 0.85,
    autoCrop = true,
  } = options;

  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;

  // 先绘制原始图像到 canvas
  const temp = document.createElement("canvas");
  temp.width = iw; temp.height = ih;
  temp.getContext("2d").drawImage(img, 0, 0);

  // 如开启自动裁剪, 找产品的 bounding box (基于 alpha 或与背景差异)
  let sx = 0, sy = 0, sw = iw, sh = ih;
  if (autoCrop) {
    const imageData = temp.getContext("2d").getImageData(0, 0, iw, ih);
    const data = imageData.data;
    let minX = iw, minY = ih, maxX = -1, maxY = -1;
    const step = Math.max(1, Math.floor(Math.min(iw, ih) / 400));
    for (let y = 0; y < ih; y += step) {
      for (let x = 0; x < iw; x += step) {
        const i = (y * iw + x) * 4;
        const a = data[i + 3];
        const r = data[i], g = data[i + 1], b = data[i + 2];
        // alpha > 10 或颜色不是纯白, 视为产品
        const isProduct = a > 10 && !(r > 250 && g > 250 && b > 250 && a > 240);
        if (isProduct) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX > minX && maxY > minY) {
      // 稍微放宽 bbox, 避免产品边缘被切
      const padX = Math.floor((maxX - minX) * 0.02);
      const padY = Math.floor((maxY - minY) * 0.02);
      sx = Math.max(0, minX - padX);
      sy = Math.max(0, minY - padY);
      sw = Math.min(iw - sx, maxX - minX + padX * 2);
      sh = Math.min(ih - sy, maxY - minY + padY * 2);
    }
  }

  // 等比缩放, 使产品占据画布的 paddingRatio 比例
  const availableW = width * paddingRatio;
  const availableH = height * paddingRatio;
  const r = Math.min(availableW / sw, availableH / sh);
  const dw = sw * r, dh = sh * r;
  const dx = (width - dw) / 2;
  const dy = (height - dh) / 2;

  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // 填充背景色
  if (bgColor.startsWith("gradient:")) {
    const colors = bgColor.replace("gradient:", "").split("|");
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, colors[0] || "#ffffff");
    grad.addColorStop(1, colors[1] || "#f3f4f6");
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = bgColor;
  }
  ctx.fillRect(0, 0, width, height);

  // 产品居中
  ctx.drawImage(temp, sx, sy, sw, sh, dx, dy, dw, dh);
  return canvas;
}

/* ============================================================
   一键生成电商主图 (完整流水线: 抠图 + 美化 + 标准化 + 锐化)
   - 预设 mercadolibre: 1200x1200 白底
   - 预设 amazon: 1500x1500 白底
   ============================================================ */
/**
 * @param {HTMLImageElement | HTMLCanvasElement} img
 * @param {string} preset
 * @param {((progress: number, message?: string) => void) | null} [onProgress] 进度回调
 */
export function generateProductHero(img, preset = "mercadolibre", onProgress = null) {
  const presetMap = {
    mercadolibre: { width: 1200, height: 1200, bgColor: "#ffffff", paddingRatio: 0.82, quality: 0.9, enhance: true },
    amazon: { width: 1500, height: 1500, bgColor: "#ffffff", paddingRatio: 0.85, quality: 0.9, enhance: true },
    shopee: { width: 800, height: 800, bgColor: "#ffffff", paddingRatio: 0.82, quality: 0.85, enhance: true },
    lazada: { width: 1200, height: 1200, bgColor: "#ffffff", paddingRatio: 0.82, quality: 0.85, enhance: true },
    tiktok: { width: 1000, height: 1000, bgColor: "#ffffff", paddingRatio: 0.82, quality: 0.9, enhance: true },
  };
  const cfg = presetMap[preset] || presetMap.mercadolibre;

  if (onProgress) onProgress(0.15, "正在智能抠图中...");

  // Step 1: 智能抠图
  const matte = mattingPro(img, 45);

  if (onProgress) onProgress(0.45, "已完成抠图，正在处理图像细节...");

  // Step 2: 白底 + 产品贴合
  const iw = matte.width, ih = matte.height;
  const bg = document.createElement("canvas");
  bg.width = iw; bg.height = ih;
  const bctx = bg.getContext("2d");
  bctx.fillStyle = cfg.bgColor;
  bctx.fillRect(0, 0, iw, ih);
  bctx.drawImage(matte, 0, 0);

  // Step 3: 美化 (自动色彩+锐化)
  if (cfg.enhance) {
    const imgData = bctx.getImageData(0, 0, iw, ih);
    autoBrightnessContrast(imgData, 0.5);
    unsharpMask(imgData, 0.45, 1);
    bctx.putImageData(imgData, 0, 0);
  }

  if (onProgress) onProgress(0.7, "正在标准化尺寸...");

  // Step 4: 尺寸标准化 + 居中留白
  const finalCanvas = standardizeImage(bg, cfg.width, cfg.height, {
    bgColor: cfg.bgColor,
    paddingRatio: cfg.paddingRatio,
    autoCrop: true,
  });

  if (onProgress) onProgress(1.0, "完成!");

  return {
    canvas: finalCanvas,
    width: cfg.width,
    height: cfg.height,
    quality: cfg.quality,
    dataURL: finalCanvas.toDataURL("image/jpeg", cfg.quality),
  };
}

/* ============================================================
   一键智能抠图（透明背景）
   ============================================================ */
export function mattingSimple(img, tolerance = 40, bgColor = "transparent") {
  const matte = mattingPro(img, tolerance);
  if (bgColor === "transparent") {
    return matte;
  }
  const iw = matte.width;
  const ih = matte.height;
  const out = document.createElement("canvas");
  const octx = out.getContext("2d");
  out.width = iw;
  out.height = ih;

  if (bgColor.startsWith("gradient:")) {
    const colors = bgColor.replace("gradient:", "").split("|");
    const grad = octx.createLinearGradient(0, 0, iw, ih);
    grad.addColorStop(0, colors[0] || "#ffffff");
    grad.addColorStop(1, colors[1] || "#e5e7eb");
    octx.fillStyle = grad;
  } else {
    octx.fillStyle = bgColor;
  }
  octx.fillRect(0, 0, iw, ih);
  octx.drawImage(matte, 0, 0);
  return out;
}

/* ============================================================
   生成纯白电商主图（白底）
   ============================================================ */
export function toWhiteBackground(img, tolerance = 40) {
  const matte = mattingPro(img, tolerance);
  const iw = matte.width;
  const ih = matte.height;
  const whiteCanvas = document.createElement("canvas");
  const wctx = whiteCanvas.getContext("2d");
  whiteCanvas.width = iw;
  whiteCanvas.height = ih;

  wctx.fillStyle = "#ffffff";
  wctx.fillRect(0, 0, iw, ih);
  wctx.drawImage(matte, 0, 0);

  return whiteCanvas;
}

/* ============================================================
   以下保持原功能不变
   ============================================================ */

export function resizeImage(img, width, height, mode = "contain", bgColor = "#ffffff") {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;

  if (mode === "contain") {
    const ratio = Math.min(width / iw, height / ih);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    const dw = iw * ratio;
    const dh = ih * ratio;
    ctx.drawImage(img, (width - dw) / 2, (height - dh) / 2, dw, dh);
  } else if (mode === "cover") {
    const r = Math.max(width / iw, height / ih);
    const dw = iw * r;
    const dh = ih * r;
    ctx.drawImage(img, (width - dw) / 2, (height - dh) / 2, dw, dh);
  } else if (mode === "stretch") {
    ctx.drawImage(img, 0, 0, width, height);
  }
  return canvas;
}

export function cropImage(img, x, y, w, h) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
  return canvas;
}

export function compressImage(img, quality = 0.8, format = "image/jpeg", maxWidth = 0) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  let iw = img.naturalWidth || img.width;
  let ih = img.naturalHeight || img.height;
  if (maxWidth > 0 && iw > maxWidth) {
    ih = (maxWidth / iw) * ih;
    iw = maxWidth;
  }
  canvas.width = iw;
  canvas.height = ih;
  ctx.drawImage(img, 0, 0, iw, ih);
  return canvas.toDataURL(format, quality);
}

export function adjustColor(img, brightness = 0, contrast = 0, saturation = 0) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  canvas.width = iw;
  canvas.height = ih;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, iw, ih);
  const data = imageData.data;
  const b = brightness;
  const c = (contrast + 100) / 100;
  const s = (saturation + 100) / 100;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i] + b;
    let g = data[i + 1] + b;
    let bl = data[i + 2] + b;
    r = (r - 128) * c + 128;
    g = (g - 128) * c + 128;
    bl = (bl - 128) * c + 128;

    if (s !== 1) {
      const gray = 0.3 * r + 0.59 * g + 0.11 * bl;
      r = gray + (r - gray) * s;
      g = gray + (g - gray) * s;
      bl = gray + (bl - gray) * s;
    }
    data[i] = Math.min(255, Math.max(0, r));
    data[i + 1] = Math.min(255, Math.max(0, g));
    data[i + 2] = Math.min(255, Math.max(0, bl));
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export function superResolution(img, scale = 2) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = iw * scale;
  canvas.height = ih * scale;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, iw * scale, ih * scale);
  return canvas;
}

export function replaceBackground(img, bgColor) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  canvas.width = iw;
  canvas.height = ih;

  if (bgColor === "transparent") {
    ctx.drawImage(img, 0, 0);
    return canvas;
  }
  if (bgColor.startsWith("gradient:")) {
    const colors = bgColor.replace("gradient:", "").split("|");
    const grad = ctx.createLinearGradient(0, 0, iw, ih);
    grad.addColorStop(0, colors[0] || "#ffffff");
    grad.addColorStop(1, colors[1] || "#e5e7eb");
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = bgColor;
  }
  ctx.fillRect(0, 0, iw, ih);
  ctx.drawImage(img, 0, 0);
  return canvas;
}

export function addTextWatermark(img, text, options = {}) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  canvas.width = iw;
  canvas.height = ih;
  ctx.drawImage(img, 0, 0);

  const fontSize = options.fontSize || Math.max(16, Math.floor(iw / 30));
  const position = options.position || "bottom-right";
  const opacity = options.opacity !== undefined ? options.opacity : 0.6;
  const color = options.color || "#000000";
  const rotate = options.rotate || 0;

  ctx.save();
  ctx.font = `${fontSize}px Arial, sans-serif`;
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;

  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const textHeight = fontSize;
  const padding = fontSize * 0.5;

  let x, y;
  if (position === "top-left") { x = padding; y = textHeight + padding; }
  else if (position === "top-right") { x = iw - textWidth - padding; y = textHeight + padding; }
  else if (position === "bottom-left") { x = padding; y = ih - padding; }
  else if (position === "center") { x = (iw - textWidth) / 2; y = ih / 2; }
  else if (position === "tile") {
    ctx.globalAlpha = opacity * 0.5;
    ctx.translate(iw / 2, ih / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const stepX = textWidth * 3;
    const stepY = textHeight * 4;
    for (let yy = -ih; yy < ih; yy += stepY) {
      for (let xx = -iw; xx < iw; xx += stepX) {
        ctx.fillText(text, xx, yy);
      }
    }
    ctx.restore();
    return canvas;
  }
  else { x = iw - textWidth - padding; y = ih - padding; }

  if (rotate !== 0) {
    ctx.translate(x + textWidth / 2, y - textHeight / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-(x + textWidth / 2), -(y - textHeight / 2));
  }
  ctx.fillText(text, x, y);
  ctx.restore();
  return canvas;
}

export function getImageInfo(dataURL) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const base64 = dataURL.split(",")[1] || "";
      const sizeKB = Math.floor((base64.length * 3) / 4 / 1024);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        sizeKB,
        format: dataURL.substring(dataURL.indexOf("/") + 1, dataURL.indexOf(";")),
      });
    };
    img.src = dataURL;
  });
}

export function downloadDataURL(dataURL, filename) {
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}