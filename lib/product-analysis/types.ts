export type Platform = 'mercadolibre_mx' | 'mercadolibre_br' | 'mercadolibre_cl' | 'amazon_us' | 'amazon_eu' | 'ozon_ru' | 'shopee' | 'temu';

export type TimeRange = '7d' | '30d' | '90d' | 'quarter' | 'year';

export type RiskLevel = 'low' | 'medium' | 'high';

export type PotentialGrade = 'S' | 'A' | 'B' | 'C';

export type CompetitionLevel = 'blue_ocean' | 'neutral' | 'red_ocean';

export interface PlatformInfo {
  id: Platform;
  name: string;
  country: string;
  flag: string;
  currency: string;
  language: string;
}

export interface CategoryData {
  id: string;
  level: 1 | 2 | 3;
  name: string;
  nameEn: string;
  parentId: string | null;
  salesVolume: number;
  salesAmount: number;
  avgPrice: number;
  growthRate: number;
  sellerCount: number;
  competitionLevel: CompetitionLevel;
  isBlueOcean: boolean;
  trendData: { date: string; sales: number; search: number; listings: number }[];
  priceDistribution: { range: string; count: number; percentage: number }[];
  avgProfitMargin: number;
  seasonPeaks: string[];
  infringementRisk: RiskLevel;
  restrictedItems: string[];
}

export interface CompetitorProduct {
  id: string;
  asin: string;
  title: string;
  titleOriginal: string;
  platform: Platform;
  url: string;
  image: string;
  price: number;
  promoPrice: number | null;
  variants: { spec: string; price: number; stock: number }[];
  colors: string[];
  sizes: string[];
  material: string;
  listingDate: string;
  dailySales: number;
  weeklySales: number;
  monthlySales: number;
  salesHistory: { date: string; sales: number }[];
  totalReviews: number;
  positiveRate: number;
  reviewScore: number;
  negativeKeywords: { word: string; count: number; category: string }[];
  painPoints: { category: string; description: string; count: number }[];
  coreKeywords: { keyword: string; type: 'organic' | 'ad' | 'core'; searchVolume: number }[];
  isFBA: boolean;
  isFBM: boolean;
  hasAds: boolean;
  hasCoupon: boolean;
  hasBundle: boolean;
  estimatedProfit: number;
  profitMargin: number;
  isMonitored: boolean;
}

export interface KeywordItem {
  id: string;
  keyword: string;
  keywordOriginal: string;
  language: string;
  source: 'search_dropdown' | 'category_hot' | 'competitor' | 'ad_recommend' | 'google' ;
  monthlySearchVolume: number;
  searchGrowth: number;
  competitionCount: number;
  ctr: number;
  conversionRate: number;
  competitionLevel: CompetitionLevel;
  cluster: string;
  relatedProducts: { asin: string; title: string; price: number; sales: number }[];
}

export interface ProductPotentialScore {
  productId: string;
  totalScore: number;
  grade: PotentialGrade;
  marketDemandScore: number;
  competitionScore: number;
  profitScore: number;
  riskScore: number;
  searchVolume: number;
  categoryGrowth: number;
  seasonBonus: number;
  sellerCount: number;
  monopolyLevel: number;
  similarProducts: number;
  estimatedCost: number;
  platformFee: number;
  shippingFee: number;
  profitMargin: number;
  infringementRisk: RiskLevel;
  complianceRisk: RiskLevel;
  fragileRisk: RiskLevel;
  advantages: string[];
  risks: string[];
  improvements: string[];
  suggestedPriceRange: { min: number; max: number };
  targetKeywords: string[];
}

export interface OwnProduct {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  cost: number;
  dimensions: { length: number; width: number; height: number };
  weight: number;
  purchasePrice: number;
  minOrderQuantity: number;
  material: string;
  sellingPoints: string;
  targetPlatform: Platform;
  sellingPrice: number;
  platformFee: number;
  shippingCost: number;
  adCost: number;
  profitPerUnit: number;
  profitMargin: number;
  breakEvenSales: number;
  suggestedStockMin: number;
  suggestedStockMax: number;
  stockOverstockRisk: RiskLevel;
  capitalOccupation: number;
}

export interface FavoriteItem {
  id: string;
  type: 'product' | 'keyword' | 'category' | 'competitor';
  itemId: string;
  title: string;
  addedAt: string;
}

export interface NotificationItem {
  id: string;
  type: 'blue_ocean' | 'price_change' | 'review_surge' | 'keyword_surge' | 'alert';
  title: string;
  description: string;
  relatedId: string;
  createdAt: string;
  isRead: boolean;
}

export interface HistoryItem {
  id: string;
  type: 'search' | 'analysis' | 'comparison';
  content: string;
  createdAt: string;
  params: Record<string, string>;
}

export const PLATFORMS: PlatformInfo[] = [
  { id: 'mercadolibre_mx', name: 'Mercado Libre', country: '墨西哥', flag: '🇲🇽', currency: 'MXN', language: 'es' },
  { id: 'mercadolibre_br', name: 'Mercado Libre', country: '巴西', flag: '🇧🇷', currency: 'BRL', language: 'pt' },
  { id: 'mercadolibre_cl', name: 'Mercado Libre', country: '智利', flag: '🇨🇱', currency: 'CLP', language: 'es' },
  { id: 'amazon_us', name: 'Amazon', country: '北美', flag: '🇺🇸', currency: 'USD', language: 'en' },
  { id: 'amazon_eu', name: 'Amazon', country: '欧洲', flag: '🇪🇺', currency: 'EUR', language: 'en' },
  { id: 'ozon_ru', name: 'Ozon', country: '俄罗斯', flag: '🇷🇺', currency: 'RUB', language: 'ru' },
  { id: 'shopee', name: 'Shopee', country: '东南亚', flag: '🇸🇬', currency: 'SGD', language: 'en' },
  { id: 'temu', name: 'Temu', country: '全球', flag: '🌍', currency: 'USD', language: 'en' },
];

// ==================== 禁运/合规产品库 ====================
export type RestrictionCategory =
  | 'embargo'       // 禁运品（受制裁国家/国际禁运）
  | 'prohibited'    // 禁止出口（中国法律/出口管制）
  | 'illegal'       // 法律禁止销售（目标国法律）
  | 'restricted'    // 受限制销售（需许可证/认证）
  | 'trademark'     // 商标/专利侵权
  | 'copyright'     // 版权侵权
  | 'counterfeit';  // 假冒伪劣

export interface RestrictedItem {
  id: string;
  name: string;
  nameEn: string;
  category: RestrictionCategory;
  categoryName: string;
  hsCode?: string;        // HS编码
  platforms: Platform[];  // 适用平台
  platformsNames: string[];
  restrictionReason: string;           // 禁运/限制原因
  legalBasis?: string;                 // 法律依据
  penalty?: string;                    // 违规处罚
  requiredLicense?: string[];          // 所需许可证
  alternativeProducts?: string[];      // 可替代产品
  notes?: string;                      // 备注
  riskLevel: RiskLevel;                // 风险等级
  isEnabled: boolean;                  // 是否启用
  createdAt: string;
  updatedAt: string;
  source: 'internal' | 'external_db1' | 'external_db2' | 'external_db3';
}

export interface ComplianceQueryResult {
  query: string;
  totalHits: number;
  exactMatches: RestrictedItem[];
  keywordMatches: RestrictedItem[];
  categoryHits: { category: RestrictionCategory; categoryName: string; count: number }[];
  platformHits: { platform: Platform; platformName: string; count: number }[];
  riskSummary: { high: number; medium: number; low: number };
  queriedAt: string;
  sources: string[];
}

// ==================== 第三方数据库接口配置 ====================
export interface ExternalDatabase {
  id: 'internal' | 'customs_gov_cn' | 'miit_gov_cn' | 'interpol' | 'custom';
  name: string;
  description: string;
  apiEndpoint: string;
  apiKey?: string;
  isEnabled: boolean;
  isConfigured: boolean;
  lastSyncAt?: string;
}

export const EXTERNAL_DATABASES: ExternalDatabase[] = [
  {
    id: 'internal',
    name: '本地产品库',
    description: 'GlobalTradeHub 本地维护的禁运/限制产品数据库',
    apiEndpoint: 'local://product-analysis/restricted',
    isEnabled: true,
    isConfigured: true,
  },
  {
    id: 'customs_gov_cn',
    name: '中国海关总署 · 出口管制库',
    description: '中国海关总署禁限物品清单、出口管制商品目录',
    apiEndpoint: 'https://api.customs.gov.cn/restricted-items',
    apiKey: '',
    isEnabled: false,
    isConfigured: false,
  },
  {
    id: 'miit_gov_cn',
    name: '工信部 · 禁止限制出口目录',
    description: '工信部禁止出口、限制出口技术目录',
    apiEndpoint: 'https://api.miit.gov.cn/export-control',
    apiKey: '',
    isEnabled: false,
    isConfigured: false,
  },
  {
    id: 'interpol',
    name: '国际刑警组织 · 违禁品数据库',
    description: 'Interpol Red Notice & 违禁品管制清单',
    apiEndpoint: 'https://api.interpol.int/restricted-items',
    apiKey: '',
    isEnabled: false,
    isConfigured: false,
  },
  {
    id: 'custom',
    name: '自定义第三方数据库',
    description: '企业自建合规数据库、第三方 SaaS 合规服务',
    apiEndpoint: '',
    apiKey: '',
    isEnabled: false,
    isConfigured: false,
  },
];

export const RESTRICTION_CATEGORIES: { id: RestrictionCategory; name: string; description: string; color: string }[] = [
  { id: 'embargo', name: '国际禁运', description: '受国际制裁、联合国禁运清单物品', color: 'text-red-600' },
  { id: 'prohibited', name: '禁止出口', description: '中国法律/海关禁止出口的商品', color: 'text-red-600' },
  { id: 'illegal', name: '目标国禁止销售', description: '目标平台/国家法律禁止销售的商品', color: 'text-red-600' },
  { id: 'restricted', name: '受限制销售', description: '需许可证、认证、备案方可销售', color: 'text-amber-600' },
  { id: 'trademark', name: '商标侵权', description: '知名品牌商标、专利受保护产品', color: 'text-amber-600' },
  { id: 'copyright', name: '版权侵权', description: '受版权保护的书籍、音像、软件等', color: 'text-amber-600' },
  { id: 'counterfeit', name: '假冒伪劣', description: '仿冒知名品牌、虚假标识商品', color: 'text-red-600' },
];