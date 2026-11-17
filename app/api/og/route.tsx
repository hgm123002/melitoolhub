import { ImageResponse } from "next/og";

// 博客文章 OG 分享图：按需生成（社交爬虫请求 /api/og?title=...&summary=... 时渲染）
// 构建零成本，标题/摘要由博客详情页 metadata 动态传入
export const runtime = "nodejs";

const size = { width: 1200, height: 630 };

function clip(s: string, max: number) {
  return s.length > max ? s.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : s;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = clip(searchParams.get("title") || "GlobalTradeHub Seller Blog", 74);
  const summary = clip(searchParams.get("summary") || "", 110);
  const brand = searchParams.get("brand") !== "0";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f2038 0%, #1a3a5c 60%, #0ea5e9 140%)",
          padding: "64px 72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {brand && (
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              G
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 28,
                fontWeight: 700,
                color: "#e0f2fe",
              }}
            >
              Global<span style={{ color: "#38bdf8" }}>Trade</span>Hub · Seller Blog
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.2 }}>
            {title}
          </div>
          {summary && (
            <div style={{ fontSize: 26, color: "#93c5fd", lineHeight: 1.4 }}>
              {summary}
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              background: "rgba(56,189,248,0.15)",
              border: "1px solid rgba(56,189,248,0.5)",
              fontSize: 22,
              color: "#7dd3fc",
            }}
          >
            Read the full guide →
          </div>
          <div style={{ fontSize: 22, color: "#64748b" }}>globaltradehub.com</div>
        </div>
      </div>
    ),
    size
  );
}
