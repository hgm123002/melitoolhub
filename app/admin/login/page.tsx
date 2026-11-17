"use client";

import { useState } from "react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@globaltradehub.com" && password === "admin123") {
      localStorage.setItem("adminToken", "mock-admin-token");
      window.location.href = "/admin/dashboard";
    } else {
      setError(
        t(
          "login_adminWrong",
          "邮箱或密码错误，请使用测试账号：admin@globaltradehub.com / admin123",
        ),
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center px-4 z-[9999]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#fbbf24] rounded-xl mb-4">
            <Lock className="w-8 h-8 text-[#1e3a5f]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">
            <span className="text-[#f59e0b]">Global</span>
            <span className="text-[#f59e0b]">Trade</span>
            <span className="text-[#1e3a5f]">Hub</span>
          </h1>
          <p className="text-gray-600 mt-2">
            {t("admin_login_subtitle", "管理后台")}
          </p>
        </div>

        <div className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200">
          <h2 className="text-xl font-semibold text-[#1e3a5f] mb-6">
            {t("admin_login_title", "管理员登录")}
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#1a2b4e] text-sm font-medium mb-2">
                {t("login_email", "邮箱地址")}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#1e3a5f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent transition"
                  placeholder={t("login_emailPlaceholder", "请输入邮箱")}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[#1a2b4e] text-sm font-medium mb-2">
                {t("login_password", "密码")}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#1e3a5f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent transition"
                  placeholder={t("login_passwordPlaceholder", "请输入密码")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-[#1e3a5f] transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#fbbf24] hover:bg-[#fbbf24] text-[#1e3a5f] font-semibold rounded-lg transition duration-200"
            >
              {t("login_btn", "登录")}
            </button>

            <p className="text-gray-600 text-xs mt-4 text-center">
              {t(
                "login_adminHint",
                "测试账号：admin@globaltradehub.com / admin123",
              )}
            </p>
          </form>
        </div>

        <p className="text-gray-600 text-sm text-center mt-8">
          © 2026 GlobalTradeHub. All rights reserved.
        </p>
      </div>
    </div>
  );
}
