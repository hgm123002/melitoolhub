"use client";

import { Zap, Loader2, Sparkles } from 'lucide-react';

export function ActionButton({ onClick, disabled, loading, label = '开始处理', variant = 'primary' }) {
  const styles = {
    primary: 'bg-gradient-to-r from-[#1e3a5f] to-blue-600 text-white hover:shadow-lg',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg',
    warning: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-lg',
    ghost: 'bg-white text-gray-700 border border-gray-200 hover:border-[#1e3a5f]',
  };
  return (
    <button onClick={onClick} disabled={disabled || loading}
      className={"px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed " + styles[variant]}>
      {loading ? <><Loader2 className="w-4 h-4 animate-spin" />处理中...</> : <><Sparkles className="w-4 h-4" />{label}</>}
    </button>
  );
}

export function StatusBar({ loading, error, isMock, result }) {
  if (loading) {
    return (
      <div className="flex items-center gap-3 px-5 py-4 bg-blue-50 border border-blue-200 rounded-xl text-sm">
        <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
        <span className="text-blue-700 font-medium">正在处理中,请稍候...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-start gap-3 px-5 py-4 bg-red-50 border border-red-200 rounded-xl text-sm">
        <span className="text-red-500 text-lg">⚠️</span>
        <span className="text-red-700">{error}</span>
      </div>
    );
  }
  if (result !== undefined && result !== null && result !== '') {
    return (
      <div className="flex items-center gap-3 px-5 py-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm">
        <span className="text-emerald-500 text-lg">✓</span>
        <span className="text-emerald-700 font-medium">处理完成</span>
        {isMock && <span className="text-xs text-emerald-600/80">(本地规则引擎 - 如需AI处理请配置API Key)</span>}
      </div>
    );
  }
  return null;
}

export function Tag({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-gray-100 text-gray-600',
    primary: 'bg-blue-100 text-blue-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
  };
  return <span className={"text-xs px-2.5 py-1 rounded-full font-medium " + styles[variant]}>{children}</span>;
}

export default ActionButton;
