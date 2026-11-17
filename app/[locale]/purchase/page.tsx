import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Factory,
  FileText,
  Headset,
  Mail,
  PackageCheck,
  Search,
  ShieldCheck,
  Truck,
  Warehouse,
  TrendingDown,
  MessageSquare,
} from "lucide-react";
import { localeAlternates, SITE_URL } from "../../i18n/alternates";
import { SUPPORTED_LANGUAGES } from "../../i18n/config";
import { getPurchaseCopy, getHomeLabel } from "../../../lib/purchase";
import InquiryForm from "../../../components/purchase/InquiryForm";

type P = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((l) => ({ locale: l.code }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const c = getPurchaseCopy(locale);
  const url = `${SITE_URL}/${locale}/purchase`;
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: localeAlternates(locale, "/purchase"),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDesc,
      url,
      siteName: "GlobalTradeHub",
      type: "website",
      images: [{ url: `${SITE_URL}/hero/hero-port.webp` }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.metaTitle,
      description: c.metaDesc,
    },
  };
}

const WHY_ICONS = [Factory, ShieldCheck, Headset, PackageCheck];
const FLOW_ICONS = [MessageSquare, Search, ClipboardCheck, Truck];
const ADV_ICONS = [TrendingDown, BadgeCheck, Warehouse, FileText];

export default async function PurchasePage({ params }: P) {
  const { locale } = await params;
  const c = getPurchaseCopy(locale);
  const home = getHomeLabel(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: c.heroTitle,
        serviceType: "China sourcing agent",
        description: c.metaDesc,
        provider: {
          "@type": "Organization",
          name: "GlobalTradeHub",
          url: SITE_URL,
          email: "hgm1230002@outlook.com",
          areaServed: "Worldwide",
        },
        areaServed: "Worldwide",
        url: `${SITE_URL}/${locale}/purchase`,
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-6 lg:px-8">
        {/* 面包屑 */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href={`/${locale}`} className="transition hover:text-sky-600">
            {home}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-medium text-[#0f2b46]">{c.crumb}</span>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-[2rem] bg-[#0b2338]">
          <img
            src="/hero/hero-port.webp"
            alt={c.heroTitle}
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b2338] via-[#0b2338]/92 to-[#0b2338]/30" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />

          <div className="relative px-6 pb-8 pt-12 sm:px-10 sm:pt-16 lg:px-14 lg:pb-10 lg:pt-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-sky-200">
                <Factory className="h-3.5 w-3.5" />
                {c.heroBadge}
              </span>
              <h1 className="mt-5 max-w-[52rem] text-balance text-3xl font-bold leading-[1.32] text-white sm:text-4xl sm:leading-[1.28] lg:text-[2.75rem] lg:leading-[1.26]">
                {c.heroTitle}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200/90 sm:text-base">
                {c.heroSub}
              </p>
              <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-sky-300/90">
                {c.heroNote}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#inquiry"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-400"
                >
                  {c.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#flow"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  {c.ctaSecondary}
                </a>
              </div>
            </div>
          </div>

          {/* 信任指标条 */}
          <div className="relative grid grid-cols-2 gap-px border-t border-white/10 bg-white/5 backdrop-blur-sm sm:grid-cols-4">
            {c.stats.map(([value, label]) => (
              <div key={label} className="px-5 py-5 text-center sm:px-6">
                <div className="text-xl font-bold text-sky-300 sm:text-2xl" dir="ltr">
                  {value}
                </div>
                <div className="mt-1 text-[11px] leading-tight text-slate-300 sm:text-xs">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 为什么选我们 */}
        <section className="mt-16 sm:mt-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-[#0f2b46] sm:text-3xl">
              {c.whyTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {c.whyLead}
            </p>
          </div>

          <div className="mt-9 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {c.why.map(([title, desc], i) => {
              const Icon = WHY_ICONS[i % WHY_ICONS.length];
              return (
                <div key={title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#0f2b46]">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 服务流程 */}
        <section id="flow" className="mt-16 scroll-mt-24 sm:mt-20">
          <div className="rounded-[2rem] bg-slate-50 px-6 py-10 sm:px-10 sm:py-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-[#0f2b46] sm:text-3xl">
                {c.flowTitle}
              </h2>
              <p className="mt-3 text-sm text-slate-600 sm:text-base">
                {c.flowLead}
              </p>
            </div>

            <ol className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.flow.map(([title, desc], i) => {
                const Icon = FLOW_ICONS[i % FLOW_ICONS.length];
                return (
                  <li
                    key={title}
                    className="relative rounded-2xl border border-slate-200/80 bg-white p-5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f2b46] text-white">
                        <Icon className="h-[18px] w-[18px]" />
                      </div>
                      <span
                        className="text-2xl font-bold text-slate-200"
                        dir="ltr"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-semibold text-[#0f2b46]">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {desc}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* 服务优势 */}
        <section className="mt-16 sm:mt-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-[#0f2b46] sm:text-3xl">
              {c.advTitle}
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              {c.advLead}
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.adv.map(([title, desc], i) => {
              const Icon = ADV_ICONS[i % ADV_ICONS.length];
              return (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200/80 p-5 transition hover:border-sky-200 hover:shadow-[0_16px_40px_-24px_rgba(15,43,70,0.4)]"
                >
                  <Icon className="h-5 w-5 text-sky-600" />
                  <h3 className="mt-3 text-[15px] font-semibold text-[#0f2b46]">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16 sm:mt-20">
          <h2 className="text-2xl font-bold text-[#0f2b46] sm:text-3xl">
            {c.faqTitle}
          </h2>
          <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {c.faq.map(([q, a]) => (
              <details key={q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-[#0f2b46] marker:hidden">
                  <span>{q}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 询盘 */}
        <section id="inquiry" className="mt-16 scroll-mt-24 sm:mt-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#0f2b46] sm:text-3xl">
                {c.formTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                {c.formLead}
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href="mailto:hgm1230002@outlook.com"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-[#0f2b46] transition hover:border-sky-300 hover:bg-sky-50/50"
                >
                  <Mail className="h-4 w-4 shrink-0 text-sky-600" />
                  <span dir="ltr">hgm1230002@outlook.com</span>
                </a>
                <a
                  href="https://www.facebook.com/hgm1230002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-[#0f2b46] transition hover:border-sky-300 hover:bg-sky-50/50"
                >
                  <MessageSquare className="h-4 w-4 shrink-0 text-sky-600" />
                  <span>Facebook · hgm1230002</span>
                </a>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600">
                  <Clock className="h-4 w-4 shrink-0 text-sky-600" />
                  <span>{c.contactLead}</span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-[#0f2b46]">
                  {c.contactTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  WeChat · hgm1230002
                </p>
              </div>
            </div>

            <InquiryForm copy={c} locale={locale} />
          </div>
        </section>

        {/* 结尾 CTA */}
        <section className="mt-16 overflow-hidden rounded-[2rem] bg-[#0b2338] px-6 py-10 sm:mt-20 sm:px-12 sm:py-12">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                {c.ctaTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {c.ctaLead}
              </p>
            </div>
            <a
              href="#inquiry"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              {c.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
