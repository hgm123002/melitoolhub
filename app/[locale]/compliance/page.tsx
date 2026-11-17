import type { Metadata } from "next";
import ComplianceBrowser, {
  type ComplianceItem,
  type ComplianceCategoryView,
} from "./ComplianceBrowser";
import { localeAlternates } from "../../i18n/alternates";
import {
  COMPLIANCE_CATEGORIES,
  COMPLIANCE_POLICIES,
  localizeCategory,
  localizePolicy,
} from "../../../lib/compliance-data";

type P = { params: Promise<{ locale: string }> };

const COPY = {
  zh: {
    title: "跨境电商政策与合规指南",
    subtitle: "平台政策、税务合规、产品认证与知识产权要求汇总，帮助卖家及时了解",
    home: "首页",
    all: "全部政策",
    views: "浏览",
    minutes: " 分钟阅读",
    readMore: "查看详情",
    tipsTitle: "合规小贴士",
    tips: [
      "每季度复核一次目标市场的准入与税务要求",
      "认证证书、检测报告按 SKU 归档，随时可调取",
      "平台政策警告优先处理，避免累计为停用",
      "不确定的规则以官方公告为准，不做侥幸判断",
    ],
    disclaimer:
      "本站内容为跨境卖家实务要点整理，不构成法律或税务意见。各国法规与平台政策会持续调整，请以官方最新公告及专业顾问意见为准。",
    empty: "此分类暂无内容，持续更新中……",
  },
  en: {
    title: "Cross-Border E-Commerce Policy & Compliance Guide",
    subtitle:
      "Platform policies, tax compliance, product certification and IP requirements — practical guidance for sellers",
    home: "Home",
    all: "All guides",
    views: "views",
    minutes: " min read",
    readMore: "Read guide",
    tipsTitle: "Compliance tips",
    tips: [
      "Re-check market access and tax rules every quarter",
      "Archive certificates and test reports per SKU",
      "Treat policy warnings as urgent — they precede suspension",
      "Follow official announcements rather than assumptions",
    ],
    disclaimer:
      "Practical guidance for sellers, not legal or tax advice. Regulations and platform policies change — verify with official sources and qualified advisers.",
    empty: "No content in this category yet.",
  },
};

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const c = locale === "zh-CN" || locale === "zh-TW" ? COPY.zh : COPY.en;
  return {
    title: c.title,
    description: c.subtitle,
    alternates: localeAlternates(locale, "/compliance"),
    openGraph: { title: c.title, description: c.subtitle, type: "website" },
  };
}

export default async function Page({ params }: P) {
  const { locale } = await params;
  const c = locale === "zh-CN" || locale === "zh-TW" ? COPY.zh : COPY.en;

  const items: ComplianceItem[] = COMPLIANCE_POLICIES.map((p) => {
    const loc = localizePolicy(p, locale);
    return {
      id: p.id,
      icon: p.icon,
      category: p.category,
      title: loc.title,
      summary: loc.summary,
      updatedAt: p.updatedAt,
      views: p.views,
      readMinutes: p.readMinutes,
    };
  });

  const categories: ComplianceCategoryView[] = COMPLIANCE_CATEGORIES.map((cat) => ({
    id: cat.id,
    icon: cat.icon,
    label: localizeCategory(cat, locale),
    count: COMPLIANCE_POLICIES.filter((p) => p.category === cat.id).length,
  }));

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <a href={`/${locale}`} className="hover:text-[#1e3a5f]">
            {c.home}
          </a>
          <span className="mx-2">/</span>
          <span className="text-[#1e3a5f]">{c.title}</span>
        </nav>

        {/* 主视觉 */}
        <section className="relative mb-10 rounded-3xl overflow-hidden h-44 md:h-56 bg-[#0f2038]">
          <img
            src="/hero/hero-dashboard.webp"
            alt={c.title}
            className="w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2038]/95 via-[#0f2038]/75 to-[#1a3a5c]/35" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{c.title}</h1>
            <p className="text-sky-100/85 text-sm md:text-base leading-relaxed">{c.subtitle}</p>
          </div>
        </section>

        <ComplianceBrowser
          locale={locale}
          items={items}
          categories={categories}
          labels={{
            all: c.all,
            views: c.views,
            minutes: c.minutes,
            readMore: c.readMore,
            tipsTitle: c.tipsTitle,
            tips: c.tips,
            disclaimer: c.disclaimer,
            empty: c.empty,
          }}
        />
      </div>
    </main>
  );
}
