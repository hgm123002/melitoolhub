"use client";

import { useEffect, useState } from 'react';
import { Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { login, getSession, migrateLegacyAccounts } from '../../../lib/user-store';

export default function UserLoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    migrateLegacyAccounts();
    if (getSession()) {
      setSuccess('已登录，正在进入个人中心…');
      setTimeout(() => { window.location.href = '/account'; }, 800);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setBusy(true);
    try {
      if (email === 'admin@globaltradehub.com' && password === 'admin123') {
        localStorage.setItem('adminToken', 'admin-session');
        setSuccess(t('login_adminSuccess', '管理员登录成功，正在跳转后台…'));
        setTimeout(() => { window.location.href = '/admin/dashboard'; }, 1200);
        return;
      }
      const session = await login(email, password);
      localStorage.setItem('userEmail', session.email);
      setSuccess(t('login_success', '登录成功，正在跳转…'));
      setTimeout(() => { window.location.href = '/account'; }, 900);
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败，请重试');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl mb-4">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold">
            <span className="text-sky-500">Global</span><span className="text-sky-400">Trade</span><span className="text-sky-500">Hub</span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm">{t('login_welcome', '欢迎回来')}</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-[#1a3a5c] mb-6">{t('login_title', '用户登录')}</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 mb-5 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 mb-5 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-emerald-700 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#1a2b4e] text-sm font-medium mb-2">{t('login_email', '邮箱地址')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#1a3a5c] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition"
                  placeholder="your@email.com" required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[#1a2b4e] text-sm font-medium mb-2">{t('login_password', '密码')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#1a3a5c] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition"
                  placeholder={t('login_passwordPlaceholder', '输入密码')} required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1a3a5c] transition">
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={busy}
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
            >
              {busy ? '验证中…' : t('login_btn', '登录')}<ArrowRight className="w-4.5 h-4.5" />
            </button>

            <div className="flex items-center justify-between mt-6 text-sm">
              <a href="/forgot-password" className="text-slate-500 hover:text-sky-600 transition">{t('login_forgot', '忘记密码？')}</a>
              <span className="text-slate-500">
                {t('login_noAccount', '还没有账号？')}
                <a href="/register" className="text-sky-600 hover:text-sky-700 ml-1 font-medium">{t('login_registerNow', '立即注册')}</a>
              </span>
            </div>
          </form>
        </div>

        <div className="mt-5 rounded-xl bg-white border border-gray-200 p-4 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-slate-500 leading-relaxed">
            密码使用 <b>PBKDF2-SHA256 + 随机盐</b>（12 万次迭代）加密后存储，不保存明文。
            <span className="inline-flex items-center gap-1 text-amber-600 ml-1">
              <Info className="w-3 h-3" />当前为本地账号，数据存在本机浏览器，暂不跨设备同步。
            </span>
          </p>
        </div>

        <p className="text-slate-400 text-xs text-center mt-6">© 2026 GlobalTradeHub. All rights reserved.</p>
      </div>
    </div>
  );
}
