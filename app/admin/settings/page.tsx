// app/admin/settings/page.tsx
"use client";

import {
  Settings,
  Globe,
  Shield,
  Bell,
  Palette,
  Database,
  Save,
  Info,
} from "lucide-react";
import { useState } from "react";
import AdminLayoutClient from "../AdminLayoutClient";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function SettingsPage() {
  const { t } = useLanguage();
  const [siteName, setSiteName] = useState("GlobalTradeHub");
  const [siteDescription, setSiteDescription] = useState(
    t("settings_siteDesc_default", "一站式跨境电商工具箱平台"),
  );
  const [defaultLanguage, setDefaultLanguage] = useState("zh-CN");
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableDarkMode, setEnableDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupInterval, setBackupInterval] = useState("daily");

  const handleSave = () => {
    alert(t("admin_settings_saved", "设置已保存！"));
  };

  return (
    <AdminLayoutClient>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-[#1e3a5f]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {t("admin_settings", "系统设置")}
              </h2>
              <p className="text-gray-600 text-sm">
                {t("admin_settings_subtitle", "管理网站的基本配置和功能开关")}
              </p>
            </div>
          </div>
        </div>

        {/* 设置表单 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#f59e0b]" />
              {t("admin_settings_basic", "基本设置")}
            </h3>
          </div>
          <div className="p-6 space-y-6">
            {/* 网站名称 */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">
                {t("admin_settings_siteName", "网站名称")}
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbbf24]"
              />
            </div>

            {/* 网站描述 */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">
                {t("admin_settings_siteDesc", "网站描述")}
              </label>
              <textarea
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbbf24] resize-none"
              />
            </div>

            {/* 默认语言 */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {t("admin_settings_defaultLang", "默认语言")}
              </label>
              <select
                value={defaultLanguage}
                onChange={(e) => setDefaultLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbbf24]"
              >
                <option value="zh-CN">中文 (Chinese)</option>
                <option value="en">English (英语)</option>
                <option value="es">Español (西班牙语)</option>
                <option value="pt">Português (葡萄牙语)</option>
                <option value="ru">Русский (俄语)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 功能开关 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#f59e0b]" />
              {t("admin_settings_features", "功能开关")}
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-medium text-gray-800">
                  {t("admin_settings_notifications", "通知功能")}
                </p>
                <p className="text-sm text-gray-600">
                  {t(
                    "admin_settings_notifications_desc",
                    "启用后将接收系统通知和更新提醒",
                  )}
                </p>
              </div>
              <button
                onClick={() => setEnableNotifications(!enableNotifications)}
                className={`relative w-12 h-6 rounded-full transition ${enableNotifications ? "bg-[#fbbf24]" : "bg-gray-300"}`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition transform ${enableNotifications ? "translate-x-7" : "translate-x-1"}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-medium text-gray-800">
                  {t("admin_settings_darkMode", "深色模式")}
                </p>
                <p className="text-sm text-gray-600">
                  {t(
                    "admin_settings_darkMode_desc",
                    "启用后网站将切换为深色主题",
                  )}
                </p>
              </div>
              <button
                onClick={() => setEnableDarkMode(!enableDarkMode)}
                className={`relative w-12 h-6 rounded-full transition ${enableDarkMode ? "bg-[#fbbf24]" : "bg-gray-300"}`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition transform ${enableDarkMode ? "translate-x-7" : "translate-x-1"}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-medium text-gray-800">
                  {t("admin_settings_autoBackup", "自动备份")}
                </p>
                <p className="text-sm text-gray-600">
                  {t(
                    "admin_settings_autoBackup_desc",
                    "自动备份网站数据到云端",
                  )}
                </p>
              </div>
              <button
                onClick={() => setAutoBackup(!autoBackup)}
                className={`relative w-12 h-6 rounded-full transition ${autoBackup ? "bg-[#fbbf24]" : "bg-gray-300"}`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition transform ${autoBackup ? "translate-x-7" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 数据备份 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#f59e0b]" />
              {t("admin_settings_backup", "数据备份")}
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">
                {t("admin_settings_backupFreq", "备份频率")}
              </label>
              <div className="flex gap-4">
                {[
                  {
                    value: "hourly",
                    label: t("admin_settings_hourly", "每小时"),
                  },
                  { value: "daily", label: t("admin_settings_daily", "每天") },
                  {
                    value: "weekly",
                    label: t("admin_settings_weekly", "每周"),
                  },
                  {
                    value: "monthly",
                    label: t("admin_settings_monthly", "每月"),
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="backupInterval"
                      value={option.value}
                      checked={backupInterval === option.value}
                      onChange={(e) => setBackupInterval(e.target.value)}
                      className="text-[#1e3a5f]"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition">
                <Database className="w-5 h-5" />
                {t("admin_settings_backupNow", "立即备份")}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-[#1e3a5f] font-medium rounded-lg transition">
                <Shield className="w-5 h-5" />
                {t("admin_settings_restore", "恢复数据")}
              </button>
            </div>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e3a5f] font-semibold rounded-lg transition"
          >
            <Save className="w-5 h-5" />
            {t("common_save", "保存")}
          </button>
        </div>
      </div>
    </AdminLayoutClient>
  );
}
