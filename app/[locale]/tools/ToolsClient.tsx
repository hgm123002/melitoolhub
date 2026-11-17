"use client";

import { useState, useEffect } from "react";

import {
  ArrowRight,
  Wrench,
  LayoutGrid,
  Brain,
  Search,
  Shield,
  DollarSign,
  FileText,
  Truck,
  Database,
} from "lucide-react";
import { tools, categories } from "../../../config/tools";
import { toolArt } from "../../../lib/tool-art";
import {
  catNameOf,
  toolIntroOf,
  toolNameOf,
} from "../../../lib/tool-i18n";
import { useLanguage } from "../../i18n";

const CATEGORY_ICONS: Record<string, typeof LayoutGrid> = {
  "ai-workbench": Brain,
  "product-research": Search,
  "risk-management": Shield,
  "currency-tools": DollarSign,
  "listing-optimization": FileText,
  "shipping-calculator": Truck,
  "data-processing": Database,
};

function ToolsPage() {
  return <ToolsPageContent />;
}

function ToolsPageContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { t, language } = useLanguage();

  // 从 URL 读取分类筛选（用 window.location 而非 useSearchParams：
  // 避免 Suspense 兜底导致工具列表无法服务端直出，影响 SEO 与图片收录）
  useEffect(() => {
    try {
      const category = new URLSearchParams(window.location.search).get("category");
      if (category && categories.some((c) => c.slug === category)) {
        setActiveCategory(category);
      }
    } catch {}
  }, []);

  const filteredTools = activeCategory
    ? tools.filter((x) => x.category === activeCategory)
    : tools;

  const activeCategoryMeta = activeCategory
    ? categories.find((c) => c.slug === activeCategory)
    : null;

  const countOf = (slug: string) =>
    tools.filter((x) => x.category === slug).length;

  const selectCategory = (slug: string | null) => {
    setActiveCategory(slug);
    // 同步到地址栏，便于分享与返回
    try {
      const url = new URL(window.location.href);
      if (slug) url.searchParams.set("category", slug);
      else url.searchParams.delete("category");
      window.history.replaceState(null, "", url.toString());
    } catch {}
  };

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
        {/* 面包屑 */}
        <nav className="text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-[#1e3a5f]">
            {t("bc_home", "Home")}
          </a>
          <span className="mx-2">/</span>
          <span className="text-[#1e3a5f]">{t("bc_tools", "Tools")}</span>
        </nav>

        {/* 页面标题 */}
        <section className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e3a5f] mb-3">
            {t("tools_title", "Complete Tool Collection")}
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            {t(
              "tools_subtitle",
              "Practical tools designed for cross-border sellers to improve operational efficiency",
            )}
          </p>
        </section>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* ===== 左侧菜单 ===== */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-[#1e3a5f]">
                <h2 className="text-white text-sm font-semibold">
                  {t("tools_menuTitle", "Tool Categories")}
                </h2>
              </div>
              <nav className="p-2 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible">
                <button
                  onClick={() => selectCategory(null)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left whitespace-nowrap transition shrink-0 ${
                    activeCategory === null
                      ? "bg-[#fbbf24] text-[#1e3a5f] shadow-sm font-semibold"
                      : "text-[#1a2b4e] hover:bg-[#fbbf24]/10"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4 shrink-0" />
                  <span className="text-sm flex-1">
                    {t("tools_all", "All Tools")}
                  </span>
                  <span
                    className={`hidden lg:inline text-xs ${
                      activeCategory === null
                        ? "text-[#1e3a5f]/70"
                        : "text-gray-400"
                    }`}
                  >
                    {tools.length}
                  </span>
                </button>

                {categories.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.slug] || Wrench;
                  const active = activeCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => selectCategory(cat.slug)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left whitespace-nowrap transition shrink-0 ${
                        active
                          ? "bg-[#fbbf24] text-[#1e3a5f] shadow-sm font-semibold"
                          : "text-[#1a2b4e] hover:bg-[#fbbf24]/10"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-sm flex-1">
                        {catNameOf(cat.slug, cat.name, language, t)}
                      </span>
                      <span
                        className={`hidden lg:inline text-xs ${
                          active ? "text-[#1e3a5f]/70" : "text-gray-400"
                        }`}
                      >
                        {countOf(cat.slug)}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ===== 右侧功能区 ===== */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#1e3a5f]">
                  {activeCategoryMeta
                    ? catNameOf(
                        activeCategoryMeta.slug,
                        activeCategoryMeta.name,
                        language,
                        t,
                      )
                    : t("tools_all", "All Tools")}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredTools.length} {t("tools_countUnit", "tools")}
                </p>
              </div>
              {activeCategory === "ai-workbench" && (
                <a
                  href="/tools/ai-workbench"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1e3a5f] text-white text-sm font-medium hover:bg-[#16304d] transition"
                >
                  {t("tools_openWorkbench", "Open AI Workbench")}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <a
                  key={tool.slug}
                  href={(() => {
                    // 特殊工具路径映射
                    if (tool.slug === "product-analysis") {
                      return "/tools/product-analysis";
                    }
                    if (tool.slug === "keyword-lab") {
                      return "/tools/keyword-lab";
                    }
                    if (tool.slug && tool.slug.startsWith("ai-")) {
                      const m: Record<string, string> = {
                        "ai-document": "/tools/ai-workbench/document",
                        "ai-image-ocr": "/tools/ai-workbench/image",
                        "ai-pdf-summary": "/tools/ai-workbench/pdf-summary",
                        "ai-code-dev": "/tools/ai-workbench/code-dev",
                        "ai-video-translate": "/tools/ai-workbench/video-translate",
                      };
                      return m[tool.slug] || "/tools/ai-workbench";
                    }
                    return "/tool/" + tool.slug;
                  })()}
                  className="group bg-white rounded-2xl p-6 overflow-hidden hover:bg-[#fbbf24]/10 transition border border-gray-200 hover:border-[#fbbf24] hover:shadow-lg block"
                >
                  {/* 工具主视觉 */}
                  <div className="-mx-6 -mt-6 mb-5 h-32 overflow-hidden bg-[#0f2038]">
                    <img
                      src={toolArt(tool.slug, tool.category)}
                      alt={toolNameOf(tool.slug, tool.name, language, t)}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl flex-shrink-0">{tool.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#1e3a5f] mb-1">
                        {toolNameOf(tool.slug, tool.name, language, t)}
                      </h3>
                      <span className="inline-block text-xs text-[#f59e0b] bg-amber-50 px-2 py-0.5 rounded-full">
                        {catNameOf(
                          tool.category,
                          tool.categoryName || "",
                          language,
                          t,
                        )}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-4 leading-relaxed line-clamp-3">
                    {toolIntroOf(tool.slug, tool.intro || "", language, t)}
                  </p>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                    <span className="text-[#f59e0b] text-sm font-medium">
                      {t("tools_useNow", "Use Now")}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#f59e0b] group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
              {filteredTools.length === 0 && (
                <div className="col-span-3 text-center py-12 text-gray-500">
                  {t("tools_noResult", "No tools found")}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 底部提示 */}
        <section className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 md:p-10 border border-amber-200/50">
          <div className="flex items-start gap-4">
            <Wrench className="w-8 h-8 text-[#f59e0b] flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-2">
                {t("tools_needOther", "Need other tools?")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t(
                  "tools_suggestCommunity",
                  "If you have other tool needs, please visit our community to make suggestions. We continuously update our tool library",
                )}
              </p>
              <a
                href="/community"
                className="inline-flex items-center gap-2 text-[#f59e0b] hover:text-[#fbbf24] text-sm font-medium"
              >
                {t("tools_goCommunity", "Go to Community")}{" "}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ToolsPage;
