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
  getPolicies,
  deletePolicy,
  updatePolicy,
  type Policy,
  POLICY_CATEGORIES,
} from "../../../lib/articles";
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

const POL_ALL_CAT = "__ALL__";

export default function PoliciesListPage() {
  const { t } = useLanguage();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>(POL_ALL_CAT);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "published" | "draft" | "scheduled"
  >("all");

  useEffect(() => {
    setPolicies(getPolicies());
  }, []);

  const handleDelete = (id: string, title: string) => {
    if (
      confirm(
        t("admin_confirm_delete", `确定删除《${title}》吗？`).replace(
          "{title}",
          title,
        ),
      )
    ) {
      deletePolicy(id);
      setPolicies(getPolicies());
    }
  };

  const handleToggleStatus = (id: string) => {
    const policy = policies.find((p) => p.id === id);
    if (!policy) return;
    const newStatus = policy.status === "published" ? "draft" : "published";
    updatePolicy(id, { status: newStatus, publishAt: undefined });
    setPolicies(getPolicies());
  };

  const publishedCount = policies.filter(
    (p) => p.status === "published",
  ).length;
  const scheduledCount = policies.filter(
    (p) => p.status === "draft" && p.publishAt,
  ).length;
  const draftCount = policies.length - publishedCount - scheduledCount;

  const isScheduled = (p: Policy) => p.status === "draft" && !!p.publishAt;

  const filteredPolicies = policies.filter((policy) => {
    const matchSearch =
      policy.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      policy.summary.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchCategory =
      filterCategory === POL_ALL_CAT || policy.category === filterCategory;
    let matchStatus = true;
    if (filterStatus === "all") {
      matchStatus = true;
    } else if (filterStatus === "scheduled") {
      matchStatus = policy.status === "draft" && !!policy.publishAt;
    } else {
      matchStatus = policy.status === filterStatus;
    }
    return matchSearch && matchCategory && matchStatus;
  });

  const totalText = t(
    "admin_pol_total",
    "共 {n} 篇 · 已发布 {p} · 草稿 {d} · 定时发布 {s}",
  )
    .replace("{n}", String(policies.length))
    .replace("{p}", String(publishedCount))
    .replace("{d}", String(draftCount))
    .replace("{s}", String(scheduledCount));

  const allCat = t("admin_pol_allCat", "全部分类");
  const allStatus = t("admin_pol_allStatus", "全部状态");

  return (
    <AdminLayoutClient>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {t("admin_pol_title", "政策合规管理")}
            </h1>
            <p className="text-gray-600 mt-1">{totalText}</p>
          </div>
          <a
            href="/admin/policies/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#fbbf24] text-[#1e3a5f] rounded-lg hover:bg-[#fbbf24] transition font-medium"
          >
            <Plus className="w-5 h-5" />
            {t("admin_pol_new", "新建政策")}
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
              <input
                type="text"
                placeholder={t("admin_pol_search", "搜索政策标题或摘要...")}
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
                <option value={POL_ALL_CAT}>{allCat}</option>
                {POLICY_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {t(POLICY_CATEGORY_MAP[cat] || cat, cat)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fbbf24] outline-none bg-white cursor-pointer text-gray-900"
              >
                <option value="all">{allStatus}</option>
                <option value="published">
                  {t("admin_pol_published", "已发布")}
                </option>
                <option value="draft">{t("admin_pol_draft", "草稿")}</option>
                <option value="scheduled">
                  {t("admin_pol_scheduled", "定时发布")}
                </option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>
            <button
              onClick={() => {
                setSearchKeyword("");
                setFilterCategory(POL_ALL_CAT);
                setFilterStatus("all");
              }}
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
            >
              {t("admin_pol_reset", "重置")}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredPolicies.length === 0 ? (
            <div className="py-16 text-center">
              <Filter className="w-12 h-12 text-[#1a2b4e] mx-auto mb-4" />
              <p className="text-gray-600">
                {t("admin_pol_none", "暂无匹配的政策")}
              </p>
              <a
                href="/admin/policies/new"
                className="inline-block mt-4 text-[#1e3a5f] hover:text-[#f59e0b] text-sm"
              >
                {t("admin_pol_createFirst", "+ 新建一篇政策")}
              </a>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    {t("admin_pol_icon", "图标")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    {t("admin_pol_titleCol", "标题")}
                  </th>
                  <th className="px-6 py-3 text-left">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="appearance-none pl-2 pr-6 py-1 border border-gray-300 rounded-md text-xs font-semibold text-gray-600 uppercase focus:ring-2 focus:ring-[#fbbf24] outline-none bg-white cursor-pointer text-gray-900"
                    >
                      <option value={POL_ALL_CAT}>
                        {t("admin_pol_selectCat", "选择分类")}
                      </option>
                      {POLICY_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {t(POLICY_CATEGORY_MAP[cat] || cat, cat)}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="appearance-none pl-2 pr-6 py-1 border border-gray-300 rounded-md text-xs font-semibold text-gray-600 uppercase focus:ring-2 focus:ring-[#fbbf24] outline-none bg-white cursor-pointer text-gray-900"
                    >
                      <option value="all">
                        {t("admin_pol_selectStatus", "选择状态")}
                      </option>
                      <option value="published">
                        {t("admin_pol_published", "已发布")}
                      </option>
                      <option value="draft">
                        {t("admin_pol_draft", "草稿")}
                      </option>
                      <option value="scheduled">
                        {t("admin_pol_scheduled", "定时发布")}
                      </option>
                    </select>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    {t("admin_pol_views", "浏览")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    {t("admin_pol_updated", "更新时间")}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    {t("admin_pol_actions", "操作")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPolicies.map((policy) => (
                  <tr key={policy.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="text-3xl">{policy.icon || "📋"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800 line-clamp-2">
                        {policy.title}
                      </div>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                        {policy.summary}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-[#1e3a5f] text-xs rounded-full font-medium">
                        {t(
                          POLICY_CATEGORY_MAP[policy.category] ||
                            policy.category,
                          policy.category,
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {isScheduled(policy) ? (
                        <div>
                          <span className="px-3 py-1 bg-blue-50 text-[#1e3a5f] text-xs rounded-full font-medium inline-block mb-1">
                            {t("admin_pol_scheduled_tag", "⏰ 定时发布")}
                          </span>
                          <p className="text-xs text-gray-600 mt-1">
                            {policy.publishAt?.replace("T", " ")}
                          </p>
                        </div>
                      ) : policy.status === "published" ? (
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full font-medium">
                          {t("admin_pol_published", "已发布")}
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                          {t("admin_pol_draft", "草稿")}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {policy.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {policy.updatedAt}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleStatus(policy.id)}
                          className="p-2 text-gray-600 hover:text-[#1e3a5f] hover:bg-blue-50 rounded-lg transition"
                          title={
                            policy.status === "published"
                              ? t("admin_pol_toDraft", "转为草稿")
                              : t("admin_pol_publishBtn", "发布")
                          }
                        >
                          {policy.status === "published" ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <a
                          href={`/admin/policies/${policy.id}/edit`}
                          className="px-3 py-1.5 text-sm text-[#1e3a5f] hover:bg-blue-50 rounded-lg transition"
                        >
                          {t("admin_pol_edit", "编辑")}
                        </a>
                        <button
                          onClick={() => handleDelete(policy.id, policy.title)}
                          className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          {t("admin_pol_delete", "删除")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayoutClient>
  );
}
