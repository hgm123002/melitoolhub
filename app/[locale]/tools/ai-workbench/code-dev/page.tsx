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
import { Code2, FileCode, Bug, Sparkles, Download } from "lucide-react";

export default function CodeDevPage() {
  const { service, apiKey, loading, error, result, process, reset, aiReady } =
    useAI() as any;
  const [prompt, setPrompt] = useState<string>("");
  const [mode, setMode] = useState<string>("generate");
  const [language, setLanguage] = useState<string>("javascript");

  const modes = [
    {
      id: "generate",
      name: "代码生成",
      desc: "根据需求描述生成代码",
      icon: "✨",
    },
    {
      id: "debug",
      name: "Bug排查",
      desc: "分析代码,找出并修复问题",
      icon: "🐛",
    },
    {
      id: "api",
      name: "API接口设计",
      desc: "接口方案、请求响应示例",
      icon: "🔌",
    },
    {
      id: "review",
      name: "代码审查",
      desc: "检查代码质量,提出优化建议",
      icon: "🔍",
    },
  ];

  const languages = [
    { id: "javascript", name: "JavaScript" },
    { id: "python", name: "Python" },
    { id: "java", name: "Java" },
    { id: "php", name: "PHP" },
    { id: "typescript", name: "TypeScript" },
    { id: "go", name: "Go" },
  ];

  const handleProcess = async () => {
    if (!prompt.trim()) return;
    await process(prompt, {
      task:
        mode === "generate" || mode === "api" || mode === "review"
          ? "code-gen"
          : "code-debug",
      service,
      apiKey,
      language,
      mode,
    });
  };

  const textResult =
    typeof result === "string"
      ? result
      : result?.code || result?.text || JSON.stringify(result);
  const isMock = !aiReady;

  const downloadCode = () => {
    if (!textResult) return;
    const ext =
      {
        javascript: "js",
        python: "py",
        typescript: "ts",
        java: "java",
        php: "php",
        go: "go",
      }[language] || "txt";
    const blob = new Blob([textResult], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-code." + ext;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="AI编程开发助手"
      icon={Code2}
      description="代码生成、错误排查、API接口方案设计、前后端开发辅助、支持多语言编程"
    >
      <div className="space-y-5">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            选择功能
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
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
          <div className="flex items-center gap-3 mt-4">
            <span className="text-sm text-gray-600">编程语言:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm"
            >
              {languages.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        <TextPanel
          title={
            mode === "debug" || mode === "review"
              ? "💻 输入代码"
              : "📝 描述需求"
          }
          placeholder={
            mode === "debug"
              ? "粘贴需要检查的代码..."
              : mode === "review"
                ? "粘贴需要审查的代码..."
                : mode === "api"
                  ? "描述你需要设计的API接口: 用途、请求参数、响应格式..."
                  : "描述你需要实现的功能,例如: 创建一个用户登录页面,包含表单验证..."
          }
          value={prompt}
          onChange={setPrompt}
          minHeight={mode === "debug" || mode === "review" ? 300 : 200}
          maxLength={15000}
        />

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <AIStatusControl />
          </div>
          <ActionButton
            onClick={handleProcess}
            disabled={!prompt.trim()}
            loading={loading}
            label={mode === "debug" ? "开始调试" : "开始生成"}
          />
        </div>

        <StatusBar
          loading={loading}
          error={error}
          isMock={isMock}
          result={result}
        />

        {textResult && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={downloadCode}
                className="px-4 py-2 text-sm bg-[#1e3a5f] text-white rounded-xl flex items-center gap-2 hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                下载代码
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#1e3a5f] font-semibold">
                  <FileCode className="w-4 h-4" />
                  <span>✅ 生成结果</span>
                </div>
                <span className="text-xs text-gray-400">
                  {language.toUpperCase()}
                </span>
              </div>
              <div className="p-4">
                <pre
                  className="bg-gray-50 rounded-xl p-4 text-xs leading-relaxed overflow-auto"
                  style={{ maxHeight: "500px" }}
                >
                  <code className="text-gray-700 whitespace-pre">
                    {textResult}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
