// 采购代发页（Sourcing）多语言文案类型定义
// 说明：本页文案独立于全局 LanguageContext，按 locale 全量提供，
// 避免出现「界面是中文、内容却是英文 / 未翻译 key」的问题。

export type PurchaseCopy = {
  metaTitle: string;
  metaDesc: string;
  crumb: string;

  heroTitle: string;
  heroSub: string;
  heroBadge: string;
  heroNote: string;
  ctaPrimary: string;
  ctaSecondary: string;

  /** [数值, 说明] ×4 */
  stats: [string, string][];

  whyTitle: string;
  whyLead: string;
  /** [标题, 说明] ×4 */
  why: [string, string][];

  flowTitle: string;
  flowLead: string;
  /** [标题, 说明] ×4 */
  flow: [string, string][];

  advTitle: string;
  advLead: string;
  /** [标题, 说明] ×4 */
  adv: [string, string][];

  faqTitle: string;
  /** [问题, 答案] ×3 */
  faq: [string, string][];

  formTitle: string;
  formLead: string;
  fName: string;
  fNamePh: string;
  fEmail: string;
  fEmailPh: string;
  fPhone: string;
  fPhonePh: string;
  fProduct: string;
  fProductPh: string;
  fMessage: string;
  fMessagePh: string;
  fSubmit: string;
  fSending: string;
  fOkTitle: string;
  fOkDesc: string;
  fErr: string;
  fPrivacy: string;

  contactTitle: string;
  contactLead: string;

  ctaTitle: string;
  ctaLead: string;
};
