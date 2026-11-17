/**
 * 联盟营销数据类型定义
 */
export interface AffiliateItem {
  id: string;
  name: string;
  icon: string;
  image: string;
  desc: string;
  promoLink: string;
}

// 9个联盟分页数据（3页，每页3个）
export const affiliatePageData: AffiliateItem[][] = [
  [
    {
      id: "mercadolibre",
      name: "美客多联盟",
      icon: "🌍",
      image: "/images/affiliate/mercadolibre.svg",
      desc: "拉美最大电商联盟计划，高转化率，佣金比例高，拉美流量首选，出单门槛低",
      promoLink: "https://your-promotion-link/mercadolibre"
    },
    {
      id: "amazon",
      name: "亚马逊联盟",
      icon: "📦",
      image: "/images/affiliate/amazon.svg",
      desc: "全球最大联盟网络，覆盖多个国家和地区，商品海量、信任度高、稳定变现",
      promoLink: "https://your-promotion-link/amazon"
    },
    {
      id: "shopee",
      name: "Shopee联盟",
      icon: "🛒",
      image: "/images/affiliate/shopee.svg",
      desc: "东南亚电商联盟，快速增长的市场机会，门槛低，社媒引流极易起量",
      promoLink: "https://your-promotion-link/shopee"
    }
  ],
  [
    {
      id: "tiktokshop",
      name: "TikTok Shop联盟",
      icon: "🎬",
      image: "/images/affiliate/tiktokshop.svg",
      desc: "全球短视频电商联盟，短视频/直播引流转化极强，佣金灵活，当前流量红利最大",
      promoLink: "https://your-promotion-link/tiktokshop"
    },
    {
      id: "clickbank",
      name: "ClickBank联盟",
      icon: "💵",
      image: "/images/affiliate/clickbank.svg",
      desc: "数字产品头部联盟，佣金最高可达50%-75%，虚拟品退款率低、利润空间极大，新手极易起号",
      promoLink: "https://your-promotion-link/clickbank"
    },
    {
      id: "awin",
      name: "Awin联盟",
      icon: "🇪🇺",
      image: "/images/affiliate/awin.svg",
      desc: "欧美成熟联盟网络，上万品牌商家，服饰家居类目佣金丰厚，收款稳定合规",
      promoLink: "https://your-promotion-link/awin"
    }
  ],
  [
    {
      id: "impact",
      name: "Impact Radius联盟",
      icon: "📈",
      image: "/images/affiliate/impact.svg",
      desc: "出海品牌官方联盟主流载体，独立站品牌多、客单价高，长期合作收益稳定",
      promoLink: "https://your-promotion-link/impact"
    },
    {
      id: "admitad",
      name: "Admitad联盟",
      icon: "🌐",
      image: "/images/affiliate/admitad.svg",
      desc: "俄语区、中东、中亚头部联盟，竞争小、转化率高，蓝海流量变现首选",
      promoLink: "https://your-promotion-link/admitad"
    },
    {
      id: "cj",
      name: "CJ Affiliate联盟",
      icon: "🏅",
      image: "/images/affiliate/cj.svg",
      desc: "老牌顶级联盟，大牌品牌资源丰富，适合精细化长期运营，单价佣金上限高",
      promoLink: "https://your-promotion-link/cj"
    }
  ]
];

export const AFFILIATE_PAGE_CONFIG = {
  pageSize: 3,
  totalItems: 9,
  totalPages: 3
};