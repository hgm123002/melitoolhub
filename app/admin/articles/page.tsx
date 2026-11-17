"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  Filter,
} from "lucide-react";
import AdminLayoutClient from "../AdminLayoutClient";
import {
  getArticles,
  deleteArticle,
  toggleArticleStatus,
  type Article,
  ARTICLE_CATEGORIES,
} from "../../../lib/articles";
import { useLanguage } from "@/app/i18n/LanguageContext";

const ARTICLE_CATEGORY_MAP: Record<string, string> = {
  选品技巧: "acat_selection",
  运营策略: "acat_operation",
  物流指南: "acat_logistics",
  政策解读: "acat_policy",
  工具教程: "acat_tools",
};

const ALL_CAT = "__ALL__";

export default function ArticlesListPage() {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>(ALL_CAT);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "published" | "draft" | "scheduled"
  >("all");

  const loadArticles = () => {
    setArticles(getArticles());
  };

  const handleDelete = (id: string, title: string) => {
    if (
      confirm(
        t("admin_confirm_delete", `确定删除《${title}》吗？`).replace(
          "{title}",
          title,
        ),
      )
    ) {
      deleteArticle(id);
      loadArticles();
    }
  };

  const handleToggleStatus = (id: string) => {
    toggleArticleStatus(id);
    loadArticles();
  };

  const publishedCount = articles.filter(
    (a) => a.status === "published",
  ).length;
  const draftCount = articles.filter((a) => a.status === "draft").length;
  const scheduledCount = articles.filter(
    (a) => a.status === "draft" && a.publishAt,
  ).length;

  const isScheduled = (a: Article) => a.status === "draft" && !!a.publishAt;

  const formatScheduledTime = (iso: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const mins = String(d.getMinutes()).padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day} ${hours}:${mins}`;
  };

  const filteredArticles = articles.filter((article) => {
    const matchSearch =
      article.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchCategory =
      filterCategory === ALL_CAT || article.category === filterCategory;
    let matchStatus = true;
    if (filterStatus === "all") {
      matchStatus = true;
    } else if (filterStatus === "scheduled") {
      matchStatus = article.status === "draft" && !!article.publishAt;
    } else {
      matchStatus = article.status === filterStatus;
    }
    return matchSearch && matchCategory && matchStatus;
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const totalText = t(
    "admin_art_total",
    "共 {n} 篇 · 已发布 {p} · 草稿 {d} · 定时发布 {s}",
  )
    .replace("{n}", String(articles.length))
    .replace("{p}", String(publishedCount))
    .replace("{d}", String(draftCount - scheduledCount))
    .replace("{s}", String(scheduledCount));

  const allCat = t("admin_art_allCat", "全部分类");
  const allStatus = t("admin_art_allStatus", "全部状态");

  return (
    <AdminLayoutClient>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {t("admin_art_title", "文章管理")}
            </h1>
            <p className="text-gray-600 mt-1">{totalText}</p>
          </div>
          <a
            href="/admin/articles/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#fbbf24] text-[#1e3a5f] rounded-lg hover:bg-[#fbbf24] transition font-medium"
          >
            <Plus className="w-5 h-5" />
            {t("admin_art_new", "新建文章")}
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
              <input
                type="text"
                placeholder={t("admin_art_search", "搜索文章标题或摘要...")}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fbbf24] outline-none transition text-gray-900 placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fbbf24] outline-none bg-white cursor-pointer text-gray-900"
              >
                <option value={ALL_CAT}>{allCat}</option>
                {ARTICLE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {t(ARTICLE_CATEGORY_MAP[cat] || cat, cat)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fbbf24] outline-none bg-white cursor-pointer"
              >
                <option value="all">{allStatus}</option>
                <option value="published">
                  {t("admin_art_published", "已发布")}
                </option>
                <option value="draft">{t("admin_art_draft", "草稿")}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>

            <button
              onClick={() => {
                setSearchKeyword("");
                setFilterCategory(ALL_CAT);
                setFilterStatus("all");
              }}
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
            >
              {t("admin_art_reset", "重置")}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredArticles.length === 0 ? (
            <div className="py-16 text-center">
              <Filter className="w-12 h-12 text-[#1a2b4e] mx-auto mb-4" />
              <p className="text-gray-600">
                {t("admin_art_none", "暂无匹配的文章")}
              </p>
              <a
                href="/admin/articles/new"
                className="inline-block mt-4 text-[#1e3a5f] hover:text-[#f59e0b] text-sm"
              >
                {t("admin_art_createFirst", "+ 新建一篇文章")}
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      {t("admin_art_cover", "封面")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      {t("admin_art_titleCol", "标题")}
                    </th>
                    <th className="px-6 py-3 text-left">
                      <div className="relative">
                        <select
                          value={filterCategory}
                          onChange={(e) => setFilterCategory(e.target.value)}
                          className="appearance-none pl-2 pr-6 py-1 border border-gray-300 rounded-md text-xs font-semibold text-gray-600 uppercase focus:ring-2 focus:ring-[#fbbf24] outline-none bg-white cursor-pointer"
                        >
                          <option value={ALL_CAT}>
                            {t("admin_art_catSelect", "选择分类")}
                          </option>
                          {ARTICLE_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {t(ARTICLE_CATEGORY_MAP[cat] || cat, cat)}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <div className="relative">
                        <select
                          value={filterStatus}
                          onChange={(e) =>
                            setFilterStatus(e.target.value as any)
                          }
                          className="appearance-none pl-2 pr-6 py-1 border border-gray-300 rounded-md text-xs font-semibold text-gray-600 uppercase focus:ring-2 focus:ring-[#fbbf24] outline-none bg-white cursor-pointer"
                        >
                          <option value="all">
                            {t("admin_art_statusSelect", "选择状态")}
                          </option>
                          <option value="published">
                            {t("admin_art_published", "已发布")}
                          </option>
                          <option value="draft">
                            {t("admin_art_draft", "草稿")}
                          </option>
                          <option value="scheduled">
                            {t("admin_art_scheduled", "定时发布")}
                          </option>
                        </select>
                        <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      {t("admin_art_views", "浏览")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      {t("admin_art_updated", "更新时间")}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                      {t("admin_art_actions", "操作")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredArticles.map((article) => (
                    <tr
                      key={article.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden">
                          {article.cover.startsWith("http") ? (
                            <img
                              src={article.cover}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-5xl leading-none">
                                {article.cover}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800 line-clamp-2">
                          {article.title}
                        </div>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                          {article.summary}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-50 text-[#1e3a5f] text-xs rounded-full font-medium">
                          {t(
                            ARTICLE_CATEGORY_MAP[article.category] ||
                              article.category,
                            article.category,
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {isScheduled(article) ? (
                          <div>
                            <span className="px-3 py-1 bg-blue-50 text-[#1e3a5f] text-xs rounded-full font-medium inline-block mb-1">
                              ⏰ {t("admin_art_scheduled", "定时发布")}
                            </span>
                            <p className="text-xs text-gray-600 mt-1">
                              {formatScheduledTime(article.publishAt!)}
                            </p>
                          </div>
                        ) : article.status === "published" ? (
                          <span className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full font-medium">
                            {t("admin_art_published", "已发布")}
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                            {t("admin_art_draft", "草稿")}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {article.views.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {article.updatedAt}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleStatus(article.id)}
                            className="p-2 text-gray-600 hover:text-[#1e3a5f] hover:bg-blue-50 rounded-lg transition"
                            title={
                              article.status === "published"
                                ? t("admin_art_toDraft", "转为草稿")
                                : t("admin_art_publishBtn", "发布")
                            }
                          >
                            {article.status === "published" ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          <a
                            href={`/admin/articles/${article.id}/edit`}
                            className="px-3 py-1.5 text-sm text-[#1e3a5f] hover:bg-blue-50 rounded-lg transition"
                          >
                            {t("admin_art_edit", "编辑")}
                          </a>
                          <button
                            onClick={() =>
                              handleDelete(article.id, article.title)
                            }
                            className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            {t("admin_art_delete", "删除")}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayoutClient>
  );
}
