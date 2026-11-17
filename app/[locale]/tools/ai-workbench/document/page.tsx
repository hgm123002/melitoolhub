"use client";

import { useState } from "react";
import ToolLayout from "../../../../../components/ai-workbench/ToolLayout";
import TextPanel from "../../../../../components/ai-workbench/TextPanel";
import {
  ActionButton,
  StatusBar,
  
} from "../../../../../components/ai-workbench/ActionButton";
import { useAI } from "../../../../../components/ai-workbench/useAI";
import { AIStatusControl } from "../../../../../components/ai-workbench/AISettings";
import { FileText, Sparkles, ArrowRight, Languages } from "lucide-react";

export default function DocumentPage() {
  const {
    service,
    setService,
    apiKey,
    setApiKey,
    loading,
    error,
    result,
    process,
    reset,
    aiReady,
  } = useAI() as any;
  const [text, setText] = useState<string>("");
  const [mode, setMode] = useState<string>("polish");
  const [targetLang, setTargetLang] = useState<string>("en");

  const modes = [
    {
      id: "polish",
      name: "内容润色",
      desc: "优化文字表达,提升专业度",
      icon: "✨",
    },
    {
      id: "summarize",
      name: "内容精简",
      desc: "提炼核心要点,保留关键信息",
      icon: "📋",
    },
    { id: "expand", name: "逻辑重构", desc: "扩展内容,补充论证", icon: "🔍" },
    {
      id: "translate",
      name: "多语言翻译",
      desc: "英语/西语/葡语/俄语互译",
      icon: "🌐",
    },
  ];

  const handleProcess = async () => {
    if (!text.trim()) return;
    let task = mode;
    let prompt = text;
    if (mode === "translate") {
      prompt = text;
      await process(prompt, {
        task: "translate",
        service,
        apiKey,
        fromLang: "auto",
        toLang: targetLang,
      });
    } else if (mode === "polish") {
      await process(text, { task: "polish", service, apiKey });
    } else if (mode === "summarize") {
      await process(text, { task: "summarize", service, apiKey, ratio: 0.3 });
    } else {
      await process(text, { task: "polish", service, apiKey });
    }
  };

  const isMock = !aiReady;

  return (
    <ToolLayout
      title="AI文档处理"
      icon={FileText}
      description="智能文章撰写、润色、内容精简、逻辑重构,支持多语言内容翻译与优化"
    >
      <div className="space-y-5">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            选择处理模式
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setMode(m.id);
                  reset();
                }}
                className={
                  "p-4 rounded-xl border text-left transition " +
                  (mode === m.id
                    ? "border-[#1e3a5f] bg-blue-50 text-[#1e3a5f]"
                    : "border-gray-200 hover:border-gray-300 bg-white")
                }
              >
                <div className="text-2xl mb-2">{m.icon}</div>
                <div className="text-sm font-bold">{m.name}</div>
                <div className="text-xs text-gray-500 mt-1">{m.desc}</div>
              </button>
            ))}
          </div>
          {mode === "translate" && (
            <div className="mt-4 flex items-center gap-3">
              <Languages className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">目标语言:</span>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm"
              >
                <option value="en">英语 English</option>
                <option value="es">西班牙语 Español</option>
                <option value="pt">葡萄牙语 Português</option>
                <option value="ru">俄语 Русский</option>
                <option value="zh-cn">中文</option>
              </select>
            </div>
          )}
        </section>

        <TextPanel
          title="📝 输入内容"
          placeholder="粘贴或输入您要处理的文字内容..."
          value={text}
          onChange={setText}
          minHeight={180}
          maxLength={10000}
        />

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <AIStatusControl />
          </div>
          <div className="flex gap-3">
            <ActionButton
              onClick={handleProcess}
              disabled={!text.trim()}
              loading={loading}
              label="开始处理"
            />
          </div>
        </div>

        <StatusBar
          loading={loading}
          error={error}
          isMock={isMock}
          result={result}
        />

        {result && (
          <TextPanel
            title="✅ 处理结果"
            placeholder="处理结果将在此显示..."
            value={
              typeof result === "string"
                ? result
                : JSON.stringify(result, null, 2)
            }
            minHeight={250}
          />
        )}
      </div>
    </ToolLayout>
  );
}
