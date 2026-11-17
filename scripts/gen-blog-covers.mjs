// 一次性脚本：按文章主题生成中文长文封面（与现有 cover1-10 同版式：渐变底 + 标签胶囊 + 粗标题 + 琥珀下划线）
// 输出 public/blog-covers/zh-01.png ... zh-10.png，1600x900
import sharp from "sharp";
import path from "path";

const COVERS = [
  { file: "zh-01.webp", tag: "PRODUCT RESEARCH", lines: ["Product Selection Framework", "4 Filters Before You Buy"] },
  { file: "zh-02.webp", tag: "COMPLIANCE", lines: ["EU & US Compliance:", "VAT, CE, Product Safety"] },
  { file: "zh-03.webp", tag: "LOGISTICS", lines: ["Freight Cost Structure:", "Sea, Air, Warehouse"] },
  { file: "zh-04.webp", tag: "OPERATIONS", lines: ["Store Operations:", "The Five-Layer Funnel"] },
  { file: "zh-05.webp", tag: "TOOLKIT", lines: ["Seller Toolkit:", "What to Use, and When"] },
  { file: "zh-06.webp", tag: "LATAM", lines: ["Mexico vs Brazil:", "Sourcing for LatAm"] },
  { file: "zh-07.webp", tag: "LIVE COMMERCE", lines: ["TikTok Live Selling:", "From Zero to First Order"] },
  { file: "zh-08.webp", tag: "FULFILLMENT", lines: ["Overseas Warehouse:", "Inbound, Stock, Last Mile"] },
  { file: "zh-09.webp", tag: "MARKET ENTRY", lines: ["Shopee vs Lazada:", "Entry, Fees, Compliance"] },
  { file: "zh-10.webp", tag: "ANALYTICS", lines: ["Seller Analytics:", "5 Metric Groups That Matter"] },
];


const COVERS_EN = [
  { file: "en-11.webp", tag: "PROFIT & PRICING", lines: ["Amazon FBA Profit Margin:", "The Formula That Matches"] },
  { file: "en-12.webp", tag: "KEYWORD RESEARCH", lines: ["Keyword Research", "Without Paid Tools"] },
  { file: "en-13.webp", tag: "LISTING SEO", lines: ["Mercado Libre:", "The 60-Character Rule"] },
  { file: "en-14.webp", tag: "PLATFORM FEES", lines: ["Ozon Seller Fees:", "What Eats Your Margin"] },
  { file: "en-15.webp", tag: "MARKET ENTRY", lines: ["Shopee vs Lazada:", "A Seller Cost Comparison"] },
  { file: "en-16.webp", tag: "COMPETITOR AUDIT", lines: ["Competitor Title Audit:", "Find Missing Keywords"] },
  { file: "en-17.webp", tag: "FULFILMENT", lines: ["FBA vs FBM:", "A Cost Breakdown You Can Use"] },
  { file: "en-18.webp", tag: "COMPLIANCE", lines: ["Cross-Border VAT & GST:", "What Sellers Get Wrong"] },
  { file: "en-19.webp", tag: "PRODUCT RESEARCH", lines: ["TikTok Shop Selection:", "What Actually Sells"] },
  { file: "en-20.webp", tag: "SOURCING", lines: ["Vetting a Supplier", "Before You Send a Deposit"] },
];

const W = 1600, H = 900;
const MAXW = 1380; // 标题可用宽度
const FONT = "Segoe UI, Arial, Helvetica, sans-serif";

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function titleSize(lines) {
  // Segoe UI Bold 平均字宽约 0.56em，按最长行反推字号，上限 92、下限 58
  const longest = Math.max(...lines.map((l) => l.length));
  const size = Math.floor(MAXW / (longest * 0.56));
  return Math.max(58, Math.min(92, size));
}

function svg({ tag, lines }) {
  const size = titleSize(lines);
  const lh = Math.round(size * 1.16);
  const firstBaseline = 400;
  const titleSvg = lines
    .map((l, i) => `<text x="110" y="${firstBaseline + i * lh}" font-family="${FONT}" font-size="${size}" font-weight="800" fill="#ffffff">${escape(l)}</text>`)
    .join("\n  ");
  const underlineY = firstBaseline + (lines.length - 1) * lh + 62;

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0c1b30"/>
      <stop offset="0.55" stop-color="#14294a"/>
      <stop offset="1" stop-color="#1e3d66"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#3f86de" stop-opacity="0.32"/>
      <stop offset="1" stop-color="#3f86de" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#f0b429" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#f0b429" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1300" cy="140" r="360" fill="url(#glow)"/>
  <circle cx="1300" cy="140" r="262" fill="#ffffff" opacity="0.035"/>
  <circle cx="180" cy="820" r="300" fill="url(#glow2)"/>
  <rect x="110" y="196" width="${Math.round(tag.length * 15 + 66)}" height="52" rx="26" fill="#ffffff" opacity="0.10"/>
  <text x="136" y="232" font-family="${FONT}" font-size="21" font-weight="700" letter-spacing="3.2" fill="#7cc0f2">${escape(tag)}</text>
  ${titleSvg}
  <rect x="110" y="${underlineY}" width="96" height="8" rx="4" fill="#f0b429"/>
  <text x="110" y="800" font-family="${FONT}" font-size="24" font-weight="600" fill="#dbe7f5">GlobalTradeHub Seller Blog</text>
  <text x="110" y="840" font-family="${FONT}" font-size="22" fill="#8fb4d8">globaltradehub.com</text>
</svg>`;
}

const outDir = path.join(process.cwd(), "public", "blog-covers");
for (const c of [...COVERS, ...COVERS_EN]) {
  const buf = Buffer.from(svg(c));
  await sharp(buf).resize(1280, 720).webp({ quality: 84 }).toFile(path.join(outDir, c.file));
  console.log("wrote", c.file);
}
