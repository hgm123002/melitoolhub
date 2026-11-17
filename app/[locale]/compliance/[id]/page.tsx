import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, Eye } from "lucide-react";
import { localeAlternates, SITE_URL } from "../../../i18n/alternates";
import { SUPPORTED_LANGUAGES } from "../../../i18n/config";
import {
  COMPLIANCE_CATEGORIES,
  COMPLIANCE_POLICIES,
  getCompliancePolicy,
  localizeCategory,
  localizePolicy,
} from "../../../../lib/compliance-data";

type P = { params: Promise<{ locale: string; id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.flatMap((l) =>
    COMPLIANCE_POLICIES.map((p) => ({ locale: l.code, id: p.id }))
  );
}

const isZh = (locale: string) => locale === "zh-CN" || locale === "zh-TW";

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, id } = await params;
  const policy = getCompliancePolicy(id);
  if (!policy) {
    return {
      title: isZh(locale) ? "政策不存在" : "Policy not found",
      robots: { index: false, follow: true },
    };
  }
  const loc = localizePolicy(policy, locale);
  return {
    title: loc.title,
    description: loc.summary,
    alternates: localeAlternates(locale, `/compliance/${id}`),
    openGraph: {
      title: loc.title,
      description: loc.summary,
      type: "article",
      publishedTime: policy.updatedAt,
      modifiedTime: policy.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: loc.title,
      description: loc.summary,
    },
  };
}

export default async function Page({ params }: P) {
  const { locale, id } = await params;
  const policy = getCompliancePolicy(id);
  if (!policy) notFound();

  const loc = localizePolicy(policy, locale);
  const zh = isZh(locale);
  const cat = COMPLIANCE_CATEGORIES.find((c) => c.id === policy.category);
  const catLabel = cat ? localizeCategory(cat, locale) : policy.category;

  const related = COMPLIANCE_POLICIES.filter(
    (p) => p.category === policy.category && p.id !== policy.id
  ).slice(0, 2);
  const more =
    related.length >= 2
      ? related
      : COMPLIANCE_POLICIES.filter((p) => p.id !== policy.id).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: loc.title,
    description: loc.summary,
    datePublished: policy.updatedAt,
    dateModified: policy.updatedAt,
    inLanguage: locale,
    articleSection: catLabel,
    author: { "@type": "Organization", name: "GlobalTradeHub" },
    publisher: { "@type": "Organization", name: "GlobalTradeHub" },
    mainEntityOfPage: `${SITE_URL}/${locale}/compliance/${policy.id}`,
  };

  return (
    <main className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <a href={`/${locale}`} className="hover:text-[#1e3a5f]">
            {zh ? "首页" : "Home"}
          </a>
          <span className="mx-2">/</span>
          <a href={`/${locale}/compliance`} className="hover:text-[#1e3a5f]">
            {zh ? "政策合规" : "Compliance"}
          </a>
          <span className="mx-2">/</span>
          <span className="text-[#1e3a5f] line-clamp-1">{loc.title}</span>
        </nav>

        <a
          href={`/${locale}/compliance`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1e3a5f] transition mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {zh ? "返回政策列表" : "Back to all guides"}
        </a>

        <header className="mb-8 pb-6 border-b border-gray-200">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fbbf24]/20 text-[#b06a00] text-xs font-medium rounded-full mb-4">
            <span>{cat?.icon}</span>
            {catLabel}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] leading-snug mb-4">
            {loc.title}
          </h1>
          <p className="text-gray-600 leading-relaxed mb-5">{loc.summary}</p>
          <div className="flex flex-wrap items-center gap-5 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {zh ? "更新于" : "Updated"} {policy.updatedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {policy.readMinutes}
              {zh ? " 分钟阅读" : " min read"}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              {policy.views.toLocaleString()}
            </span>
          </div>
        </header>

        {/* 正文 */}
        <article
          className="article-body"
          dangerouslySetInnerHTML={{ __html: loc.content }}
        />

        {/* 相关 */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">
            {zh ? "继续阅读" : "Keep reading"}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {more.map((p) => {
              const pl = localizePolicy(p, locale);
              return (
                <a
                  key={p.id}
                  href={`/${locale}/compliance/${p.id}`}
                  className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-[#fbbf24] hover:shadow-md transition"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{p.icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-[#1e3a5f] leading-snug mb-1.5 group-hover:text-[#0f7491] transition-colors">
                        {pl.title}
                      </h3>
                      <span className="text-xs text-[#f59e0b] inline-flex items-center gap-1">
                        {zh ? "查看" : "Read"}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <p className="mt-10 text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-4">
          {zh
            ? "本文为跨境卖家实务要点整理，不构成法律或税务意见。法规与平台政策会持续调整，请以官方最新公告及专业顾问意见为准。"
            : "Practical guidance for sellers, not legal or tax advice. Regulations and platform policies change — verify with official sources and qualified advisers."}
        </p>
      </div>
    </main>
  );
}
