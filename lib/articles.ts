// lib/articles.ts
// ============================================================================
// 文章模块 (Articles)
// ============================================================================
import { seoArticles } from './articles-seo';
import { zhArticlesA } from './articles-zh-a';
import { zhArticlesB } from './articles-zh-b';

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  category: ArticleCategory;
  status: 'published' | 'draft';
  views: number;
  createdAt: string;
  updatedAt: string;
  publishAt?: string;
}

export const ARTICLE_CATEGORIES = [
  '选品技巧',
  '运营策略',
  '物流指南',
  '政策解读',
  '工具教程',
] as const;

export type ArticleCategory = typeof ARTICLE_CATEGORIES[number];

const ARTICLES_KEY = 'gth_articles';

// ===== Articles CRUD =====
// 中文长文（1–10）+ 英文 SEO 长文（11–20）合并为完整种子数据
const SEED_ALL: Article[] = [...zhArticlesA, ...zhArticlesB, ...seoArticles];

const saveArticles = (articles: Article[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
};

export const getArticles = (): Article[] => {
  if (typeof window === 'undefined') return SEED_ALL;
  const raw = localStorage.getItem(ARTICLES_KEY);
  if (!raw) return [...SEED_ALL];
  try {
    const articles: Article[] = JSON.parse(raw);
    let changed = false;
    const now = new Date();
    articles.forEach((a) => {
      if (a.status === 'draft' && a.publishAt && new Date(a.publishAt) <= now) {
        a.status = 'published';
        a.updatedAt = now.toISOString().split('T')[0];
        a.publishAt = undefined;
        changed = true;
      }
    });
    // 清理旧版本可能存在的 "2024年" 字样
    articles.forEach((a) => {
      if (a.title.includes('2024年') || a.summary.includes('2024年')) {
        a.title = a.title.replace(/2024年/g, '');
        a.summary = a.summary.replace(/2024年/g, '');
        a.updatedAt = new Date().toISOString().split('T')[0];
        changed = true;
      }
    });
    // 增量补齐种子文章（老访客 localStorage 里只有旧 10 篇，新长文需自动并入）
    const existingIds = new Set(articles.map((a) => a.id));
    const missing = SEED_ALL.filter((a) => !existingIds.has(a.id));
    if (missing.length) {
      articles.push(...missing);
      changed = true;
    }
    if (changed) saveArticles(articles);
    return articles;
  } catch {
    return SEED_ALL;
  }
};

export const getArticleById = (id: string): Article | null => {
  const articles = getArticles();
  return articles.find((a) => a.id === id) || null;
};

export const createArticle = (data: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Article => {
  const articles = getArticles();
  const today = new Date().toISOString().split('T')[0];
  const newArticle: Article = {
    ...data,
    id: `article-${Date.now()}`,
    views: 0,
    createdAt: today,
    updatedAt: today,
  };
  articles.unshift(newArticle);
  saveArticles(articles);
  return newArticle;
};

export const updateArticle = (id: string, data: Partial<Omit<Article, 'id' | 'createdAt'>>): Article | null => {
  const articles = getArticles();
  const idx = articles.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  articles[idx] = { ...articles[idx], ...data, updatedAt: new Date().toISOString().split('T')[0] };
  saveArticles(articles);
  return articles[idx];
};

export const deleteArticle = (id: string): boolean => {
  const articles = getArticles();
  const filtered = articles.filter((a) => a.id !== id);
  if (filtered.length === articles.length) return false;
  saveArticles(filtered);
  return true;
};

export const toggleArticleStatus = (id: string): void => {
  const articles = getArticles();
  const article = articles.find((a) => a.id === id);
  if (article) {
    article.status = article.status === 'published' ? 'draft' : 'published';
    article.updatedAt = new Date().toISOString().split('T')[0];
    saveArticles(articles);
  }
};

export const incrementArticleViews = (id: string): void => {
  const articles = getArticles();
  const article = articles.find((a) => a.id === id);
  if (article) {
    article.views += 1;
    saveArticles(articles);
  }
};

// ============================================================================
// 政策合规模块 (Policies)
// ============================================================================

export interface Policy {
  id: string;
  title: string;
  summary: string;
  content: string;
  icon: string;
  category: PolicyCategory;
  status: 'published' | 'draft';
  views: number;
  createdAt: string;
  updatedAt: string;
  publishAt?: string;
}

export const POLICY_CATEGORIES = [
  '拉美平台政策',
  '俄罗斯 & 东欧平台政策',
  '东南亚平台政策',
  '欧美平台政策',
  '内容 & 全托管平台政策',
  'B2B平台政策',
  '税务合规',
  '知识产权',
] as const;

export type PolicyCategory = typeof POLICY_CATEGORIES[number];

const POLICIES_KEY = 'gth_policies';

const seedPolicies: Policy[] = [
  {
    id: 'policy-mercado-001',
    title: '美客多（Mercado Libre）卖家入驻规则',
    summary: '美客多作为拉美最大电商平台，入驻门槛、合规要求、禁售品类全面解析。',
    content: '<h2>一、入驻资质要求</h2><p>企业营业执照、法人身份证件、跨境收款账户。部分国家（如巴西）需本地税号。</p><h2>二、禁售品类</h2><ul><li>武器、仿真武器及配件</li><li>药品、医疗器械、保健品</li><li>侵权品牌商品</li><li>烟草、酒精类</li></ul><h2>三、账户合规要点</h2><p>保持客服响应率 ≥ 90%，订单发货时效 ≤ 3 天，投诉率 ≤ 1%。</p>',
    icon: '🇦🇷',
    category: '拉美平台政策',
    status: 'published',
    views: 1280,
    createdAt: '2026-06-01',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-mercado-002',
    title: '美客多产品上架与图片规范要求',
    summary: '主图、附图、标题字符数、属性填写规范全面解析。',
    content: '<h2>一、主图要求</h2><p>纯白背景、无边框、产品占比 85% 以上，分辨率建议 1500×1500 像素。</p><h2>二、标题规范</h2><p>建议结构：品牌 + 核心产品词 + 核心特性 + 型号。</p>',
    icon: '📋',
    category: '拉美平台政策',
    status: 'published',
    views: 960,
    createdAt: '2026-06-05',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-ozon-001',
    title: 'Ozon 平台合规指南：本地仓/海外仓/直发三种模式对比',
    summary: '对比 Ozon 三种物流模式的合规要求、税务处理和操作流程。',
    content: '<h2>一、三种物流模式</h2><p>Ozon 提供 FBO（Ozon 本地仓储配送）、FBS（卖家自发货到 Ozon 仓库）、Real FBS（直接发货给买家）三种模式。</p><h2>二、税务合规</h2><p>俄罗斯境内销售需注册 VAT 并定期申报，中国直发按个人行邮清关。</p>',
    icon: '❄️',
    category: '俄罗斯 & 东欧平台政策',
    status: 'published',
    views: 1520,
    createdAt: '2026-05-28',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-ozon-002',
    title: 'Wildberries 产品认证与 EAC 标识合规',
    summary: '哪些产品需要 EAC 认证？EAC 标识怎么贴？一文讲清。',
    content: '<h2>一、需要 EAC 认证的品类</h2><ul><li>儿童用品（玩具、童装）</li><li>家用电器</li><li>个人防护设备</li><li>食品接触类产品</li></ul><h2>二、EAC 标识规范</h2><p>标识不小于 5mm，需清晰可见地贴在产品或最小销售单位上。</p>',
    icon: '🛡️',
    category: '俄罗斯 & 东欧平台政策',
    status: 'published',
    views: 1100,
    createdAt: '2026-05-30',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-shopee-001',
    title: 'Shopee 平台刷单与虚假评价违规处理',
    summary: 'Shopee 严厉打击虚假交易行为，卖家应注意哪些红线避免被扣分关店。',
    content: '<h2>一、定义与识别</h2><p>使用同一 IP/设备多次下单、发送空包裹、异常低价引流等行为均视为违规。</p><h2>二、惩罚机制</h2><p>扣分（15/30 分系统）→ 商品下架 → 店铺冻结 → 永久封禁。</p>',
    icon: '⚠️',
    category: '东南亚平台政策',
    status: 'published',
    views: 1650,
    createdAt: '2026-05-25',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-lazada-001',
    title: 'Lazada 跨境卖家资质与类目准入要求',
    summary: 'Lazada 跨境卖家需具备哪些资质？哪些类目需要额外审核？',
    content: '<h2>一、卖家资质</h2><p>企业营业执照、跨境收款账户、商标或品牌授权。部分国家需本地公司。</p><h2>二、类目准入</h2><ul><li>美妆需提供产品安全认证</li><li>食品需提供食品经营资质</li><li>电子产品需提供 CE/FCC 认证</li></ul>',
    icon: '🌴',
    category: '东南亚平台政策',
    status: 'published',
    views: 880,
    createdAt: '2026-05-20',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-amazon-001',
    title: '亚马逊 VAT 申报与 IOSS 一站式解决方案',
    summary: '针对欧盟 VAT 合规要求，解析注册、申报、代扣、发票流程。',
    content: '<h2>一、VAT 注册门槛</h2><p>德国超过 €100,000 销售额强制 VAT；英国 £85,000；法国 €35,000。</p><h2>二、IOSS 与 OSS</h2><p>IOSS：进口低价值货物（≤ €150）一站式 VAT 代扣代缴。OSS：欧盟内部 B2C 远程销售。</p>',
    icon: '🇪🇺',
    category: '欧美平台政策',
    status: 'published',
    views: 2180,
    createdAt: '2026-05-18',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-amazon-002',
    title: '亚马逊品牌备案与品牌保护（Brand Registry）',
    summary: '为什么要做品牌备案？有哪些好处？怎么做？',
    content: '<h2>一、品牌备案好处</h2><ul><li>A+ 页面、品牌故事、品牌旗舰店</li><li>高级品牌分析数据</li><li>品牌保护工具</li><li>维权投诉更高效</li></ul><h2>二、备案条件</h2><p>有效注册商标（R 标）、官方网站、能提供产品实拍图。</p>',
    icon: '®️',
    category: '欧美平台政策',
    status: 'published',
    views: 1740,
    createdAt: '2026-05-22',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-tiktok-001',
    title: 'TikTok Shop 直播间合规红线：禁用词汇与违规案例',
    summary: '直播中哪些词不能说？哪些行为直接封店？结合最新案例分析。',
    content: '<h2>一、禁用词汇</h2><p>「最」「第一」「永久」等绝对化用语；涉及医疗、减肥功效；虚假宣传。</p><h2>二、行为红线</h2><p>引导站外交易、辱骂观众、虚假库存、虚假承诺发货时效。</p>',
    icon: '🎬',
    category: '内容 & 全托管平台政策',
    status: 'published',
    views: 1920,
    createdAt: '2026-06-08',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-temu-001',
    title: 'Temu 全托管卖家运营合规：价格、产品与知识产权',
    summary: 'Temu 全托管模式下，卖家如何合规运营？避免罚款与清退。',
    content: '<h2>一、价格合规</h2><p>Temu 要求全网最低价，禁止价格歧视与临时涨价。</p><h2>二、产品合规</h2><p>禁止销售侵权、违禁、无资质认证的产品。</p>',
    icon: '💰',
    category: '内容 & 全托管平台政策',
    status: 'published',
    views: 1350,
    createdAt: '2026-06-10',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-alibaba-001',
    title: '阿里巴巴国际站金品诚企认证要求与流程',
    summary: '如何通过金品诚企认证？需要提供哪些材料？',
    content: '<h2>一、认证材料</h2><ul><li>企业营业执照（经营范围匹配）</li><li>工厂实拍视频</li><li>产品测试报告或质量认证</li></ul><h2>二、年费</h2><p>年费约 ¥29,800，另加信用保障服务费用。</p>',
    icon: '🏢',
    category: 'B2B平台政策',
    status: 'published',
    views: 780,
    createdAt: '2026-05-15',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-dhgate-001',
    title: '敦煌网小额批发产品合规与纠纷处理',
    summary: '敦煌网作为小额批发平台，在产品合规、交易纠纷方面有哪些规则？',
    content: '<h2>一、产品合规</h2><p>禁止销售假冒伪劣、侵犯知识产权的产品，平台定期抽查。</p><h2>二、纠纷处理</h2><p>小额纠纷优先在线调解；大额可申请平台仲裁。</p>',
    icon: '📦',
    category: 'B2B平台政策',
    status: 'published',
    views: 520,
    createdAt: '2026-05-12',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-vat-001',
    title: '欧洲各国 VAT 税率与申报周期对照表',
    summary: '英国、德国、法国、意大利、西班牙 VAT 税率、申报频率全览。',
    content: '<h2>一、主要国家 VAT 税率</h2><ul><li>英国：标准 20%，每年申报 4 次</li><li>德国：标准 19%，每月 + 年度申报</li><li>法国：标准 20%，月度申报</li><li>意大利：标准 22%，月度或季度</li><li>西班牙：标准 21%，季度申报</li></ul>',
    icon: '📑',
    category: '税务合规',
    status: 'published',
    views: 2380,
    createdAt: '2026-05-08',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-vat-002',
    title: '跨境电商出口退税实操指南',
    summary: '外贸企业如何合规申请出口退税？资格、流程、材料全面解读。',
    content: '<h2>一、退税资格</h2><p>企业需具备一般纳税人资格，货物实际离境出口，收汇核销完成。</p><h2>二、流程</h2><p>准备报关单、增值税专用发票 → 录入系统申报 → 税局审核 → 退税款到账。</p>',
    icon: '💵',
    category: '税务合规',
    status: 'published',
    views: 1850,
    createdAt: '2026-05-10',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-ip-001',
    title: '跨境电商商标注册攻略：马德里体系 vs 单一国家注册',
    summary: '做跨境电商，商标怎么注册最划算？马德里体系和单一国家注册对比。',
    content: '<h2>一、马德里体系</h2><p>一份申请 + 一种语言 + 一组费用 = 指定多个成员国（目前 130+ 国）。</p><h2>二、单一国家注册</h2><p>针对重点市场单独注册，审核通过率更高、维权更直接。</p>',
    icon: '™️',
    category: '知识产权',
    status: 'published',
    views: 1420,
    createdAt: '2026-05-05',
    updatedAt: '2026-06-22',
  },
  {
    id: 'policy-ip-002',
    title: '版权保护：产品图、Listing 文案被盗用怎么办？',
    summary: '跨境运营中版权被盗用是常态问题。如何预防、投诉、维权完整方案。',
    content: '<h2>一、预防措施</h2><ul><li>产品图做原创拍摄 + 原始文件存档</li><li>Listing 文案原创撰写</li><li>注册版权登记</li></ul><h2>二、投诉路径</h2><p>通过平台 Brand Registry / 知识产权投诉入口提交。</p>',
    icon: '©️',
    category: '知识产权',
    status: 'published',
    views: 1180,
    createdAt: '2026-05-03',
    updatedAt: '2026-06-22',
  },
];

// ===== Policies CRUD =====
const savePolicies = (policies: Policy[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(POLICIES_KEY, JSON.stringify(policies));
};

export const getPolicies = (): Policy[] => {
  if (typeof window === 'undefined') return seedPolicies;
  const raw = localStorage.getItem(POLICIES_KEY);
  if (!raw) return [...seedPolicies];
  try {
    const policies: Policy[] = JSON.parse(raw);
    let changed = false;
    const now = new Date();
    policies.forEach((p) => {
      if (p.status === 'draft' && p.publishAt && new Date(p.publishAt) <= now) {
        p.status = 'published';
        p.updatedAt = now.toISOString().split('T')[0];
        p.publishAt = undefined;
        changed = true;
      }
    });
    if (changed) savePolicies(policies);
    return policies;
  } catch {
    return seedPolicies;
  }
};

export const getPolicyById = (id: string): Policy | null => {
  const policies = getPolicies();
  return policies.find((p) => p.id === id) || null;
};

export const createPolicy = (data: Omit<Policy, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Policy => {
  const policies = getPolicies();
  const today = new Date().toISOString().split('T')[0];
  const newPolicy: Policy = {
    ...data,
    id: `policy-${Date.now()}`,
    views: 0,
    createdAt: today,
    updatedAt: today,
  };
  policies.unshift(newPolicy);
  savePolicies(policies);
  return newPolicy;
};

export const updatePolicy = (id: string, data: Partial<Omit<Policy, 'id' | 'createdAt'>>): Policy | null => {
  const policies = getPolicies();
  const idx = policies.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  policies[idx] = { ...policies[idx], ...data, updatedAt: new Date().toISOString().split('T')[0] };
  savePolicies(policies);
  return policies[idx];
};

export const deletePolicy = (id: string): boolean => {
  const policies = getPolicies();
  const filtered = policies.filter((p) => p.id !== id);
  if (filtered.length === policies.length) return false;
  savePolicies(filtered);
  return true;
};

export const togglePolicyStatus = (id: string): void => {
  const policies = getPolicies();
  const policy = policies.find((p) => p.id === id);
  if (policy) {
    policy.status = policy.status === 'published' ? 'draft' : 'published';
    policy.updatedAt = new Date().toISOString().split('T')[0];
    savePolicies(policies);
  }
};

export const incrementPolicyViews = (id: string): void => {
  const policies = getPolicies();
  const policy = policies.find((p) => p.id === id);
  if (policy) {
    policy.views += 1;
    savePolicies(policies);
  }
};