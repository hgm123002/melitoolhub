import { SHELL_KEYS } from "./keys";
import type { ShellKey, ShellPack } from "./keys";

import ar from "./ar";
import bn from "./bn";
import de from "./de";
import es from "./es";
import fa from "./fa";
import fr from "./fr";
import hi from "./hi";
import id from "./id";
import ja from "./ja";
import ko from "./ko";
import pt from "./pt";
import ru from "./ru";
import th from "./th";
import tr from "./tr";
import ur from "./ur";
import vi from "./vi";

/**
 * 18 语言中的 16 种（中文与英文为完整字典，写在 LanguageContext 内）。
 * 语言包只覆盖"外壳 + 高频页面"文案；字典里没有的键会自动回退到英文，
 * 绝不会把 key 本身显示到页面上。
 */
export const LOCALE_PACKS: Record<string, ShellPack> = {
  ar,
  bn,
  de,
  es,
  fa,
  fr,
  hi,
  id,
  ja,
  ko,
  pt,
  ru,
  th,
  tr,
  ur,
  vi,
};

export { SHELL_KEYS };
export type { ShellKey, ShellPack };
