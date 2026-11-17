// app/api/market/rates/route.ts
// 实时汇率代理（免费源 open.er-api.com，无需 Key）
// 服务端代理 + 1 小时缓存，避免浏览器 CORS 与频控。
// 拉取失败时返回 ok:false，由前端回落到内置静态汇率表并标注"离线估算"。

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const FALLBACK_RATES: Record<string, number> = {
  CNY: 1, USD: 0.138, EUR: 0.127, GBP: 0.108, JPY: 21.5, HKD: 1.08,
  KRW: 192, AUD: 0.215, CAD: 0.188, SGD: 0.185, THB: 4.95, MYR: 0.645,
  IDR: 2180, PHP: 7.85, VND: 3450, MXN: 2.35, BRL: 0.685, RUB: 12.8,
  INR: 11.5, NOK: 1.48, SEK: 1.52, CHF: 0.124, NZD: 0.228, ZAR: 2.45,
  AED: 0.506, TRY: 4.35,
};

export async function GET() {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch("https://open.er-api.com/v6/latest/CNY", {
      signal: ctrl.signal,
      next: { revalidate: 3600 },
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = (await res.json()) as {
      result?: string;
      time_last_update_epoch?: number;
      rates?: Record<string, number>;
    };
    if (data.result !== "success" || !data.rates) throw new Error("bad payload");

    const rates: Record<string, number> = {};
    for (const [code, val] of Object.entries(data.rates)) {
      if (typeof val === "number" && val > 0) rates[code] = val;
    }

    return NextResponse.json({
      ok: true,
      base: "CNY",
      updated: data.time_last_update_epoch
        ? new Date(data.time_last_update_epoch * 1000).toISOString()
        : new Date().toISOString(),
      rates,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        base: "CNY",
        updated: null,
        rates: FALLBACK_RATES,
        note: "live-unavailable",
      },
      { status: 200 },
    );
  }
}
