import type { BlogEntry, BlogPack } from "./types";
import { zh } from "./zh";
import { en } from "./en";
import { es, pt, ru, ar } from "./copy-a";
import { fr, de, ja, ko } from "./copy-b";
import { th, vi, id, tr } from "./copy-c";
import { hi, bn, ur, fa } from "./copy-d";

export type { BlogEntry, BlogPack };

/**
 * 博客标题/摘要多语言文案（正文仍为英文，诚实回退）。
 * zh 覆盖文章 11–20（1–10 正文为中文原文）；en 覆盖 1–10（11–20 原文即英文）；
 * 其余 16 种语言覆盖全部 20 篇。
 */
export const BLOG_COPY: Record<string, BlogPack> = {
  zh,
  en,
  es,
  pt,
  ru,
  ar,
  fr,
  de,
  ja,
  ko,
  th,
  vi,
  id,
  tr,
  hi,
  bn,
  ur,
  fa,
};

export const blogCopyFor = (locale: string): BlogPack | undefined =>
  BLOG_COPY[locale.startsWith("zh") ? "zh" : locale];
