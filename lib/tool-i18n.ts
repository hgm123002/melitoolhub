// 工具名称 / 描述 / 分类的翻译键统一出口
// 历史遗留问题：不同页面分别用 tool_xxx_name、tool_xxx（驼峰）、tool_xxxDesc 三种写法，
// 导致字典里的键匹配不上，外语页面回落成中文 config。这里统一成一种规范（与字典一致，驼峰式）：
//   tool_<slug 转 camelCase>      工具名        例：rate-converter → tool_rateConverter
//   tool_<slug 转 camelCase>Desc  一句话描述    例：tool_rateConverterDesc
//   ts_<category 转 camelCase>    分类名        例：product-research → ts_productResearch
//
// 解析优先级：16 语言本地文案（lib/tool-copy）> 词典 t()（zh/en 完整字典 + 语言包）> fallback。

import { toolCopyFor } from "./tool-copy";

type TranslateFn = (key: string, fallback?: string) => string;

const camel = (s: string) =>
  (s || "").replace(/-([a-zA-Z])/g, (_, c: string) => c.toUpperCase());

export const toolKey = (slug: string) => `tool_${camel(slug)}`;
export const toolDescKey = (slug: string) => `${toolKey(slug)}Desc`;
export const categoryKey = (category: string) => `ts_${camel(category)}`;

export const toolNameOf = (
  slug: string,
  fallback: string,
  language: string,
  t: TranslateFn,
): string =>
  toolCopyFor(language)?.tools?.[slug]?.name ?? t(toolKey(slug), fallback);

export const toolIntroOf = (
  slug: string,
  fallback: string,
  language: string,
  t: TranslateFn,
): string =>
  toolCopyFor(language)?.tools?.[slug]?.desc ??
  t(toolDescKey(slug), fallback);

export const catNameOf = (
  category: string,
  fallback: string,
  language: string,
  t: TranslateFn,
): string =>
  toolCopyFor(language)?.cats?.[category] ??
  t(categoryKey(category), fallback);
