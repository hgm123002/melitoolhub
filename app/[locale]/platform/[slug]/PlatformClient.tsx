'use client';

import { useParams } from 'next/navigation';
import { platforms, tools } from '../../../../config/tools';
import { useLanguage } from '../../../i18n';
import PlatformBadge from '../../../../components/PlatformBadge';

function PlatformPage() {
  // Next 16 中客户端组件通过 useParams() 获取动态路由参数
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const { t } = useLanguage();
  const platform = platforms.find(p => p.slug === slug);
  const platformTools = platform ? tools.filter(t => platform.tools.includes(t.slug)) : [];

  if (!platform) {
    return (
      <main className="bg-white min-h-screen px-6 py-16">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-4">{t('platform_notFound', '平台未找到')}</h1>
        <p className="text-[#1a2b4e]">{t('platform_notFoundDesc', '抱歉，未找到该平台专区。')}</p>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 面包屑导航 */}
        <nav className="text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-[#1e3a5f]">{t('bc_home', '首页')}</a>
          <span className="mx-2">/</span>
          <span className="text-[#1e3a5f]">{platform.name}</span>
        </nav>

        {/* 平台标题区 */}
        {/* 平台主视觉横幅 */}
        <section className="relative mb-8 rounded-3xl overflow-hidden h-40 md:h-52 bg-[#0f2038]">
          <img
            src="/hero/hero-dashboard.webp"
            alt={platform.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2038]/90 via-[#0f2038]/55 to-transparent" />
          <div className="absolute inset-0 flex items-center gap-4 px-6 md:px-10">
            <PlatformBadge slug={slug || ""} size="lg" />
            <div>
              <div className="text-sky-300 text-sm font-medium uppercase tracking-wide">
                {platform.region}
              </div>
              <div className="text-white text-2xl md:text-3xl font-bold">{platform.name}</div>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-white rounded-3xl p-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#fbbf24]/20 flex items-center justify-center shrink-0">
              <PlatformBadge slug={slug || ""} size="lg" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#1e3a5f] mb-2">{platform.name}{t('platform_toolKit', '卖家工具大全')}</h1>
              <p className="text-gray-600 mb-2">{platform.description}</p>
              <span className="px-3 py-1 bg-[#fbbf24]/20 text-[#f59e0b] text-sm rounded-full">
                {platform.region}{t('platform_region', '区域')}
              </span>
            </div>
          </div>
        </section>

        {/* 平台专属工具 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">{t('platform_tools', '专属工具')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformTools.map((tool) => (
              <a
                key={tool.slug}
                href={`/tool/${tool.slug}`}
                className="bg-white rounded-3xl p-6 hover:bg-[#fbbf24]/30 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#fbbf24]/20 flex items-center justify-center shrink-0">
                    <span className="text-xl">🔧</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">{tool.name}</h3>
                    <p className="text-gray-600 text-sm">{tool.content.intro}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 平台运营干货 */}
        <section>
          <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">{t('platform_articles', '运营干货')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: `${platform.name}${t('platform_article1', '平台入驻指南')}`, summary: t('platform_article1_desc', '详细介绍如何入驻该平台，包括资质要求、注册流程、审核标准等。') },
              { title: `${platform.name}${t('platform_article2', '选品技巧分享')}`, summary: t('platform_article2_desc', '分析平台热销品类，分享选品策略、市场趋势和竞争分析。') },
              { title: `${platform.name}${t('platform_article3', '运营策略解析')}`, summary: t('platform_article3_desc', '深度解析平台算法规则，提升产品曝光、排名和销量。') },
              { title: `${platform.name}${t('platform_article4', '物流解决方案')}`, summary: t('platform_article4_desc', '推荐适合该平台的物流渠道，优化配送效率和成本。') },
            ].map((article, index) => (
              <article key={index} className="bg-white rounded-2xl p-6 hover:bg-[#fbbf24]/30 transition cursor-pointer">
                <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm">{article.summary}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
export default PlatformPage;
