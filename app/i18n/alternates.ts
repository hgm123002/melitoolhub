// app/i18n/alternates.ts
// hreflang/canonical 构建工具（服务端 metadata 用）
import { SUPPORTED_LANGUAGES } from "./config";

export const SITE_URL = "https://www.melitoolhub.com";

/**
 * 为指定 locale 与路径生成 canonical + hreflang alternates
 * path 示例："/" 、"/blog" 、"/tool/profit-calculator"
 */
export function localeAlternates(locale: string, path: string) {
  const suffix = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LANGUAGES) {
    languages[l.code] = `${SITE_URL}/${l.code}${suffix}`;
  }
  // x-default 指向英文版
  languages["x-default"] = `${SITE_URL}/en${suffix}`;
  return {
    canonical: `${SITE_URL}/${locale}${suffix}`,
    languages,
  };
}
