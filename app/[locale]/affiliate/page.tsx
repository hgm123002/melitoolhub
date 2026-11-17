"use client";

import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { tools } from '../../../config/tools';
import { useLanguage } from '../../i18n';
import { toolNameOf, toolIntroOf } from '../../../lib/tool-i18n';

interface Platform {
  id: string;
  name: string;
  description: string;
  image: string;
  promoLink: string;
}

interface AffiliateData {
  platforms: Platform[];
  pageSize: number;
  toolSlugs: string[];
  stats: { label: string; value: string; description: string }[];
  articles: { title: string; summary: string; link: string }[];
}

const affiliateKeyMap: Record<string, string> = {
  mercadolibre: 'mercadoLibre',
  amazon: 'amazon',
  shopee: 'shopee',
  tiktokshop: 'tiktokShop',
  clickbank: 'clickBank',
  awin: 'awin',
  impact: 'impactRadius',
  admitad: 'admitad',
  cj: 'cjAffiliate',
};

const isImageUrl = (img: string) =>
  img.startsWith('http') || img.startsWith('/') || img.endsWith('.png') || img.endsWith('.jpg') || img.endsWith('.svg');

export default function AffiliatePage() {
  const [data, setData] = useState<AffiliateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const { t, language } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/api/affiliate');
        const result = await res.json();
        setData(result);
      } catch {
        setData({
          platforms: [],
          pageSize: 6,
          toolSlugs: ['rate-converter', 'profit-calculator', 'listing-optimizer'],
          stats: [],
          articles: [],
        });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const platforms = data?.platforms || [];
  const pageSize = data?.pageSize || 6;
  const totalPages = Math.max(1, Math.ceil(platforms.length / pageSize));
  const currentPlatforms = platforms.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
  const affiliateTools = tools.filter((x: any) => data?.toolSlugs.includes(x.slug));

  if (loading && !data) {
    return <main className="bg-white min-h-screen"><div className="max-w-7xl mx-auto px-6 py-16 text-center text-[#1e3a5f]">{t('common_loading', 'Loading...')}</div></main>;
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <nav className="text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-[#1e3a5f]">{t('bc_home', 'Home')}</a>
          <span className="mx-2">/</span>
          <span className="text-[#1e3a5f]">{t('bc_affiliate', 'Affiliate')}</span>
        </nav>

        <section className="mb-12">
          <h1 className="text-4xl font-bold text-[#1e3a5f] mb-4">{t('affiliate_title', 'Cross-Border Affiliate Marketing Tools')}</h1>
          <p className="text-gray-600">{t('affiliate_subtitle', 'Connect with Mercado Libre Affiliate, Amazon Affiliate and more to generate extra revenue')}</p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-semibold text-[#f59e0b]">{t('affiliate_intro', 'Affiliate Marketing Intro')}</h2>
            <span className="text-gray-600 text-sm">{t('affiliate_totalPlatforms', 'Total')} {platforms.length} {t('affiliate_platforms', 'platforms')} · {t('affiliate_clickCard', 'Click cards to enter')}</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {currentPlatforms.map((platform) => (
              <a key={platform.id} href={platform.promoLink} target="_blank" rel="noopener noreferrer"
                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-[#fbbf24]/20 hover:border-[#fbbf24] border border-gray-200 transition cursor-pointer group hover:-translate-y-1">
                <div className="mb-4 flex items-center justify-center">
                  {isImageUrl(platform.image)
                    ? <img src={platform.image} alt={t('affiliate_' + (affiliateKeyMap[platform.id] || platform.id), platform.name)} className="w-32 h-24 object-contain rounded-xl bg-white shadow-sm" />
                    : <div className="text-5xl group-hover:scale-110 transition-transform">{platform.image}</div>}
                </div>
                <h3 className="text-[#1e3a5f] font-semibold mb-2 text-lg group-hover:text-[#f59e0b] transition-colors">{t('affiliate_' + (affiliateKeyMap[platform.id] || platform.id), platform.name)}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t('affiliate_' + (affiliateKeyMap[platform.id] || platform.id) + 'Desc', platform.description)}</p>
                <div className="mt-4 text-[#f59e0b] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                  {t('affiliate_enter', 'Enter')}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
            {currentPlatforms.length === 0 && (<div className="col-span-3 text-center py-12 text-gray-600">{t('affiliate_noData', 'No affiliate data available')}</div>)}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button onClick={() => setCurrentPage(Math.max(0, currentPage - 1))} disabled={currentPage === 0}
                className="px-4 py-2 rounded-xl bg-gray-50 text-[#1e3a5f] disabled:opacity-40">
                ← {t('affiliate_prev', 'Previous')}
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i)}
                  className={`w-10 h-10 rounded-xl font-semibold transition ${currentPage === i ? 'bg-[#fbbf24] text-[#1e3a5f]' : 'bg-gray-50 text-[#1e3a5f] hover:bg-amber-50'}`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))} disabled={currentPage === totalPages - 1}
                className="px-4 py-2 rounded-xl bg-gray-50 text-[#1e3a5f] disabled:opacity-40">
                {t('affiliate_next', 'Next')} →
              </button>
            </div>
          )}
        </section>

        {affiliateTools.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">{t('affiliate_tool', 'Affiliate Tools')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {affiliateTools.map((tool: any) => (
                <a key={tool.slug} href={`/tool/${tool.slug}`}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#fbbf24] hover:shadow-lg transition block group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-50">
                      <Sparkles className="w-5 h-5 text-[#f59e0b]" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">{toolNameOf(tool.slug, tool.name, language, t)}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{toolIntroOf(tool.slug, tool.intro || '', language, t)}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[#f59e0b] text-sm font-medium">{t('tools_useNow', 'Use Now')}</span>
                    <ArrowRight className="w-4 h-4 text-[#f59e0b]" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {data?.stats && data.stats.length > 0 && (
          <section className="mb-16 bg-gradient-to-r from-[#fbbf24]/10 to-[#f59e0b]/10 rounded-3xl p-10 border border-amber-200/50">
            <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">{t('affiliate_income', 'Revenue Overview')}</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {data.stats.map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-[#f59e0b] mb-2">{t('affiliate_stat_' + i + '_value', stat.value)}</div>
                  <div className="text-[#1e3a5f] font-semibold mb-1">{t('affiliate_stat_' + i + '_label', stat.label)}</div>
                  <div className="text-gray-600 text-sm">{t('affiliate_stat_' + i + '_desc', stat.description)}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data?.articles && data.articles.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">{t('affiliate_guide', 'Marketing Tutorials')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.articles.map((article, i) => (
                <a key={i} href={article.link} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#fbbf24] transition block">
                  <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">{t('affiliate_article_' + i + '_title', article.title)}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t('affiliate_article_' + i + '_summary', article.summary)}</p>
                  <div className="mt-4 text-[#f59e0b] text-sm font-medium flex items-center gap-1">
                    {t('affiliate_readMore', 'Read More')}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}