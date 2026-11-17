import { ImageResponse } from "next/og";

// 全站 OG 分享图（1200x630）：构建时生成，自动注入所有 locale 页面的 og:image / twitter:image
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "GlobalTradeHub - Cross-Border E-Commerce Seller Toolbox";

export default function OgImage() {
  const tools = [
    "Profit Calculator",
    "Keyword Lab",
    "Currency Converter",
    "Shipping Estimator",
    "Listing Optimizer",
    "AI Workbench",
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f2038 0%, #1a3a5c 55%, #2563eb 130%)",
          padding: "72px 80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* 顶部品牌行 */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 22,
              background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            G
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 44,
                fontWeight: 800,
                letterSpacing: 1,
              }}
            >
              Global<span style={{ color: "#38bdf8" }}>Trade</span>Hub
            </div>
            <div style={{ fontSize: 22, color: "#94a3b8" }}>
              Cross-Border E-Commerce Seller Toolbox
            </div>
          </div>
        </div>

        {/* 中部主标语 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.15 }}>
            14+ Free Tools for Amazon, Shopee,
          </div>
          <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.15 }}>
            Mercado Libre &amp; Ozon Sellers
          </div>
          <div style={{ fontSize: 26, color: "#7dd3fc" }}>
            Compliance guides · China sourcing · AI workbench
          </div>
        </div>

        {/* 底部工具标签 */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {tools.map((t) => (
            <div
              key={t}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(56,189,248,0.45)",
                background: "rgba(56,189,248,0.12)",
                fontSize: 21,
                color: "#e0f2fe",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
