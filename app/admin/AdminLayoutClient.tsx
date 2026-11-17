"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Globe,
  FileText,
  ShieldCheck,
  Link2,
  Tags,
  Users,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function AdminLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { t, language, setLanguage, supportedLanguages } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navItems = [
    {
      href: "/admin/dashboard",
      labelKey: "admin_dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/source",
      labelKey: "admin_source",
      icon: BarChart3,
    },
    {
      href: "/admin/country",
      labelKey: "admin_country",
      icon: Globe,
    },
    {
      href: "/admin/articles",
      labelKey: "admin_articles",
      icon: FileText,
    },
    {
      href: "/admin/policies",
      labelKey: "admin_policies",
      icon: ShieldCheck,
    },
    {
      href: "/admin/affiliate",
      labelKey: "admin_affiliate",
      icon: Link2,
    },
    {
      href: "/admin/tags",
      labelKey: "admin_tags",
      icon: Tags,
    },
    {
      href: "/admin/leads",
      labelKey: "admin_leads",
      icon: Users,
    },
    {
      href: "/admin/settings",
      labelKey: "admin_settings",
      icon: Settings,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin/articles") {
      return pathname?.startsWith("/admin/articles");
    }
    if (href === "/admin/policies") {
      return pathname?.startsWith("/admin/policies");
    }
    return pathname === href;
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("gth_admin");
    } catch {}
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-20"
          } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
            {sidebarOpen ? (
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#1a2b4e]">
                  Global<span className="text-[#f59e0b]">Trade</span>Hub
                </span>
              </Link>
            ) : (
              <Link href="/admin/dashboard" className="mx-auto">
                <span className="text-xl font-bold text-[#f59e0b]">G</span>
              </Link>
            )}
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Brand subtitle */}
          {sidebarOpen && (
            <div className="px-4 py-3 text-xs text-gray-500 border-b border-gray-100">
              {t("admin_panel", "管理后台")}
            </div>
          )}

          {/* Nav */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-[#fbbf24] text-[#1e3a5f] shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  } ${!sidebarOpen ? "justify-center" : ""}`}
                  title={
                    !sidebarOpen
                      ? t(item.labelKey, item.labelKey.replace("admin_", ""))
                      : undefined
                  }
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${active ? "text-[#1e3a5f]" : "text-gray-500"}`}
                  />
                  {sidebarOpen && (
                    <span className="truncate">
                      {t(item.labelKey, item.labelKey.replace("admin_", ""))}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Collapse toggle (desktop) */}
          <div className="p-3 border-t border-gray-100 hidden lg:block">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu className="w-4 h-4" />
              {sidebarOpen && (
                <span className="truncate">
                  {sidebarOpen
                    ? t("admin_collapse", "收起菜单")
                    : t("admin_expand", "展开")}
                </span>
              )}
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative max-w-md w-full hidden md:block">
                <input
                  type="text"
                  placeholder={t("admin_search", "搜索...")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#fbbf24] outline-none text-gray-800 placeholder-gray-400 bg-gray-50"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition border border-gray-200"
                  title={t("nav_language", "语言")}
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm hidden md:inline">
                    {supportedLanguages.find((l) => l.code === language)
                      ?.name || "Language"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition ${
                      isLangOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isLangOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsLangOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl z-50 overflow-hidden border border-gray-200 max-h-[70vh] overflow-y-auto">
                      {supportedLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as any);
                            setIsLangOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-amber-50 transition text-left ${
                            language === lang.code
                              ? "bg-amber-50 text-[#1e3a5f]"
                              : "text-gray-700"
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="text-sm">{lang.name}</span>
                          {language === lang.code && (
                            <span className="ml-auto text-amber-500">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <button
                className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                title={t("admin_notifications", "通知")}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className="w-9 h-9 rounded-full bg-[#1a2b4e] flex items-center justify-center text-white font-semibold text-sm">
                  A
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">
                    {t("admin_admin", "管理员")}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title={t("admin_logout", "退出登录")}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
