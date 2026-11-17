/**
 * 联盟营销配置 - 集中管理联盟平台介绍、图片、推广链接
 * 后台管理人员可以直接修改此文件中的配置项，或将来接入 CMS/数据库时替换此数据源
 */

// ============ 联盟平台介绍（每页 3 个，按顺序分页展示） ============
// 可自由添加/删除，系统自动按 PAGE_SIZE 进行分页
export interface AffiliatePlatform {
  id: string;           // 唯一标识
  name: string;         // 联盟名称
  description: string;  // 联盟说明
  image: string;        // 联盟图片 URL（支持 emoji 或 /images/xxx.png 路径）
  promoLink: string;    // 推广链接（后台可替换为自己的联盟链接）
}

export const AFFILIATE_PLATFORMS: AffiliatePlatform[] = [
  {
    id: "mercadolibre",
    name: "美客多联盟",
    description: "拉美最大电商联盟计划，高转化率，佣金比例高，拉美流量首选，出单门槛低",
    image: "🌎",
    promoLink: "https://your-promotion-link/mercadolibre",
  },
  {
    id: "amazon",
    name: "亚马逊联盟",
    description: "全球最大联盟网络，覆盖多个国家和地区，商品海量、信任度高、稳定变现",
    image: "📦",
    promoLink: "https://your-promotion-link/amazon",
  },
  {
    id: "shopee",
    name: "Shopee联盟",
    description: "东南亚电商联盟，快速增长的市场机会，门槛低，社媒引流极易起量",
    image: "🛒",
    promoLink: "https://your-promotion-link/shopee",
  },
  {
    id: "tiktokshop",
    name: "TikTok Shop联盟",
    description: "全球短视频电商联盟，短视频/直播引流转化极强，佣金灵活，当前流量红利最大",
    image: "🎬",
    promoLink: "https://your-promotion-link/tiktokshop",
  },
  {
    id: "clickbank",
    name: "ClickBank联盟",
    description: "数字产品头部联盟，佣金最高可达 50%-75%，虚拟品退款率低、利润空间极大",
    image: "💵",
    promoLink: "https://your-promotion-link/clickbank",
  },
  {
    id: "awin",
    name: "Awin联盟",
    description: "欧美成熟联盟网络，上万品牌商家，服饰家居类目佣金丰厚，收款稳定合规",
    image: "🇪🇺",
    promoLink: "https://your-promotion-link/awin",
  },
  {
    id: "impact",
    name: "Impact Radius联盟",
    description: "出海品牌官方联盟主流载体，独立站品牌多、客单价高，长期合作收益稳定",
    image: "📈",
    promoLink: "https://your-promotion-link/impact",
  },
  {
    id: "admitad",
    name: "Admitad联盟",
    description: "俄语区、中东、中亚头部联盟，竞争小、转化率高，蓝海流量变现首选",
    image: "🌐",
    promoLink: "https://your-promotion-link/admitad",
  },
  {
    id: "cj",
    name: "CJ Affiliate联盟",
    description: "老牌顶级联盟，大牌品牌资源丰富，适合精细化长期运营，单价佣金上限高",
    image: "🏅",
    promoLink: "https://your-promotion-link/cj",
  },
];

// ============ 分页配置 ============
export const AFFILIATE_PAGE_SIZE = 3; // 每页展示 3 个联盟平台

// ============ 联盟关联工具列表（展示在联盟工具列表中） ============
// slug 对应 config/tools.ts 中的工具 slug，后台可自由增删
export const AFFILIATE_TOOL_SLUGS: string[] = [
  "rate-converter",
  "profit-calculator",
  "listing-optimizer",
];

// ============ 联盟收益说明（固定展示项，可后台修改） ============
export interface AffiliateStat {
  label: string;
  value: string;
  description: string;
}

export const AFFILIATE_STATS: AffiliateStat[] = [
  { label: "平均佣金比例", value: "5%-15%", description: "根据品类不同" },
  { label: "结算周期", value: "30-60天", description: "各平台略有差异" },
  { label: "付款方式", value: "PayPal/银行", description: "支持多种方式" },
  { label: "最低提现", value: "$100起", description: "部分平台更低" },
];

// ============ 联盟营销教程（固定展示项，可后台修改） ============
export interface AffiliateArticle {
  title: string;
  summary: string;
  link: string; // 教程详情链接，可后台替换
}

export const AFFILIATE_ARTICLES: AffiliateArticle[] = [
  {
    title: "如何加入美客多联盟",
    summary: "详细介绍美客多联盟的注册流程和审核要求",
    link: "#",
  },
  {
    title: "联盟推广技巧分享",
    summary: "分享有效的联盟推广方法和策略",
    link: "#",
  },
  {
    title: "多平台联盟管理技巧",
    summary: "如何高效管理多个联盟账号",
    link: "#",
  },
  {
    title: "联盟营销合规要点",
    summary: "了解联盟营销的合规要求和注意事项",
    link: "#",
  },
];