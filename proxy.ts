import { NextRequest, NextResponse } from "next/server";

/**
 * 多语言路由代理（原 middleware）
 * - 访问不带 locale 前缀的页面（如 /blog）→ 301 重定向到 /en/blog（或 cookie/Accept-Language 匹配的语言）
 * - 已带 locale 前缀的请求直接放行
 * - /api、/admin、静态资源（含扩展名的路径）不参与重定向
 */

const LOCALES = [
  "zh-CN", "en", "es", "pt", "ru", "id", "th", "vi",
  "fr", "de", "ja", "ko", "ar", "hi", "bn", "ur", "fa", "tr",
];
const DEFAULT_LOCALE = "en";

function detectLocale(req: NextRequest): string {
  // 1) 用户之前手动切换过语言（Navbar 写入的 cookie）
  const cookie = req.cookies.get("gth_language")?.value;
  if (cookie && LOCALES.includes(cookie)) return cookie;

  // 2) Accept-Language 与支持语言匹配
  const al = req.headers.get("accept-language") ?? "";
  for (const part of al.split(",")) {
    const tag = part.split(";")[0]?.trim().toLowerCase();
    if (!tag) continue;
    for (const l of LOCALES) {
      const lower = l.toLowerCase();
      if (tag === lower || tag.startsWith(lower + "-")) return l;
    }
  }
  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const seg = pathname.split("/")[1];

  // 已带合法 locale 前缀 → 放行
  if (LOCALES.includes(seg)) return NextResponse.next();

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  // 301 有助于搜索引擎把旧 URL 权重迁移到带 locale 的 URL
  return NextResponse.redirect(url, 301);
}

export const config = {
  // 排除 _next、api、admin 以及所有带扩展名的静态资源请求
  matcher: ["/((?!api|admin|_next|.*\\..*).*)"],
};
