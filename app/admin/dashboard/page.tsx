"use client";

import {
  Users,
  Eye,
  TrendingUp,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import AdminLayoutClient from "../AdminLayoutClient";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function DashboardPage() {
  const { t } = useLanguage();

  const mockStats = [
    {
      label: t("admin_db_todayVisits", "今日访客"),
      value: "1,234",
      change: "+12.5%",
      positive: true,
      icon: Eye,
    },
    {
      label: t("admin_db_totalLeads", "累计留联"),
      value: "45,678",
      change: "+8.3%",
      positive: true,
      icon: Users,
    },
    {
      label: t("admin_db_conversion", "留联转化率"),
      value: "3.2%",
      change: "-1.1%",
      positive: false,
      icon: TrendingUp,
    },
    {
      label: t("admin_cy_covered", "覆盖国家"),
      value: "45",
      change: "+5",
      positive: true,
      icon: Globe,
    },
  ];

  const mockRecentVisitors = [
    {
      id: 1,
      name: t("admin_db_visitor_zhangsan", "张三"),
      country: t("country_cn", "中国"),
      source: t("admin_db_source_google", "Google"),
      time: t("admin_db_time_2min", "2分钟前"),
    },
    {
      id: 2,
      name: t("admin_db_visitor_john", "John Smith"),
      country: t("country_us", "美国"),
      source: t("admin_db_source_direct", "Direct"),
      time: t("admin_db_time_5min", "5分钟前"),
    },
    {
      id: 3,
      name: t("admin_db_visitor_maria", "Maria Gonzalez"),
      country: t("country_br", "巴西"),
      source: t("admin_db_source_facebook", "Facebook"),
      time: t("admin_db_time_8min", "8分钟前"),
    },
    {
      id: 4,
      name: t("admin_db_visitor_ivan", "Ivan Petrov"),
      country: t("country_ru", "俄罗斯"),
      source: t("admin_db_source_yandex", "Yandex"),
      time: t("admin_db_time_12min", "12分钟前"),
    },
    {
      id: 5,
      name: t("admin_db_visitor_liwei", "李薇"),
      country: t("country_cn", "中国"),
      source: t("admin_db_source_baidu", "Baidu"),
      time: t("admin_db_time_15min", "15分钟前"),
    },
  ];

  const mockTrafficSources = [
    {
      source: t("admin_db_source_organic", "自然搜索"),
      percent: 45,
      color: "#4285F4",
    },
    {
      source: t("admin_db_source_direct", "直接访问"),
      percent: 20,
      color: "#34A853",
    },
    {
      source: t("admin_db_source_social", "社交媒体"),
      percent: 15,
      color: "#EA4335",
    },
    {
      source: t("admin_db_source_yandex", "Yandex"),
      percent: 10,
      color: "#FBBC05",
    },
    {
      source: t("admin_db_source_baidu", "Baidu"),
      percent: 8,
      color: "#2C2C2C",
    },
    {
      source: t("admin_db_source_referral", "外链引荐"),
      percent: 2,
      color: "#9E9E9E",
    },
  ];

  const vsYesterday = t("admin_db_visitsCompare", "较昨日");

  return (
    <AdminLayoutClient>
      <div className="space-y-6">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-800">
            {t("admin_db_title", "访客总览")}
          </h1>
          <p className="text-gray-600 mt-1">
            {t("admin_db_subtitle", "监控全站流量与转化数据")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-2">
                      {stat.value}
                    </p>
                    <div
                      className={`flex items-center gap-1 mt-2 text-sm ${stat.positive ? "text-green-500" : "text-red-500"}`}
                    >
                      {stat.positive ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      <span>{stat.change}</span>
                      <span className="text-gray-600">{vsYesterday}</span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.positive ? "bg-green-50" : "bg-red-50"}`}
                  >
                    <Icon
                      className={`w-6 h-6 ${stat.positive ? "text-green-500" : "text-red-500"}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              {t("admin_db_sourceTrend", "流量来源趋势（近7日）")}
            </h2>
            <div className="space-y-4">
              {mockTrafficSources.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.source}</span>
                    <span className="font-medium text-gray-800">
                      {item.percent}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percent}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              {t("admin_db_recent", "最近留联")}
            </h2>
            <div className="space-y-4">
              {mockRecentVisitors.map((visitor) => (
                <div key={visitor.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#1e3a5f]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {visitor.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {visitor.country} · {visitor.source}
                    </p>
                  </div>
                  <span className="text-xs text-gray-600">{visitor.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayoutClient>
  );
}
