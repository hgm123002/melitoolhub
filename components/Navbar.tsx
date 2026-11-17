"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Globe, ChevronDown, User, LogOut, Settings, LayoutDashboard, Home, Bookmark } from 'lucide-react';
import { useLanguage } from '../app/i18n';
import { getSession, logout } from '../lib/user-store';

// 18种语言，每个语言在字典里有对应的翻译键
const languageOptions: { code: string; flag: string; key: string }[] = [
  { code: 'zh-CN', flag: '🇨🇳', key: 'lang_zh-CN' },
  { code: 'en',    flag: '🇺🇸', key: 'lang_en' },
  { code: 'es',    flag: '🇪🇸', key: 'lang_es' },
  { code: 'pt',    flag: '🇧🇷', key: 'lang_pt' },
  { code: 'ru',    flag: '🇷🇺', key: 'lang_ru' },
  { code: 'id',    flag: '🇮🇩', key: 'lang_id' },
  { code: 'th',    flag: '🇹🇭', key: 'lang_th' },
  { code: 'vi',    flag: '🇻🇳', key: 'lang_vi' },
  { code: 'fr',    flag: '🇫🇷', key: 'lang_fr' },
  { code: 'de',    flag: '🇩🇪', key: 'lang_de' },
  { code: 'ja',    flag: '🇯🇵', key: 'lang_ja' },
  { code: 'ko',    flag: '🇰🇷', key: 'lang_ko' },
  { code: 'ar',    flag: '🇸🇦', key: 'lang_ar' },
  { code: 'hi',    flag: '🇮🇳', key: 'lang_hi' },
  { code: 'bn',    flag: '🇧🇩', key: 'lang_bn' },
  { code: 'ur',    flag: '🇵🇰', key: 'lang_ur' },
  { code: 'fa',    flag: '🇮🇷', key: 'lang_fa' },
  { code: 'tr',    flag: '🇹🇷', key: 'lang_tr' },
];

export default function Navbar() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  // 切换语言 = 跳转到对应 locale 前缀的 URL（保持当前页面路径不变）
  const switchLanguage = (code: string) => {
    const stripped = pathname.replace(/^\/(zh-CN|[a-z]{2})(?=\/|$)/, '');
    const rest = stripped === '' || stripped === '/' ? '' : stripped;
    setLanguage(code as any);
    setIsLanguageOpen(false);
    router.push(`/${code}${rest}`);
  };

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const session = getSession();
    const email = session?.email || localStorage.getItem('userEmail') || '';
    setIsAdmin(!!adminToken);
    setIsLoggedIn(!!session);
    if (email) setUserEmail(email);
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('userEmail');
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  };

  const handleSwitchToAdmin = () => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      window.location.href = '/admin/dashboard';
    } else {
      window.location.href = '/admin/login';
    }
  };

  const handleSwitchToFrontend = () => {
    window.location.href = '/';
  };

  // 查找当前语言
  const currentLang = languageOptions.find((l) => l.code === language) ?? languageOptions[0];

  return (
    <nav className="bg-[#0f2038] px-6 py-4 pb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold shrink-0">
          <span className="text-sky-400">Global</span>
          <span className="text-sky-300">Trade</span>
          <span className="text-sky-400">Hub</span>
        </div>

        {/* 导航菜单 */}
        <div className="hidden md:flex items-center gap-3 xl:gap-4">
          <a href="/" className="text-white/90 hover:text-sky-300 transition">{t('nav_home', '首页')}</a>
          <a href="/blog" className="text-white/90 hover:text-sky-300 transition">{t('nav_blog', '跨境干货')}</a>
          <a href="/compliance" className="text-white/90 hover:text-sky-300 transition">{t('nav_compliance', '政策合规')}</a>
          <a href="/tools" className="text-white/90 hover:text-sky-300 transition">{t('nav_tools', '实用工具')}</a>
          <a href="/purchase" className="text-white/90 hover:text-sky-300 transition">{t('nav_purchase', '采购代发')}</a>
          <a href="/affiliate" className="text-white/90 hover:text-sky-300 transition">{t('nav_affiliate', '联盟工具')}</a>
          <a href="/community" className="text-white/90 hover:text-sky-300 transition">{t('nav_community', '用户交流')}</a>
        </div>

        {/* 右侧功能区 */}
        <div className="flex items-center gap-2.5">
          {/* 搜索框 */}
          <div className="hidden xl:flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
            <Search className="w-4 h-4 text-white/70" />
            <input
              type="text"
              placeholder={t('nav_search_placeholder', '搜索工具、文章...')}
              className="bg-transparent text-white text-sm ml-2 outline-none w-28 xl:w-36 placeholder:text-white/50"
            />
          </div>

          {/* 语言切换 */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition border border-white/20 whitespace-nowrap min-w-[88px] justify-between"
            >
              <Globe className="w-4 h-4 text-white/80" />
              <span className="text-white/90 text-sm whitespace-nowrap">{t(currentLang.key, currentLang.key)}</span>
              <ChevronDown className={`w-4 h-4 text-white/70 transition ${isLanguageOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-blue-900 rounded-xl shadow-xl z-50 overflow-hidden border border-blue-700 max-h-[70vh] overflow-y-auto">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={`w-full flex items-center px-4 py-2 hover:bg-sky-500/30 transition whitespace-nowrap ${language === lang.code ? 'bg-sky-500/20' : ''}`}
                  >
                    <span className="text-white/90 text-sm">{t(lang.key, lang.code)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 用户/管理员状态区 */}
          {isAdmin ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-400 transition font-medium"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">{t('nav_admin_mode', '管理员模式')}</span>
                <ChevronDown className={`w-4 h-4 transition ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-blue-900 rounded-xl shadow-xl z-50 overflow-hidden border border-blue-700">
                  <div className="px-4 py-3 border-b border-blue-700">
                    <p className="text-white font-medium text-sm">{t('nav_admin_login', '管理员')}</p>
                    <p className="text-white/70 text-xs mt-1">admin@globaltradehub.com</p>
                  </div>
                  <button
                    onClick={handleSwitchToAdmin}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-sky-500/30 transition text-left"
                  >
                    <LayoutDashboard className="w-4 h-4 text-sky-300" />
                    <span className="text-white/90 text-sm">{t('nav_admin_enter', '进入管理后台')}</span>
                  </button>
                  <button
                    onClick={handleSwitchToFrontend}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-sky-500/30 transition text-left"
                  >
                    <Home className="w-4 h-4 text-white/80" />
                    <span className="text-white/90 text-sm">{t('nav_browse_front', '浏览前台')}</span>
                  </button>
                  <div className="border-t border-blue-700">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/20 transition text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-300" />
                      <span className="text-red-300 text-sm">{t('nav_logout', '退出登录')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/90 rounded-lg hover:bg-white/20 transition border border-white/20"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{userEmail.split('@')[0]}</span>
                <ChevronDown className={`w-4 h-4 transition ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-blue-900 rounded-xl shadow-xl z-50 overflow-hidden border border-blue-700">
                  <div className="px-4 py-3 border-b border-blue-700">
                    <p className="text-white/70 text-xs">{t('login_title', '已登录用户')}</p>
                    <p className="text-white text-sm truncate mt-1">{userEmail}</p>
                  </div>
                  <a
                    href="/account"
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-sky-500/30 transition text-left"
                  >
                    <Bookmark className="w-4 h-4 text-sky-300" />
                    <span className="text-white/90 text-sm">{t('nav_account', '我的中心')}</span>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/20 transition text-left border-t border-blue-700"
                  >
                    <LogOut className="w-4 h-4 text-red-300" />
                    <span className="text-red-300 text-sm">{t('nav_logout', '退出登录')}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <a href="/login" className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-sky-300 transition">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{t('nav_login', '登录')}</span>
              </a>
              <a href="/register" className="px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-400 transition">
                {t('nav_register', '注册')}
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}