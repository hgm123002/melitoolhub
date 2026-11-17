// 18 种语言配置 - 纯同步方案，不依赖任何第三方库

export const SUPPORTED_LANGUAGES = [
  { code: 'zh-CN', name: '中文',       flag: '🇨🇳', dir: 'ltr' },
  { code: 'en',    name: 'English',    flag: '🇺🇸', dir: 'ltr' },
  { code: 'es',    name: 'Español',    flag: '🇪🇸', dir: 'ltr' },
  { code: 'pt',    name: 'Português',  flag: '🇧🇷', dir: 'ltr' },
  { code: 'ru',    name: 'Русский',    flag: '🇷🇺', dir: 'ltr' },
  { code: 'id',    name: 'Bahasa',     flag: '🇮🇩', dir: 'ltr' },
  { code: 'th',    name: 'ไทย',         flag: '🇹🇭', dir: 'ltr' },
  { code: 'vi',    name: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' },
  { code: 'fr',    name: 'Français',   flag: '🇫🇷', dir: 'ltr' },
  { code: 'de',    name: 'Deutsch',    flag: '🇩🇪', dir: 'ltr' },
  { code: 'ja',    name: '日本語',       flag: '🇯🇵', dir: 'ltr' },
  { code: 'ko',    name: '한국어',       flag: '🇰🇷', dir: 'ltr' },
  { code: 'ar',    name: 'العربية',      flag: '🇸🇦', dir: 'rtl' },
  { code: 'hi',    name: 'हिन्दी',      flag: '🇮🇳', dir: 'ltr' },
  { code: 'bn',    name: 'বাংলা',       flag: '🇧🇩', dir: 'ltr' },
  { code: 'ur',    name: 'اردو',        flag: '🇵🇰', dir: 'rtl' },
  { code: 'fa',    name: 'فارسی',       flag: '🇮🇷', dir: 'rtl' },
  { code: 'tr',    name: 'Türkçe',     flag: '🇹🇷', dir: 'ltr' },
] as const;

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];
export const DEFAULT_LANGUAGE: LanguageCode = 'zh-CN';