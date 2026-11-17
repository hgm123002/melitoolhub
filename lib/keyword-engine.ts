// lib/keyword-engine.ts
// 真实关键词 / 标题 / 机会测算引擎
// 设计原则：所有输出都来自输入数据的确定性计算或公开平台规则，不含任何随机伪造数据。
// 任何"估算"都在 UI 上标注公式与假设，用户可自行复算。

export type MarketKey =
  | 'amazon-us'
  | 'amazon-eu'
  | 'shopee'
  | 'mercadolibre'
  | 'ozon'
  | 'tiktok'
  | 'temu';

export interface MarketRule {
  key: MarketKey;
  label: string;
  lang: string;
  titleMax: number;
  bulletMax?: number;
  note: string;
}

/** 各平台公开的标题长度规则（字符数），用于真实合规校验 */
export const MARKET_RULES: MarketRule[] = [
  { key: 'amazon-us', label: 'Amazon 美国站', lang: 'en', titleMax: 200, bulletMax: 500, note: '多数类目建议 ≤200 字符，部分类目限 80；单条 Bullet ≤500' },
  { key: 'amazon-eu', label: 'Amazon 欧洲站', lang: 'en', titleMax: 200, bulletMax: 500, note: '英/德/法/西站共用 200 字符上限，德文长词更易超限' },
  { key: 'shopee', label: 'Shopee 东南亚', lang: 'en', titleMax: 255, bulletMax: 1000, note: '标题上限 255 字符，描述上限 3000' },
  { key: 'mercadolibre', label: 'Mercado Libre 拉美', lang: 'es', titleMax: 60, bulletMax: 0, note: '标题硬上限 60 字符，超出直接无法提交' },
  { key: 'ozon', label: 'Ozon 俄罗斯', lang: 'ru', titleMax: 200, bulletMax: 6000, note: '标题建议 200 字符内，描述限 6000' },
  { key: 'tiktok', label: 'TikTok Shop', lang: 'en', titleMax: 255, bulletMax: 0, note: '标题上限 255 字符，短标题更利于推荐' },
  { key: 'temu', label: 'Temu', lang: 'en', titleMax: 250, bulletMax: 0, note: '标题上限 250 字符，重规格词' },
];

export const getMarketRule = (key: MarketKey): MarketRule =>
  MARKET_RULES.find((m) => m.key === key) ?? MARKET_RULES[0];

/** 多语言修饰词库：真实用于拼接长尾词，不是"数据"，是生成器的词表 */
const MODIFIERS: Record<string, { prefix: string[]; suffix: string[] }> = {
  en: {
    prefix: ['best', 'cheap', 'buy', 'wholesale', 'mini', 'portable', 'wireless', 'waterproof', 'rechargeable', 'heavy duty'],
    suffix: ['for home', 'for travel', 'for kids', 'with case', 'with stand', 'bulk', '2026', 'review', 'near me', 'for sale'],
  },
  es: {
    prefix: ['mejor', 'barato', 'comprar', 'inalámbrico', 'portátil', 'impermeable', 'recargable', 'profesional'],
    suffix: ['para casa', 'para viaje', 'para niños', 'con estuche', 'al por mayor', '2026', 'opiniones', 'oferta'],
  },
  pt: {
    prefix: ['melhor', 'barato', 'comprar', 'sem fio', 'portátil', 'à prova d’água', 'recarregável', 'profissional'],
    suffix: ['para casa', 'para viagem', 'para crianças', 'com case', 'atacado', '2026', 'avaliações', 'promoção'],
  },
  ru: {
    prefix: ['лучший', 'дешевый', 'купить', 'беспроводной', 'портативный', 'водонепроницаемый', 'аккумуляторный'],
    suffix: ['для дома', 'для путешествий', 'для детей', 'с чехлом', 'оптом', '2026', 'отзывы', 'недорого'],
  },
  th: { prefix: ['ดีที่สุด', 'ราคาถูก', 'ซื้อ', 'ไร้สาย', 'พกพา'], suffix: ['สำหรับบ้าน', 'สำหรับเดินทาง', 'พร้อมกล่อง', 'ขายส่ง'] },
  vi: { prefix: ['tốt nhất', 'giá rẻ', 'mua', 'không dây', 'di động'], suffix: ['cho gia đình', 'cho du lịch', 'có hộp', 'bán buôn'] },
  id: { prefix: ['terbaik', 'murah', 'beli', 'nirkabel', 'portabel'], suffix: ['untuk rumah', 'untuk traveling', 'dengan kotak', 'grosir'] },
};

export type Intent = 'transactional' | 'commercial' | 'informational';

const INTENT_WORDS: Record<Intent, string[]> = {
  transactional: [
    'buy', 'cheap', 'price', 'wholesale', 'supplier', 'for sale', 'near me', 'bulk', 'deal', 'discount',
    'comprar', 'barato', 'precio', 'mayorista', 'comprar', 'promoção', 'atacado', 'preço',
    'купить', 'дешево', 'оптом', 'цена', 'ซื้อ', 'ราคาถูก', 'mua', 'giá rẻ', 'beli', 'murah',
  ],
  commercial: [
    'best', 'top', 'review', 'reviews', 'vs', 'alternative', 'comparison', 'opiniones', 'avaliações',
    'meilleur', 'test', 'отзывы', 'лучший', 'terbaik', 'tốt nhất',
  ],
  informational: [
    'how', 'what', 'why', 'guide', 'tutorial', 'meaning', 'difference', 'diy', 'repair', 'como', 'que es',
    'как', 'что', 'วิธี', 'cách', 'cara',
  ],
};

const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'for', 'with', 'of', 'to', 'in', 'on', 'by', 'from', 'at', 'as', 'is', 'are',
  'de', 'para', 'con', 'el', 'la', 'los', 'las', 'y', 'o', 'en', 'por',
  'para', 'com', 'sem', 'do', 'da', 'dos', 'das', 'e', 'ou', 'em',
  'для', 'с', 'и', 'или', 'в', 'на', 'по',
]);

export function classifyIntent(keyword: string): Intent {
  const k = keyword.toLowerCase();
  const hits = (list: string[]) => list.some((w) => k.includes(w));
  if (hits(INTENT_WORDS.transactional)) return 'transactional';
  if (hits(INTENT_WORDS.commercial)) return 'commercial';
  if (hits(INTENT_WORDS.informational)) return 'informational';
  return 'commercial';
}

export interface KeywordRow {
  keyword: string;
  chars: number;
  words: number;
  intent: Intent;
  /** 放进标题后剩余可用字符（若为负表示单独就超限） */
  titleRoom: number;
  /** 0-100 的可解释优先级分 */
  priority: number;
  reasons: string[];
}

/**
 * 关键词优先级分（公开公式，可复算）
 * 基础 45 分
 *  + 意图权重：交易 18 / 商业 12 / 信息 6
 *  + 词数结构：4-6 词 +14（长尾且不过长）；3 词 +9；7-8 词 +5；≥9 词 -4
 *  + 规格词（数字/尺寸/材质/颜色）+7
 *  + 含平台核心词（同 seed）+5
 *  - 标题超限：每超 10 字符 -6
 */
export function scoreKeyword(keyword: string, seed: string, rule: MarketRule): KeywordRow {
  const k = keyword.trim();
  const words = k.split(/\s+/).filter(Boolean);
  const chars = k.length;
  const intent = classifyIntent(k);
  const reasons: string[] = [];
  let score = 45;

  const intentW = intent === 'transactional' ? 18 : intent === 'commercial' ? 12 : 6;
  score += intentW;
  reasons.push(`意图 ${intent} +${intentW}`);

  const n = words.length;
  if (n >= 4 && n <= 6) { score += 14; reasons.push('长尾结构(4-6词) +14'); }
  else if (n === 3) { score += 9; reasons.push('3词 +9'); }
  else if (n >= 7 && n <= 8) { score += 5; reasons.push('过长(7-8词) +5'); }
  else if (n >= 9) { score -= 4; reasons.push('过长(≥9词) -4'); }

  if (/\d/.test(k) || /\b(cm|mm|inch|ml|oz|kg|g|pcs|pack|led|usb|type-c|4k|hd)\b/i.test(k)) {
    score += 7;
    reasons.push('含规格词 +7');
  }

  const seedWords = seed.toLowerCase().split(/\s+/).filter((w) => w && !STOPWORDS.has(w));
  if (seedWords.length && seedWords.every((w) => k.toLowerCase().includes(w))) {
    score += 5;
    reasons.push('含核心词 +5');
  }

  const over = chars - rule.titleMax;
  if (over > 0) {
    const pen = Math.ceil(over / 10) * 6;
    score -= pen;
    reasons.push(`超标题上限 ${over} 字符 -${pen}`);
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  return { keyword: k, chars, words: n, intent, titleRoom: rule.titleMax - chars, priority: score, reasons };
}

/** 真实字符串组合：seed × 修饰词，去重后按优先级排序 */
export function expandKeywords(seed: string, market: MarketKey, limit = 120): KeywordRow[] {
  const rule = getMarketRule(market);
  const lang = MODIFIERS[rule.lang] ? rule.lang : 'en';
  const { prefix, suffix } = MODIFIERS[lang];
  const base = seed.trim().toLowerCase();
  const seen = new Set<string>();
  const out: KeywordRow[] = [];

  const push = (kw: string) => {
    const normalized = kw.replace(/\s+/g, ' ').trim();
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    out.push(scoreKeyword(normalized, base, rule));
  };

  push(base);
  prefix.forEach((p) => push(`${p} ${base}`));
  suffix.forEach((s) => push(`${base} ${s}`));
  prefix.forEach((p) => suffix.slice(0, 5).forEach((s) => push(`${p} ${base} ${s}`)));

  return out.sort((a, b) => b.priority - a.priority || a.chars - b.chars).slice(0, limit);
}

/* ==========================================================================
   竞品标题诊断：输入真实竞品标题，输出真实词频 / 覆盖率 / 合规结论
   ========================================================================== */

export interface TitleReport {
  totalTitles: number;
  avgChars: number;
  overLimit: number;
  maxChars: number;
  /** 真实词频（已去停用词），按出现次数降序 */
  wordFreq: { word: string; count: number; share: number }[];
  /** seed 中各词被覆盖的标题比例 */
  seedCoverage: { word: string; covered: number; share: number }[];
  /** 高频但未出现在我自己标题里的词（机会词） */
  gaps: { word: string; count: number }[];
  suggestedTitle: string;
}

export function analyzeTitles(titles: string[], seed: string, myTitle: string, rule: MarketRule): TitleReport {
  const clean = titles.map((t) => t.trim()).filter(Boolean);
  const tokenize = (t: string) =>
    t.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, ' ').split(/\s+/).filter((w) => w.length > 1 && !STOPWORDS.has(w));

  const freq = new Map<string, number>();
  clean.forEach((t) => {
    new Set(tokenize(t)).forEach((w) => freq.set(w, (freq.get(w) ?? 0) + 1));
  });

  const wordFreq = [...freq.entries()]
    .map(([word, count]) => ({ word, count, share: clean.length ? Math.round((count / clean.length) * 1000) / 10 : 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 30);

  const seedWords = tokenize(seed);
  const seedCoverage = seedWords.map((word) => {
    const covered = clean.filter((t) => tokenize(t).includes(word)).length;
    return { word, covered, share: clean.length ? Math.round((covered / clean.length) * 1000) / 10 : 0 };
  });

  const mine = new Set(tokenize(myTitle));
  const gaps = wordFreq
    .filter((w) => w.count >= Math.max(2, Math.ceil(clean.length * 0.25)) && !mine.has(w.word))
    .slice(0, 12)
    .map((w) => ({ word: w.word, count: w.count }));

  const lengths = clean.map((t) => t.length);

  // 建议标题：seed + 覆盖率最高的机会词，严格控制在平台上限内
  const parts: string[] = [];
  let acc = seed.trim();
  if (acc) parts.push(acc);
  for (const g of gaps) {
    const candidate = `${parts.join(' ')} ${g.word}`;
    if (candidate.length <= rule.titleMax) parts.push(g.word);
  }
  const suggestedTitle = parts.join(' ').slice(0, rule.titleMax);

  return {
    totalTitles: clean.length,
    avgChars: lengths.length ? Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length) : 0,
    overLimit: lengths.filter((l) => l > rule.titleMax).length,
    maxChars: lengths.length ? Math.max(...lengths) : 0,
    wordFreq,
    seedCoverage,
    gaps,
    suggestedTitle,
  };
}

/* ==========================================================================
   市场机会测算：纯财务模型，输入全部由用户提供真实数字
   ========================================================================== */

export interface OpportunityInput {
  monthlySearch: number;
  ctrPct: number;        // 点击率 %
  conversionPct: number; // 转化率 %
  price: number;         // 售价（币种由用户选择）
  productCost: number;
  fulfillmentCost: number;
  commissionPct: number;
  cpc: number;           // 广告单次点击成本
  avgReviews: number;
  competitors: number;
}

export interface OpportunityResult {
  clicks: number;
  orders: number;
  revenue: number;
  platformFees: number;
  goodsCost: number;
  adCost: number;
  profit: number;
  marginPct: number;
  /** 达到竞品评论中位数所需的评论量（差距） */
  reviewGap: number;
  score: number;
  verdict: 'excellent' | 'good' | 'risky' | 'poor';
  lines: { label: string; value: string }[];
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function calcOpportunity(i: OpportunityInput): OpportunityResult {
  const clicks = i.monthlySearch * (i.ctrPct / 100);
  const orders = clicks * (i.conversionPct / 100);
  const revenue = orders * i.price;
  const platformFees = revenue * (i.commissionPct / 100);
  const goodsCost = orders * (i.productCost + i.fulfillmentCost);
  const adCost = clicks * i.cpc;
  const profit = revenue - platformFees - goodsCost - adCost;
  const marginPct = revenue > 0 ? (profit / revenue) * 100 : 0;
  const reviewGap = Math.max(0, Math.round(i.avgReviews));

  // 机会分（0-100）：利润 50% + 竞争 30% + 需求 20%
  const profitScore = Math.max(0, Math.min(50, (marginPct / 40) * 50));
  const compScore = Math.max(0, Math.min(30, 30 - Math.log10(Math.max(1, i.competitors)) * 6 - Math.log10(Math.max(1, reviewGap)) * 3));
  const demandScore = Math.max(0, Math.min(20, (Math.log10(Math.max(1, i.monthlySearch)) / 5) * 20));
  const score = Math.round(profitScore + compScore + demandScore);

  const verdict: OpportunityResult['verdict'] =
    score >= 70 ? 'excellent' : score >= 50 ? 'good' : score >= 30 ? 'risky' : 'poor';

  return {
    clicks: Math.round(clicks),
    orders: Math.round(orders * 10) / 10,
    revenue: round2(revenue),
    platformFees: round2(platformFees),
    goodsCost: round2(goodsCost),
    adCost: round2(adCost),
    profit: round2(profit),
    marginPct: Math.round(marginPct * 10) / 10,
    reviewGap,
    score,
    verdict,
    lines: [
      { label: '预估点击', value: `${Math.round(clicks)}` },
      { label: '预估订单', value: `${Math.round(orders * 10) / 10}` },
      { label: '预估销售额', value: `${round2(revenue)}` },
      { label: '平台佣金', value: `-${round2(platformFees)}` },
      { label: '货值+履约', value: `-${round2(goodsCost)}` },
      { label: '广告花费', value: `-${round2(adCost)}` },
      { label: '预估净利', value: `${round2(profit)}` },
      { label: '净利率', value: `${Math.round(marginPct * 10) / 10}%` },
    ],
  };
}

/** 导出关键词表为 CSV（真实导出，不依赖后端） */
export function keywordsToCsv(rows: KeywordRow[], market: string): string {
  const header = ['keyword', 'chars', 'words', 'intent', 'title_room', 'priority', 'market'];
  const body = rows.map((r) => [r.keyword, r.chars, r.words, r.intent, r.titleRoom, r.priority, market]
    .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','));
  return [header.join(','), ...body].join('\n');
}

export function downloadText(filename: string, text: string, mime = 'text/csv;charset=utf-8') {
  const blob = new Blob(['\uFEFF' + text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
