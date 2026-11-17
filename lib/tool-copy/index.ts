import type { CatPack, ToolEntry, ToolPack } from "./types";
import { es, pt, ru, ar } from "./copy-a";
import { fr, de, ja, ko } from "./copy-b";
import { th, vi, id, tr } from "./copy-c";
import { hi, bn, ur, fa } from "./copy-d";

export type { ToolEntry, ToolPack, CatPack };

const entries: Record<string, { tools: ToolPack; cats: CatPack }> = {
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

export const TOOL_COPY: Record<string, { tools: ToolPack; cats: CatPack }> =
  entries;

export const toolCopyFor = (
  locale: string,
): { tools: ToolPack; cats: CatPack } | undefined =>
  entries[locale.startsWith("zh") ? "zh" : locale];
