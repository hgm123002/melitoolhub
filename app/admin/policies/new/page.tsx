"use client";

import { useState } from "react";
import { ArrowLeft, Save, Eye } from "lucide-react";
import AdminLayoutClient from "../../AdminLayoutClient";
import {
  createPolicy,
  POLICY_CATEGORIES,
  type PolicyCategory,
} from "../../../../lib/articles";
import { useLanguage } from "@/app/i18n/LanguageContext";

const POLICY_CATEGORY_MAP: Record<string, string> = {
  拉美平台政策: "pcat_latam",
  "俄罗斯 & 东欧平台政策": "pcat_russia",
  东南亚平台政策: "pcat_sea",
  欧美平台政策: "pcat_eu",
  "内容 & 全托管平台政策": "pcat_content",
  B2B平台政策: "pcat_b2b",
  税务合规: "pcat_tax",
  知识产权: "pcat_ip",
};

const iconOptions = [
  "📋",
  "🛡️",
  "🌍",
  "🇦🇷",
  "❄️",
  "🌴",
  "🇪🇺",
  "💰",
  "📑",
  "™️",
  "©️",
  "📦",
  "🎬",
  "⚖️",
  "🏢",
  "⚠️",
];

export default function NewPolicyPage() {
  const { t } = useLanguage();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [icon, setIcon] = useState("📋");
  const [category, setCategory] = useState<PolicyCategory>(
    POLICY_CATEGORIES[0],
  );
  const [status, setStatus] = useState<"published" | "draft" | "scheduled">(
    "published",
  );
  const [publishAt, setPublishAt] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError(t("admin_pol_titleInput_err", "请填写政策标题"));
      return;
    }
    if (!summary.trim()) {
      setError(t("admin_pol_summary_err", "请填写政策摘要"));
      return;
    }
    if (!content.trim()) {
      setError(t("admin_pol_content_err", "请填写政策正文"));
      return;
    }
    if (status === "scheduled" && !publishAt) {
      setError(t("admin_pol_schedule_err", "请选择定时发布时间"));
      return;
    }

    const finalStatus: "published" | "draft" =
      status === "published" ? "published" : "draft";
    createPolicy({
      title: title.trim(),
      summary: summary.trim(),
      content: content.trim(),
      icon,
      category,
      status: finalStatus,
      publishAt: status === "scheduled" ? publishAt : undefined,
    });
    alert(t("admin_pol_create_success", "政策创建成功！"));
    window.location.href = "/admin/policies";
  };

  return (
    <AdminLayoutClient>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/admin/policies"
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <h1 className="text-2xl font-bold text-gray-800">
              {t("admin_pol_newTitle", "新建政策")}
            </h1>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
          >
            <Eye className="w-4 h-4" />
            {showPreview
              ? t("admin_pol_closePreview", "关闭预览")
              : t("admin_art_preview", "预览")}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}

        {showPreview && (
          <div className="bg-white rounded-3xl p-8 border border-gray-200">
            <span className="px-3 py-1 bg-[#fbbf24]/20 text-[#f59e0b] text-xs rounded-full mb-4 inline-block">
              {t(POLICY_CATEGORY_MAP[category] || category, category)}
            </span>
            <h1 className="text-4xl font-bold text-[#1e3a5f] mb-4">
              {title || t("admin_pol_noTitle", "（未填写标题）")}
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              {summary || t("admin_pol_noSummary", "（未填写摘要）")}
            </p>
            <div className="text-5xl mb-8">{icon}</div>
            <div
              className="text-[#1a2b4e] text-lg leading-loose"
              dangerouslySetInnerHTML={{
                __html:
                  content || t("admin_pol_noContent", "<p>（未填写正文）</p>"),
              }}
            />
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <label className="block text-sm font-semibold text-[#1a2b4e] mb-2">
                {t("admin_pol_titleInput", "政策标题")} *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t(
                  "admin_pol_titlePH",
                  "例：美客多卖家入驻规则 2026 最新版",
                )}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fbbf24] outline-none transition text-lg text-gray-900 placeholder-gray-400"
              />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <label className="block text-sm font-semibold text-[#1a2b4e] mb-2">
                {t("admin_pol_summary", "摘要")} *
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
                placeholder={t(
                  "admin_pol_summaryPH",
                  "简要描述本政策的核心内容，建议 30-120 字",
                )}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fbbf24] outline-none transition resize-none text-gray-900 placeholder-gray-400"
              />
              <p className="text-xs text-gray-600 mt-2 text-right">
                {summary.length} {t("admin_pol_char", "字")}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <label className="block text-sm font-semibold text-[#1a2b4e] mb-2">
                {t("admin_pol_content", "正文内容")} *
              </label>
              <p className="text-xs text-gray-600 mb-2">
                {t(
                  "admin_pol_htmlHint",
                  "支持 HTML 格式：<h2>标题</h2>、<p>段落</p>、<ul><li>列表项</li></ul>",
                )}
              </p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                placeholder={t(
                  "admin_pol_contentPH",
                  "<h2>一、标题</h2>\n<p>详细内容...</p>\n<ul><li>要点1</li><li>要点2</li></ul>",
                )}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fbbf24] outline-none transition font-mono text-sm text-gray-900 placeholder-gray-400"
              />
              <p className="text-xs text-gray-600 mt-2 text-right">
                {content.length} {t("admin_pol_char", "字")}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-sm font-semibold text-[#1a2b4e] mb-4">
                {t("admin_pol_publishSettings", "发布设置")}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    {t("admin_pol_publishStatus", "发布状态")}
                  </label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setStatus("published")}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition ${status === "published" ? "bg-green-100 text-green-700 border-2 border-green-500" : "bg-gray-100 text-gray-600 border-2 border-transparent"}`}
                    >
                      ✅ {t("admin_pol_publishNow", "立即发布")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus("scheduled")}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition ${status === "scheduled" ? "bg-blue-100 text-blue-700 border-2 border-blue-500" : "bg-gray-100 text-gray-600 border-2 border-transparent"}`}
                    >
                      ⏰ {t("admin_pol_scheduleBtn", "定时发布")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus("draft")}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition ${status === "draft" ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-500" : "bg-gray-100 text-gray-600 border-2 border-transparent"}`}
                    >
                      📝 {t("admin_pol_saveDraft", "存为草稿")}
                    </button>
                  </div>
                  {status === "scheduled" && (
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        {t("admin_art_scheduleTime", "定时发布时间")}
                      </label>
                      <input
                        type="datetime-local"
                        value={publishAt}
                        onChange={(e) => setPublishAt(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#fbbf24] outline-none text-gray-900"
                      />
                      <p className="text-xs text-gray-600 mt-1.5">
                        {t(
                          "admin_pol_scheduleHint",
                          "到达此时间后自动转为已发布",
                        )}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    {t("admin_pol_selectCat", "政策分类")}
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as PolicyCategory)
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fbbf24] outline-none bg-white text-gray-900"
                  >
                    {POLICY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    {t("admin_pol_iconInput", "图标")}
                  </label>
                  <div className="grid grid-cols-8 gap-1.5">
                    {iconOptions.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setIcon(emoji)}
                        className={`p-1.5 rounded-lg text-xl transition ${icon === emoji ? "bg-blue-100 ring-2 ring-blue-500" : "bg-gray-50 hover:bg-blue-50"}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    maxLength={4}
                    placeholder={t("admin_pol_customIcon", "自定义")}
                    className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-center text-gray-900 placeholder-gray-400"
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
                {t("admin_pol_savePolicy", "保存政策")}
              </button>
              <a
                href="/admin/policies"
                className="block w-full text-center py-3 mt-2 text-gray-600 hover:text-[#1a2b4e] rounded-lg transition text-sm"
              >
                {t("common_cancel", "取消")} {t("admin_pol_andBack", "并返回")}
              </a>
            </div>
          </div>
        </form>
      </div>
    </AdminLayoutClient>
  );
}
