// app/api/market/keyword/route.ts
// 真实市场数据接入（BYOK：用户自带数据源 Key）
// 用途：当用户配置了第三方数据源 Key 时，由服务端代调其官方 API，避免浏览器 CORS 限制。
// 安全：Key 只在本次请求内使用，不落库、不写日志、不回显。

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Provider = "dataforseo" | "serpapi" | "rainforest" | "keepa";

export interface MarketRecord {
  keyword: string;
  volume?: number;
  cpc?: number;
  competition?: number;
  trend?: number[];
  source: Provider;
}

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

const withTimeout = async (url: string, init: RequestInit, ms = 20000) => {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal, cache: "no-store" });
  } finally {
    clearTimeout(timer);
  }
};

export async function POST(req: NextRequest) {
  let payload: { provider?: Provider; key?: string; keyword?: string; market?: string; domain?: string };
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, error: "INVALID_JSON", message: "请求体不是合法 JSON" }, 400);
  }

  const { provider, key, keyword } = payload;
  if (!provider || !key || !keyword) {
    return json({ ok: false, error: "MISSING_PARAMS", message: "provider / key / keyword 均为必填" }, 400);
  }

  try {
    switch (provider) {
      /* DataForSEO：Google Ads 真实月搜索量（Key 格式 login:password） */
      case "dataforseo": {
        if (!key.includes(":")) {
          return json({ ok: false, error: "BAD_KEY", message: "DataForSEO 需要 login:password 形式的 API 凭据" }, 400);
        }
        const auth = Buffer.from(key, "utf8").toString("base64");
        const res = await withTimeout(
          "https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live",
          {
            method: "POST",
            headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
            body: JSON.stringify([
              {
                keywords: [keyword],
                location_name: payload.market === "amazon-eu" ? "Germany" : "United States",
                language_name: payload.market === "amazon-eu" ? "German" : "English",
              },
            ]),
          },
        );
        const data = await res.json();
        const item = data?.tasks?.[0]?.result?.[0];
        if (!item) {
          return json({ ok: false, error: "NO_DATA", message: "数据源未返回结果，请检查账户余额或关键词" }, 502);
        }
        const record: MarketRecord = {
          keyword: item.keyword ?? keyword,
          volume: item.search_volume ?? 0,
          cpc: item.cpc ?? 0,
          competition: item.competition ?? 0,
          source: "dataforseo",
        };
        return json({ ok: true, data: [record] });
      }

      /* SerpApi：Google Trends 真实热度曲线（0-100） */
      case "serpapi": {
        const url = new URL("https://serpapi.com/search.json");
        url.searchParams.set("engine", "google_trends");
        url.searchParams.set("q", keyword);
        url.searchParams.set("data_type", "TIMESERIES");
        url.searchParams.set("api_key", key);
        const res = await withTimeout(url.toString(), { method: "GET" });
        const data = await res.json();
        if (data?.error) {
          return json({ ok: false, error: "PROVIDER_ERROR", message: String(data.error) }, 502);
        }
        const points = data?.interest_over_time?.timeline_data ?? [];
        const trend = points.map((p: { values?: { extracted_value?: number }[] }) => p?.values?.[0]?.extracted_value ?? 0);
        if (!trend.length) {
          return json({ ok: false, error: "NO_DATA", message: "该关键词没有足够的趋势数据" }, 502);
        }
        const avg = Math.round(trend.reduce((a: number, b: number) => a + b, 0) / trend.length);
        return json({ ok: true, data: [{ keyword, volume: avg, trend, source: "serpapi" } as MarketRecord] });
      }

      /* Rainforest API：Amazon 真实搜索结果（价格/评分/评论数） */
      case "rainforest": {
        const url = new URL("https://api.rainforestapi.com/request");
        url.searchParams.set("api_key", key);
        url.searchParams.set("type", "search");
        url.searchParams.set("amazon_domain", payload.domain || "amazon.com");
        url.searchParams.set("search_term", keyword);
        const res = await withTimeout(url.toString(), { method: "GET" });
        const data = await res.json();
        if (!data?.search_results?.length) {
          return json({ ok: false, error: "NO_DATA", message: data?.error || "没有抓到搜索结果" }, 502);
        }
        const items = data.search_results.slice(0, 20).map((r: Record<string, unknown>) => {
          const price = (r.price as { value?: number } | undefined)?.value ?? 0;
          const rating = r.rating ?? 0;
          const reviews = r.ratings_total ?? 0;
          return { title: r.title, price, rating, reviews };
        });
        const prices = items.map((i: { price: number }) => i.price).filter((p: number) => p > 0);
        const avgPrice = prices.length ? prices.reduce((a: number, b: number) => a + b, 0) / prices.length : 0;
        const reviewCounts = items.map((i: { reviews: number }) => i.reviews);
        const medianReviews = reviewCounts.length
          ? [...reviewCounts].sort((a: number, b: number) => a - b)[Math.floor(reviewCounts.length / 2)]
          : 0;
        return json({
          ok: true,
          data: [{ keyword, volume: items.length, source: "rainforest" } as MarketRecord],
          market: {
            sampleSize: items.length,
            avgPrice: Math.round(avgPrice * 100) / 100,
            medianReviews,
            items,
          },
        });
      }

      /* Keepa：Amazon 商品历史数据 */
      case "keepa": {
        const url = new URL("https://api.keepa.com/search");
        url.searchParams.set("key", key);
        url.searchParams.set("domain", payload.domain === "amazon.co.uk" ? "2" : "1");
        url.searchParams.set("type", "product");
        url.searchParams.set("term", keyword);
        const res = await withTimeout(url.toString(), { method: "GET" });
        const data = await res.json();
        if (!data?.products?.length) {
          return json({ ok: false, error: "NO_DATA", message: "Keepa 未返回商品，请检查 Key 或关键词" }, 502);
        }
        return json({
          ok: true,
          data: [{ keyword, volume: data.products.length, source: "keepa" } as MarketRecord],
          market: { sampleSize: data.products.length },
        });
      }

      default:
        return json({ ok: false, error: "UNKNOWN_PROVIDER", message: "不支持的数据源" }, 400);
    }
  } catch (err) {
    const message = err instanceof Error && err.name === "AbortError"
      ? "数据源响应超时（20 秒），请稍后重试"
      : "调用数据源失败，请检查 Key 是否有效或网络是否可达";
    return json({ ok: false, error: "FETCH_FAILED", message }, 502);
  }
}
