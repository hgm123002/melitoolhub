"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../i18n";
import { blogCopyFor } from "../../../lib/blog";

const CATEGORY_KEYS = ["select", "operation", "logistics", "policy", "tools"];

const ARTICLES_META = [
  {
    id: "1",
    titleKey: "blog_article1_title",
    summaryKey: "blog_article1_summary",
    categoryKey: "blog_category_select",
    cover:
    "/blog-covers/zh-01.webp",
    views: 3284,
    updatedAt: "2026-06-22",
  },
  {
    id: "2",
    titleKey: "blog_article2_title",
    summaryKey: "blog_article2_summary",
    categoryKey: "blog_category_policy",
    cover:
    "/blog-covers/zh-02.webp",
    views: 2847,
    updatedAt: "2026-06-20",
  },
  {
    id: "3",
    titleKey: "blog_article3_title",
    summaryKey: "blog_article3_summary",
    categoryKey: "blog_category_logistics",
    cover:
    "/blog-covers/zh-03.webp",
    views: 1923,
    updatedAt: "2026-06-18",
  },
  {
    id: "4",
    titleKey: "blog_article4_title",
    summaryKey: "blog_article4_summary",
    categoryKey: "blog_category_operation",
    cover:
    "/blog-covers/zh-04.webp",
    views: 2105,
    updatedAt: "2026-06-15",
  },
  {
    id: "5",
    titleKey: "blog_article5_title",
    summaryKey: "blog_article5_summary",
    categoryKey: "blog_category_tools",
    cover:
    "/blog-covers/zh-05.webp",
    views: 1567,
    updatedAt: "2026-06-12",
  },
  {
    id: "6",
    titleKey: "blog_article6_title",
    summaryKey: "blog_article6_summary",
    categoryKey: "blog_category_select",
    cover:
    "/blog-covers/zh-06.webp",
    views: 2431,
    updatedAt: "2026-06-10",
  },
  {
    id: "7",
    titleKey: "blog_article7_title",
    summaryKey: "blog_article7_summary",
    categoryKey: "blog_category_operation",
    cover:
    "/blog-covers/zh-07.webp",
    views: 1823,
    updatedAt: "2026-06-08",
  },
  {
    id: "8",
    titleKey: "blog_article8_title",
    summaryKey: "blog_article8_summary",
    categoryKey: "blog_category_logistics",
    cover:
    "/blog-covers/zh-08.webp",
    views: 1756,
    updatedAt: "2026-06-05",
  },
  {
    id: "9",
    titleKey: "blog_article9_title",
    summaryKey: "blog_article9_summary",
    categoryKey: "blog_category_policy",
    cover:
    "/blog-covers/zh-09.webp",
    views: 1632,
    updatedAt: "2026-06-03",
  },
  {
    id: "10",
    titleKey: "blog_article10_title",
    summaryKey: "blog_article10_summary",
    categoryKey: "blog_category_tools",
    cover:
    "/blog-covers/zh-10.webp",
    views: 1489,
    updatedAt: "2026-06-01",
  },
  // ===== 10 篇 SEO 长文（内容见 lib/articles-seo.ts，此处仅列表元信息） =====
  {
    id: "11",
    titleKey: "How to Calculate Amazon FBA Profit Margin (Step-by-Step Formula)",
    summaryKey: "A worked example of Amazon FBA profit margin — referral fees, fulfillment, freight, ads and returns, with the formula you can reuse.",
    categoryKey: "blog_category_tools",
    cover: "/blog-covers/en-11.webp",
    views: 0,
    updatedAt: "2026-11-10",
  },
  {
    id: "12",
    titleKey: "Amazon Keyword Research Without Paid Tools: A Realistic Workflow",
    summaryKey: "Build a usable keyword list from competitor titles, autocomplete and your search-term report — and know where free data honestly stops.",
    categoryKey: "blog_category_select",
    cover: "/blog-covers/en-12.webp",
    views: 0,
    updatedAt: "2026-11-09",
  },
  {
    id: "13",
    titleKey: "Mercado Libre Title Rules: The 60-Character Constraint",
    summaryKey: "Mercado Libre caps titles at 60 characters. How to allocate them, what to cut, and the mistakes that cost Latin American sellers visibility.",
    categoryKey: "blog_category_operation",
    cover: "/blog-covers/en-13.webp",
    views: 0,
    updatedAt: "2026-11-08",
  },
  {
    id: "14",
    titleKey: "Ozon Seller Fees Explained: What Actually Eats Your Margin",
    summaryKey: "Commission, fulfillment, last-mile, acquiring and returns on Ozon — and how to price for a real margin in Russia.",
    categoryKey: "blog_category_policy",
    cover: "/blog-covers/en-14.webp",
    views: 0,
    updatedAt: "2026-11-07",
  },
  {
    id: "15",
    titleKey: "Shopee vs Lazada Fees: A Seller Cost Comparison",
    summaryKey: "Commission, payment fees, shipping subsidies and penalties compared — plus how to model one SKU across both platforms.",
    categoryKey: "blog_category_policy",
    cover: "/blog-covers/en-15.webp",
    views: 0,
    updatedAt: "2026-11-06",
  },
  {
    id: "16",
    titleKey: "How to Audit Competitor Titles and Find Missing Keywords",
    summaryKey: "Collect 20 titles, count term frequency, measure seed coverage, then rebuild a title that fits your marketplace limit.",
    categoryKey: "blog_category_select",
    cover: "/blog-covers/en-16.webp",
    views: 0,
    updatedAt: "2026-11-05",
  },
  {
    id: "17",
    titleKey: "FBA vs FBM: A Cost Breakdown You Can Actually Compare",
    summaryKey: "Fulfillment fees, storage, returns handling and cash flow — with a structural view of fixed versus marginal cost.",
    categoryKey: "blog_category_logistics",
    cover: "/blog-covers/en-17.webp",
    views: 0,
    updatedAt: "2026-11-04",
  },
  {
    id: "18",
    titleKey: "Cross-Border VAT and GST: What New Sellers Get Wrong",
    summaryKey: "Registration thresholds, marketplace-facilitated collection, IOSS and the record-keeping that keeps you compliant.",
    categoryKey: "blog_category_policy",
    cover: "/blog-covers/en-18.webp",
    views: 0,
    updatedAt: "2026-11-03",
  },
  {
    id: "19",
    titleKey: "TikTok Shop Product Selection: What Actually Sells",
    summaryKey: "Short-video commerce rewards demonstration over specification. A selection framework built on demonstrability and creator supply.",
    categoryKey: "blog_category_select",
    cover: "/blog-covers/en-19.webp",
    views: 0,
    updatedAt: "2026-11-02",
  },
  {
    id: "20",
    titleKey: "How to Vet a China Supplier Before You Send a Deposit",
    summaryKey: "Business licence checks, sample protocol, factory versus trading company, payment terms and pre-shipment inspection.",
    categoryKey: "blog_category_operation",
    cover: "/blog-covers/en-20.webp",
    views: 0,
    updatedAt: "2026-11-01",
  },
];

function BlogPage() {
  const { t, language } = useLanguage();
  const pack = blogCopyFor(language);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 强制 language 变化时重置
  useEffect(() => {
    setCurrentPage(1);
  }, [language]);

  const categories = [
    { key: "all", labelKey: "blog_all" },
    ...CATEGORY_KEYS.map((k) => ({ key: k, labelKey: `blog_category_${k}` })),
  ];

  const filteredArticles = (
    activeCategory === "all"
      ? ARTICLES_META
      : ARTICLES_META.filter(
          (a) => a.categoryKey === `blog_category_${activeCategory}`,
        )
  )
    // 最新发布优先：保证新增长文出现在首页第一屏，利于收录与内链
    .slice()
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / itemsPerPage),
  );
  const pageArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const getCategoryCount = (cat: string) => {
    if (cat === "all") return ARTICLES_META.length;
    return ARTICLES_META.filter((a) => a.categoryKey === `blog_category_${cat}`)
      .length;
  };

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <nav className="text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-[#1e3a5f]">
            {t("bc_home", "Home")}
          </a>
          <span className="mx-2">/</span>
          <span className="text-[#1e3a5f]">{t("bc_blog", "Insights")}</span>
        </nav>

        <section className="mb-12">
          <h1 className="text-4xl font-bold text-[#1e3a5f] mb-4">
            {t("blog_title", "Cross-Border E-Commerce Insights")}
          </h1>
          <p className="text-gray-600">
            {t(
              "blog_subtitle",
              "Sharing operational experience, product research tips, logistics guides and more",
            )}{" "}
            · {t("blog_articlesTotal", "articles").replace("articles", "")}{" "}
            {ARTICLES_META.length} {t("blog_articlesTotal", "articles")}
          </p>
        </section>

        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeCategory === cat.key
                    ? "bg-[#fbbf24] text-[#1e3a5f]"
                    : "bg-white text-[#1a2b4e] hover:bg-[#fbbf24]/30"
                }`}
              >
                {t(cat.labelKey, cat.labelKey)}
                <span className="ml-1 text-xs opacity-70">
                  ({getCategoryCount(cat.key)})
                </span>
              </button>
            ))}
          </div>
        </div>

        {pageArticles.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p>{t("blog_noArticles", "No articles in this category yet")}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {pageArticles.map((article) => (
              <a
                key={article.id}
                href={`/blog/${article.id}`}
                className="bg-white rounded-3xl overflow-hidden hover:bg-[#fbbf24]/30 transition cursor-pointer block"
              >
                <div className="aspect-[16/9] bg-white w-full overflow-hidden relative">
                  {article.cover.startsWith("http") || article.cover.startsWith("/") ? (
                    <img
                      src={article.cover}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[16rem] leading-none md:text-[18rem] scale-110">
                        {article.cover}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="px-3 py-1 bg-[#fbbf24]/20 text-[#f59e0b] text-xs rounded-full mb-3 block w-fit">
                    {t(article.categoryKey, article.categoryKey)}
                  </span>
                  <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2 line-clamp-2">
                    {(pack && pack[article.id]?.title) || t(article.titleKey, article.titleKey)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {(pack && pack[article.id]?.summary) || t(article.summaryKey, article.summaryKey)}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{article.updatedAt}</span>
                    <span>
                      👁️ {article.views.toLocaleString()}{" "}
                      {t("blog_views", "views")}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-white transition disabled:opacity-50"
            >
              ← {t("blog_prev", "Previous")}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition ${
                  page === currentPage
                    ? "bg-[#fbbf24] text-[#1e3a5f]"
                    : "bg-white text-gray-600 hover:bg-white"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-white transition disabled:opacity-50"
            >
              {t("blog_next", "Next")} →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default BlogPage;
