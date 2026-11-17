// config/tags.ts
// 社区热门标签配置：所有标签统一来源，保持 UI 与后端数据一致

export interface CommunityTag {
  slug: string; // 英文唯一标识，保存在 post.tags 中
  name: string; // 中文名称，用于 UI 显示
  emoji: string; // 图标
  category?: "platform" | "operation" | "risk" | "other";
  description?: string;
}

export const communityTags: CommunityTag[] = [
  // 平台类
  { slug: "amazon", name: "亚马逊", emoji: "🛒", category: "platform" },
  { slug: "tiktok", name: "TikTok", emoji: "🎵", category: "platform" },
  { slug: "shopee", name: "Shopee", emoji: "🛍️", category: "platform" },
  { slug: "lazada", name: "Lazada", emoji: "🏷️", category: "platform" },
  { slug: "ebay", name: "eBay", emoji: "🔨", category: "platform" },
  { slug: "mercado", name: "美客多", emoji: "🌎", category: "platform" },
  { slug: "ozon", name: "Ozon", emoji: "❄️", category: "platform" },

  // 运营/业务类
  {
    slug: "product-selection",
    name: "选品",
    emoji: "🎯",
    category: "operation",
  },
  { slug: "ads", name: "广告", emoji: "📢", category: "operation" },
  { slug: "logistics", name: "物流", emoji: "📦", category: "operation" },
  { slug: "account", name: "账号", emoji: "👤", category: "operation" },
  { slug: "payment", name: "收款", emoji: "💰", category: "operation" },
  { slug: "seo", name: "SEO", emoji: "🔍", category: "operation" },

  // 风险/经验类
  { slug: "compliance", name: "合规", emoji: "📋", category: "risk" },
  { slug: "experience", name: "经验", emoji: "⭐", category: "other" },
  { slug: "qa", name: "求助", emoji: "❓", category: "other" },
];

/** 通过 slug 查找标签（找不到时返回一个占位，避免崩 UI） */
export function getTagBySlug(slug: string): CommunityTag {
  return (
    communityTags.find((t) => t.slug === slug) ?? {
      slug,
      name: slug,
      emoji: "🏷️",
    }
  );
}

/** 通过 name 反查 slug（用于发帖下拉、旧数据兼容） */
export function getTagSlugByName(name: string): string | null {
  const tag = communityTags.find(
    (t) =>
      t.name === name ||
      t.slug === name ||
      t.name.toLowerCase() === name.toLowerCase(),
  );
  return tag ? tag.slug : null;
}
