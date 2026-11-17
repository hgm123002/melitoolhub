const fs = require('fs');
const path = require('path');
const root = __dirname;

console.log('🧠 AI工作台 - 阶段 1/3 开始...');

// ============ 1. 修改 config/tools.ts，新增第7个分类和5个AI工具 ============
console.log('\n📝 步骤 1: 修改 config/tools.ts...');

const toolsPath = path.join(root, 'config', 'tools.ts');
let toolsContent = fs.readFileSync(toolsPath, 'utf8');

// 检查是否已经添加过
if (!toolsContent.includes('ai-workbench')) {

  // 1a: 在 categories 数组末尾新增第7个分类
  toolsContent = toolsContent.replace(
    /icon: 'Database' },\n\];/,
    `icon: 'Database' },
  { slug: 'ai-workbench', name: 'AI智能工作台', description: '文档处理、图片OCR、PDF归纳、代码开发、视频字幕翻译', icon: 'Brain' },
];`
  );

  // 1b: 在 communitySections 之前添加5个AI工具到 tools 数组末尾
  const aiTools = `
  { slug: 'ai-document', name: 'AI文档处理', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '📄', intro: '智能文章撰写、润色、内容精简、逻辑重构，支持多语言内容翻译与优化。', seo: { title: 'AI文档处理 - GlobalTradeHub', keywords: 'AI写作, 文档润色, 内容优化', description: '智能文章撰写、润色、内容精简与逻辑重构', h1Text: 'AI文档处理' }, content: { intro: '智能文章撰写、润色、内容精简、逻辑重构，支持多语言内容翻译与优化。', tutorial: ['上传文档或粘贴文本', '选择处理模式（撰写/润色/精简/翻译）', '设置AI参数', '查看并导出结果'], faq: [{ question: '支持哪些文档格式？', answer: '支持TXT、DOC、DOCX、PDF等常见格式。' }, { question: '内容是否安全？', answer: '所有处理均通过加密通道，不上传保存用户内容。' }] } },
  { slug: 'ai-image-ocr', name: '图片OCR识别', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '🖼️', intro: '智能图片识别、文字OCR提取、图片压缩与格式转换，支持多语言图文解析。', seo: { title: '图片OCR识别 - GlobalTradeHub', keywords: 'OCR识别, 图片处理, 文字提取', description: '智能图片识别、OCR文字提取与格式转换', h1Text: '图片OCR识别' }, content: { intro: '智能图片识别、文字OCR提取、图片压缩与格式转换，支持多语言图文解析。', tutorial: ['上传图片', '选择处理模式（OCR识别/压缩/转换）', '设置参数', '下载处理结果'], faq: [{ question: '支持哪些图片格式？', answer: '支持JPG、PNG、WEBP、BMP等主流格式。' }, { question: 'OCR支持哪些语言？', answer: '支持中文、英文、西班牙语、葡萄牙语、俄语等多语言。' }] } },
  { slug: 'ai-pdf-summary', name: 'PDF批量AI归纳', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '📚', intro: '批量上传PDF文档，AI自动解析内容、生成摘要、合并汇总、产出结构化报告。', seo: { title: 'PDF批量AI归纳 - GlobalTradeHub', keywords: 'PDF处理, AI摘要, 文档汇总', description: '批量PDF解析、AI摘要与结构化报告生成', h1Text: 'PDF批量AI归纳' }, content: { intro: '批量上传PDF文档，AI自动解析内容、生成摘要、合并汇总、产出结构化报告。', tutorial: ['批量上传PDF文件', '设置归纳目标（摘要/关键词/对比分析）', '启动AI处理', '查看并下载结构化报告'], faq: [{ question: '一次能处理多少个PDF？', answer: '单次最多支持50个PDF文件，单个文件不超过50MB。' }, { question: '报告支持哪些格式导出？', answer: '支持PDF、Word、Markdown、HTML等多种格式。' }] } },
  { slug: 'ai-code-dev', name: 'AI编程开发助手', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '💻', intro: '代码生成、错误排查、API接口方案设计、前后端开发辅助，支持多语言编程。', seo: { title: 'AI编程开发助手 - GlobalTradeHub', keywords: '代码生成, AI编程, 接口设计', description: 'AI代码生成、排错与前后端开发辅助', h1Text: 'AI编程开发助手' }, content: { intro: '代码生成、错误排查、API接口方案设计、前后端开发辅助，支持多语言编程。', tutorial: ['输入开发需求或代码问题', '选择编程语言/框架', '查看AI生成的代码或方案', '调试优化并使用'], faq: [{ question: '支持哪些编程语言？', answer: '支持JavaScript、Python、Java、Go、PHP等主流语言。' }, { question: '能调试我的代码吗？', answer: '可以粘贴代码，AI会分析问题并提供修复建议。' }] } },
  { slug: 'ai-video-translate', name: '视频字幕翻译', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '🎬', intro: '视频语音转文字、自动生成字幕、英/西/葡/俄多语言翻译、SRT字幕文件导出。', seo: { title: '视频字幕翻译 - GlobalTradeHub', keywords: '视频字幕, 语音转文字, 多语言翻译', description: '视频语音转字幕、多语言翻译与SRT导出', h1Text: '视频字幕翻译' }, content: { intro: '视频语音转文字、自动生成字幕、英/西/葡/俄多语言翻译、SRT字幕文件导出。', tutorial: ['上传视频文件', '选择源语言与目标语言', '启动语音识别与翻译', '下载SRT字幕文件'], faq: [{ question: '支持哪些视频格式？', answer: '支持MP4、AVI、MOV、MKV等主流视频格式。' }, { question: '支持哪些目标语言？', answer: '支持英语、西班牙语、葡萄牙语、俄语等跨境主流市场语言。' }] } },
`;

  // 在 communitySections 之前插入
  toolsContent = toolsContent.replace(
    /\n\/\/ ============ 社区板块 ============/,
    aiTools + '\n// ============ 社区板块 ============'
  );

  fs.writeFileSync(toolsPath, toolsContent, 'utf8');
  console.log('  ✅ config/tools.ts 更新完成（新增AI分类和5个工具）');
} else {
  console.log('  ⏭️  config/tools.ts 已包含AI工作台，跳过');
}

// ============ 2. 创建目录结构 ============
console.log('\n📂 步骤 2: 创建目录结构...');
const dirs = [
  'app/tools/ai-workbench',
  'app/tools/ai-workbench/document',
  'app/tools/ai-workbench/image',
  'app/tools/ai-workbench/pdf-summary',
  'app/tools/ai-workbench/code-dev',
  'app/tools/ai-workbench/video-translate',
];
dirs.forEach(d => {
  const full = path.join(root, d);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
    console.log('  ✅ 创建目录: ' + d);
  }
});

// ============ 3. 创建左侧菜单栏布局 layout.tsx ============
console.log('\n🎨 步骤 3: 创建左侧菜单栏布局...');
const layoutCode = `"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Image,
  BookOpen,
  Code2,
  Video,
  ChevronRight,
} from "lucide-react";

const workbenchMenus = [
  {
    label: "工作台总览",
    path: "/tools/ai-workbench",
    icon: LayoutDashboard,
    desc: "查看所有AI工具和使用统计",
  },
  {
    label: "文字&文档处理",
    path: "/tools/ai-workbench/document",
    icon: FileText,
    desc: "文章撰写、润色、内容精简、翻译",
  },
  {
    label: "图片处理&图文解析",
    path: "/tools/ai-workbench/image",
    icon: Image,
    desc: "OCR识别、图片描述、去水印",
  },
  {
    label: "PDF多文件AI归纳",
    path: "/tools/ai-workbench/pdf-summary",
    icon: BookOpen,
    desc: "批量PDF/Word/图片解析、报告生成",
  },
  {
    label: "编程&前后端&API开发",
    path: "/tools/ai-workbench/code-dev",
    icon: Code2,
    desc: "代码生成、Bug修复、接口设计",
  },
  {
    label: "视频多语种字幕翻译",
    path: "/tools/ai-workbench/video-translate",
    icon: Video,
    desc: "语音识别、字幕生成、多语言翻译",
  },
];

export default function AiWorkbenchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <main className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-[#1e3a5f] transition-colors">首页</a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <a href="/tools" className="hover:text-[#1e3a5f] transition-colors">实用工具</a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#1e3a5f] font-semibold">AI智能工作台</span>
        </nav>

        <section className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-blue-600 flex items-center justify-center shadow-lg">
              <span className="text-3xl">🧠</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f]">AI智能工作台</h1>
              <p className="text-gray-500 mt-1">文档写作 · 图片解析 · PDF归纳 · 代码开发 · 视频翻译 · 开放API</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-full border border-gray-200 shadow-sm">📝 即开即用</span>
            <span className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-full border border-gray-200 shadow-sm">🌐 多语言支持</span>
            <span className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-full border border-gray-200 shadow-sm">🔌 开放API接口</span>
            <span className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-full border border-gray-200 shadow-sm">⚡ 持续更新</span>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-4">
              <div className="p-4 bg-gradient-to-r from-[#1e3a5f] to-blue-600 text-white">
                <h2 className="font-bold text-base">功能菜单</h2>
                <p className="text-xs text-blue-100 mt-1">点击切换工作流</p>
              </div>
              <nav className="p-2">
                {workbenchMenus.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path ||
                    (item.path !== "/tools/ai-workbench" && pathname?.startsWith(item.path));
                  return (
                    <button
                      key={item.path}
                      onClick={() => router.push(item.path)}
                      className={\`w-full flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-all mb-1 \${
                        isActive
                          ? "bg-amber-50 text-[#1e3a5f] border border-amber-200"
                          : "text-gray-600 hover:bg-gray-50 hover:text-[#1e3a5f]"
                      }\`}
                    >
                      <div className={\`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 \${
                        isActive ? "bg-amber-100 text-[#1e3a5f]" : "bg-gray-100 text-gray-500"
                      }\`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold">{item.label}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
`;
fs.writeFileSync(path.join(root, 'app/tools/ai-workbench/layout.tsx'), layoutCode, 'utf8');
console.log('  ✅ layout.tsx 创建完成（左侧菜单栏）');

console.log('\n========================================');
console.log('✅ 阶段 1/3 完成！');
console.log('========================================');
console.log('- config/tools.ts 已更新（新增AI分类和5个工具）');
console.log('- app/tools/ai-workbench/ 目录已创建');
console.log('- app/tools/ai-workbench/layout.tsx 已创建');
console.log('');
console.log('👉 请继续创建并运行 setup-ai-2.js');
`;

try {
  fs.writeFileSync(path.join(root, 'setup-ai-1.js'), content, 'utf8');
  console.log('  ✅ 脚本已保存。请在终端运行: node setup-ai-1.js');
} catch(e) {
  console.log('  ⚠️  请手动复制上方代码并保存为 setup-ai-1.js
}