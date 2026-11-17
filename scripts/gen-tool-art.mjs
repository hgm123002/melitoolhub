// 一次性脚本：裁掉 AI 图底部水印 → 2:1 → 1280x640 WebP
import fs from "fs";
import path from "path";
import sharp from "sharp";

const MAP = [
  [".tmp-art", "keyword-lab"],
  [".tmp-art/a02", "product-analysis"],
  [".tmp-art/a03", "rate-converter"],
  [".tmp-art/a04", "profit-calculator"],
  [".tmp-art/a05", "shipping-calculator"],
  [".tmp-art/a06", "listing-optimizer"],
  [".tmp-art/a07", "keyword-research"],
  [".tmp-art/a08", "json-formatter"],
  [".tmp-art/a09", "base64-converter"],
  [".tmp-art/a10", "url-encoder"],
  [".tmp-art/a11", "ai-document"],
  [".tmp-art/a12", "ai-image-ocr"],
  [".tmp-art/a13", "ai-pdf-summary"],
  [".tmp-art/a14", "ai-code-dev"],
  [".tmp-art/a15", "ai-video-translate"],
];

const OUT = path.join(process.cwd(), "public", "tools-art");

for (const [dir, slug] of MAP) {
  const abs = path.join(process.cwd(), dir);
  if (!fs.existsSync(abs)) {
    console.log("MISSING DIR", dir);
    continue;
  }
  const files = fs.readdirSync(abs).filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
  if (!files.length) {
    console.log("NO FILE", dir);
    continue;
  }
  const src = path.join(abs, files[0]);
  const meta = await sharp(src).metadata();
  const W = meta.width, H = meta.height;
  // 去掉底部 15%（水印区）
  const usable = Math.round(H * 0.85);
  // 在可用区内取 2:1，稍微上偏以避开底部水印
  const targetH = Math.min(usable, Math.round(W / 2));
  const top = Math.max(0, Math.round((usable - targetH) * 0.35));

  const out = path.join(OUT, `${slug}.webp`);
  const info = await sharp(src)
    .extract({ left: 0, top, width: W, height: targetH })
    .resize(1280, 640, { fit: "cover" })
    .webp({ quality: 82, effort: 5 })
    .toFile(out);

  console.log(
    slug.padEnd(20),
    `${W}x${H}`,
    "->",
    `${info.width}x${info.height}`,
    `${Math.round(info.size / 1024)}KB`,
  );
}
