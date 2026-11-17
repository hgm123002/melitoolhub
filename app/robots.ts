import type { MetadataRoute } from "next";

/**
 * robots.txt 自动生成（App Router 文件约定）
 * 访问路径：/robots.txt
 * 管理后台与 API 不允许收录
 */
const SITE_URL = "https://www.melitoolhub.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/", "/forgot-password"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
