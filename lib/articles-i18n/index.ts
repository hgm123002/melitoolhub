// lib/articles-i18n/index.ts
// ============================================================================
// 文章正文多语言解析层
// 规则：zh-CN / zh-TW 直接用中文原文；其余语言命中正文包则用译文，
//       未命中的文章（11–20 英文长文）诚实回退到原文，不生成空壳。
// ============================================================================
import type { ArticleBodyPack } from "./types";
import { en } from "./en";
import { es } from "./es";
import { pt } from "./pt";
import { ru } from "./ru";
import { id } from "./id";
import { th } from "./th";
import { vi } from "./vi";
import { fr } from "./fr";
import { de } from "./de";
import { ja } from "./ja";
import { ko } from "./ko";
import { ar } from "./ar";
import { hi } from "./hi";
import { bn } from "./bn";
import { ur } from "./ur";
import { fa } from "./fa";
import { tr } from "./tr";

export type { ArticleBodyPack };

export const ARTICLE_BODY_PACKS: Record<string, ArticleBodyPack> = {
  en,
  es,
  pt,
  ru,
  id,
  th,
  vi,
  fr,
  de,
  ja,
  ko,
  ar,
  hi,
  bn,
  ur,
  fa,
  tr,
};

const normLocale = (locale: string): string =>
  locale.startsWith("zh") ? "zh" : locale;

/** 该语言下这篇文章的正文；没有译文时返回 undefined（调用方回退原文） */
export const articleBodyFor = (
  locale: string,
  id: string,
): string | undefined => {
  const key = normLocale(locale);
  if (key === "zh") return undefined;
  return ARTICLE_BODY_PACKS[key]?.[id];
};

/** 该语言是否已覆盖某篇文章的正文（用于 SEO 与调试） */
export const hasArticleBody = (locale: string, id: string): boolean =>
  Boolean(articleBodyFor(locale, id));
