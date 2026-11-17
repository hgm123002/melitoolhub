"use client";

import { useState } from 'react';
import { ChevronLeft, Settings, Key, Zap, Info } from 'lucide-react';

export default function ToolLayout({ title, icon: Icon, description, children }) {
  const [showSettings, setShowSettings] = useState(false);
  const [service, setService] = useState('mock');
  const [apiKey, setApiKey] = useState('');

  return (
    <main className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <a href="/tools" className="hover:text-[#1e3a5f] flex items-center gap-1"><ChevronLeft className="w-4 h-4" />实用工具</a>
          <span>/</span>
          <a href="/tools/ai-workbench" className="hover:text-[#1e3a5f]">AI智能工作台</a>
          <span>/</span>
          <span className="text-[#1e3a5f] font-semibold">{title}</span>
        </div>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-blue-600 flex items-center justify-center text-white shadow-lg">
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1e3a5f]">{title}</h1>
                <p className="text-gray-500 mt-1">{description}</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={"px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition " + (showSettings ? "bg-amber-100 text-amber-700" : "bg-gray-50 text-gray-600 hover:bg-gray-100")}>
              <Settings className="w-4 h-4" />
              {service === 'mock' ? '本地模式' : 'AI模式'}
            </button>
          </div>

          {showSettings && (
            <div className="mt-6 p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-[#1e3a5f]"><Zap className="w-4 h-4" />AI服务配置</div>
              <p className="text-sm text-gray-600 mb-4">默认使用本地规则引擎,无需任何配置即可使用。如需更智能的AI处理,请选择下方服务并填写API Key。</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">选择AI服务</label>
                  <select value={service} onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1e3a5f]">
                    <option value="mock">🔧 本地规则引擎(免费,无需配置)</option>
                    <option value="openrouter">🌐 OpenRouter (支持免费模型)</option>
                    <option value="gemini">✨ Google Gemini (免费调用)</option>
                  </select>
                </div>
                {service !== 'mock' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <Key className="w-4 h-4" />API Key
                    </label>
                    <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)}
                      placeholder={service === 'openrouter' ? '从 openrouter.ai 获取 Key' : '从 Google AI Studio 获取 Key'}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1e3a5f]" />
                  </div>
                )}
              </div>
              {service !== 'mock' && !apiKey && (
                <p className="mt-3 text-xs text-amber-700">💡 请填写API Key以启用真实AI服务。未填写时将自动使用本地规则引擎。</p>
              )}
              <div className="mt-4 flex items-start gap-2 text-xs text-gray-500">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p><strong>OpenRouter:</strong> 访问 openrouter.ai 免费注册,支持多种开源模型</p>
                  <p className="mt-1"><strong>Google Gemini:</strong> 访问 aistudio.google.com 免费获取 Key</p>
                  <p className="mt-1">Key仅保存在浏览器本地(LocalStorage),不会上传到服务器</p>
                </div>
              </div>
            </div>
          )}
        </section>

        <div>
          {children && typeof children === 'function' ? children({ service, apiKey, isMock: service === 'mock' || !apiKey }) : children}
        </div>
      </div>
    </main>
  );
}
