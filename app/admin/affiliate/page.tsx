"use client";
import { useEffect, useState } from "react";
import {
  Plus,
  Settings,
  Eye,
  Pencil,
  Trash2,
  ExternalLink,
  X,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import AdminLayoutClient from "../AdminLayoutClient";
import { useLanguage } from "@/app/i18n/LanguageContext";

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

const EMPTY_PLATFORM: Platform = {
  id: "",
  name: "",
  description: "",
  image: "🏷️",
  promoLink: "",
};
const QUICK_EMOJIS = [
  "🌎",
  "📦",
  "🛒",
  "🎬",
  "💵",
  "🇪🇺",
  "📈",
  "🌐",
  "🏅",
  "🛍️",
  "🏪",
  "🎯",
  "🏷️",
  "💰",
  "🎁",
];

const isImageUrl = (img: string) =>
  img.startsWith("http") ||
  img.startsWith("/") ||
  img.endsWith(".png") ||
  img.endsWith(".jpg") ||
  img.endsWith(".svg");

export default function AffiliateAdminPage() {
  const { t } = useLanguage();
  const [data, setData] = useState<AffiliateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<Platform>(EMPTY_PLATFORM);
  const [showMetaEditor, setShowMetaEditor] = useState(false);
  const [metaForm, setMetaForm] = useState({
    pageSize: 6,
    toolSlugs: "",
    statsText: "",
    articlesText: "",
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/affiliate");
      const result = await res.json();
      setData(result);
      setMetaForm({
        pageSize: result.pageSize || 6,
        toolSlugs: (result.toolSlugs || []).join(", "),
        statsText: JSON.stringify(result.stats, null, 2),
        articlesText: JSON.stringify(result.articles, null, 2),
      });
    } catch {
      showMessage("error", t("common_error", "加载数据失败"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }
    loadData();
  }, []);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const openEditModal = (platform: Platform) => {
    setFormData({ ...platform });
    setEditingPlatform(platform);
    setShowAddModal(false);
  };

  const openAddModal = () => {
    setFormData(EMPTY_PLATFORM);
    setEditingPlatform(null);
    setShowAddModal(true);
  };

  const savePlatform = async () => {
    if (
      !formData.id ||
      !formData.name ||
      !formData.description ||
      !formData.promoLink
    ) {
      showMessage("error", t("common_fillRequired", "请填写所有必填字段"));
      return;
    }
    try {
      let res;
      if (showAddModal) {
        res = await fetch("/api/affiliate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch("/api/affiliate", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "platform", ...formData }),
        });
      }
      if (res.ok) {
        showMessage(
          "success",
          showAddModal
            ? t("common_addSuccess", "新增成功！")
            : t("common_updateSuccess", "更新成功！"),
        );
        setEditingPlatform(null);
        setShowAddModal(false);
        await loadData();
      } else {
        const result = await res.json();
        showMessage(
          "error",
          result.error || t("common_operationFailed", "操作失败"),
        );
      }
    } catch {
      showMessage("error", t("common_networkError", "网络错误，请重试"));
    }
  };

  const deletePlatform = async (id: string, name: string) => {
    if (
      !confirm(
        t("admin_aff_confirmDelete", '确认删除 "{name}" 吗？').replace(
          "{name}",
          name,
        ),
      )
    )
      return;
    try {
      const res = await fetch(`/api/affiliate?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showMessage("success", t("common_deleteSuccess", "删除成功！"));
        await loadData();
      }
    } catch {
      showMessage("error", t("common_networkError", "网络错误，请重试"));
    }
  };

  const saveMeta = async () => {
    try {
      const toolSlugs = metaForm.toolSlugs
        .split(/[,，]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      const stats = JSON.parse(metaForm.statsText);
      const articles = JSON.parse(metaForm.articlesText);
      const res = await fetch("/api/affiliate", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "meta",
          pageSize: Number(metaForm.pageSize),
          toolSlugs,
          stats,
          articles,
        }),
      });
      if (res.ok) {
        showMessage("success", t("admin_aff_configUpdated", "配置更新成功！"));
        setShowMetaEditor(false);
        await loadData();
      }
    } catch {
      showMessage("error", t("admin_aff_jsonError", "JSON 格式错误或网络错误"));
    }
  };

  if (loading && !data) {
    return (
      <AdminLayoutClient>
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-600">
            {t("common_loading", "加载中...")}
          </div>
        </div>
      </AdminLayoutClient>
    );
  }

  return (
    <AdminLayoutClient>
      <div className="space-y-6">
        {/* 标题与操作区 */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {t("admin_affiliate", "联盟营销管理")}
            </h1>
            <p className="text-gray-600 mt-1">
              {t(
                "admin_aff_subtitle",
                "可视化管理联盟平台的图标、名称、说明、推广链接——无需修改代码",
              )}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-[#fbbf24] text-[#1e3a5f] rounded-lg hover:bg-[#f59e0b] transition font-medium"
            >
              <Plus className="w-5 h-5" />
              {t("admin_aff_addPlatform", "新增联盟平台")}
            </button>
            <button
              onClick={() => setShowMetaEditor(!showMetaEditor)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:border-[#fbbf24]/50 transition"
            >
              <Settings className="w-5 h-5" />
              {t("admin_aff_otherConfig", "其他配置")}
            </button>
            <a
              href="/affiliate"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:border-blue-400/50 transition"
            >
              <Eye className="w-5 h-5" />
              {t("admin_viewFrontend", "查看前台")}
            </a>
          </div>
        </div>

        {/* 消息提示 */}
        {message && (
          <div
            className={`px-4 py-3 rounded-lg font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* 平台列表 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {t(
                "admin_aff_platformList",
                "联盟平台列表（共 {count} 个）",
              ).replace("{count}", String(data?.platforms.length || 0))}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* 表头 */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-gray-700 text-sm font-semibold border-b border-gray-200">
              <div className="col-span-1">{t("admin_aff_th_icon", "图标")}</div>
              <div className="col-span-2">ID</div>
              <div className="col-span-2">
                {t("admin_aff_th_name", "联盟名称")}
              </div>
              <div className="col-span-3">{t("admin_aff_th_desc", "说明")}</div>
              <div className="col-span-2">
                {t("admin_aff_th_link", "联盟地址")}
              </div>
              <div className="col-span-2 text-right">
                {t("common_actions", "操作")}
              </div>
            </div>

            {/* 空状态 */}
            {data?.platforms.length === 0 && (
              <div className="px-6 py-12 text-center text-gray-500">
                {t(
                  "admin_aff_empty",
                  "暂无联盟平台，点击右上角「➕ 新增联盟平台」来添加",
                )}
              </div>
            )}

            {/* 数据行 */}
            {data?.platforms.map((platform) => (
              <div
                key={platform.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center hover:bg-amber-50 transition"
              >
                <div className="col-span-1">
                  {isImageUrl(platform.image) ? (
                    <img
                      src={platform.image}
                      alt={platform.name}
                      className="w-10 h-10 rounded-lg object-contain bg-white border border-gray-100"
                    />
                  ) : (
                    <div className="text-3xl">{platform.image}</div>
                  )}
                </div>
                <div className="col-span-2 text-gray-600 text-sm font-mono">
                  {platform.id}
                </div>
                <div className="col-span-2 text-[#1e3a5f] font-medium">
                  {platform.name}
                </div>
                <div className="col-span-3 text-gray-600 text-sm line-clamp-2">
                  {platform.description}
                </div>
                <div className="col-span-2">
                  <a
                    href={platform.promoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f59e0b] text-sm hover:text-[#1e3a5f] transition truncate block"
                  >
                    {platform.promoLink}
                  </a>
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <button
                    onClick={() => openEditModal(platform)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#1e3a5f] bg-[#fbbf24]/20 rounded-lg hover:bg-[#fbbf24]/30 transition"
                  >
                    <Pencil className="w-4 h-4" />
                    {t("common_edit", "编辑")}
                  </button>
                  <button
                    onClick={() => deletePlatform(platform.id, platform.name)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    {t("common_delete", "删除")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 配置汇总卡片 */}
        <section className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              📄 {t("admin_aff_paginationConfig", "分页配置")}
            </h3>
            <div className="text-gray-600 text-sm">
              {t(
                "admin_aff_currentPageSize",
                "当前每页展示 {size} 个联盟平台（2×3 布局）",
              ).replace("{size}", String(data?.pageSize))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🔧 {t("admin_aff_relatedTools", "关联工具")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {data?.toolSlugs.map((slug) => (
                <span
                  key={slug}
                  className="px-2 py-1 bg-gray-50 text-gray-700 text-sm rounded-md border border-gray-100"
                >
                  {slug}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              💰 {t("admin_aff_earnings", "收益说明")}
            </h3>
            <div className="text-gray-600 text-sm">
              {t("admin_aff_earningsCount", "{count} 项收益指标").replace(
                "{count}",
                String(data?.stats.length),
              )}
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              📚 {t("admin_aff_tutorials", "教程文章")}
            </h3>
            <div className="text-gray-600 text-sm">
              {t("admin_aff_tutorialCount", "{count} 篇教程").replace(
                "{count}",
                String(data?.articles.length),
              )}
            </div>
          </div>
        </section>
      </div>

      {/* 新增/编辑弹窗 */}
      {(editingPlatform || showAddModal) && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {showAddModal
                  ? t("admin_aff_addPlatform", "新增联盟平台")
                  : `${t("common_edit", "编辑")}：${editingPlatform?.name}`}
              </h2>
              <button
                onClick={() => {
                  setEditingPlatform(null);
                  setShowAddModal(false);
                }}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  ID <span className="text-red-600">*</span>（
                  {t("admin_aff_idImmutable", "创建后不可修改")}）
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                  disabled={!showAddModal}
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-800 rounded-lg border border-gray-200 focus:border-[#fbbf24] outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder={t("admin_aff_idPlaceholder", "如：amazon")}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  {t("admin_aff_th_name", "联盟名称")}{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-800 rounded-lg border border-gray-200 focus:border-[#fbbf24] outline-none"
                  placeholder={t("admin_aff_namePlaceholder", "如：亚马逊联盟")}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  {t("admin_aff_th_desc", "联盟说明")}{" "}
                  <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-800 rounded-lg border border-gray-200 focus:border-[#fbbf24] outline-none"
                  placeholder={t(
                    "admin_aff_descPlaceholder",
                    "描述该联盟平台的特点和优势...",
                  )}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  <ImageIcon className="w-4 h-4 inline-block mr-1" />
                  {t("admin_aff_iconOrImage", "图标 / 图片")}
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center text-4xl shrink-0 border border-gray-200">
                    {isImageUrl(formData.image) ? (
                      <img
                        src={formData.image}
                        alt=""
                        className="w-12 h-12 object-contain rounded-md"
                      />
                    ) : (
                      formData.image
                    )}
                  </div>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="flex-1 px-4 py-2.5 bg-gray-50 text-gray-800 rounded-lg border border-gray-200 focus:border-[#fbbf24] outline-none"
                    placeholder={t(
                      "admin_aff_iconPlaceholder",
                      "输入 emoji（如 🌎）或图片地址（如 /images/xxx.png）",
                    )}
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {QUICK_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: emoji })}
                      className={`w-10 h-10 rounded-lg text-xl transition hover:bg-[#fbbf24]/30 ${
                        formData.image === emoji
                          ? "bg-[#fbbf24]/40 ring-2 ring-[#fbbf24]"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  <ExternalLink className="w-4 h-4 inline-block mr-1" />
                  {t("admin_aff_promoLink", "联盟网络地址（推广链接）")}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.promoLink}
                  onChange={(e) =>
                    setFormData({ ...formData, promoLink: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-800 rounded-lg border border-gray-200 focus:border-[#fbbf24] outline-none font-mono text-sm"
                  placeholder="https://affiliate-program.amazon.com/your-id"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setEditingPlatform(null);
                  setShowAddModal(false);
                }}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
              >
                {t("common_cancel", "取消")}
              </button>
              <button
                onClick={savePlatform}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#fbbf24] text-[#1e3a5f] font-semibold rounded-lg hover:bg-[#f59e0b] transition"
              >
                <Check className="w-4 h-4" />
                {t("common_save", "保存")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 配置编辑弹窗 */}
      {showMetaEditor && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                <Settings className="w-5 h-5 inline-block mr-2" />
                {t("admin_aff_otherConfig", "其他配置")}
              </h2>
              <button
                onClick={() => setShowMetaEditor(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  {t(
                    "admin_aff_pageSizeLabel",
                    "每页展示平台数（6 = 2×3 布局）",
                  )}
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={metaForm.pageSize}
                  onChange={(e) =>
                    setMetaForm({
                      ...metaForm,
                      pageSize: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-800 rounded-lg border border-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  {t("admin_aff_toolSlugsLabel", "关联工具 slug（逗号分隔）")}
                </label>
                <input
                  type="text"
                  value={metaForm.toolSlugs}
                  onChange={(e) =>
                    setMetaForm({ ...metaForm, toolSlugs: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-800 rounded-lg border border-gray-200"
                  placeholder="rate-converter, profit-calculator, listing-optimizer"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  {t("admin_aff_statsLabel", "收益说明（JSON 数组）")}
                </label>
                <textarea
                  rows={6}
                  value={metaForm.statsText}
                  onChange={(e) =>
                    setMetaForm({ ...metaForm, statsText: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-800 font-mono text-sm rounded-lg border border-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  {t("admin_aff_articlesLabel", "教程文章（JSON 数组）")}
                </label>
                <textarea
                  rows={6}
                  value={metaForm.articlesText}
                  onChange={(e) =>
                    setMetaForm({ ...metaForm, articlesText: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-800 font-mono text-sm rounded-lg border border-gray-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowMetaEditor(false)}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
              >
                {t("common_cancel", "取消")}
              </button>
              <button
                onClick={saveMeta}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#fbbf24] text-[#1e3a5f] font-semibold rounded-lg hover:bg-[#f59e0b] transition"
              >
                <Check className="w-4 h-4" />
                {t("admin_aff_saveConfig", "保存配置")}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayoutClient>
  );
}
