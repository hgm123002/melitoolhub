// app/admin/articles/new/page.tsx
"use client";

import { useState } from "react";
import { ArrowLeft, Save, Eye } from "lucide-react";
import AdminLayoutClient from "../../AdminLayoutClient";
import {
  createArticle,
  ARTICLE_CATEGORIES,
  type ArticleCategory,
} from "../../../../lib/articles";
import { useLanguage } from "@/app/i18n/LanguageContext";

const ARTICLE_CATEGORY_MAP: Record<string, string> = {
  选品技巧: "acat_selection",
  运营策略: "acat_operation",
  物流指南: "acat_logistics",
  政策解读: "acat_policy",
  工具教程: "acat_tools",
};

export default function NewArticlePage() {
  const { t } = useLanguage();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("📦");
  const [category, setCategory] = useState<ArticleCategory>(
    ARTICLE_CATEGORIES[0],
  );
  const [status, setStatus] = useState<"published" | "draft" | "scheduled">(
    "published",
  );
  const [publishAt, setPublishAt] = useState(""); // 格式: YYYY-MM-DDTHH:mm
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState("");

  const coverOptions = [
    "📦",
    "🔍",
    "🚚",
    "📱",
    "🧮",
    "🛒",
    "📊",
    "📝",
    "🔧",
    "⭐",
    "💡",
    "🎯",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError(t("admin_art_err_title", "请填写文章标题"));
      return;
    }
    if (!summary.trim()) {
      setError(t("admin_art_err_summary", "请填写文章摘要"));
      return;
    }
    if (!content.trim()) {
      setError(t("admin_art_err_content", "请填写文章正文"));
      return;
    }
    if (status === "scheduled" && !publishAt) {
      setError(t("admin_art_err_scheduled", "请选择定时发布时间"));
      return;
    }

    const finalStatus: "published" | "draft" =
      status === "published" ? "published" : "draft";
    const finalPublishAt = status === "scheduled" ? publishAt : undefined;

    createArticle({
      title: title.trim(),
      summary: summary.trim(),
      content: content.trim(),
      cover,
      category,
      status: finalStatus,
      publishAt: finalPublishAt,
    });

    const msg =
      status === "scheduled"
        ? t(
            "admin_art_scheduledMsg",
            "文章已保存，将于 {time} 自动发布！",
          ).replace("{time}", publishAt.replace("T", " "))
        : t("admin_art_createSuccess", "文章创建成功！");
    alert(msg);
    window.location.href = "/admin/articles";
  };

  return (
    <AdminLayoutClient>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/admin/articles"
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <h1 className="text-2xl font-bold text-gray-800">
              {t("admin_art_newTitle", "新建文章")}
            </h1>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
          >
            <Eye className="w-4 h-4" />
            {showPreview
              ? t("admin_art_closePreview", "关闭预览")
              : t("admin_art_preview", "预览")}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}

        {showPreview && (
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="max-w-4xl mx-auto">
              <span className="px-3 py-1 bg-[#fbbf24]/20 text-[#f59e0b] text-xs rounded-full mb-4 inline-block">
                {t(ARTICLE_CATEGORY_MAP[category] || category, category)}
              </span>
              <h1 className="text-4xl font-bold text-[#1e3a5f] mb-4">
                {title || t("admin_art_untitled", "（未填写标题）")}
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                {summary || t("admin_art_noSummary", "（未填写摘要）")}
              </p>
              <div className="aspect-[16/9] w-full bg-white rounded-2xl mb-8 overflow-hidden relative">
                {cover.startsWith("http") ? (
                  <img
                    src={cover}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[20rem] md:text-[24rem] leading-none scale-110">
                      {cover}
                    </span>
                  </div>
                )}
              </div>
              <div
                className="prose prose-invert max-w-none text-[#1a2b4e]"
                dangerouslySetInnerHTML={{
                  __html:
                    content ||
                    `<p>${t("admin_art_noContent", "（未填写正文）")}</p>`,
                }}
              />
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <label className="block text-sm font-semibold text-[#1a2b4e] mb-2">
                {t("admin_art_form_title", "文章标题 *")}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t(
                  "admin_art_form_titlePlaceholder",
                  "请输入文章标题，建议20-60字",
                )}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fbbf24] outline-none transition text-lg text-gray-900 placeholder-gray-400"
              />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <label className="block text-sm font-semibold text-[#1a2b4e] mb-2">
                {t("admin_art_form_summary", "文章摘要 *")}
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
                placeholder={t(
                  "admin_art_form_summaryPlaceholder",
                  "简要描述文章内容，建议50-200字",
                )}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fbbf24] outline-none transition resize-none text-gray-900 placeholder-gray-400"
              />
              <p className="text-xs text-gray-600 mt-2 text-right">
                {summary.length} {t("admin_art_charCount", "字")}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <label className="block text-sm font-semibold text-[#1a2b4e] mb-2">
                {t("admin_art_form_content", "文章正文 *")}
              </label>
              <p className="text-xs text-gray-600 mb-2">
                {t(
                  "admin_art_form_htmlHint",
                  "支持 HTML 格式。可用 <h2>、<p>、<ul><li> 等标签。",
                )}
              </p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                placeholder={"<h2>小标题</h2>\n<p>段落内容...</p>"}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fbbf24] outline-none transition font-mono text-sm text-gray-900 placeholder-gray-400"
              />
              <p className="text-xs text-gray-600 mt-2 text-right">
                {content.length} {t("admin_art_charCount", "字")}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-sm font-semibold text-[#1a2b4e] mb-4">
                {t("admin_art_publishSettings", "发布设置")}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    {t("admin_art_publishStatus", "发布状态")}
                  </label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setStatus("published")}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition ${status === "published" ? "bg-green-100 text-green-700 border-2 border-green-500" : "bg-gray-100 text-gray-600 border-2 border-transparent"}`}
                    >
                      ✅ {t("admin_art_statusPublished", "立即发布")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus("scheduled")}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition ${status === "scheduled" ? "bg-blue-100 text-blue-700 border-2 border-blue-500" : "bg-gray-100 text-gray-600 border-2 border-transparent"}`}
                    >
                      ⏰ {t("admin_art_statusScheduled", "定时发布")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus("draft")}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition ${status === "draft" ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-500" : "bg-gray-100 text-gray-600 border-2 border-transparent"}`}
                    >
                      📝 {t("admin_art_statusDraft", "存为草稿")}
                    </button>
                  </div>
                  {status === "scheduled" && (
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        {t("admin_art_scheduledTime", "定时发布时间")}
                      </label>
                      <input
                        type="datetime-local"
                        value={publishAt}
                        onChange={(e) => setPublishAt(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#fbbf24] outline-none text-gray-900"
                      />
                      <p className="text-xs text-gray-600 mt-1.5">
                        {t(
                          "admin_art_scheduledHint",
                          "到达此时间后，文章将自动转为已发布状态",
                        )}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    {t("admin_art_category", "文章分类")}
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as ArticleCategory)
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fbbf24] outline-none bg-white text-gray-900"
                  >
                    {ARTICLE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {t(ARTICLE_CATEGORY_MAP[cat] || cat, cat)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    {t("admin_art_coverIcon", "封面图标")}
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {coverOptions.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setCover(emoji)}
                        className={`p-2 rounded-lg text-xl transition ${cover === emoji ? "bg-blue-100 ring-2 ring-blue-500" : "bg-gray-50 hover:bg-blue-50"}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                    placeholder={t(
                      "admin_art_coverPlaceholder",
                      "或输入自定义emoji",
                    )}
                    maxLength={4}
                    className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fbbf24] outline-none text-sm text-center text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <button
                type="submit"
                className="w-full py-3 bg-[#fbbf24] hover:bg-[#fbbf24] text-[#1e3a5f] font-semibold rounded-lg transition flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {t("admin_art_saveArticle", "保存文章")}
              </button>
              <a
                href="/admin/articles"
                className="block w-full text-center py-3 mt-2 text-gray-600 hover:text-[#1a2b4e] rounded-lg transition text-sm"
              >
                {t("admin_art_cancelBack", "取消并返回")}
              </a>
            </div>
          </div>
        </form>
      </div>
    </AdminLayoutClient>
  );
}
