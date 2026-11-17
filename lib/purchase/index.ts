import type { PurchaseCopy } from "./types";
import { COPY_A } from "./copy-a";
import { COPY_B } from "./copy-b";
import { COPY_C } from "./copy-c";
import { COPY_D } from "./copy-d";

export type { PurchaseCopy };

const ALL: Record<string, PurchaseCopy> = {
  ...COPY_A,
  ...COPY_B,
  ...COPY_C,
  ...COPY_D,
};

/**
 * 按 locale 取采购页文案。
 * 18 种语言全部有独立文案；未知 locale 回退英文（不会输出未翻译的 key）。
 */
export function getPurchaseCopy(locale: string): PurchaseCopy {
  return ALL[locale] ?? ALL.en;
}

/** 供 sitemap / 构建期校验：当前已覆盖的语言 */
export const PURCHASE_LOCALES = Object.keys(ALL);

// 面包屑首项，各语言独立，避免中文界面出现英文 “Home”
const HOME_LABEL: Record<string, string> = {
  "zh-CN": "首页",
  en: "Home",
  es: "Inicio",
  pt: "Início",
  ru: "Главная",
  id: "Beranda",
  th: "หน้าแรก",
  vi: "Trang chủ",
  fr: "Accueil",
  de: "Startseite",
  ja: "ホーム",
  ko: "홈",
  ar: "الرئيسية",
  hi: "होम",
  bn: "হোম",
  ur: "ہوم",
  fa: "خانه",
  tr: "Ana sayfa",
};

export function getHomeLabel(locale: string): string {
  return HOME_LABEL[locale] ?? "Home";
}

