"use client";

import { useState, useEffect, useMemo, ReactNode } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, RefreshCw, Copy, Check, Sparkles } from "lucide-react";
import {
  tools,
  currencyList,
  exchangeRates,
  communitySections,
} from "../../../../config/tools";
import { useLanguage } from "../../../i18n";
import { toolArt } from "../../../../lib/tool-art";
import { catNameOf, categoryKey, toolDescKey, toolIntroOf, toolKey, toolNameOf } from "../../../../lib/tool-i18n";
import {
  expandKeywords,
  getMarketRule,
  keywordsToCsv,
  downloadText,
  MARKET_RULES,
  type MarketKey,
} from "../../../../lib/keyword-engine";

const withTranslation = (children: ReactNode) => children;

// ============ 实时汇率换算工具 ============
function RateConverterTool() {
  const { t, language } = useLanguage();
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("CNY");
  const [amount, setAmount] = useState("100");
  const [result, setResult] = useState<number | null>(null);
  // 实时汇率：成功为 {ok:true}，失败回落静态表并标注"离线估算"
  const [live, setLive] = useState<{
    ok: boolean;
    updated: string | null;
    rates: Record<string, number>;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/market/rates")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setLive({
          ok: !!d?.ok,
          updated: d?.updated ?? null,
          rates: d?.rates ?? {},
        });
      })
      .catch(() => !cancelled && setLive({ ok: false, updated: null, rates: {} }));
    return () => {
      cancelled = true;
    };
  }, []);

  const rateOf = (code: string) => {
    const lr = live?.rates?.[code];
    if (lr && lr > 0) return lr;
    return exchangeRates[code]?.rate ?? 0;
  };

  const convert = () => {
    const amt = parseFloat(amount);
    const fr = rateOf(fromCurrency);
    const to = rateOf(toCurrency);
    if (isNaN(amt) || amt <= 0 || !fr || !to) {
      setResult(null);
      return;
    }
    setResult((amt / fr) * to);
  };

  useEffect(() => {
    convert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, toCurrency, amount, live]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromInfo = { ...exchangeRates[fromCurrency], rate: rateOf(fromCurrency) };
  const toInfo = { ...exchangeRates[toCurrency], rate: rateOf(toCurrency) };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-8">
        <h2 className="text-2xl font-semibold text-[#f59e0b] mb-3">
          💱 {t("rate_title", "Currency Converter")}
        </h2>
        <p
          className={`text-xs mb-6 ${
            live?.ok ? "text-emerald-600" : live ? "text-amber-600" : "text-gray-400"
          }`}
        >
          {live === null
            ? t("rate_loading", "Loading live rates...")
            : live.ok
              ? t("rate_live", "Live exchange rates") +
                (live.updated
                  ? ` · ${new Date(live.updated).toLocaleDateString()}`
                  : "")
              : t(
                  "rate_offline",
                  "Live rates unavailable - using offline estimate, for reference only",
                )}
        </p>
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              {t("rate_from", "From Currency")}
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24]"
            >
              {currencyList.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.name} {c.symbol}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t("rate_placeholder", "Enter amount")}
              className="mt-3 w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] text-lg outline-none focus:border-[#fbbf24]"
            />
            <p className="text-xs text-gray-600 mt-2">
              1 {fromInfo?.code} ≈{" "}
              {((1 / fromInfo?.rate) * toInfo?.rate).toFixed(4)} {toInfo?.code}
            </p>
          </div>
          <button
            onClick={swapCurrencies}
            className="p-3 bg-amber-50 rounded-xl text-[#f59e0b] hover:bg-[#fbbf24]/20 transition"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              {t("rate_to", "To Currency")}
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24]"
            >
              {currencyList.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.name} {c.symbol}
                </option>
              ))}
            </select>
            <div className="mt-3 w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] text-lg">
              {result !== null ? `${toInfo?.symbol} ${result.toFixed(2)}` : "—"}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              1 {toInfo?.code} ≈{" "}
              {((1 / toInfo?.rate) * fromInfo?.rate).toFixed(4)}{" "}
              {fromInfo?.code}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8">
        <h2 className="text-xl font-semibold text-[#1e3a5f] mb-4">
          📊 {t("rate_table", "Quick Reference Table")} (1 {fromCurrency})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {currencyList
            .filter((c) => c.code !== fromCurrency)
            .slice(0, 12)
            .map((c) => {
              const converted = (1 / rateOf(fromCurrency)) * rateOf(c.code);
              return (
                <div key={c.code} className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">
                    {c.code} {c.name}
                  </div>
                  <div className="text-lg text-[#1e3a5f] font-semibold mt-1">
                    {converted.toFixed(4)}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

// ============ 利润计算器 ============
function ProfitCalculatorTool() {
  const { t, language } = useLanguage();
  const [purchaseCost, setPurchaseCost] = useState("20");
  const [shippingCost, setShippingCost] = useState("15");
  const [commissionRate, setCommissionRate] = useState("15");
  const [otherCost, setOtherCost] = useState("5");
  const [sellPrice, setSellPrice] = useState("79");

  const pc = parseFloat(purchaseCost) || 0;
  const sc = parseFloat(shippingCost) || 0;
  const oc = parseFloat(otherCost) || 0;
  const sp = parseFloat(sellPrice) || 0;
  const comm = (parseFloat(commissionRate) || 0) / 100;

  const commission = sp * comm;
  const totalCost = pc + sc + oc + commission;
  const profit = sp - totalCost;
  const profitRate = sp > 0 ? (profit / sp) * 100 : 0;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-8">
        <h2 className="text-2xl font-semibold text-[#f59e0b] mb-6">
          💰 {t("profit_title", "Profit Calculator")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t("profit_purchase", "Purchase Cost")}
              </label>
              <input
                type="number"
                value={purchaseCost}
                onChange={(e) => setPurchaseCost(e.target.value)}
                className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t("profit_shipping", "Shipping Cost")}
              </label>
              <input
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
                className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t("profit_commission", "Commission Rate (%)")}
              </label>
              <input
                type="number"
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value)}
                className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t("profit_other", "Other Cost")}
              </label>
              <input
                type="number"
                value={otherCost}
                onChange={(e) => setOtherCost(e.target.value)}
                className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t("profit_sell", "Sell Price")}
              </label>
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24]"
              />
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">
              📊 {t("profit_results", "Results")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-600">
                  {t("profit_commission", "Commission")}
                </p>
                <p className="text-lg text-[#1e3a5f] font-semibold mt-1">
                  {commission.toFixed(2)}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-600">
                  {t("profit_totalCost", "Total Cost")}
                </p>
                <p className="text-lg text-[#1e3a5f] font-semibold mt-1">
                  {totalCost.toFixed(2)}
                </p>
              </div>
              <div className="bg-amber-100 rounded-xl p-4 border border-amber-200">
                <p className="text-xs text-[#f59e0b]">
                  {t("profit_profit", "Profit")}
                </p>
                <p
                  className={`text-lg font-semibold mt-1 ${profit >= 0 ? "text-[#f59e0b]" : "text-red-600"}`}
                >
                  {profit.toFixed(2)}
                </p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-xs text-[#f59e0b]">
                  {t("profit_rate", "Profit Rate")}
                </p>
                <p
                  className={`text-lg font-semibold mt-1 ${profitRate >= 0 ? "text-[#f59e0b]" : "text-red-600"}`}
                >
                  {profitRate.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="border-t border-[#1e3a5f pt-4 text-sm text-gray-600">
              <p className="mb-1">
                {t("profit_breakdown_pc", "Purchase")}: {pc.toFixed(2)}
              </p>
              <p className="mb-1">
                {t("profit_breakdown_sc", "Shipping")}: {sc.toFixed(2)}
              </p>
              <p className="mb-1">
                {t("profit_breakdown_oc", "Other")}: {oc.toFixed(2)}
              </p>
              <p className="mb-1">
                {t("profit_breakdown_comm", "Commission")} ({commissionRate}%):{" "}
                {commission.toFixed(2)}
              </p>
              <p className="text-[#1e3a5f] font-medium mt-2">
                {t("profit_breakdown_total", "Price")} {sp.toFixed(2)} -{" "}
                {t("profit_breakdown_total", "Cost")} {totalCost.toFixed(2)} ={" "}
                <span
                  className={profit >= 0 ? "text-[#f59e0b]" : "text-red-600"}
                >
                  {t("profit_profit", "Profit")} {profit.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ 物流运费计算器 ============
function ShippingCalculatorTool() {
  const { t, language } = useLanguage();
  const [weight, setWeight] = useState("0.5");
  const [volume, setVolume] = useState("0.008");
  const [channel, setChannel] = useState("air");
  const [destination, setDestination] = useState("US");

  const w = parseFloat(weight) || 0;
  const v = parseFloat(volume) || 0;

  const channels: Record<
    string,
    { name: string; baseRate: number; minFee: number; desc: string }
  > = {
    air: {
      name: t("ship_air", "Air Freight"),
      baseRate: 35,
      minFee: 25,
      desc: t("ship_air_desc", "7-15 days, cost-effective"),
    },
    express: {
      name: t("ship_express", "Express"),
      baseRate: 65,
      minFee: 50,
      desc: t("ship_express_desc", "3-7 days, fast and reliable"),
    },
    sea: {
      name: t("ship_sea", "Sea Freight"),
      baseRate: 12,
      minFee: 15,
      desc: t("ship_sea_desc", "25-45 days, lowest cost"),
    },
    train: {
      name: t("ship_train", "Rail Freight"),
      baseRate: 18,
      minFee: 20,
      desc: t("ship_train_desc", "15-25 days, best for large items"),
    },
  };

  const destMultipliers: Record<string, { name: string; multiplier: number }> =
    {
      US: { name: t("dest_us", "United States"), multiplier: 1.0 },
      EU: { name: t("dest_eu", "Europe"), multiplier: 1.1 },
      UK: { name: t("dest_uk", "United Kingdom"), multiplier: 1.15 },
      JP: { name: t("dest_jp", "Japan"), multiplier: 0.85 },
      SG: { name: t("dest_sg", "Southeast Asia"), multiplier: 0.7 },
      MX: { name: t("dest_mx", "Mexico"), multiplier: 1.2 },
      BR: { name: t("dest_br", "Brazil"), multiplier: 1.3 },
      RU: { name: t("dest_ru", "Russia"), multiplier: 0.9 },
      AU: { name: t("dest_au", "Australia"), multiplier: 1.05 },
    };

  const channelInfo = channels[channel];
  const destInfo = destMultipliers[destination];

  const volumeWeight = v * 167;
  const chargeableWeight = Math.max(w, volumeWeight);
  const estimatedCost = Math.max(
    chargeableWeight * channelInfo.baseRate * destInfo.multiplier,
    channelInfo.minFee,
  );

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-8">
        <h2 className="text-2xl font-semibold text-[#f59e0b] mb-6">
          📦 {t("ship_title", "Shipping Cost Estimator")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t("ship_weight", "Actual Weight (kg)")}
              </label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t("ship_volume", "Volume (m³)")}
              </label>
              <input
                type="number"
                step="0.001"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t("ship_channel", "Shipping Channel")}
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24]"
              >
                {Object.entries(channels).map(([key, info]) => (
                  <option key={key} value={key}>
                    {info.name} - {info.desc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t("ship_destination", "Destination")}
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24]"
              >
                {Object.entries(destMultipliers).map(([key, info]) => (
                  <option key={key} value={key}>
                    {info.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">
              📊 {t("ship_estimate", "Cost Estimate")}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#1a2b4e]">
                <span>{t("ship_actualWeight", "Actual Weight")}</span>
                <span>{w.toFixed(2)} kg</span>
              </div>
              <div className="flex justify-between text-[#1a2b4e]">
                <span>{t("ship_volumeWeight", "Volumetric Weight")}</span>
                <span>{volumeWeight.toFixed(2)} kg</span>
              </div>
              <div className="flex justify-between text-[#f59e0b] font-medium">
                <span>{t("ship_chargeableWeight", "Chargeable Weight")}</span>
                <span>{chargeableWeight.toFixed(2)} kg</span>
              </div>
              <div className="flex justify-between text-[#1a2b4e]">
                <span>{t("ship_baseRate", "Base Rate")}</span>
                <span>{channelInfo.baseRate}/kg</span>
              </div>
              <div className="flex justify-between text-[#1a2b4e]">
                <span>{t("ship_multiplier", "Dest. Multiplier")}</span>
                <span>× {destInfo.multiplier}</span>
              </div>
            </div>
            <div className="border-t border-[#1e3a5f pt-4">
              <p className="text-sm text-gray-600">
                {t("ship_estimatedCost", "Estimated Cost")}
              </p>
              <p className="text-3xl font-bold text-[#f59e0b] mt-1">
                {estimatedCost.toFixed(2)}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                {channelInfo.name} → {destInfo.name}
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-[#f59e0b]">
              💡{" "}
              {t(
                "ship_note",
                "Note: Actual costs may vary by forwarder, estimate is for reference only",
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ Listing 优化工具 ============
// 高亮文本中命中的关键词
function highlightKw(
  text: string,
  keywords: string[],
  baseClass: string = "bg-[#fbbf24]/20 text-yellow-200 px-0.5 rounded font-semibold",
): ReactNode[] {
  if (!text || keywords.length === 0) return [text];
  const sortedKw = [...keywords].sort((a, b) => b.length - a.length);
  const textLower = text.toLowerCase();
  const matches: { start: number; end: number; kw: string }[] = [];
  sortedKw.forEach((kw) => {
    const kwLower = kw.toLowerCase();
    let idx = textLower.indexOf(kwLower);
    while (idx !== -1) {
      const overlap = matches.some(
        (m) => !(idx + kwLower.length <= m.start || idx >= m.end),
      );
      if (!overlap)
        matches.push({
          start: idx,
          end: idx + kwLower.length,
          kw: text.substring(idx, idx + kwLower.length),
        });
      idx = textLower.indexOf(kwLower, idx + 1);
    }
  });
  if (matches.length === 0) return [text];
  matches.sort((a, b) => a.start - b.start);
  const result: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((m, i) => {
    if (m.start > cursor) result.push(text.substring(cursor, m.start));
    result.push(
      <mark key={i} className={baseClass}>
        {m.kw}
      </mark>,
    );
    cursor = m.end;
  });
  if (cursor < text.length) result.push(text.substring(cursor));
  return result;
}

function ListingOptimizerTool() {
  const { t, language } = useLanguage();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const titleLen = title.length;
  const titleWords = title
    .trim()
    .split(/\s+/)
    .filter((w) => w).length;
  const descLen = description.length;
  const keywordList = keywords.split(/[,，\s]+/).filter((k) => k);
  const titleMatched = keywordList.filter((k) =>
    title.toLowerCase().includes(k.toLowerCase()),
  );
  const descMatched = keywordList.filter((k) =>
    description.toLowerCase().includes(k.toLowerCase()),
  );
  const missingKw = keywordList.filter(
    (k) =>
      !title.toLowerCase().includes(k.toLowerCase()) &&
      !description.toLowerCase().includes(k.toLowerCase()),
  );

  // 透明分项评分：每项规则可复算，无隐藏公式
  const scoreListing = (titleText: string, descText: string) => {
    const items: { label: string; got: number; max: number }[] = [];
    // A 标题长度 20 分：40-80 满分，120 内 14，200 内 8
    const tLen = titleText.trim().length;
    let got = tLen >= 40 && tLen <= 80 ? 20 : tLen > 80 && tLen <= 120 ? 14 : tLen > 120 && tLen <= 200 ? 8 : 0;
    items.push({ label: t("lo_len", "Title length 40-80 chars"), got, max: 20 });
    // B 关键词覆盖 40 分：标题每个词 6 分（封顶 30），描述每个词 3 分（封顶 10）
    const th = keywordList.filter((k) => titleText.toLowerCase().includes(k.toLowerCase())).length;
    const dh = keywordList.filter((k) => descText.toLowerCase().includes(k.toLowerCase())).length;
    items.push({
      label: t("lo_kwCover", "Keyword coverage (title 6/word, desc 3/word)"),
      got: Math.min(th * 6, 30) + Math.min(dh * 3, 10),
      max: 40,
    });
    // C 堆砌检测 15 分：任意单词重复 <=2 次满分，每多 1 次 -2
    const freq = new Map<string, number>();
    for (const w of titleText.toLowerCase().split(/[^a-z0-9]+/)) {
      if (w) freq.set(w, (freq.get(w) || 0) + 1);
    }
    const worst = freq.size ? Math.max(...freq.values()) : 0;
    items.push({
      label: t("lo_stuffing", "No keyword stuffing (word repeat <= 2)"),
      got: worst <= 2 ? 15 : Math.max(0, 15 - (worst - 2) * 2),
      max: 15,
    });
    // D 描述覆盖关键词 15 分
    items.push({
      label: t("lo_descKw", "Keywords present in description"),
      got: dh > 0 ? Math.min(dh * 3, 15) : 0,
      max: 15,
    });
    // E 描述充实度 10 分：250+ 字符满分
    const dLen = descText.trim().length;
    items.push({
      label: t("lo_descLen", "Description depth (250+ chars)"),
      got: dLen >= 250 ? 10 : dLen >= 100 ? 6 : dLen > 0 ? 3 : 0,
      max: 10,
    });
    return { items, total: items.reduce((a, b) => a + b.got, 0) };
  };

  const optimizedTitle = useMemo(() => {
    if (!title) return "";
    let opt = title.trim();
    const missingInTitle = keywordList.filter(
      (k) => !title.toLowerCase().includes(k.toLowerCase()),
    );
    if (missingInTitle.length > 0)
      opt = opt + " | " + missingInTitle.slice(0, 4).join(", ");
    if (opt.length < 60) {
      const adds = [
        t("lo_add1", "Premium Quality"),
        t("lo_add2", "Hot Selling"),
        t("lo_add3", "Versatile Use"),
        t("lo_add4", "Best Seller"),
      ];
      for (const add of adds) {
        if (opt.length >= 100) break;
        if (!opt.toLowerCase().includes(add.toLowerCase())) opt += " " + add;
      }
    }
    if (opt.length > 200) opt = opt.substring(0, 198) + "...";
    return opt;
  }, [title, keywords, t]);

  const optimizedDesc = useMemo(() => {
    if (!description) return "";
    let opt = description.trim();
    const missingInDesc = keywordList.filter(
      (k) => !description.toLowerCase().includes(k.toLowerCase()),
    );
    if (missingInDesc.length > 0) {
      opt += "\n\n【" + t("lo_keySelling", "Key Selling Points") + "】\n";
      missingInDesc.slice(0, 5).forEach((kw, i) => {
        opt +=
          i +
          1 +
          ". " +
          kw +
          ": " +
          t(
            "lo_qualityDesc",
            "Selected premium quality, industry-leading performance",
          ) +
          ".\n";
      });
    }
    if (opt.length < Math.max(descLen + 50, 250)) {
      opt +=
        "\n【" +
        t("lo_useCases", "Use Cases") +
        "】" +
        t(
          "lo_useCasesDesc",
          "Commuting, office, sports, home use. Professional quality you can trust.",
        );
    }
    return opt;
  }, [description, keywords, t]);

  const optTitleHits = keywordList.filter((k) =>
    optimizedTitle.toLowerCase().includes(k.toLowerCase()),
  ).length;

  const curScore = scoreListing(title, description);
  const optScoreData = scoreListing(optimizedTitle, optimizedDesc);
  const optDescHits = keywordList.filter((k) =>
    optimizedDesc.toLowerCase().includes(k.toLowerCase()),
  ).length;
  const getTitleScore = () => curScore.total;
  const optScore = optScoreData.total;

  const hasInput = title || description || keywords;
  const [copyState, setCopyState] = useState<{
    title: boolean;
    keywords: boolean;
    description: boolean;
  }>({
    title: false,
    keywords: false,
    description: false,
  });

  const handleCopy = (
    type: "title" | "keywords" | "description",
    value: string,
  ) => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopyState((prev) => ({ ...prev, [type]: true }));
      setTimeout(() => {
        setCopyState((prev) => ({ ...prev, [type]: false }));
      }, 1500);
    });
  };

  const optimizedKeywords = useMemo(() => {
    if (keywordList.length === 0) return "";
    const hits = keywordList;
    return hits.join(", ");
  }, [keywords]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-[#f59e0b] mb-2">
          ✨ {t("lo_toolTitle", "Listing Optimizer")}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {t(
            "lo_subtitle",
            "Enter your current listing on the left · optimized version on the right · one-click copy",
          )}
        </p>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 mb-6 items-stretch">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              📝 {t("lo_productTitle", "Product Title")}
            </label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={3}
              placeholder={t(
                "lo_titlePlaceholder",
                "Enter your product title...",
              )}
              className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24] resize-none"
            />
            <div className="flex items-center justify-between mt-2 px-1">
              <span className="text-xs text-gray-600">
                {titleLen} {t("lo_chars", "chars")} / {titleWords}{" "}
                {t("lo_words", "words")}
              </span>
              {titleMatched.length > 0 && (
                <span className="text-xs text-gray-600">
                  {t("lo_hits", "Matched")} {titleMatched.length}/
                  {keywordList.length}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-green-400 flex items-center justify-center">
              <span className="text-xl">→</span>
            </div>
            <span className="text-xs text-[#f59e0b] text-center">
              {t("lo_platformCompliant", "Platform-Compliant")}
            </span>
          </div>

          <div className="bg-amber-100 rounded-xl border border-amber-200 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#f59e0b] bg-amber-100 px-2 py-1 rounded font-medium">
                ✨ {t("lo_optimizedTitle", "Optimized Title")}
              </span>
              {optimizedTitle && (
                <button
                  onClick={() => handleCopy("title", optimizedTitle)}
                  className="text-xs text-[#f59e0b] hover:text-[#1e3a5f] transition flex items-center gap-1"
                >
                  {copyState.title ? (
                    <>✓ {t("lo_copied", "Copied")}</>
                  ) : (
                    <>📋 {t("lo_copy", "Copy")}</>
                  )}
                </button>
              )}
            </div>
            <div className="text-sm text-[#1e3a5f] leading-relaxed min-h-[80px] flex-1 whitespace-pre-wrap">
              {optimizedTitle ? (
                highlightKw(
                  optimizedTitle,
                  keywordList,
                  "bg-amber-100 text-[#1e3a5f] px-0.5 rounded",
                )
              ) : (
                <span className="text-[#f59e0b]/50 italic">
                  {t("lo_titleAutoGen", "Enter title to auto-generate")}
                </span>
              )}
            </div>
            {optimizedTitle && (
              <div className="text-xs text-[#f59e0b] mt-2">
                {optimizedTitle.length} {t("lo_chars", "chars")} ·{" "}
                {t("lo_hits", "Matched")} {optTitleHits}/{keywordList.length}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 mb-6 items-stretch">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              🏷️ {t("lo_keywords", "Keywords")}
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder={t(
                "lo_keywordPlaceholder",
                "Enter keywords separated by commas...",
              )}
              className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24]"
            />
            {keywordList.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {keywordList.map((kw, i) => {
                  const inTitle = title
                    .toLowerCase()
                    .includes(kw.toLowerCase());
                  const inDesc = description
                    .toLowerCase()
                    .includes(kw.toLowerCase());
                  let cls = "bg-[#1e3a5f]/80 text-[#1a2b4e]";
                  if (inTitle && inDesc)
                    cls = "bg-amber-100 text-[#f59e0b] border border-amber-200";
                  else if (inTitle || inDesc)
                    cls =
                      "bg-[#fbbf24]/20 text-[#f59e0b] border border-yellow-500/40";
                  else cls = "bg-red-50 text-red-300 border border-red-500/40";
                  return (
                    <span
                      key={i}
                      className={cls + " px-2 py-0.5 rounded text-xs"}
                    >
                      {kw}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-green-400 flex items-center justify-center">
              <span className="text-xl">→</span>
            </div>
            <span className="text-xs text-[#f59e0b] text-center">
              {t("lo_compliantKeywords", "Compliant")}
            </span>
          </div>

          <div className="bg-amber-100 rounded-xl border border-amber-200 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#f59e0b] bg-amber-100 px-2 py-1 rounded font-medium">
                ✨ {t("lo_optimizedKeywords", "Optimized Keywords")}
              </span>
              {optimizedKeywords && (
                <button
                  onClick={() => handleCopy("keywords", optimizedKeywords)}
                  className="text-xs text-[#f59e0b] hover:text-[#1e3a5f] transition flex items-center gap-1"
                >
                  {copyState.keywords ? (
                    <>✓ {t("lo_copied", "Copied")}</>
                  ) : (
                    <>📋 {t("lo_copy", "Copy")}</>
                  )}
                </button>
              )}
            </div>
            <div className="text-sm text-[#1e3a5f] leading-relaxed min-h-[60px] flex-1 whitespace-pre-wrap">
              {optimizedKeywords ? (
                <span className="text-amber-300">{optimizedKeywords}</span>
              ) : (
                <span className="text-[#f59e0b]/50 italic">
                  {t("lo_keywordsHint", "Enter keywords to view")}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              📋 {t("lo_description", "Product Description")}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              placeholder={t(
                "lo_descPlaceholder",
                "Enter product description...",
              )}
              className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24] resize-none"
            />
            <p className="text-xs text-gray-600 mt-2 text-right">
              {descLen} {t("lo_chars", "chars")}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-green-400 flex items-center justify-center">
              <span className="text-xl">→</span>
            </div>
            <span className="text-xs text-[#f59e0b] text-center">
              {t("lo_structured", "Structured")}
            </span>
          </div>

          <div className="bg-amber-100 rounded-xl border border-amber-200 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#f59e0b] bg-amber-100 px-2 py-1 rounded font-medium">
                ✨ {t("lo_optimizedDesc", "Optimized Description")}
              </span>
              {optimizedDesc && (
                <button
                  onClick={() => handleCopy("description", optimizedDesc)}
                  className="text-xs text-[#f59e0b] hover:text-[#1e3a5f] transition flex items-center gap-1"
                >
                  {copyState.description ? (
                    <>✓ {t("lo_copied", "Copied")}</>
                  ) : (
                    <>📋 {t("lo_copy", "Copy")}</>
                  )}
                </button>
              )}
            </div>
            <div className="text-sm text-[#1e3a5f] leading-relaxed min-h-[100px] flex-1 whitespace-pre-wrap overflow-y-auto max-h-[200px]">
              {optimizedDesc ? (
                highlightKw(
                  optimizedDesc,
                  keywordList,
                  "bg-amber-100 text-[#1e3a5f] px-0.5 rounded",
                )
              ) : (
                <span className="text-[#f59e0b]/50 italic">
                  {t("lo_descAutoGen", "Enter description to auto-generate")}
                </span>
              )}
            </div>
            {optimizedDesc && (
              <div className="text-xs text-[#f59e0b] mt-2">
                {optimizedDesc.length} {t("lo_chars", "chars")} ·{" "}
                {t("lo_hits", "Matched")} {optDescHits}/{keywordList.length}
              </div>
            )}
          </div>
        </div>
      </div>

      {hasInput && (
        <>
          <div className="bg-white rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-semibold text-[#1e3a5f] mb-5">
              📊 {t("lo_analysis", "Optimization Analysis")}
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-5">
              <div className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  {t("lo_titleScore", "Title Score")}
                </p>
                <p className="text-4xl font-bold text-[#f59e0b]">
                  {getTitleScore()}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {t("lo_outOf100", "/ 100")}
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  {t("lo_titleHits", "Title Keyword Matches")}
                </p>
                <p className="text-4xl font-bold text-[#f59e0b]">
                  {titleMatched.length}/{keywordList.length}
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  {t("lo_descHits", "Description Keyword Matches")}
                </p>
                <p className="text-4xl font-bold text-[#f59e0b]">
                  {descMatched.length}/{keywordList.length}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {titleLen < 60 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-[#f59e0b]">
                  ⚠️{" "}
                  {t(
                    "lo_titleTooShort",
                    "Title too short ({titleLen} chars), recommend 60-120 chars",
                  ).replace("{titleLen}", titleLen.toString())}
                </div>
              )}
              {titleLen > 150 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-[#f59e0b]">
                  ⚠️{" "}
                  {t(
                    "lo_titleTooLong",
                    "Title too long ({titleLen} chars), recommend under 120 chars",
                  ).replace("{titleLen}", titleLen.toString())}
                </div>
              )}
              {keywordList.length > 0 && titleMatched.length === 0 && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-sm text-red-300">
                  ❌{" "}
                  {t("lo_titleNoKeywords", "Title contains no core keywords")}
                </div>
              )}
              {missingKw.length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-sm text-orange-600">
                  ⚠️{" "}
                  {t(
                    "lo_missingKeywords",
                    "Still {count} keywords missing",
                  ).replace("{count}", missingKw.length.toString())}
                </div>
              )}
              {/[0-9]/.test(title) && (
                <div className="bg-amber-100 border border-amber-200 rounded-xl p-3 text-sm text-[#f59e0b]">
                  ✅{" "}
                  {t(
                    "lo_hasNumbers",
                    "Title contains numeric info (specs/quantity etc.)",
                  )}
                </div>
              )}
              {titleLen >= 60 && titleLen <= 120 && (
                <div className="bg-amber-100 border border-amber-200 rounded-xl p-3 text-sm text-[#f59e0b]">
                  ✅ {t("lo_goodLength", "Good title length (60-120 chars)")}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 border border-amber-500/20">
            <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2 flex items-center gap-2">
              <span>🚀</span>{" "}
              {t("lo_solutionTitle", "Smart Optimization Solutions")}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {t(
                "lo_solutionSubtitle",
                "Auto-generate optimized titles and descriptions based on your keywords, compare side by side",
              )}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">
                  {t("lo_currentScore", "Current Score")}
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-[#f59e0b]">
                    {getTitleScore()}
                  </span>
                  <span className="text-sm text-gray-600 pb-1">
                    {t("lo_outOf100", "/ 100")}
                  </span>
                </div>
                <div className="h-2 bg-gray-50 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-[#fbbf24] rounded-full transition-all"
                    style={{ width: getTitleScore() + "%" }}
                  />
                </div>
              </div>
              <div className="bg-amber-100 rounded-2xl p-4 border border-amber-200">
                <p className="text-xs text-[#f59e0b] mb-1">
                  ✨ {t("lo_optimizedScore", "Optimized Score")}
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-[#f59e0b]">
                    {optScore}
                  </span>
                  <span className="text-sm text-gray-600 pb-1">
                    {t("lo_outOf100", "/ 100")}
                  </span>
                  {optScore > getTitleScore() && (
                    <span className="text-xs text-[#f59e0b] ml-auto pb-1 font-semibold">
                      ↑ +{optScore - getTitleScore()}
                    </span>
                  )}
                </div>
                <div className="h-2 bg-gray-50 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: optScore + "%" }}
                  />
                </div>
              </div>
            </div>

            {hasInput && (
              <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
                <h4 className="text-sm font-semibold text-[#1e3a5f] mb-3">
                  {t(
                    "lo_breakdown",
                    "Score breakdown - transparent and reproducible",
                  )}
                </h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100 text-xs">
                      <th className="py-1.5">{t("lo_item", "Item")}</th>
                      <th className="py-1.5 w-24">{t("lo_current", "Current")}</th>
                      <th className="py-1.5 w-24">{t("lo_optimized", "Optimized")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {curScore.items.map((it, idx) => (
                      <tr key={it.label} className="border-b border-gray-50">
                        <td className="py-2 text-gray-600">{it.label}</td>
                        <td className="py-2 text-[#1e3a5f] font-medium">
                          {it.got} / {it.max}
                        </td>
                        <td className="py-2">
                          <span
                            className={
                              optScoreData.items[idx].got > it.got
                                ? "text-emerald-600 font-medium"
                                : "text-gray-500"
                            }
                          >
                            {optScoreData.items[idx].got} / {it.max}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mb-6">
              <h4 className="text-base font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2">
                📝 {t("lo_titleCompare", "Title Optimization Comparison")}
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600 bg-[#1e3a5f]/60 px-2 py-1 rounded">
                      {t("lo_currentVersion", "Current Version")}
                    </span>
                    <span className="text-xs text-gray-600">
                      {titleLen}
                      {t("lo_chars", " chars")} · {t("lo_hits", "Matched ")}
                      {titleMatched.length}/{keywordList.length}
                    </span>
                  </div>
                  <div className="text-sm text-[#1e3a5f] leading-relaxed min-h-[60px]">
                    {title ? (
                      highlightKw(title, keywordList)
                    ) : (
                      <span className="text-gray-600 italic">
                        {t("lo_notEntered", "Not entered")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="bg-amber-100 rounded-2xl p-4 border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#f59e0b] bg-amber-100 px-2 py-1 rounded font-medium">
                      ✨ {t("lo_optimized", "Optimized")}
                    </span>
                    <span className="text-xs text-[#f59e0b]">
                      {optimizedTitle.length}
                      {t("lo_chars", " chars")} · {t("lo_hits", "Matched ")}
                      {optTitleHits}/{keywordList.length}
                    </span>
                  </div>
                  <div className="text-sm text-[#1e3a5f] leading-relaxed min-h-[60px]">
                    {optimizedTitle ? (
                      highlightKw(
                        optimizedTitle,
                        keywordList,
                        "bg-amber-100 text-[#1e3a5f] px-0.5 rounded font-semibold",
                      )
                    ) : (
                      <span className="text-[#f59e0b]/50 italic">
                        {t("lo_titleHint", "Enter title to view")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-base font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2">
                📋 {t("lo_descCompare", "Description Optimization Comparison")}
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600 bg-[#1e3a5f]/60 px-2 py-1 rounded">
                      {t("lo_currentVersion", "Current Version")}
                    </span>
                    <span className="text-xs text-gray-600">
                      {descLen}
                      {t("lo_chars", " chars")} · {t("lo_hits", "Matched ")}
                      {descMatched.length}/{keywordList.length}
                    </span>
                  </div>
                  <div className="text-sm text-[#1e3a5f] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap">
                    {description ? (
                      highlightKw(
                        description,
                        keywordList,
                        "bg-[#fbbf24]/30 text-blue-100 px-0.5 rounded font-semibold",
                      )
                    ) : (
                      <span className="text-gray-600 italic">
                        {t("lo_notEntered", "Not entered")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="bg-amber-100 rounded-2xl p-4 border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#f59e0b] bg-amber-100 px-2 py-1 rounded font-medium">
                      ✨ {t("lo_optimized", "Optimized")}
                    </span>
                    <span className="text-xs text-[#f59e0b]">
                      {optimizedDesc.length}
                      {t("lo_chars", " chars")} · {t("lo_hits", "Matched ")}
                      {optDescHits}/{keywordList.length}
                    </span>
                  </div>
                  <div className="text-sm text-[#1e3a5f] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap">
                    {optimizedDesc ? (
                      highlightKw(
                        optimizedDesc,
                        keywordList,
                        "bg-amber-100 text-[#1e3a5f] px-0.5 rounded font-semibold",
                      )
                    ) : (
                      <span className="text-[#f59e0b]/50 italic">
                        {t("lo_descHint", "Enter description to view")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border border-amber-500/20">
              <h4 className="text-base font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2">
                🎯 {t("lo_summary", "Key Optimization Points")}
              </h4>
              <div className="space-y-2 text-sm">
                {optimizedTitle && optimizedTitle.length > titleLen && (
                  <div className="flex items-start gap-2 text-gray-800">
                    <span className="text-[#f59e0b] mt-0.5">✓</span>
                    <span>
                      {t(
                        "lo_summaryExpanded",
                        "Title expanded from {from} to {to} chars, adding long-tail keywords for better search coverage",
                      )
                        .replace("{from}", titleLen.toString())
                        .replace("{to}", optimizedTitle.length.toString())}
                    </span>
                  </div>
                )}
                {optTitleHits > titleMatched.length && (
                  <div className="flex items-start gap-2 text-gray-800">
                    <span className="text-[#f59e0b] mt-0.5">✓</span>
                    <span>
                      {t(
                        "lo_summaryTitleHits",
                        "Title keyword matches improved from {from} to {to}, search weight significantly enhanced",
                      )
                        .replace("{from}", titleMatched.length.toString())
                        .replace("{to}", optTitleHits.toString())}
                    </span>
                  </div>
                )}
                {optDescHits > descMatched.length && (
                  <div className="flex items-start gap-2 text-gray-800">
                    <span className="text-[#f59e0b] mt-0.5">✓</span>
                    <span>
                      {t(
                        "lo_summaryDescHits",
                        "Description keyword matches improved from {from} to {to}, relevance enhanced",
                      )
                        .replace("{from}", descMatched.length.toString())
                        .replace("{to}", optDescHits.toString())}
                    </span>
                  </div>
                )}
                {missingKw.length > 0 && optimizedTitle && (
                  <div className="flex items-start gap-2 text-gray-800">
                    <span className="text-[#f59e0b] mt-0.5">✓</span>
                    <span>
                      {t(
                        "lo_summaryAutoAdded",
                        "Auto-added {count} missing keywords",
                      ).replace("{count}", missingKw.length.toString())}
                    </span>
                  </div>
                )}
                {optimizedDesc && description.length > 0 && (
                  <div className="flex items-start gap-2 text-gray-800">
                    <span className="text-[#f59e0b] mt-0.5">★</span>
                    <span>
                      {t(
                        "lo_summaryStructured",
                        "Structured sections enhance buyer conversion intent",
                      )}
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-2 text-gray-600">
                  <span className="text-[#f59e0b] mt-0.5">!</span>
                  <span>
                    {t(
                      "lo_summaryTip",
                      "Adjust per platform rules - Amazon 150 char limit, Mercado 200 char limit, prioritize core keywords first",
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ============ JSON 格式化工具 ============
function JsonFormatterTool() {
  const { t, language } = useLanguage();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e: any) {
      setError(t("json_formatError", "JSON format error: ") + e.message);
      setOutput("");
    }
  };

  const minify = () => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: any) {
      setError(t("json_formatError", "JSON format error: ") + e.message);
      setOutput("");
    }
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const loadSample = () => {
    setInput(
      '{"name":"Product A","price":29.99,"tags":["hot","new"],"inStock":true,"variants":[{"color":"red","size":"M"},{"color":"blue","size":"L"}]}',
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-8">
        <h2 className="text-2xl font-semibold text-[#f59e0b] mb-6">
          {"{ }"} {t("json_toolTitle", "JSON Formatter")}
        </h2>
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={format}
            className="px-4 py-2 bg-[#fbbf24] text-[#1e3a5f] rounded-xl font-medium hover:bg-amber-30 transition"
          >
            {t("json_format", "Format")}
          </button>
          <button
            onClick={minify}
            className="px-4 py-2 bg-gray-50 text-[#1e3a5f] rounded-xl font-medium hover:bg-white transition border border-[#1e3a5f"
          >
            {t("json_minify", "Minify")}
          </button>
          <button
            onClick={loadSample}
            className="px-4 py-2 bg-gray-50 text-[#1e3a5f] rounded-xl font-medium hover:bg-white transition border border-[#1e3a5f"
          >
            {t("json_sample", "Load Sample")}
          </button>
          <button
            onClick={() => {
              setInput("");
              setOutput("");
              setError("");
            }}
            className="px-4 py-2 bg-gray-50 text-[#1e3a5f] rounded-xl font-medium hover:bg-white transition border border-[#1e3a5f"
          >
            {t("json_clear", "Clear")}
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              {t("json_input", "Input JSON")}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={15}
              placeholder='{"key": "value"}'
              className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24] font-mono text-sm resize-none"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-600">
                {t("json_output", "Output")}
              </label>
              {output && (
                <button
                  onClick={copy}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#1e3a5f] transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" /> {t("json_copied", "Copied")}
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> {t("json_copy", "Copy")}
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 min-h-[300px] overflow-auto">
              {error ? (
                <pre className="text-red-600 text-sm font-mono whitespace-pre-wrap">
                  {error}
                </pre>
              ) : (
                <pre className="text-[#f59e0b] text-sm font-mono whitespace-pre-wrap">
                  {output || (
                    <span className="text-gray-600">
                      {t("json_clickHint", "Click button to view results")}
                    </span>
                  )}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ Base64 编解码 ============
function Base64Tool() {
  const { t, language } = useLanguage();
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [copied, setCopied] = useState(false);

  const encode = () => {
    try {
      setEncoded(btoa(unescape(encodeURIComponent(text))));
    } catch {
      setEncoded(t("b64_encodeFail", "Encode failed"));
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(text.trim())));
      setEncoded(decoded);
    } catch {
      setEncoded(t("b64_decodeFail", "Decode failed: invalid Base64 input"));
    }
  };

  const copy = () => {
    if (!encoded) return;
    navigator.clipboard.writeText(encoded);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-8">
        <h2 className="text-2xl font-semibold text-[#f59e0b] mb-6">
          🔐 {t("b64_toolTitle", "Base64 Encoder/Decoder")}
        </h2>
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={encode}
            className="px-4 py-2 bg-[#fbbf24] text-[#1e3a5f] rounded-xl font-medium hover:bg-amber-30 transition"
          >
            {t("b64_encode", "Encode →")}
          </button>
          <button
            onClick={decode}
            className="px-4 py-2 bg-gray-50 text-[#1e3a5f] rounded-xl font-medium hover:bg-white transition border border-[#1e3a5f"
          >
            {t("b64_decode", "← Decode")}
          </button>
          <button
            onClick={() => {
              setText("");
              setEncoded("");
            }}
            className="px-4 py-2 bg-gray-50 text-[#1e3a5f] rounded-xl font-medium hover:bg-white transition border border-[#1e3a5f"
          >
            {t("b64_clear", "Clear")}
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              {t("b64_input", "Input")}
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              placeholder={t(
                "b64_inputPlaceholder",
                "Enter text to encode, or Base64 string to decode...",
              )}
              className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24] resize-none font-mono text-sm"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-600">
                {t("b64_result", "Result")}
              </label>
              {encoded && (
                <button
                  onClick={copy}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#1e3a5f] transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" /> {t("b64_copied", "Copied")}
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> {t("b64_copy", "Copy")}
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="w-full rounded-xl border border-[#1e3a5f bg-gray-50 px-4 py-3 min-h-[120px]">
              <pre className="text-[#f59e0b] text-sm font-mono whitespace-pre-wrap break-all">
                {encoded || (
                  <span className="text-gray-600">
                    {t("b64_clickHint", "Click button to encode/decode")}
                  </span>
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ URL 编码解码工具 ============
function UrlEncoderTool() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [component, setComponent] = useState<"full" | "comp">("full");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const run = () => {
    try {
      if (mode === "encode") {
        setOutput(
          component === "comp"
            ? encodeURIComponent(input)
            : encodeURI(input),
        );
      } else {
        setOutput(component === "comp"
          ? decodeURIComponent(input)
          : decodeURI(input));
      }
    } catch {
      setOutput(t("ue_invalid", "Invalid input: cannot process"));
    }
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8">
        <h2 className="text-2xl font-semibold text-[#f59e0b] mb-6">
          🔗 {t("ue_toolTitle", "URL Encoder / Decoder")}
        </h2>
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={() => setMode("encode")}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              mode === "encode"
                ? "bg-[#fbbf24] text-[#1e3a5f]"
                : "bg-gray-50 text-[#1e3a5f] border border-gray-200"
            }`}
          >
            {t("ue_encode", "Encode →")}
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              mode === "decode"
                ? "bg-[#fbbf24] text-[#1e3a5f]"
                : "bg-gray-50 text-[#1e3a5f] border border-gray-200"
            }`}
          >
            {t("ue_decode", "← Decode")}
          </button>
          <button
            onClick={() =>
              setComponent(component === "full" ? "comp" : "full")
            }
            className="px-4 py-2 bg-gray-50 text-[#1e3a5f] rounded-xl font-medium border border-gray-200 transition"
          >
            {component === "full"
              ? t("ue_fullUrl", "Full URL mode")
              : t("ue_component", "Component mode")}
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder={t(
            "ue_inputPlaceholder",
            "https://example.com/search?q=手机壳&page=2",
          )}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[#1e3a5f] font-mono text-sm outline-none focus:border-[#fbbf24]"
        />
        <button
          onClick={run}
          className="mt-3 w-full py-3 bg-[#1e3a5f] text-white rounded-xl font-semibold hover:bg-[#16304f] transition"
        >
          {mode === "encode"
            ? t("ue_runEncode", "Encode now")
            : t("ue_runDecode", "Decode now")}
        </button>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {t("ue_output", "Result")}
            </span>
            <button
              onClick={copy}
              className="text-xs flex items-center gap-1 text-[#1e3a5f] hover:text-[#f59e0b]"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied
                ? t("ue_copied", "Copied")
                : t("ue_copy", "Copy")}
            </button>
          </div>
          <pre className="w-full rounded-xl bg-gray-900 text-emerald-300 px-4 py-3 text-sm font-mono whitespace-pre-wrap break-all min-h-[3.5rem]">
            {output || "—"}
          </pre>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          {t(
            "ue_note",
            "Component mode escapes reserved characters (;/?:@=&) - use it for query parameter values. Full URL mode keeps them.",
          )}
        </p>
      </div>
    </div>
  );
}

// ============ 关键词调研工具（确定性引擎，无伪造搜索量） ============
function KeywordResearchTool() {
  const { t } = useLanguage();
  const [seed, setSeed] = useState("");
  const [market, setMarket] = useState<MarketKey>("amazon-us");
  const [rows, setRows] = useState<
    ReturnType<typeof expandKeywords> | null
  >(null);

  const generate = () => {
    const s = seed.trim();
    if (!s) return;
    setRows(expandKeywords(s, market, 60));
  };

  const copyAll = () => {
    if (!rows) return;
    navigator.clipboard.writeText(rows.map((r) => r.keyword).join("\n"));
  };

  const downloadCsv = () => {
    if (!rows) return;
    downloadText(
      `keywords-${market}-${Date.now()}.csv`,
      keywordsToCsv(rows, market),
    );
  };

  const intentLabel = (i: string) =>
    i === "transactional"
      ? t("kr_intentBuy", "Buying intent")
      : i === "commercial"
        ? t("kr_intentCompare", "Comparing intent")
        : t("kr_intentInfo", "Informational intent");

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8">
        <h2 className="text-2xl font-semibold text-[#f59e0b] mb-2">
          🔍 {t("kr_toolTitle", "Keyword Research")}
        </h2>
        <p className="text-xs text-amber-700 bg-amber-50 rounded-xl px-4 py-2.5 mb-6">
          {t(
            "kr_honest",
            "Honest mode: keywords are generated from your seed word using real platform title rules and a transparent scoring formula - no fabricated search volume. Connect your own data source (DataForSEO etc.) in the product analysis tool for real volumes.",
          )}
        </p>
        <div className="grid md:grid-cols-[1fr_220px_auto] gap-3 items-end">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              {t("kr_seed", "Seed keyword")}
            </label>
            <input
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              placeholder={t(
                "kr_seedPlaceholder",
                "e.g. phone case / wireless earbuds",
              )}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              {t("kr_market", "Target market")}
            </label>
            <select
              value={market}
              onChange={(e) => setMarket(e.target.value as MarketKey)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[#1e3a5f] outline-none focus:border-[#fbbf24]"
            >
              {MARKET_RULES.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label} ({m.titleMax})
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={generate}
            className="px-8 py-3 bg-[#1e3a5f] text-white rounded-xl font-semibold hover:bg-[#16304f] transition h-[48px]"
          >
            {t("kr_generate", "Generate")}
          </button>
        </div>
        {rows && (
          <p className="text-xs text-gray-500 mt-3">
            {t("kr_ruleNote", "Rule")}: {getMarketRule(market).note}
          </p>
        )}
      </div>

      {rows && rows.length > 0 && (
        <div className="bg-white rounded-3xl p-8">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-lg font-semibold text-[#1e3a5f]">
              {t("kr_results", "Keywords")} ({rows.length})
            </h3>
            <div className="flex gap-2">
              <button
                onClick={copyAll}
                className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-[#1e3a5f] hover:bg-white"
              >
                {t("kr_copyAll", "Copy all")}
              </button>
              <button
                onClick={downloadCsv}
                className="px-3 py-1.5 text-xs bg-[#fbbf24] rounded-lg text-[#1e3a5f] font-medium hover:bg-amber-300"
              >
                {t("kr_csv", "Export CSV")}
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="py-2 pr-4">{t("kr_thKeyword", "Keyword")}</th>
                  <th className="py-2 pr-4 w-16">{t("kr_thScore", "Score")}</th>
                  <th className="py-2 pr-4 w-20">{t("kr_thChars", "Chars")}</th>
                  <th className="py-2 pr-4 w-28">{t("kr_thIntent", "Intent")}</th>
                  <th className="py-2">{t("kr_thRoom", "Title room")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.keyword}
                    className="border-b border-gray-50 hover:bg-amber-50/40"
                  >
                    <td className="py-2.5 pr-4 text-[#1e3a5f] font-medium">
                      {r.keyword}
                    </td>
                    <td className="py-2.5 pr-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          r.priority >= 70
                            ? "bg-emerald-100 text-emerald-700"
                            : r.priority >= 50
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {r.priority}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-gray-600">{r.chars}</td>
                    <td className="py-2.5 pr-4 text-gray-600 text-xs">
                      {intentLabel(r.intent)}
                    </td>
                    <td className="py-2.5 text-xs">
                      <span
                        className={
                          r.titleRoom < 0 ? "text-red-600" : "text-gray-500"
                        }
                      >
                        {r.titleRoom}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ 根据工具 slug 渲染对应组件 ============
function renderTool(slug: string) {
  switch (slug) {
    case "rate-converter":
      return <RateConverterTool />;
    case "profit-calculator":
      return <ProfitCalculatorTool />;
    case "shipping-calculator":
      return <ShippingCalculatorTool />;
    case "listing-optimizer":
      return <ListingOptimizerTool />;
    case "json-formatter":
      return <JsonFormatterTool />;
    case "base64-converter":
      return <Base64Tool />;
    case "url-encoder":
      return <UrlEncoderTool />;
    case "keyword-research":
      return <KeywordResearchTool />;
    default:
      return null;
  }
}

function ToolPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const slug = params?.slug as string;

  // 选品分析 → 使用专用功能页面而非本页
  if (slug === "product-analysis") {
    if (typeof window !== "undefined") {
      window.location.href = "/tools/product-analysis";
    }
    return (
      <main className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="text-6xl mb-6">🔄</div>
          <h1 className="text-3xl font-bold text-[#1e3a5f] mb-4">
            {t("tool_redirecting", "Redirecting...")}
          </h1>
          <p className="text-gray-600 mb-8">
            {t("tool_redirectingDesc", "Redirecting to product analysis tool")}
          </p>
          <a
            href="/tools/product-analysis"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#fbbf24] text-[#1e3a5f] rounded-xl font-semibold hover:bg-amber-30 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("tool_goDirect", "Go Direct →")}
          </a>
        </div>
      </main>
    );
  }

  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    return (
      <main className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-3xl font-bold text-[#1e3a5f] mb-4">
            {t("tool_notFound", "Tool Not Found")}
          </h1>
          <p className="text-gray-600 mb-8">
            {t("tool_notFoundDesc", "Sorry, this tool cannot be found")}
          </p>
          <a
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#fbbf24] text-[#1e3a5f] rounded-xl font-semibold hover:bg-amber-30 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("tool_backToList", "Back to Tool List")}
          </a>
        </div>
      </main>
    );
  }

  const toolName = toolNameOf(tool.slug, tool.name, language, t);
  const toolCategoryName = catNameOf(tool.category, tool.categoryName, language, t);
  const toolIntro = toolIntroOf(tool.slug, tool.intro, language, t);

  const otherTools = tools.filter((t) => t.slug !== slug).slice(0, 4);

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* 面包屑 */}
        <nav className="text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-[#1e3a5f]">
            {t("tool_home", "Home")}
          </a>
          <span className="mx-2">/</span>
          <a href="/tools" className="hover:text-[#1e3a5f]">
            {t("tool_toolList", "Tools")}
          </a>
          <span className="mx-2">/</span>
          <span className="text-[#1e3a5f]">{toolName}</span>
        </nav>

        <a
          href="/tools"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1e3a5f] transition mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("tool_backToList", "Back to Tool List")}
        </a>

        {/* 分类主视觉横幅 */}
        <section className="relative mb-8 rounded-2xl overflow-hidden h-44 md:h-56 bg-[#0f2038]">
          <img
            src={toolArt(tool.slug, tool.category)}
            alt={toolCategoryName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2038]/90 via-[#0f2038]/55 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-10">
            <span className="text-sky-300 text-sm font-medium tracking-wide uppercase mb-2">
              {toolCategoryName}
            </span>
            <span className="text-white text-2xl md:text-3xl font-bold">{toolName}</span>
          </div>
        </section>

        {/* 标题区 */}
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{tool.icon}</span>
            <div>
              <h1 className="text-4xl font-bold text-[#1e3a5f]">{toolName}</h1>
              <p className="text-gray-600 text-sm mt-1">{toolCategoryName}</p>
            </div>
          </div>
          <p className="text-[#1a2b4e] max-w-3xl leading-relaxed">
            {toolIntro}
          </p>
        </section>

        {/* 工具主体 */}
        {renderTool(slug)}

        {/* 相关工具推荐 */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-[#1e3a5f] mb-4">
            🔧 {t("tool_moreTools", "More Tools")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherTools.map((ot) => (
              <a
                key={ot.slug}
                href={`/tool/${ot.slug}`}
                className="bg-white rounded-2xl p-5 hover:bg-[#fbbf24]/20 transition border border-gray-200"
              >
                <span className="text-2xl mb-2 block">{ot.icon}</span>
                <h3 className="text-[#1e3a5f] font-medium">
                  {toolNameOf(ot.slug, ot.name, language, t)}
                </h3>
                <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                  {toolIntroOf(ot.slug, ot.intro, language, t)}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* 社区入口 */}
        <section className="mt-12">
          <a
            href="/community"
            className="block bg-gradient-to-r from-amber-100 to-orange-100 to-yellow-400/10 rounded-3xl p-8 border border-blue-600/30 hover:border-amber-200 transition"
          >
            <div className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 text-[#f59e0b] flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-[#1e3a5f] mb-2">
                  {t(
                    "tool_communityTitle",
                    "Having Issues? Join Our Community",
                  )}
                </h2>
                <p className="text-gray-600">
                  {t(
                    "tool_communityDesc",
                    "Join the cross-border e-commerce seller community, share operational experience, and find best practices",
                  )}
                </p>
              </div>
            </div>
          </a>
        </section>
      </div>
    </main>
  );
}

export default ToolPage;
