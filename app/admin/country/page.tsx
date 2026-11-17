"use client";

import { Globe, TrendingUp, TrendingDown } from "lucide-react";
import AdminLayoutClient from "../AdminLayoutClient";
import { useLanguage } from "@/app/i18n/LanguageContext";

const mockCountries = [
  {
    id: 1,
    nameKey: "country_cn",
    flag: "CN",
    visitors: 12543,
    change: "+15.2%",
    positive: true,
    percent: 27.5,
  },
  {
    id: 2,
    nameKey: "country_us",
    flag: "US",
    visitors: 8765,
    change: "+8.3%",
    positive: true,
    percent: 19.2,
  },
  {
    id: 3,
    nameKey: "country_br",
    flag: "BR",
    visitors: 5432,
    change: "+22.1%",
    positive: true,
    percent: 11.9,
  },
  {
    id: 4,
    nameKey: "country_ru",
    flag: "RU",
    visitors: 4567,
    change: "-3.2%",
    positive: false,
    percent: 10.0,
  },
  {
    id: 5,
    nameKey: "country_id",
    flag: "ID",
    visitors: 3245,
    change: "+18.7%",
    positive: true,
    percent: 7.1,
  },
  {
    id: 6,
    nameKey: "country_vn",
    flag: "VN",
    visitors: 2876,
    change: "+12.4%",
    positive: true,
    percent: 6.3,
  },
  {
    id: 7,
    nameKey: "country_th",
    flag: "TH",
    visitors: 1890,
    change: "+5.6%",
    positive: true,
    percent: 4.1,
  },
  {
    id: 8,
    nameKey: "country_gb",
    flag: "GB",
    visitors: 1567,
    change: "-2.1%",
    positive: false,
    percent: 3.4,
  },
  {
    id: 9,
    nameKey: "country_de",
    flag: "DE",
    visitors: 1345,
    change: "+7.8%",
    positive: true,
    percent: 2.9,
  },
  {
    id: 10,
    nameKey: "country_others",
    flag: "WW",
    visitors: 3543,
    change: "+4.5%",
    positive: true,
    percent: 7.7,
  },
];

const flagEmojis: Record<string, string> = {
  CN: "🇨🇳",
  US: "🇺🇸",
  BR: "🇧🇷",
  RU: "🇷🇺",
  ID: "🇮🇩",
  VN: "🇻🇳",
  TH: "🇹🇭",
  GB: "🇬🇧",
  DE: "🇩🇪",
  WW: "🌍",
};

const countryNames: Record<string, string> = {
  country_cn: "中国",
  country_us: "美国",
  country_br: "巴西",
  country_ru: "俄罗斯",
  country_id: "印度尼西亚",
  country_vn: "越南",
  country_th: "泰国",
  country_gb: "英国",
  country_de: "德国",
  country_others: "其他",
};

export default function CountryPage() {
  const { t } = useLanguage();
  return (
    <AdminLayoutClient>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-[#1e3a5f]" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">
                  {t("admin_cy_covered", "覆盖国家")}
                </p>
                <p className="text-2xl font-bold text-gray-800">45+</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">
                  {t("admin_cy_new", "新增国家")}
                </p>
                <p className="text-2xl font-bold text-gray-800">+5</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">
                  {t("admin_cy_markets", "主要市场")}
                </p>
                <p className="text-xl font-bold text-gray-800">
                  {t("admin_cy_mainMarkets", "中国、美国、巴西")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              {t("admin_cy_distribution", "访客国别分布")}
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {mockCountries.map((country) => (
              <div
                key={country.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{flagEmojis[country.flag]}</span>
                  <div>
                    <p className="font-medium text-gray-800">
                      {t(country.nameKey, countryNames[country.nameKey])}
                    </p>
                    <p className="text-sm text-gray-600">
                      {country.visitors.toLocaleString()}{" "}
                      {t("admin_cy_visitors", "访客")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {t("admin_cy_share", "占比")}
                    </p>
                    <p className="font-medium text-gray-800">
                      {country.percent}%
                    </p>
                  </div>
                  <div className="w-32">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#fbbf24] rounded-full transition-all duration-500"
                        style={{ width: `${country.percent}%` }}
                      ></div>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-sm font-medium ${country.positive ? "text-green-500" : "text-red-500"}`}
                  >
                    {country.positive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {country.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-sm p-6 text-white">
            <p className="text-red-100 text-sm">
              {t("admin_cy_regionAPAC", "亚太地区")}
            </p>
            <p className="text-3xl font-bold mt-2">42,567</p>
            <p className="text-red-100 text-sm mt-2">
              {t("admin_cy_regionShare", "占比")} 46.8%
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
            <p className="text-blue-100 text-sm">
              {t("admin_cy_regionNA", "北美地区")}
            </p>
            <p className="text-3xl font-bold mt-2">18,934</p>
            <p className="text-blue-100 text-sm mt-2">
              {t("admin_cy_regionShare", "占比")} 20.8%
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm p-6 text-white">
            <p className="text-green-100 text-sm">
              {t("admin_cy_regionSA", "南美地区")}
            </p>
            <p className="text-3xl font-bold mt-2">15,432</p>
            <p className="text-green-100 text-sm mt-2">
              {t("admin_cy_regionShare", "占比")} 16.9%
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
            <p className="text-purple-100 text-sm">
              {t("admin_cy_regionEU", "欧洲地区")}
            </p>
            <p className="text-3xl font-bold mt-2">14,156</p>
            <p className="text-purple-100 text-sm mt-2">
              {t("admin_cy_regionShare", "占比")} 15.5%
            </p>
          </div>
        </div>
      </div>
    </AdminLayoutClient>
  );
}
