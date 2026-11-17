"use client";

// 选品决策计算器（诚实版）
// 设计原则：不展示任何伪造的市场数据。所有结果均来自用户输入 +
// 公开的平台规则与可复算公式。真实搜索量/销量请通过自带 Key 的数据源获取。

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Calculator,
  Users,
  Search,
  Download,
  Plus,
  Trash2,
  Info,
  Check,
  Copy,
} from "lucide-react";
import { useLanguage } from "../../../i18n";
import {
  expandKeywords,
  keywordsToCsv,
  downloadText,
  getMarketRule,
  MARKET_RULES,
  type MarketKey,
} from "../../../../lib/keyword-engine";

type TabKey = "economics" | "competitors" | "keywords";

const TABS: { key: TabKey; icon: typeof Calculator; label: string }[] = [
  { key: "economics", icon: Calculator, label: "Unit Economics" },
  { key: "competitors", icon: Users, label: "Competitor Bench" },
  { key: "keywords", icon: Search, label: "Keyword Opportunities" },
];

const NUM = "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-[#1e3a5f] outline-none focus:border-[#fbbf24] transition";

function NumField({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="number"
          step="any"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={NUM}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex justify-between py-2.5 border-b border-gray-50 ${
        strong ? "font-semibold text-[#1e3a5f]" : "text-gray-600"
      }`}
    >
      <span className="text-sm">{label}</span>
      <span className={strong ? "text-lg text-[#f59e0b]" : "text-[#1e3a5f]"}>
        {value}
      </span>
    </div>
  );
}

// ============ Tab 1：单位经济模型 ============
interface EconInput {
  sellPrice: string;
  purchaseCost: string;
  firstLeg: string;
  commissionPct: string;
  fulfillmentFee: string;
  adCost: string;
  returnPct: string;
  monthlyTargetProfit: string;
}

const DEFAULT_ECON: EconInput = {
  sellPrice: "29.99",
  purchaseCost: "6.5",
  firstLeg: "2.2",
  commissionPct: "15",
  fulfillmentFee: "4.5",
  adCost: "3",
  returnPct: "3",
  monthlyTargetProfit: "10000",
};

function EconomicsTab() {
  const { t } = useLanguage();
  const [v, setV] = useState<EconInput>(DEFAULT_ECON);
  const set = (k: keyof EconInput) => (val: string) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const n = (s: string) => parseFloat(s) || 0;
  const r = useMemo(() => {
    const price = n(v.sellPrice);
    const comm = n(v.commissionPct) / 100;
    const ret = n(v.returnPct) / 100;
    // 净收入 = 售价扣除佣金与退货损耗
    const netRevenue = price * (1 - comm - ret);
    const totalCost =
      n(v.purchaseCost) + n(v.firstLeg) + n(v.fulfillmentFee) + n(v.adCost);
    const profitPerUnit = netRevenue - totalCost;
    const margin = price > 0 ? (profitPerUnit / price) * 100 : 0;
    const breakevenPrice =
      1 - comm - ret > 0 ? totalCost / (1 - comm - ret) : 0;
    const monthlyTarget = n(v.monthlyTargetProfit);
    const unitsNeeded =
      profitPerUnit > 0 && monthlyTarget > 0
        ? Math.ceil(monthlyTarget / profitPerUnit)
        : null;
    return {
      netRevenue,
      totalCost,
      profitPerUnit,
      margin,
      breakevenPrice,
      unitsNeeded,
    };
  }, [v]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-3xl p-6 md:p-8">
        <h3 className="text-lg font-semibold text-[#1e3a5f] mb-5">
          {t("pac_econInput", "Your Numbers (all inputs, no fake data)")}
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <NumField label={t("pac_price", "Selling price")} value={v.sellPrice} onChange={set("sellPrice")} suffix="$" />
          <NumField label={t("pac_purchase", "Purchase cost / unit")} value={v.purchaseCost} onChange={set("purchaseCost")} suffix="$" />
          <NumField label={t("pac_firstLeg", "Freight cost / unit")} value={v.firstLeg} onChange={set("firstLeg")} suffix="$" />
          <NumField label={t("pac_fulfill", "Fulfillment fee / unit")} value={v.fulfillmentFee} onChange={set("fulfillmentFee")} suffix="$" />
          <NumField label={t("pac_commission", "Platform commission")} value={v.commissionPct} onChange={set("commissionPct")} suffix="%" />
          <NumField label={t("pac_return", "Return / loss rate")} value={v.returnPct} onChange={set("returnPct")} suffix="%" />
          <NumField label={t("pac_ad", "Ad cost / unit sold")} value={v.adCost} onChange={set("adCost")} suffix="$" />
          <NumField label={t("pac_target", "Monthly profit target")} value={v.monthlyTargetProfit} onChange={set("monthlyTargetProfit")} suffix="$" />
        </div>
        <p className="text-xs text-gray-500 mt-5 leading-relaxed">
          {t(
            "pac_econFormula",
            "Formulas: net revenue = price × (1 − commission% − return%) · profit/unit = net revenue − (purchase + freight + fulfillment + ads) · breakeven price = total cost ÷ (1 − commission% − return%)",
          )}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8">
        <h3 className="text-lg font-semibold text-[#1e3a5f] mb-4">
          {t("pac_econResult", "Result")}
        </h3>
        <ResultRow label={t("pac_netRevenue", "Net revenue / unit")} value={`$${r.netRevenue.toFixed(2)}`} />
        <ResultRow label={t("pac_totalCost", "Total cost / unit")} value={`$${r.totalCost.toFixed(2)}`} />
        <ResultRow label={t("pac_profitUnit", "Profit / unit")} value={`$${r.profitPerUnit.toFixed(2)}`} strong />
        <ResultRow label={t("pac_margin", "Net margin")} value={`${r.margin.toFixed(1)}%`} />
        <ResultRow label={t("pac_breakeven", "Breakeven selling price")} value={`$${r.breakevenPrice.toFixed(2)}`} />
        <ResultRow
          label={t("pac_unitsNeeded", "Units needed for monthly target")}
          value={
            r.unitsNeeded
              ? `${r.unitsNeeded.toLocaleString()} ${t("pac_units", "pcs")}`
              : "—"
          }
        />
        <div
          className={`mt-4 rounded-xl px-4 py-3 text-sm ${
            r.profitPerUnit > 0
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {r.profitPerUnit > 0
            ? t(
                "pac_okVerdict",
                "This product is profitable with your cost structure. Margin below 15% leaves little room for ads or price wars - consider raising price or cutting cost.",
              )
            : t(
                "pac_badVerdict",
                "This product loses money at the current price and cost. Either raise price above the breakeven point or renegotiate cost/freight.",
              )}
        </div>
      </div>
    </div>
  );
}

// ============ Tab 2：竞品对比（手动录入，本地存储） ============
interface CompRow {
  id: string;
  name: string;
  price: string;
  rating: string;
  reviews: string;
}

const COMP_KEY = "pa_competitor_bench_v2";

function CompetitorsTab() {
  const { t } = useLanguage();
  const [rows, setRows] = useState<CompRow[]>([]);
  const [myPrice, setMyPrice] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(COMP_KEY);
      if (raw) setRows(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = useCallback((next: CompRow[]) => {
    setRows(next);
    try {
      localStorage.setItem(COMP_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const addRow = () =>
    persist([
      ...rows,
      { id: `c-${Date.now()}`, name: "", price: "", rating: "", reviews: "" },
    ]);

  const update = (id: string, k: keyof CompRow, val: string) =>
    persist(rows.map((r) => (r.id === id ? { ...r, [k]: val } : r)));

  const remove = (id: string) => persist(rows.filter((r) => r.id !== id));

  const stats = useMemo(() => {
    const prices = rows
      .map((r) => parseFloat(r.price))
      .filter((p) => p > 0)
      .sort((a, b) => a - b);
    if (prices.length === 0) return null;
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    const median =
      prices.length % 2
        ? prices[(prices.length - 1) / 2]
        : (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2;
    const rated = rows.filter((r) => parseFloat(r.rating) > 0);
    const avgRating =
      rated.length > 0
        ? rated.reduce((a, b) => a + parseFloat(b.rating), 0) / rated.length
        : 0;
    const reviewed = rows.filter((r) => parseFloat(r.reviews) > 0);
    const avgReviews =
      reviewed.length > 0
        ? reviewed.reduce((a, b) => a + parseFloat(b.reviews), 0) /
          reviewed.length
        : 0;
    return {
      count: prices.length,
      avg,
      median,
      min: prices[0],
      max: prices[prices.length - 1],
      avgRating,
      avgReviews,
    };
  }, [rows]);

  const myP = parseFloat(myPrice) || 0;
  const position =
    stats && myP > 0 ? ((myP - stats.median) / stats.median) * 100 : null;

  const exportCsv = () => {
    const head = "name,price,rating,reviews\n";
    const body = rows
      .map((r) => [r.name, r.price, r.rating, r.reviews].join(","))
      .join("\n");
    downloadText("competitor-bench.csv", head + body);
  };

  const inp = "w-full bg-transparent outline-none text-sm text-[#1e3a5f] min-w-[70px]";

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-lg font-semibold text-[#1e3a5f]">
            {t("pac_compTitle", "Competitor Bench (you enter the data)")}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={addRow}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#fbbf24] rounded-lg text-[#1e3a5f] font-medium hover:bg-amber-300"
            >
              <Plus className="w-3.5 h-3.5" />
              {t("pac_addComp", "Add competitor")}
            </button>
            {rows.length > 0 && (
              <button
                onClick={exportCsv}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-[#1e3a5f] hover:bg-white"
              >
                <Download className="w-3.5 h-3.5" />
                CSV
              </button>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          {t(
            "pac_compNote",
            "Data stays in your browser only (localStorage). Enter what you see on the platform product page - the tool only computes averages and positioning, it never invents competitors.",
          )}
        </p>

        {rows.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-2xl py-10 text-center text-sm text-gray-500">
            {t("pac_compEmpty", "No competitors yet - add the ones you found on the platform")}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100 text-xs">
                  <th className="px-3 py-2 pr-4">{t("pac_cName", "Name / link")}</th>
                  <th className="px-3 py-2 pr-3">{t("pac_cPrice", "Price $")}</th>
                  <th className="px-3 py-2 pr-3">{t("pac_cRating", "Rating")}</th>
                  <th className="px-3 py-2 pr-3">{t("pac_cReviews", "Reviews")}</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50">
                    <td className="py-2 pr-4">
                      <input
                        value={r.name}
                        onChange={(e) => update(r.id, "name", e.target.value)}
                        placeholder="Anker soundcore..."
                        className={inp}
                      />
                    </td>
                    <td className="py-2 pr-3">
                      <input
                        type="number"
                        value={r.price}
                        onChange={(e) => update(r.id, "price", e.target.value)}
                        className={inp}
                      />
                    </td>
                    <td className="py-2 pr-3">
                      <input
                        type="number"
                        step="0.1"
                        value={r.rating}
                        onChange={(e) => update(r.id, "rating", e.target.value)}
                        className={inp}
                      />
                    </td>
                    <td className="py-2 pr-3">
                      <input
                        type="number"
                        value={r.reviews}
                        onChange={(e) => update(r.id, "reviews", e.target.value)}
                        className={inp}
                      />
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => remove(r.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500"
                        aria-label="remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {stats && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 md:p-8">
            <h3 className="text-lg font-semibold text-[#1e3a5f] mb-4">
              {t("pac_compStats", "Bench Statistics")}
            </h3>
            <ResultRow label={t("pac_cCount", "Competitors")} value={String(stats.count)} strong />
            <ResultRow label={t("pac_cAvg", "Average price")} value={`$${stats.avg.toFixed(2)}`} />
            <ResultRow label={t("pac_cMedian", "Median price")} value={`$${stats.median.toFixed(2)}`} />
            <ResultRow label={t("pac_cRange", "Price range")} value={`$${stats.min.toFixed(2)} – $${stats.max.toFixed(2)}`} />
            <ResultRow
              label={t("pac_cRating2", "Average rating")}
              value={stats.avgRating ? stats.avgRating.toFixed(2) : "—"}
            />
            <ResultRow
              label={t("pac_cReviews2", "Average reviews")}
              value={stats.avgReviews ? Math.round(stats.avgReviews).toLocaleString() : "—"}
            />
          </div>
          <div className="bg-white rounded-3xl p-6 md:p-8">
            <h3 className="text-lg font-semibold text-[#1e3a5f] mb-4">
              {t("pac_positioning", "Your Positioning")}
            </h3>
            <NumField
              label={t("pac_myPrice", "Your planned price")}
              value={myPrice}
              onChange={setMyPrice}
              suffix="$"
            />
            {position !== null && (
              <div
                className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                  Math.abs(position) <= 20
                    ? "bg-emerald-50 text-emerald-700"
                    : position > 20
                      ? "bg-amber-50 text-amber-700"
                      : "bg-sky-50 text-sky-700"
                }`}
              >
                {position >= 0
                  ? t(
                      "pac_posAbove",
                      "Your price is above the median. Higher price needs a visible differentiator (bundle, brand, warranty).",
                    )
                  : t(
                      "pac_posBelow",
                      "Your price is below the median. Check unit economics first - low price with high cost bleeds cash.",
                    )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ Tab 3：关键词机会（确定性引擎，无伪造搜索量） ============
function KeywordsTab() {
  const { t } = useLanguage();
  const [seed, setSeed] = useState("");
  const [market, setMarket] = useState<MarketKey>("amazon-us");
  const [rows, setRows] = useState<ReturnType<typeof expandKeywords> | null>(
    null,
  );
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const s = seed.trim();
    if (!s) return;
    setRows(expandKeywords(s, market, 40));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 md:p-8">
        <p className="text-xs text-amber-700 bg-amber-50 rounded-xl px-4 py-2.5 mb-5 flex gap-2">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {t(
            "pac_kwHonest",
            "Honest mode: keywords are generated from your seed using real platform title rules and a transparent scoring formula. No fabricated search volume - connect DataForSEO etc. with your own key for real volumes.",
          )}
        </p>
        <div className="grid md:grid-cols-[1fr_220px_auto] gap-3 items-end">
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">
              {t("pac_kwSeed", "Seed keyword")}
            </label>
            <input
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              placeholder={t("pac_kwPlaceholder", "e.g. wireless earbuds")}
              className={NUM}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">
              {t("pac_kwMarket", "Target market")}
            </label>
            <select
              value={market}
              onChange={(e) => setMarket(e.target.value as MarketKey)}
              className={NUM}
            >
              {MARKET_RULES.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={generate}
            className="px-8 py-2.5 bg-[#1e3a5f] text-white rounded-xl font-semibold hover:bg-[#16304f] transition"
          >
            {t("pac_kwGenerate", "Generate")}
          </button>
        </div>
        {rows && (
          <p className="text-xs text-gray-500 mt-3">
            {t("pac_kwRule", "Platform rule")}: {getMarketRule(market).note}
          </p>
        )}
      </div>

      {rows && rows.length > 0 && (
        <div className="bg-white rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-lg font-semibold text-[#1e3a5f]">
              {t("pac_kwResults", "Keywords")} ({rows.length})
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    rows.map((r) => r.keyword).join("\n"),
                  );
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-[#1e3a5f] hover:bg-white"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {t("pac_kwCopyAll", "Copy all")}
              </button>
              <button
                onClick={() =>
                  downloadText(
                    `keywords-${market}-${Date.now()}.csv`,
                    keywordsToCsv(rows, market),
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#fbbf24] rounded-lg text-[#1e3a5f] font-medium hover:bg-amber-300"
              >
                <Download className="w-3.5 h-3.5" />
                CSV
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100 text-xs">
                  <th className="py-2 pr-4">{t("pac_kwThKw", "Keyword")}</th>
                  <th className="py-2 pr-4 w-16">{t("pac_kwThScore", "Score")}</th>
                  <th className="py-2 pr-4 w-20">{t("pac_kwThChars", "Chars")}</th>
                  <th className="py-2">{t("pac_kwThRoom", "Title room")}</th>
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
                    <td
                      className={`py-2.5 text-xs ${
                        r.titleRoom < 0 ? "text-red-600" : "text-gray-500"
                      }`}
                    >
                      {r.titleRoom}
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

// ============ 主页面 ============
export default function ProductAnalysisPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<TabKey>("economics");

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* 面包屑 */}
        <nav className="text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-[#1e3a5f]">
            {t("pac_home", "Home")}
          </a>
          <span className="mx-2">/</span>
          <a href="/tools" className="hover:text-[#1e3a5f]">
            {t("pac_tools", "Tools")}
          </a>
          <span className="mx-2">/</span>
          <span className="text-[#1e3a5f]">
            {t("pac_title", "Product Decision Calculator")}
          </span>
        </nav>

        {/* 标题 + 诚实声明 */}
        <div className="bg-gradient-to-r from-[#0f2038] to-[#1e3a5f] rounded-3xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">
            {t("pac_title", "Product Decision Calculator")}
          </h1>
          <p className="text-sky-100 text-sm leading-relaxed max-w-3xl">
            {t(
              "pac_intro",
              "This tool never shows invented market data. Everything you see is computed from YOUR inputs with public, reproducible formulas: unit economics, competitor positioning and keyword generation. Bring real market data with your own API key whenever you need volumes and sales estimates.",
            )}
          </p>
        </div>

        {/* 标签 */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {TABS.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                tab === key
                  ? "bg-[#fbbf24] text-[#1e3a5f]"
                  : "bg-gray-50 text-[#1e3a5f] border border-gray-200 hover:bg-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t(
                key === "economics"
                  ? "pac_tabEcon"
                  : key === "competitors"
                    ? "pac_tabComp"
                    : "pac_tabKw",
                label,
              )}
            </button>
          ))}
        </div>

        {tab === "economics" && <EconomicsTab />}
        {tab === "competitors" && <CompetitorsTab />}
        {tab === "keywords" && <KeywordsTab />}
      </div>
    </main>
  );
}
