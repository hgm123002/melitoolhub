"use client";

import { useState } from "react";
import ToolLayout from "../../../../../components/ai-workbench/ToolLayout";
import TextPanel from "../../../../../components/ai-workbench/TextPanel";
import FileUploader from "../../../../../components/ai-workbench/FileUploader";
import {
  ActionButton,
  StatusBar,
  
} from "../../../../../components/ai-workbench/ActionButton";
import { useAI } from "../../../../../components/ai-workbench/useAI";
import { AIStatusControl } from "../../../../../components/ai-workbench/AISettings";
import { Film, Download, Languages } from "lucide-react";

export default function VideoTranslatePage() {
  const { service, apiKey, loading, error, result, process, reset, aiReady } =
    useAI() as any;
  const [files, setFiles] = useState<any[]>([]);
  const [targetLang, setTargetLang] = useState<string>("en");
  const [inputText, setInputText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const languages = [
    { id: "en", name: "英语", native: "English" },
    { id: "es", name: "西班牙语", native: "Español" },
    { id: "pt", name: "葡萄牙语", native: "Português" },
    { id: "ru", name: "俄语", native: "Русский" },
    { id: "zh-cn", name: "中文", native: "中文" },
  ];

  const handleProcess = async () => {
    const hasFiles = files && files.length > 0;
    const hasText = inputText && inputText.trim().length > 0;
    if (!hasFiles && !hasText) return;
    const content = hasFiles ? files.map((f) => f.name).join(", ") : inputText;
    await process(content, {
      task: "subtitle",
      service,
      apiKey,
      toLang: targetLang,
    });
  };

  const textResult =
    typeof result === "string" ? result : result?.text || result?.srt || "";
  const isMock = !aiReady;

  const downloadSRT = () => {
    if (!textResult) return;
    const blob = new Blob([textResult], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "translated-subtitle-" + targetLang + ".srt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="视频字幕翻译"
      icon={Film}
      description="视频语音转文字、自动生成字幕、英/西/葡/俄多语言翻译、SRT字幕文件导出"
    >
      <div className="space-y-5">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2">
            <Languages className="w-4 h-4" />
            选择目标语言
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setTargetLang(l.id);
                  reset();
                }}
                className={
                  "p-4 rounded-xl border text-center transition " +
                  (targetLang === l.id
                    ? "border-[#1e3a5f] bg-blue-50 text-[#1e3a5f]"
                    : "border-gray-200 hover:border-gray-300 bg-white")
                }
              >
                <div className="text-sm font-bold">{l.name}</div>
                <div className="text-xs text-gray-500 mt-1">{l.native}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">
            上传视频 (或直接粘贴字幕文本)
          </h3>
          <FileUploader
            files={files}
            onFilesChange={setFiles}
            accept="video/*"
            multiple={true}
            maxFiles={5}
            maxSize={200}
          />
        </section>

        <TextPanel
          title="💬 或直接粘贴字幕文本"
          placeholder="粘贴字幕内容(SRT/VTT格式或纯文本),直接进行翻译处理..."
          value={inputText}
          onChange={setInputText}
          minHeight={150}
          maxLength={20000}
        />

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {files.length > 0 && (
              <span className="text-gray-500 mr-2">
                {files.length} 个视频文件
              </span>
            )}
            <AIStatusControl />
          </div>
          <ActionButton
            onClick={handleProcess}
            disabled={files.length === 0 && !inputText.trim()}
            loading={loading}
            label="开始翻译"
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
                onClick={downloadSRT}
                className="px-4 py-2 text-sm bg-[#1e3a5f] text-white rounded-xl flex items-center gap-2 hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                下载 SRT 字幕
              </button>
            </div>
            <TextPanel
              title="✅ 翻译结果"
              placeholder="翻译后的字幕内容将在此显示..."
              value={textResult}
              minHeight={350}
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
