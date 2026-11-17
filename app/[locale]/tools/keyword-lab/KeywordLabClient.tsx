"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  TrendingUp,
  FileText,
  DollarSign,
  Plug,
  Download,
  Save,
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "../../../i18n";
import {
  MARKET_RULES,
  MarketKey,
  expandKeywords,
  analyzeTitles,
  calcOpportunity,
  getMarketRule,
  keywordsToCsv,
  downloadText,
  KeywordRow,
  OpportunityInput,
} from "../../../../lib/keyword-engine";
import { addHistory, addSaved, getSession } from "../../../../lib/user-store";

type Tab = "matrix" | "titles" | "opportunity" | "source";

const INTENT_LABEL: Record<string, { zh: string; en: string; cls: string }> = {
  transactional: { zh: "交易意图", en: "Transactional", cls: "bg-emerald-100 text-emerald-700" },
  commercial: { zh: "商业调研", en: "Commercial", cls: "bg-sky-100 text-sky-700" },
  informational: { zh: "信息查询", en: "Informational", cls: "bg-slate-100 text-slate-600" },
};

const COPY = {
  zh: {
    title: "关键词实验室",
    sub: "基于平台标题规则与真实输入数据做确定性分析：不编造搜索量，不伪造竞争度。接上你自己的数据源即可获得真实搜索量。",
    tabMatrix: "关键词矩阵",
    tabTitles: "竞品标题诊断",
    tabOpp: "市场机会测算",
    tabSource: "数据源接入",
    seed: "核心关键词（英文/当地语言）",
    market: "目标平台",
    gen: "生成关键词矩阵",
    results: "关键词",
    csv: "导出 CSV",
    save: "保存到我的中心",
    saved: "已保存",
    pasteTitles: "粘贴竞品标题（每行一条，建议 10-20 条）",
    myTitle: "你现在的标题（可选，用于找差距词）",
    diag: "开始诊断",
    freq: "高频词 Top",
    coverage: "核心词覆盖",
    gaps: "你漏掉的机会词",
    suggest: "建议标题",
    oppHint: "填真实数字，模型即时算出净利与机会分",
    monthlySearch: "月搜索量",
    ctr: "点击率 %",
    conv: "转化率 %",
    price: "售价",
    cost: "采购成本/件",
    fulfill: "履约成本/件",
    commission: "平台佣金 %",
    cpc: "CPC 广告单价",
    reviews: "竞品评论中位数",
    competitors: "竞品数量",
    profit: "预估净利",
    margin: "净利率",
    score: "机会分",
    srcHint: "工具本身不内置任何付费数据源。填入你自己的 API 凭据后，由服务端代调官方接口获取真实数据（凭据只存本机浏览器，不经过我们服务器留存）。",
    provider: "数据源",
    key: "API 凭据",
    probe: "测试并拉取真实数据",
    probeOk: "已获取真实数据",
    probeFail: "拉取失败",
    noKey: "未配置数据源时，关键词矩阵与标题诊断依然可用——它们只依赖平台规则和你输入的真实文本。",
    loginTip: "登录后使用记录会保存到「我的中心」，可跨工具汇总与导出。",
  },
  en: {
    title: "Keyword Lab",
    sub: "Deterministic analysis built on platform title rules and your own real inputs. We never fabricate search volume. Plug in your own data source to get real volumes.",
    tabMatrix: "Keyword matrix",
    tabTitles: "Title audit",
    tabOpp: "Opportunity model",
    tabSource: "Data source",
    seed: "Seed keyword",
    market: "Marketplace",
    gen: "Build keyword matrix",
    results: "Keywords",
    csv: "Export CSV",
    save: "Save to my account",
    saved: "Saved",
    pasteTitles: "Paste competitor titles (one per line, 10-20 recommended)",
    myTitle: "Your current title (optional)",
    diag: "Run audit",
    freq: "Top terms",
    coverage: "Seed coverage",
    gaps: "Missing opportunity terms",
    suggest: "Suggested title",
    oppHint: "Enter real numbers — profit and opportunity score compute instantly",
    monthlySearch: "Monthly searches",
    ctr: "CTR %",
    conv: "Conversion %",
    price: "Price",
    cost: "Unit cost",
    fulfill: "Fulfillment / unit",
    commission: "Commission %",
    cpc: "CPC",
    reviews: "Median reviews",
    competitors: "Competitors",
    profit: "Est. net profit",
    margin: "Margin",
    score: "Opportunity score",
    srcHint: "No paid data source is bundled. Add your own API credentials and our server proxies the official API. Credentials stay in your browser and are never stored server-side.",
    provider: "Provider",
    key: "API credential",
    probe: "Test & fetch real data",
    probeOk: "Real data received",
    probeFail: "Request failed",
    noKey: "Without a data source the keyword matrix and title audit still work — they only rely on platform rules and the text you paste.",
    loginTip: "Sign in to keep your usage history in My Account, aggregated across tools and exportable.",
  },
};

const PROVIDERS = [
  { id: "dataforseo", label: "DataForSEO (Google Ads 搜索量)", hint: "登录名:密码" },
  { id: "serpapi", label: "SerpApi (Google Trends 热度)", hint: "API Key" },
  { id: "rainforest", label: "Rainforest API (Amazon 搜索结果)", hint: "API Key" },
  { id: "keepa", label: "Keepa (Amazon 商品数据)", hint: "API Key" },
];

export default function KeywordLabPage() {
  const { language } = useLanguage();
  const c = language === "zh-CN" ? COPY.zh : COPY.en;

  const [tab, setTab] = useState<Tab>("matrix");
  const [seed, setSeed] = useState("phone case");
  const [market, setMarket] = useState<MarketKey>("amazon-us");
  const [rows, setRows] = useState<KeywordRow[]>([]);

  const [titlesRaw, setTitlesRaw] = useState("");
  const [myTitle, setMyTitle] = useState("");
  const [report, setReport] = useState<ReturnType<typeof analyzeTitles> | null>(null);

  const [opp, setOpp] = useState<OpportunityInput>({
    monthlySearch: 40000,
    ctrPct: 8,
    conversionPct: 10,
    price: 19.99,
    productCost: 3.2,
    fulfillmentCost: 2.8,
    commissionPct: 15,
    cpc: 0.75,
    avgReviews: 850,
    competitors: 3000,
  });
  const oppResult = useMemo(() => calcOpportunity(opp), [opp]);

  const rule = getMarketRule(market);

  const [provider, setProvider] = useState("dataforseo");
  const [apiKey, setApiKey] = useState("");
  const [probing, setProbing] = useState(false);
  const [probeMsg, setProbeMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const [savedFlag, setSavedFlag] = useState(false);

  useEffect(() => {
    try {
      const cfg = localStorage.getItem("gth_market_src");
      if (cfg) {
        const p = JSON.parse(cfg);
        setProvider(p.provider ?? "dataforseo");
        setApiKey(p.key ?? "");
      }
    } catch {}
  }, []);

  const buildMatrix = () => {
    const result = expandKeywords(seed, market, 150);
    setRows(result);
    setSavedFlag(false);
    addHistory({
      tool: "keyword-lab",
      toolPath: "/tools/keyword-lab",
      title: `${c.tabMatrix}: ${seed}`,
      summary: `${getMarketRule(market).label} · ${result.length} 个长尾词 · 最高优先级 ${result[0]?.priority ?? 0}`,
    });
  };

  const runAudit = () => {
    const titles = titlesRaw.split("\n").map((t) => t.trim()).filter(Boolean);
    if (!titles.length) return;
    const r = analyzeTitles(titles, seed, myTitle, rule);
    setReport(r);
    setSavedFlag(false);
    addHistory({
      tool: "keyword-lab",
      toolPath: "/tools/keyword-lab",
      title: `${c.tabTitles}: ${titles.length} 条标题`,
      summary: `平均 ${r.avgChars} 字符 · 超限 ${r.overLimit} 条 · 机会词 ${r.gaps.length} 个`,
    });
  };

  const saveResult = () => {
    const payload =
      tab === "matrix" && rows.length
        ? { type: "keyword-matrix", seed, market, rows }
        : tab === "titles" && report
          ? { type: "title-audit", seed, market, report }
          : tab === "opportunity"
            ? { type: "opportunity", input: opp, result: oppResult }
            : null;
    if (!payload) return;
    addSaved({
      tool: "keyword-lab",
      title: `${c.title} · ${seed} · ${rule.label}`,
      payload: JSON.stringify(payload),
    });
    setSavedFlag(true);
  };

  const probe = async () => {
    if (!apiKey.trim()) {
      setProbeMsg({ ok: false, text: c.noKey });
      return;
    }
    setProbing(true);
    setProbeMsg(null);
    try {
      localStorage.setItem("gth_market_src", JSON.stringify({ provider, key: apiKey }));
      const res = await fetch("/api/market/keyword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, key: apiKey, keyword: seed, market }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setProbeMsg({ ok: false, text: data.message || c.probeFail });
      } else {
        const rec = data.data?.[0] ?? {};
        const parts = [`${c.probeOk}: ${rec.keyword ?? seed}`];
        if (rec.volume !== undefined) parts.push(`volume=${rec.volume}`);
        if (rec.cpc !== undefined) parts.push(`cpc=${rec.cpc}`);
        if (data.market?.avgPrice) parts.push(`avgPrice=${data.market.avgPrice}`);
        if (data.market?.medianReviews !== undefined) parts.push(`medianReviews=${data.market.medianReviews}`);
        setProbeMsg({ ok: true, text: parts.join(" · ") });
        // 真实搜索量直接回填机会测算
        if (typeof rec.volume === "number" && provider === "dataforseo") {
          setOpp((prev) => ({ ...prev, monthlySearch: rec.volume }));
        }
        if (data.market?.medianReviews) {
          setOpp((prev) => ({ ...prev, avgReviews: data.market.medianReviews }));
        }
        addHistory({
          tool: "keyword-lab",
          toolPath: "/tools/keyword-lab",
          title: `真实数据源: ${provider} · ${seed}`,
          summary: parts.join(" · "),
        });
      }
    } catch {
      setProbeMsg({ ok: false, text: c.probeFail });
    } finally {
      setProbing(false);
    }
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "matrix", label: c.tabMatrix, icon: <Search className="w-4 h-4" /> },
    { key: "titles", label: c.tabTitles, icon: <FileText className="w-4 h-4" /> },
    { key: "opportunity", label: c.tabOpp, icon: <TrendingUp className="w-4 h-4" /> },
    { key: "source", label: c.tabSource, icon: <Plug className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0f2038] text-white">
        <img
          src="/tools-art/keyword-lab.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2038]/95 via-[#1a2b4e]/80 to-[#2a4a7a]/50" />
        <div className="relative max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-medium border border-sky-400/30">
              REAL DATA · NO FAKE NUMBERS
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{c.title}</h1>
          <p className="text-white/70 max-w-3xl text-sm leading-relaxed">{c.sub}</p>
          {!getSession() && (
            <p className="mt-3 text-xs text-sky-300/90 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" /> {c.loginTip}
            </p>
          )}
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-4 -mt-6 pb-16">
        {/* TABS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 flex flex-wrap gap-1.5 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setSavedFlag(false); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                tab === t.key ? "bg-[#1a3a5c] text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* 共用输入区 */}
        {tab !== "opportunity" && tab !== "source" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-5">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1.5">{c.seed}</label>
                <input
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm"
                  placeholder="phone case / funda para teléfono / чехол"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">{c.market}</label>
                <select
                  value={market}
                  onChange={(e) => setMarket(e.target.value as MarketKey)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-sky-500 outline-none text-sm bg-white"
                >
                  {MARKET_RULES.map((m) => (
                    <option key={m.key} value={m.key}>{m.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-sky-500" />
              {rule.label}：标题上限 <b className="mx-0.5">{rule.titleMax}</b> 字符 — {rule.note}
            </p>
          </div>
        )}

        {/* 关键词矩阵 */}
        {tab === "matrix" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100">
              <div>
                <h2 className="font-semibold text-[#1a3a5c]">{c.results}</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {rows.length ? `${rows.length} 条 · 按可解释优先级排序` : "点击右侧按钮生成"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={buildMatrix}
                  className="px-4 py-2 rounded-xl bg-[#1a3a5c] text-white text-sm font-medium hover:bg-[#14304d] transition"
                >
                  {c.gen}
                </button>
                <button
                  onClick={() => rows.length && downloadText(`keywords-${market}-${seed.replace(/\s+/g, "-")}.csv`, keywordsToCsv(rows, market))}
                  disabled={!rows.length}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> {c.csv}
                </button>
                <button
                  onClick={saveResult}
                  disabled={!rows.length}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition flex items-center gap-1.5"
                >
                  {savedFlag ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Save className="w-4 h-4" />}
                  {savedFlag ? c.saved : c.save}
                </button>
              </div>
            </div>

            {rows.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm">
                输入核心词后生成矩阵。所有词由真实词表组合而成，优先级分公式公开可复算。
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                    <tr>
                      <th className="text-left px-4 py-2.5 font-medium">{c.results}</th>
                      <th className="text-right px-3 py-2.5 font-medium">Chars</th>
                      <th className="text-right px-3 py-2.5 font-medium">Words</th>
                      <th className="text-left px-3 py-2.5 font-medium">Intent</th>
                      <th className="text-right px-3 py-2.5 font-medium">Title room</th>
                      <th className="text-right px-4 py-2.5 font-medium">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => {
                      const intent = INTENT_LABEL[r.intent];
                      return (
                        <tr key={r.keyword} className="border-t border-gray-100 hover:bg-sky-50/40">
                          <td className="px-4 py-2.5 text-slate-800 font-medium">{r.keyword}</td>
                          <td className="px-3 py-2.5 text-right text-slate-600">{r.chars}</td>
                          <td className="px-3 py-2.5 text-right text-slate-600">{r.words}</td>
                          <td className="px-3 py-2.5">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${intent.cls}`}>
                              {language === "zh-CN" ? intent.zh : intent.en}
                            </span>
                          </td>
                          <td className={`px-3 py-2.5 text-right ${r.titleRoom < 0 ? "text-red-600 font-medium" : "text-slate-600"}`}>
                            {r.titleRoom}
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            <span className={`inline-flex items-center gap-1 font-semibold ${
                              r.priority >= 70 ? "text-emerald-600" : r.priority >= 55 ? "text-sky-600" : "text-slate-500"
                            }`}>
                              {r.priority}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 标题诊断 */}
        {tab === "titles" && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">{c.pasteTitles}</label>
                  <textarea
                    value={titlesRaw}
                    onChange={(e) => setTitlesRaw(e.target.value)}
                    rows={8}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-sky-500 outline-none text-sm font-mono"
                    placeholder={"Wireless Earbuds Bluetooth 5.3 with Charging Case\nBluetooth Headphones Waterproof Sport Earphones\n..."}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">{c.myTitle}</label>
                  <textarea
                    value={myTitle}
                    onChange={(e) => setMyTitle(e.target.value)}
                    rows={8}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-sky-500 outline-none text-sm"
                    placeholder="Wireless Earbuds, Bluetooth 5.3 Headphones"
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={runAudit} className="px-4 py-2 rounded-xl bg-[#1a3a5c] text-white text-sm font-medium hover:bg-[#14304d] transition">
                  {c.diag}
                </button>
                <button
                  onClick={saveResult}
                  disabled={!report}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition flex items-center gap-1.5"
                >
                  {savedFlag ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Save className="w-4 h-4" />}
                  {savedFlag ? c.saved : c.save}
                </button>
              </div>
            </div>

            {report && (
              <>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { label: "样本标题", value: report.totalTitles },
                    { label: "平均字符", value: report.avgChars },
                    { label: `超限 (>${rule.titleMax})`, value: report.overLimit, warn: report.overLimit > 0 },
                    { label: "最长标题", value: report.maxChars },
                  ].map((k) => (
                    <div key={k.label} className="bg-white rounded-2xl border border-gray-200 p-4">
                      <p className="text-xs text-slate-500">{k.label}</p>
                      <p className={`text-2xl font-bold mt-1 ${k.warn ? "text-red-600" : "text-[#1a3a5c]"}`}>{k.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-white rounded-2xl border border-gray-200 p-5">
                    <h3 className="font-semibold text-[#1a3a5c] mb-3 text-sm">{c.freq}（{report.totalTitles} 条中出现次数）</h3>
                    <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                      {report.wordFreq.map((w) => (
                        <div key={w.word} className="flex items-center gap-2 text-sm">
                          <span className="w-32 truncate text-slate-700">{w.word}</span>
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-400" style={{ width: `${Math.min(100, w.share)}%` }} />
                          </div>
                          <span className="w-10 text-right text-xs text-slate-500">{w.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="bg-white rounded-2xl border border-gray-200 p-5">
                      <h3 className="font-semibold text-[#1a3a5c] mb-3 text-sm">{c.coverage}</h3>
                      <div className="space-y-2">
                        {report.seedCoverage.map((s) => (
                          <div key={s.word} className="flex items-center gap-2 text-sm">
                            <span className="w-24 truncate text-slate-700">{s.word}</span>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${s.share >= 50 ? "bg-emerald-400" : "bg-amber-400"}`} style={{ width: `${Math.min(100, s.share)}%` }} />
                            </div>
                            <span className="w-12 text-right text-xs text-slate-500">{s.share}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-5">
                      <h3 className="font-semibold text-[#1a3a5c] mb-3 text-sm flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-500" /> {c.gaps}
                      </h3>
                      {report.gaps.length ? (
                        <div className="flex flex-wrap gap-1.5">
                          {report.gaps.map((g) => (
                            <span key={g.word} className="px-2 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs border border-amber-200">
                              {g.word} <span className="opacity-60">×{g.count}</span>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400">没有发现高频缺口词</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1a3a5c] to-[#2a4a7a] rounded-2xl p-5 text-white">
                  <p className="text-xs text-sky-200 mb-2">{c.suggest}（{report.suggestedTitle.length}/{rule.titleMax} 字符）</p>
                  <p className="font-medium leading-relaxed">{report.suggestedTitle || "—"}</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* 机会测算 */}
        {tab === "opportunity" && (
          <div className="grid lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 p-5">
              <p className="text-xs text-slate-500 mb-4">{c.oppHint}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {([
                  ["monthlySearch", c.monthlySearch],
                  ["ctrPct", c.ctr],
                  ["conversionPct", c.conv],
                  ["price", c.price],
                  ["productCost", c.cost],
                  ["fulfillmentCost", c.fulfill],
                  ["commissionPct", c.commission],
                  ["cpc", c.cpc],
                  ["avgReviews", c.reviews],
                  ["competitors", c.competitors],
                ] as [keyof OpportunityInput, string][]).map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-xs text-slate-500 mb-1">{label}</label>
                    <input
                      type="number"
                      value={opp[key]}
                      onChange={(e) => setOpp({ ...opp, [key]: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-sky-500 outline-none text-sm"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={saveResult}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
                >
                  {savedFlag ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Save className="w-4 h-4" />}
                  {savedFlag ? c.saved : c.save}
                </button>
                <button
                  onClick={() => downloadText(`opportunity-${seed.replace(/\s+/g, "-")}.json`, JSON.stringify({ input: opp, result: oppResult }, null, 2), "application/json")}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> JSON
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-xs text-slate-500">{c.profit}</p>
                    <p className={`text-3xl font-bold ${oppResult.profit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {oppResult.profit.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">{c.margin}</p>
                    <p className="text-2xl font-bold text-[#1a3a5c]">{oppResult.marginPct}%</p>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5">
                  {oppResult.lines.map((l) => (
                    <div key={l.label} className="flex justify-between text-xs">
                      <span className="text-slate-500">{l.label}</span>
                      <span className="text-slate-800 font-medium">{l.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <p className="text-xs text-slate-500 mb-2">{c.score}</p>
                <div className="flex items-end gap-3">
                  <p className="text-4xl font-bold text-[#1a3a5c]">{oppResult.score}</p>
                  <span className={`mb-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                    oppResult.verdict === "excellent" ? "bg-emerald-100 text-emerald-700"
                      : oppResult.verdict === "good" ? "bg-sky-100 text-sky-700"
                      : oppResult.verdict === "risky" ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {oppResult.verdict}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  利润 50% + 竞争 30%（竞品数与评论门槛的对数）+ 需求 20%（搜索量对数）。公式固定，可自行复算。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 数据源接入 */}
        {tab === "source" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-slate-600 leading-relaxed mb-5">{c.srcHint}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">{c.provider}</label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-sky-500"
                >
                  {PROVIDERS.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  {c.key}（{PROVIDERS.find((p) => p.id === provider)?.hint}）
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-sky-500"
                  placeholder="••••••••"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={probe}
                disabled={probing}
                className="px-4 py-2 rounded-xl bg-[#1a3a5c] text-white text-sm font-medium hover:bg-[#14304d] disabled:opacity-60 transition flex items-center gap-2"
              >
                {probing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plug className="w-4 h-4" />}
                {c.probe}
              </button>
              <span className="text-xs text-slate-400">测试关键词：{seed}</span>
            </div>
            {probeMsg && (
              <div className={`mt-4 rounded-xl p-3 text-sm flex items-start gap-2 ${
                probeMsg.ok ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-amber-50 text-amber-800 border border-amber-200"
              }`}>
                {probeMsg.ok ? <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                <span>{probeMsg.text}</span>
              </div>
            )}
            <div className="mt-6 pt-5 border-t border-gray-100 text-xs text-slate-500 space-y-1.5">
              <p className="flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> 凭据只写入本机 localStorage，服务端不落库、不写日志、不回显。</p>
              <a href="/affiliate" className="inline-flex items-center gap-1 text-sky-600 hover:underline">
                还没有数据源账号？看联盟与数据源清单 <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
