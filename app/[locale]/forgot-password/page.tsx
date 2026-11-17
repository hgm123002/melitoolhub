"use client";
import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight, Key } from 'lucide-react';
import { useLanguage } from '../../i18n';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const getUsers = () => { const d = localStorage.getItem('gth_users'); return d ? JSON.parse(d) : []; };
export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  useEffect(() => { if (countdown > 0) { const tm = setTimeout(() => setCountdown(countdown - 1), 1000); return () => clearTimeout(tm); } }, [countdown]);
  const sendCode = () => {
    setError('');
    if (!emailRegex.test(email)) { setError(t('login_emailError', 'Invalid email format')); return; }
    const users = getUsers();
    if (!users.find((u: any) => u.email === email)) { setError(t('forgot_emailNotFound', 'This email is not registered')); return; }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem(`gth_fp_vcode_${email}`, JSON.stringify({ code, createdAt: Date.now() }));
    setSuccess(t('forgot_codeSent', 'Verification code sent! (Simulated code:') + ' ' + code + ')');
    setCountdown(60);
    setTimeout(() => setStep(2), 800);
  };
  const verifyCode = () => {
    setError('');
    const saved = localStorage.getItem(`gth_fp_vcode_${email}`);
    if (!saved) { setError(t('forgot_codeExpired', 'Verification code expired, please request again')); return; }
    const parsed = JSON.parse(saved);
    if (Date.now() - parsed.createdAt > 5 * 60 * 1000) { setError(t('forgot_codeExpired', 'Verification code expired, please request again')); return; }
    if (parsed.code !== verificationCode) { setError(t('forgot_codeWrong', 'Incorrect verification code')); return; }
    setStep(3);
  };
  const resetPassword = () => {
    setError('');
    if (newPassword.length < 6) { setError(t('register_passwordShort', 'Password must be at least 6 characters')); return; }
    if (newPassword !== confirmPassword) { setError(t('register_passwordMismatch', 'Passwords do not match')); return; }
    const users = getUsers();
    const idx = users.findIndex((u: any) => u.email === email);
    if (idx >= 0) { users[idx].password = newPassword; localStorage.setItem('gth_users', JSON.stringify(users)); }
    localStorage.removeItem(`gth_fp_vcode_${email}`);
    setSuccess(t('forgot_success', 'Password reset successful! Redirecting to login...'));
    setTimeout(() => { window.location.href = '/login'; }, 1500);
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#fbbf24] rounded-xl mb-4"><Key className="w-8 h-8 text-[#1e3a5f]" /></div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]"><span className="text-[#f59e0b]">Global</span><span className="text-[#f59e0b]">Trade</span><span className="text-[#1e3a5f]">Hub</span></h1>
          <p className="text-gray-600 mt-2">{t('forgot_subtitle', 'Recover your password')}</p>
        </div>
        <div className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200">
          <div className="flex justify-center items-center mb-8 gap-2">
            {[1, 2, 3].map((s) => (<div key={s} className="flex items-center"><div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${step >= s ? 'bg-[#fbbf24] text-[#1e3a5f]' : 'bg-gray-100 text-gray-400'}`}>{s}</div>{s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-[#fbbf24]' : 'bg-gray-100'}`}></div>}</div>))}
          </div>
          {error && (<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3"><AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" /><p className="text-red-600 text-sm">{error}</p></div>)}
          {success && (<div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /><p className="text-green-600 text-sm">{success}</p></div>)}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-[#1e3a5f] mb-2">{t('forgot_step1_title', 'Step 1: Enter Email')}</h2>
              <p className="text-gray-600 text-sm mb-6">{t('forgot_step1_desc', 'We will send a verification code to your email')}</p>
              <div className="mb-4">
                <label className="block text-[#1a2b4e] text-sm font-medium mb-2">{t('login_email', 'Email Address')}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#1e3a5f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] transition" placeholder="you@example.com" required />
                </div>
              </div>
              <button onClick={sendCode} disabled={countdown > 0} className="w-full py-3 bg-[#fbbf24] hover:bg-[#fbbf24] disabled:opacity-50 text-[#1e3a5f] font-semibold rounded-lg transition flex items-center justify-center gap-2">{t('forgot_sendCode', 'Send Verification Code')}<ArrowRight className="w-5 h-5" /></button>
              <div className="mt-6 text-center text-sm"><span className="text-gray-600">{t('forgot_remembered', 'Remembered your password?')}</span><a href="/login" className="text-[#f59e0b] hover:text-blue-300 ml-1">{t('forgot_backToLogin', 'Back to Login')}</a></div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-[#1e3a5f] mb-2">{t('forgot_step2_title', 'Step 2: Verify Email')}</h2>
              <p className="text-gray-600 text-sm mb-6">{t('forgot_step2_desc', 'Enter the 6-digit code sent to')} <span className="text-[#f59e0b]">{email}</span></p>
              <div className="mb-4">
                <label className="block text-[#1a2b4e] text-sm font-medium mb-2">{t('forgot_verificationCode', 'Verification Code')}</label>
                <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#1e3a5f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] transition text-center tracking-widest text-lg" placeholder={t('forgot_codePlaceholder', 'Enter 6-digit code')} maxLength={6} />
                {countdown > 0 && <p className="text-gray-500 text-xs mt-2 text-center">{t('forgot_codeValid', 'Code valid for')} {countdown}s</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={sendCode} disabled={countdown > 0} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-600 font-medium rounded-lg transition text-sm">{countdown > 0 ? countdown + 's' : t('forgot_resend', 'Resend')}</button>
                <button onClick={verifyCode} className="flex-1 py-3 bg-[#fbbf24] hover:bg-[#fbbf24] text-[#1e3a5f] font-semibold rounded-lg transition flex items-center justify-center gap-2">{t('forgot_verify', 'Verify & Continue')}<ArrowRight className="w-5 h-5" /></button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-[#1e3a5f] mb-2">{t('forgot_step3_title', 'Step 3: Set New Password')}</h2>
              <p className="text-gray-600 text-sm mb-6">{t('forgot_step3_desc', 'Please set a new password for your account')}</p>
              <div className="mb-4">
                <label className="block text-[#1a2b4e] text-sm font-medium mb-2">{t('forgot_newPassword', 'New Password')}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <input type={showPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#1e3a5f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] transition" placeholder={t('register_passwordPlaceholder', 'At least 6 characters')} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#1e3a5f] transition">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-[#1a2b4e] text-sm font-medium mb-2">{t('forgot_confirmNewPassword', 'Confirm New Password')}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#1e3a5f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] transition" placeholder={t('forgot_confirmPasswordPlaceholder', 'Re-enter new password')} />
                </div>
              </div>
              <button onClick={resetPassword} className="w-full py-3 bg-[#fbbf24] hover:bg-[#fbbf24] text-[#1e3a5f] font-semibold rounded-lg transition flex items-center justify-center gap-2">{t('forgot_reset', 'Reset Password')}<ArrowRight className="w-5 h-5" /></button>
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm text-center mt-8">© 2026 GlobalTradeHub. All rights reserved.</p>
      </div>
    </div>
  );
}