"use client";

import { useMemo, useState } from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { register } from '../../../lib/user-store';

function strength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score += 1;
  if (pw.length >= 12) score += 1;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 1;
  if (/\d/.test(pw)) score += 1;
  if (/[^a-zA-Z0-9]/.test(pw)) score += 1;
  return Math.min(score, 4);
}

export default function RegisterPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);

  const score = useMemo(() => strength(password), [password]);
  const scoreLabel = ['太弱', '弱', '一般', '较强', '很强'][score];
  const scoreColor = ['bg-red-400', 'bg-red-400', 'bg-amber-400', 'bg-sky-400', 'bg-emerald-400'][score];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (password !== confirmPassword) { setError(t('register_passwordMismatch', '两次输入的密码不一致')); return; }
    setBusy(true);
    try {
      const session = await register(email, password);
      localStorage.setItem('userEmail', session.email);
      setSuccess(t('register_success', '注册成功，正在进入个人中心…'));
      setTimeout(() => { window.location.href = '/account'; }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败，请重试');
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
          <p className="text-slate-500 mt-2 text-sm">{t('register_create', '创建你的账号')}</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-[#1a3a5c] mb-1">{t('register_title', '用户注册')}</h2>
          <p className="text-xs text-slate-500 mb-6">注册即可保存工具使用记录与分析结果，随时回来继续。</p>

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
              <label className="block text-[#1a2b4e] text-sm font-medium mb-2">{t('register_email', '邮箱地址')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#1a3a5c] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition"
                  placeholder="you@example.com" required
                />
              </div>
              <p className="text-slate-400 text-xs mt-1.5">支持 Gmail / QQ / 163 / Outlook 等任意邮箱</p>
            </div>

            <div className="mb-4">
              <label className="block text-[#1a2b4e] text-sm font-medium mb-2">{t('register_password', '设置密码')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#1a3a5c] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition"
                  placeholder="至少 8 位，含字母和数字" required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1a3a5c] transition">
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full ${i < score ? scoreColor : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 w-10 text-right">{scoreLabel}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-[#1a2b4e] text-sm font-medium mb-2">{t('register_confirmPassword', '确认密码')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#1a3a5c] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition"
                  placeholder="再输入一次密码" required
                />
              </div>
            </div>

            <button
              type="submit" disabled={busy}
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
            >
              {busy ? '创建中…' : t('register_btn', '创建账号')}<ArrowRight className="w-4.5 h-4.5" />
            </button>

            <div className="mt-6 text-center text-sm">
              <span className="text-slate-500">{t('register_haveAccount', '已有账号？')}</span>
              <a href="/login" className="text-sky-600 hover:text-sky-700 ml-1 font-medium">{t('register_loginNow', '去登录')}</a>
            </div>
          </form>
        </div>

        <div className="mt-5 rounded-xl bg-white border border-gray-200 p-4 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-slate-500 leading-relaxed">
            注册<b>无需验证码</b>：本站未接入邮件服务，不会假装发了验证邮件。密码加密后只存本机。
            <span className="inline-flex items-center gap-1 text-amber-600 ml-1">
              <Info className="w-3 h-3" />换设备或清缓存后账号不保留。
            </span>
          </p>
        </div>

        <p className="text-slate-400 text-xs text-center mt-6">© 2026 GlobalTradeHub. All rights reserved.</p>
      </div>
    </div>
  );
}
