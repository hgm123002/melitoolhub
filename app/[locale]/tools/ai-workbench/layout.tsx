"use client";

import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FileText,
  Image,
  BookOpen,
  Code2,
  Video,
  ChevronRight,
  Brain,
} from "lucide-react";
import { useLanguage } from "../../../i18n";
import { catNameOf, toolNameOf, toolIntroOf } from "../../../../lib/tool-i18n";

type MenuItem = {
  key: string;
  slug?: string;
  fallbackLabel: string;
  fallbackDesc: string;
  path: string;
  icon: LucideIcon;
};

const workbenchMenus: MenuItem[] = [
  {
    key: "overview",
    fallbackLabel: "工作台总览",
    fallbackDesc: "查看所有 AI 工具与入口",
    path: "/tools/ai-workbench",
    icon: LayoutDashboard,
  },
  {
    key: "document",
    slug: "ai-document",
    fallbackLabel: "文字&文档处理",
    fallbackDesc: "文章撰写、润色、内容精简、翻译",
    path: "/tools/ai-workbench/document",
    icon: FileText,
  },
  {
    key: "image",
    slug: "ai-image-ocr",
    fallbackLabel: "图片处理&图文解析",
    fallbackDesc: "OCR 识别、图片描述、去水印",
    path: "/tools/ai-workbench/image",
    icon: Image,
  },
  {
    key: "pdf-summary",
    slug: "ai-pdf-summary",
    fallbackLabel: "PDF 多文件 AI 归纳",
    fallbackDesc: "批量 PDF / Word / 图片解析",
    path: "/tools/ai-workbench/pdf-summary",
    icon: BookOpen,
  },
  {
    key: "code-dev",
    slug: "ai-code-dev",
    fallbackLabel: "编程&前后端&API 开发",
    fallbackDesc: "代码生成、接口设计",
    path: "/tools/ai-workbench/code-dev",
    icon: Code2,
  },
  {
    key: "video-translate",
    slug: "ai-video-translate",
    fallbackLabel: "视频多语种字幕翻译",
    fallbackDesc: "语音识别、多语言字幕",
    path: "/tools/ai-workbench/video-translate",
    icon: Video,
  },
];

export default function AiWorkbenchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { t, language } = useLanguage();

  const isActive = (item: MenuItem) => {
    if (!pathname) return false;
    if (item.key === "overview") {
      return /\/tools\/ai-workbench\/?$/.test(pathname);
    }
    return pathname.includes(`/tools/ai-workbench/${item.key}`);
  };

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* 面包屑 */}
        <nav className="flex items-center text-sm text-gray-600 mb-6 flex-wrap">
          <a href="/" className="hover:text-[#1e3a5f]">
            {t("bc_home", "Home")}
          </a>
          <ChevronRight className="w-4 h-4 mx-1.5 text-gray-400" />
          <a href="/tools" className="hover:text-[#1e3a5f]">
            {t("bc_tools", "Tools")}
          </a>
          <ChevronRight className="w-4 h-4 mx-1.5 text-gray-400" />
          <span className="text-[#1e3a5f] font-semibold">
            {catNameOf("ai-workbench", "AI智能工作台", language, t)}
          </span>
        </nav>

        {/* 标题 */}
        <section className="mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1e3a5f] flex items-center justify-center shadow-sm shrink-0">
              <Brain className="w-7 h-7 text-[#fbbf24]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f]">
                {catNameOf("ai-workbench", "AI智能工作台", language, t)}
              </h1>
              <p className="text-gray-500 mt-1 text-sm md:text-base">
                {t(
                  "aw_subtitle",
                  "One-stop AI processing for documents, images, PDFs, code and video",
                )}
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* ===== 左侧菜单 ===== */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-[#1e3a5f]">
                <h2 className="text-white text-sm font-semibold">
                  {t("aw_menuTitle", "Function Menu")}
                </h2>
              </div>
              <nav className="p-2 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible">
                {workbenchMenus.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item);
                  const label =
                    item.key === "overview"
                      ? t("aw_overview", "Workbench Overview")
                      : toolNameOf(
                          item.slug as string,
                          item.fallbackLabel,
                          language,
                          t,
                        );
                  const desc =
                    item.key === "overview"
                      ? item.fallbackDesc
                      : toolIntroOf(
                          item.slug as string,
                          item.fallbackDesc,
                          language,
                          t,
                        );
                  return (
                    <button
                      key={item.key}
                      onClick={() => router.push(item.path)}
                      className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left transition shrink-0 lg:w-full ${
                        active ? "bg-[#fbbf24] shadow-sm" : "hover:bg-[#fbbf24]/10"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          active
                            ? "bg-[#1e3a5f]/10 text-[#1e3a5f]"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-sm whitespace-nowrap lg:whitespace-normal ${
                            active
                              ? "font-semibold text-[#1e3a5f]"
                              : "font-medium text-[#1a2b4e]"
                          }`}
                        >
                          {label}
                        </div>
                        <div className="hidden lg:block text-xs text-gray-500 mt-0.5 line-clamp-2">
                          {desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ===== 右侧功能区 ===== */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </main>
  );
}
