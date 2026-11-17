import type { MetadataRoute } from "next";
import { tools, platforms } from "../config/tools";
import { SUPPORTED_LANGUAGES } from "./i18n/config";
import { COMPLIANCE_POLICIES } from "../lib/compliance-data";

/**
 * sitemap.xml 自动生成（App Router 文件约定）
 * 访问路径：/sitemap.xml
 * 每条路径输出 18 个语言版本（与 hreflang 一一对应），未带 locale 的 URL
 * 由 middleware 301 到默认语言版
 */
const SITE_URL = "https://www.melitoolhub.com";

// 站点路径清单（不含 locale 前缀）
const paths: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/tools", changeFrequency: "daily", priority: 0.9 },
  { path: "/tools/product-analysis", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools/keyword-lab", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tools/ai-workbench", changeFrequency: "weekly", priority: 0.8 },
  { path: "/account", changeFrequency: "monthly", priority: 0.4 },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  { path: "/compliance", changeFrequency: "weekly", priority: 0.8 },
  { path: "/purchase", changeFrequency: "weekly", priority: 0.9 },
  { path: "/affiliate", changeFrequency: "weekly", priority: 0.6 },
  { path: "/community", changeFrequency: "daily", priority: 0.6 },
  { path: "/listing-optimizer", changeFrequency: "weekly", priority: 0.7 },
];

// 工具详情页 /tool/[slug]（product-analysis / keyword-lab / ai-* 有独立路径，已在上面单列）
const DEDICATED = new Set(["product-analysis", "keyword-lab"]);
for (const tool of tools) {
  if (DEDICATED.has(tool.slug) || tool.slug.startsWith("ai-")) continue;
  paths.push({ path: `/tool/${tool.slug}`, changeFrequency: "weekly", priority: 0.7 });
}
// 平台专区页 /platform/[slug]
for (const p of platforms) {
  paths.push({ path: `/platform/${p.slug}`, changeFrequency: "weekly", priority: 0.6 });
}
// 博客文章 /blog/[id]（10 篇基础 + 10 篇 SEO 长文）
for (let i = 1; i <= 20; i++) {
  paths.push({ path: `/blog/${i}`, changeFrequency: "monthly", priority: 0.6 });
}
// 合规政策详情 /compliance/[id]
for (const p of COMPLIANCE_POLICIES) {
  paths.push({ path: `/compliance/${p.id}`, changeFrequency: "monthly", priority: 0.6 });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const item of paths) {
    const suffix = item.path === "/" ? "" : item.path;
    for (const lang of SUPPORTED_LANGUAGES) {
      entries.push({
        url: `${SITE_URL}/${lang.code}${suffix}`,
        lastModified: now,
        changeFrequency: item.changeFrequency,
        priority: item.priority,
      });
    }
  }
  return entries;
}
