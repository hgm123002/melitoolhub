// app/admin/source/page.tsx
"use client";

import { TrendingUp, TrendingDown, ExternalLink, Search } from "lucide-react";
import { useState } from "react";
import AdminLayoutClient from "../AdminLayoutClient";
import { useLanguage } from "@/app/i18n/LanguageContext";

// Mock 数据
const mockSourceData = [
  {
    id: 1,
    source: "Google",
    visitors: 20534,
    change: "+12.5%",
    positive: true,
    bounceRate: "45%",
    avgTime: "3:24",
  },
  {
    id: 2,
    source: "Direct",
    visitors: 9135,
    change: "+8.3%",
    positive: true,
    bounceRate: "32%",
    avgTime: "4:15",
  },
  {
    id: 3,
    source: "Facebook",
    visitors: 6852,
    change: "-2.1%",
    positive: false,
    bounceRate: "58%",
    avgTime: "2:18",
  },
  {
    id: 4,
    source: "Yandex",
    visitors: 4567,
    change: "+15.8%",
    positive: true,
    bounceRate: "41%",
    avgTime: "3:45",
  },
  {
    id: 5,
    source: "Baidu",
    visitors: 3654,
    change: "+5.2%",
    positive: true,
    bounceRate: "48%",
    avgTime: "2:56",
  },
  {
    id: 6,
    source: "Twitter",
    visitors: 2341,
    change: "-8.7%",
    positive: false,
    bounceRate: "62%",
    avgTime: "1:42",
  },
  {
    id: 7,
    source: "Instagram",
    visitors: 1876,
    change: "+22.3%",
    positive: true,
    bounceRate: "55%",
    avgTime: "2:33",
  },
  {
    id: 8,
    source: "Other",
    visitors: 987,
    change: "+3.1%",
    positive: true,
    bounceRate: "68%",
    avgTime: "1:20",
  },
];

const mockTopPages = [
  {
    id: 1,
    page: "/tools/currency-converter",
    views: 5432,
    visitors: 4876,
    avgTime: "4:32",
  },
  {
    id: 2,
    page: "/tools/fba-calculator",
    views: 4321,
    visitors: 3987,
    avgTime: "5:12",
  },
  { id: 3, page: "/", views: 3876, visitors: 3421, avgTime: "2:45" },
  {
    id: 4,
    page: "/tools/listing-optimizer",
    views: 2987,
    visitors: 2654,
    avgTime: "3:56",
  },
  {
    id: 5,
    page: "/blog/how-to-sell-on-mercado-libre",
    views: 2341,
    visitors: 2109,
    avgTime: "6:23",
  },
];

export default function SourcePage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSources = mockSourceData.filter((source) =>
    source.source.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <AdminLayoutClient>
      <div className="space-y-6">
        {/* 标题栏 */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-800">
            {t("admin_src_title", "来源分析")}
          </h1>
          <p className="text-gray-600 mt-1">
            {t("admin_src_subtitle", "掌握各渠道获客效果")}
          </p>
        </div>

        {/* 搜索栏 */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
            <input
              type="text"
              placeholder={t("admin_src_searchPlaceholder", "搜索流量来源...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent"
            />
          </div>
        </div>

        {/* 流量来源表格 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              {t("admin_src_channelList", "流量来源详情")}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    {t("admin_src_channel", "来源")}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                    {t("admin_src_uv", "访客数")}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                    {t("admin_src_change", "变化")}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                    {t("admin_src_bounce", "跳出率")}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                    {t("admin_src_avgStay", "平均停留")}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    {t("admin_src_action", "操作")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSources.map((source) => (
                  <tr key={source.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <ExternalLink className="w-5 h-5 text-[#1e3a5f]" />
                        </div>
                        <span className="font-medium text-gray-800">
                          {source.source}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-800">
                      {source.visitors.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 text-sm font-medium ${source.positive ? "text-green-500" : "text-red-500"}`}
                      >
                        {source.positive ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {source.change}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600">
                      {source.bounceRate}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600">
                      {source.avgTime}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-[#1e3a5f] hover:text-blue-700 text-sm font-medium">
                        {t("admin_src_viewReport", "查看详情")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 热门页面 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              {t("admin_src_topPages", "热门页面")}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    {t("admin_src_page", "页面")}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                    {t("admin_src_pv", "浏览量")}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                    {t("admin_src_uv2", "访客数")}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                    {t("admin_src_avgStay2", "平均停留")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockTopPages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800 truncate max-w-xs">
                      {page.page}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-800">
                      {page.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-800">
                      {page.visitors.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600">
                      {page.avgTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayoutClient>
  );
}
