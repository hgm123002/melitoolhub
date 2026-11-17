"use client";

import { useEffect, useState } from "react";
import { Settings, X, CheckCircle2, AlertCircle } from "lucide-react";
import {
  AI_PROVIDERS,
  getAIConfig,
  saveAIConfig,
  clearAIConfig,
} from "./useAI";

/**
 * AI 状态徽标 + 设置弹窗
 * - 未配置：黄色「本地分析模式」+ 设置按钮
 * - 已配置：绿色「AI 已连接」+ 可重新配置
 * 在每个 AI 工具页以 <AIStatusControl /> 的形式使用
 */
export function AIStatusControl() {
  const [configured, setConfigured] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setConfigured(!!getAIConfig());
    sync();
    window.addEventListener("gth-ai-config-changed", sync);
    return () => window.removeEventListener("gth-ai-config-changed", sync);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition border " +
          (configured
            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
            : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100")
        }
      >
        {configured ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5" /> AI 已连接
          </>
        ) : (
          <>
            <AlertCircle className="w-3.5 h-3.5" /> 本地分析模式 · 点击启用 AI
          </>
        )}
      </button>
      {open && <AISettingsModal onClose={() => setOpen(false)} />}
    </>
  );
}

export function AISettingsModal({ onClose }: { onClose: () => void }) {
  const [provider, setProvider] = useState("openai");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const [baseUrl, setBaseUrl] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const cfg = getAIConfig();
    if (cfg) {
      setProvider(cfg.provider || "openai");
      setApiKey(cfg.apiKey || "");
      setModel(cfg.model || "");
      setBaseUrl(cfg.baseUrl || "");
    }
  }, []);

  const applyProvider = (id: string) => {
    setProvider(id);
    const p = AI_PROVIDERS.find((x) => x.id === id);
    setModel(p?.defaultModel || "");
    setBaseUrl(p?.baseUrl || "");
  };

  const handleSave = () => {
    const p = AI_PROVIDERS.find((x) => x.id === provider);
    const finalBaseUrl = provider === "custom" ? baseUrl : p?.baseUrl || "";
    const finalModel =
      provider === "custom" || provider === "openrouter"
        ? model
        : model || p?.defaultModel || "";
    if (!apiKey.trim()) return;
    saveAIConfig({
      provider,
      apiKey: apiKey.trim(),
      model: finalModel,
      baseUrl: finalBaseUrl,
    });
    setSaved(true);
    setTimeout(onClose, 600);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#1e3a5f] flex items-center gap-2">
            <Settings className="w-5 h-5" /> AI 设置
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          填入你自己的 API Key 即可解锁真实 AI 能力（润色 / 翻译 / 摘要 /
          代码生成 / OCR）。Key 仅保存在你的浏览器本地，请求由浏览器直接发往 AI
          服务商，不经过本站服务器。
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              服务商
            </label>
            <select
              value={provider}
              onChange={(e) => applyProvider(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1e3a5f]"
            >
              {AI_PROVIDERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              API Key 获取：{" "}
              {AI_PROVIDERS.find((p) => p.id === provider)?.docs}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-... / AIza..."
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1e3a5f]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              模型
            </label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder={AI_PROVIDERS.find((p) => p.id === provider)?.defaultModel}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1e3a5f]"
            />
          </div>

          {provider === "custom" && (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Base URL（OpenAI 兼容）
              </label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://api.deepseek.com/v1"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1e3a5f]"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => {
              clearAIConfig();
              setApiKey("");
              setSaved(false);
            }}
            className="text-xs text-red-500 hover:underline"
          >
            清除配置
          </button>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs text-emerald-600">✓ 已保存</span>
            )}
            <button
              onClick={handleSave}
              disabled={!apiKey.trim()}
              className="px-5 py-2 bg-[#fbbf24] text-[#0f2038] font-semibold rounded-lg hover:bg-[#f59e0b] transition disabled:opacity-40 text-sm"
            >
              保存并启用
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIStatusControl;
