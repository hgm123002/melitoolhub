"use client";

import { tools, categories, platforms } from "../../config/tools";
import HeroCarousel from "../../components/HeroCarousel";
import PlatformBadge from "../../components/PlatformBadge";
import { toolArt } from "../../lib/tool-art";
import { toolDescKey, toolIntroOf, toolKey, toolNameOf } from "../../lib/tool-i18n";
import { useLanguage } from "../i18n";

function Home() {
  const { t, language } = useLanguage();
  const hotTools = tools.slice(0, 6);

  const regionalPlatforms = [
    { regionKey: "region_latam", icon: "🌎", platforms: ["mercado-libre"] },
    { regionKey: "region_russia", icon: "❄️", platforms: ["ozon"] },
    { regionKey: "region_sea", icon: "🌴", platforms: ["shopee"] },
    {
      regionKey: "region_global",
      icon: "🌐",
      platforms: ["amazon", "tiktok-shop"],
    },
  ];

  const latestArticles = [
    { titleKey: "blog_article1_title", categoryKey: "blog_category_select" },
    { titleKey: "blog_article2_title", categoryKey: "blog_category_policy" },
    { titleKey: "blog_article3_title", categoryKey: "blog_category_logistics" },
    { titleKey: "blog_article4_title", categoryKey: "blog_category_operation" },
  ];

  const categoryStyleMap: Record<
    string,
    { icon: string; bg: string; hover: string }
  > = {
    "product-research": {
      icon: "🔍",
      bg: "bg-blue-50",
      hover: "hover:bg-blue-100",
    },
    "risk-management": {
      icon: "🛡️",
      bg: "bg-slate-100",
      hover: "hover:bg-slate-200",
    },
    "currency-tools": {
      icon: "💲",
      bg: "bg-emerald-50",
      hover: "hover:bg-emerald-100",
    },
    "listing-optimization": {
      icon: "📄",
      bg: "bg-indigo-50",
      hover: "hover:bg-indigo-100",
    },
    "shipping-calculator": {
      icon: "🚚",
      bg: "bg-cyan-50",
      hover: "hover:bg-cyan-100",
    },
    "data-processing": {
      icon: "🗄️",
      bg: "bg-violet-50",
      hover: "hover:bg-violet-100",
    },
    "ai-workbench": {
      icon: "🧠",
      bg: "bg-pink-50",
      hover: "hover:bg-pink-100",
    },
  };

  return (
    <main className="bg-white">
      <HeroCarousel />

      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-8 text-center">
            {t("home_toolCategories", "Tool Categories")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const style =
                categoryStyleMap[category.slug] ||
                categoryStyleMap["product-research"];
              // 选品分析/Listing优化 → 直接进入对应功能页；AI智能工作台 → 工具列表页带筛选；其他分类 → 工具列表页
              const categoryUrl =
                category.slug === "product-research"
                  ? "/tools/product-analysis"
                  : category.slug === "listing-optimization"
                    ? "/tool/listing-optimizer"
                    : category.slug === "ai-workbench"
                      ? "/tools/ai-workbench"
                      : "/tools";
              return (
                <a
                  key={category.slug}
                  href={categoryUrl}
                  className={`bg-white rounded-3xl p-6 transition text-left border border-gray-100 ${style.hover}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${style.bg} flex items-center justify-center`}
                    >
                      <span className="text-xl">{style.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1e3a5f] mb-1">
                        {t(
                          `ts_${category.slug.replace(/-/g, "")}`,
                          category.name,
                        )}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {t(
                          `ts_${category.slug.replace(/-/g, "")}Desc`,
                          category.description,
                        )}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-8 text-center">
            {t("home_platformZone", "Platform Zone")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalPlatforms.map((item) => (
              <div
                key={item.regionKey}
                className="group relative overflow-hidden rounded-3xl p-6 pt-7 text-center cursor-pointer border border-[#f0b429]/25 bg-gradient-to-b from-[#fdf6e6] via-[#fdf8ef] to-[#fbf2e0] shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#f0b429]/45 hover:from-[#fcefcf] hover:to-[#fae4b8] hover:shadow-[0_14px_30px_-14px_rgba(240,180,41,0.55)]"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#f7c948] via-[#f0b429] to-[#e79a1f]" />
                <div className="flex justify-center mb-4">
                  <PlatformBadge slug={item.platforms[0]} size="lg" />
                </div>
                <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">
                  {t(item.regionKey, item.regionKey)}
                </h3>
                <p className="text-[#8a7452] text-sm">
                  {item.platforms.length}{" "}
                  {t(
                    item.platforms.length === 1
                      ? "home_platformOne"
                      : "home_platformsLabel",
                    "platforms",
                  )}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {item.platforms.map((slug) => {
                    const platform = platforms.find((p) => p.slug === slug);
                    return platform ? (
                      <a
                        key={platform.slug}
                        href={`/platform/${platform.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/85 text-[#a1660a] text-xs font-medium rounded-full border border-[#f0b429]/30 hover:bg-white hover:border-[#f0b429]/60 transition"
                      >
                        <PlatformBadge slug={slug} size="sm" />
                        {t(`plat_${slug.replace(/-/g, "")}`, platform.name)}
                      </a>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#1e3a5f]">
              {t("home_hotTools", "Popular Tools")}
            </h2>
            <a href="/tools" className="text-[#f59e0b] hover:underline">
              {t("home_viewAll", "View All →")}
            </a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotTools.map((tool) => (
              <a
                key={tool.slug}
                href={`/tool/${tool.slug}`}
                className="group bg-white rounded-3xl overflow-hidden hover:bg-[#fbbf24]/20 transition shadow-sm hover:shadow-lg"
              >
                <div className="h-36 overflow-hidden bg-[#0f2038]">
                  <img
                    src={toolArt(tool.slug, tool.category)}
                    alt={toolNameOf(tool.slug, tool.name, language, t)}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">
                    {toolNameOf(tool.slug, tool.name, language, t)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {toolIntroOf(tool.slug, tool.intro, language, t)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#1e3a5f]">
              {t("home_latestBlog", "Latest Insights")}
            </h2>
            <a href="/blog" className="text-[#f59e0b] hover:underline">
              {t("home_viewAll", "View All →")}
            </a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {latestArticles.map((article, index) => (
              <article
                key={index}
                className="bg-gray-50 rounded-2xl p-4 hover:bg-[#fbbf24]/20 transition cursor-pointer"
              >
                <span className="px-2 py-1 bg-[#fbbf24]/20 text-[#f59e0b] text-xs rounded-full mb-2 block">
                  {t(article.categoryKey, article.categoryKey)}
                </span>
                <h3 className="text-[#1e3a5f] font-medium text-sm line-clamp-2">
                  {t(article.titleKey, article.titleKey)}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
