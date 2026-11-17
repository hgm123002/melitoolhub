"use client";

/**
 * 语言属性同步（客户端组件）
 * 用户切换语言时，同步更新 <html> 的 lang 与 dir 属性
 * （服务端渲染默认 en/ltr，切换后由本组件接管，保证无障碍与 SEO 一致性）
 */
import { useEffect } from "react";
import { useLanguage } from "../app/i18n";

const LANG_DIR: Record<string, string> = {
  ar: "rtl",
  ur: "rtl",
  fa: "rtl",
};

export default function LangSync() {
  const { language } = useLanguage();

  useEffect(() => {
    const html = document.documentElement;
    const lang = language === "zh-CN" ? "zh-CN" : language;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", LANG_DIR[lang] || "ltr");
  }, [language]);

  return null;
}
