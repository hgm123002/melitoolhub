"use client";

import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Image,
  BookOpen,
  Code2,
  Video,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "../../../i18n";
import {
  catNameOf,
  toolIntroOf,
  toolNameOf,
} from "../../../../lib/tool-i18n";

type WorkbenchTool = {
  slug: string;
  fallbackTitle: string;
  fallbackDesc: string;
  icon: LucideIcon;
  color: string;
  path: string;
};

const workbenchTools: WorkbenchTool[] = [
  {
    slug: "ai-document",
    fallbackTitle: "文字&文档处理",
    fallbackDesc: "把图片/文档/PDF 传给 AI，AI 总结归纳生成合理文档，支持多语言翻译",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    path: "/tools/ai-workbench/document",
  },
  {
    slug: "ai-image-ocr",
    fallbackTitle: "图片处理&图文解析",
    fallbackDesc: "OCR 文字识别、图片描述生成、图片压缩、去水印、裁剪、图片文字翻译",
    icon: Image,
    color: "from-emerald-500 to-emerald-600",
    path: "/tools/ai-workbench/image",
  },
  {
    slug: "ai-pdf-summary",
    fallbackTitle: "PDF 多文件 AI 归纳",
    fallbackDesc: "批量上传 PDF、Word、图片，AI 自动解析内容、生成摘要、产出结构化报告",
    icon: BookOpen,
    color: "from-violet-500 to-violet-600",
    path: "/tools/ai-workbench/pdf-summary",
  },
  {
    slug: "ai-code-dev",
    fallbackTitle: "编程&前后端&API 开发",
    fallbackDesc: "网站代码生成、产品功能代码、前后端开发、API 接口方案设计",
    icon: Code2,
    color: "from-amber-500 to-amber-600",
    path: "/tools/ai-workbench/code-dev",
  },
  {
    slug: "ai-video-translate",
    fallbackTitle: "视频多语种字幕翻译",
    fallbackDesc: "视频语音转文字、自动生成字幕、英语/西班牙语/葡萄牙语/俄语翻译",
    icon: Video,
    color: "from-rose-500 to-rose-600",
    path: "/tools/ai-workbench/video-translate",
  },
];

export default function WorkbenchHomePage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const workbenchName = catNameOf("ai-workbench", "AI智能工作台", language, t);

  return (
    <div className="space-y-6">
      {/* 主视觉 */}
      <section className="relative rounded-2xl overflow-hidden h-40 md:h-52 bg-[#0f2038]">
        <img
          src="/tools-art/ai-workbench.webp"
          alt={workbenchName}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2038]/92 via-[#0f2038]/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-10">
          <span className="text-sky-300 text-xs font-medium tracking-wider uppercase mb-2">
            AI Workbench
          </span>
          <span className="text-white text-2xl md:text-3xl font-bold">
            {workbenchName}
          </span>
        </div>
      </section>

      {/* 简介 */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#1e3a5f] mb-3">
          {t("aw_overview", "Workbench Overview")}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {t(
            "aw_subtitle",
            "One-stop AI processing for documents, images, PDFs, code and video",
          )}
        </p>
      </section>

      {/* 功能模块 */}
      <section>
        <h2 className="text-xl font-bold text-[#1e3a5f] mb-5">
          {t("aw_menuTitle", "Function Menu")}
        </h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {workbenchTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.path}
                onClick={() => router.push(tool.path)}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-lg hover:border-[#fbbf24] transition-all group"
              >
                <div
                  className={
                    "w-14 h-14 rounded-2xl bg-gradient-to-br " +
                    tool.color +
                    " flex items-center justify-center mb-4 text-white shadow-sm"
                  }
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 group-hover:text-[#f59e0b] transition-colors">
                  {toolNameOf(tool.slug, tool.fallbackTitle, language, t)}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {toolIntroOf(tool.slug, tool.fallbackDesc, language, t)}
                </p>
                <div className="flex items-center gap-2 text-[#f59e0b] text-sm font-semibold">
                  {t("tools_useNow", "Use Now")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
