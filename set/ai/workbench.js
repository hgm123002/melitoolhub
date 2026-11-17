const fs = require('fs');
const path = require('path');
const root = __dirname;

console.log('========================================');
console.log('  AI智能工作台 - 自动搭建');
console.log('========================================\n');

// ========== 1. 修改 config/tools.ts ==========
console.log('1/7: 修改 config/tools.ts');
const toolsPath = path.join(root, 'config', 'tools.ts');
let toolsContent = fs.readFileSync(toolsPath, 'utf8');
if (!toolsContent.includes('ai-workbench')) {
  toolsContent = toolsContent.replace(
    "icon: 'Database' },",
    "icon: 'Database' },\n  { slug: 'ai-workbench', name: 'AI智能工作台', description: '文档处理、图片OCR、PDF归纳、代码开发、视频字幕翻译', icon: 'Brain' },"
  );
  const aiTools = '\n  { slug: \'ai-document\', name: \'AI文档处理\', category: \'ai-workbench\', categoryName: \'AI智能工作台\', icon: \'📄\', intro: \'智能文章撰写、润色、内容精简、逻辑重构，支持多语言内容翻译与优化。\', seo: { title: \'AI文档处理 - GlobalTradeHub\', keywords: \'AI写作, 文档润色, 内容优化\', description: \'智能文章撰写、润色、内容精简与逻辑重构\', h1Text: \'AI文档处理\' }, content: { intro: \'智能文章撰写、润色、内容精简、逻辑重构，支持多语言内容翻译与优化。\', tutorial: [\'上传文档或粘贴文本\', \'选择处理模式\', \'设置AI参数\', \'查看并导出结果\'], faq: [{ question: \'支持哪些文档格式？\', answer: \'支持TXT、DOC、DOCX、PDF等常见格式。\' }, { question: \'内容是否安全？\', answer: \'所有处理均通过加密通道。\' }] } },\n  { slug: \'ai-image-ocr\', name: \'图片OCR识别\', category: \'ai-workbench\', categoryName: \'AI智能工作台\', icon: \'🖼️\', intro: \'智能图片识别、文字OCR提取、图片压缩与格式转换，支持多语言图文解析。\', seo: { title: \'图片OCR识别 - GlobalTradeHub\', keywords: \'OCR识别, 图片处理, 文字提取\', description: \'智能图片识别、OCR文字提取与格式转换\', h1Text: \'图片OCR识别\' }, content: { intro: \'智能图片识别、文字OCR提取、图片压缩与格式转换，支持多语言图文解析。\', tutorial: [\'上传图片\', \'选择处理模式\', \'设置参数\', \'下载处理结果\'], faq: [{ question: \'支持哪些图片格式？\', answer: \'支持JPG、PNG、WEBP、BMP等主流格式。\' }, { question: \'OCR支持哪些语言？\', answer: \'支持中文、英文、西班牙语、葡萄牙语、俄语等多语言。\' }] } },\n  { slug: \'ai-pdf-summary\', name: \'PDF批量AI归纳\', category: \'ai-workbench\', categoryName: \'AI智能工作台\', icon: \'📚\', intro: \'批量上传PDF文档，AI自动解析内容、生成摘要、合并汇总、产出结构化报告。\', seo: { title: \'PDF批量AI归纳 - GlobalTradeHub\', keywords: \'PDF处理, AI摘要, 文档汇总\', description: \'批量PDF解析、AI摘要与结构化报告生成\', h1Text: \'PDF批量AI归纳\' }, content: { intro: \'批量上传PDF文档，AI自动解析内容、生成摘要、合并汇总、产出结构化报告。\', tutorial: [\'批量上传PDF/Word/图片文件\', \'设置归纳目标\', \'启动AI处理\', \'查看并下载结构化报告\'], faq: [{ question: \'一次能处理多少个文件？\', answer: \'单次最多支持50个文件，单个文件不超过50MB。\' }, { question: \'报告支持哪些格式导出？\', answer: \'支持PDF、Word、Markdown、HTML等多种格式。\' }] } },\n  { slug: \'ai-code-dev\', name: \'AI编程开发助手\', category: \'ai-workbench\', categoryName: \'AI智能工作台\', icon: \'💻\', intro: \'代码生成、错误排查、API接口方案设计、前后端开发辅助，支持多语言编程。\', seo: { title: \'AI编程开发助手 - GlobalTradeHub\', keywords: \'代码生成, AI编程, 接口设计\', description: \'AI代码生成、排错与前后端开发辅助\', h1Text: \'AI编程开发助手\' }, content: { intro: \'代码生成、错误排查、API接口方案设计、前后端开发辅助，支持多语言编程。\', tutorial: [\'输入开发需求或代码问题\', \'选择编程语言/框架\', \'查看AI生成的代码或方案\', \'调试优化并使用\'], faq: [{ question: \'支持哪些编程语言？\', answer: \'支持JavaScript、Python、Java、Go、PHP等主流语言。\' }, { question: \'能调试我的代码吗？\', answer: \'可以粘贴代码，AI会分析问题并提供修复建议。\' }] } },\n  { slug: \'ai-video-translate\', name: \'视频字幕翻译\', category: \'ai-workbench\', categoryName: \'AI智能工作台\', icon: \'🎬\', intro: \'视频语音转文字、自动生成字幕、英/西/葡/俄多语言翻译、SRT字幕文件导出。\', seo: { title: \'视频字幕翻译 - GlobalTradeHub\', keywords: \'视频字幕, 语音转文字, 多语言翻译\', description: \'视频语音转字幕、多语言翻译与SRT导出\', h1Text: \'视频字幕翻译\' }, content: { intro: \'视频语音转文字、自动生成字幕、英/西/葡/俄多语言翻译、SRT字幕文件导出。\', tutorial: [\'上传视频文件\', \'选择源语言与目标语言\', \'启动语音识别与翻译\', \'下载SRT字幕文件\'], faq: [{ question: \'支持哪些视频格式？\', answer: \'支持MP4、AVI、MOV、MKV等主流视频格式。\' }, { question: \'支持哪些目标语言？\', answer: \'支持英语、西班牙语、葡萄牙语、俄语等跨境主流市场语言。\' }] } },\n';
  toolsContent = toolsContent.replace(
    '// ============ 社区板块 ============',
    aiTools + '// ============ 社区板块 ============'
  );
  fs.writeFileSync(toolsPath, toolsContent, 'utf8');
  console.log('  OK 已添加AI分类和5个工具\n');
} else {
  console.log('  跳过(已存在)\n');
}

// ========== 2. 创建目录 ==========
console.log('2/7: 创建目录结构');
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
  if (!fs.existsSync(full)) { fs.mkdirSync(full, { recursive: true }); console.log('  创建 ' + d); }
});
console.log('');

// ========== 3. layout.tsx ==========
console.log('3/7: 创建左侧菜单布局 layout.tsx');
const layout = '"use client";\n\nimport { usePathname, useRouter } from "next/navigation";\nimport { LayoutDashboard, FileText, Image, BookOpen, Code2, Video, ChevronRight } from "lucide-react";\n\nconst workbenchMenus = [\n  { label: "工作台总览", path: "/tools/ai-workbench", icon: LayoutDashboard, desc: "查看所有AI工具和使用统计" },\n  { label: "文字&文档处理", path: "/tools/ai-workbench/document", icon: FileText, desc: "文章撰写、润色、内容精简、翻译" },\n  { label: "图片处理&图文解析", path: "/tools/ai-workbench/image", icon: Image, desc: "OCR识别、图片描述、去水印" },\n  { label: "PDF多文件AI归纳", path: "/tools/ai-workbench/pdf-summary", icon: BookOpen, desc: "批量PDF/Word/图片解析" },\n  { label: "编程&前后端&API开发", path: "/tools/ai-workbench/code-dev", icon: Code2, desc: "代码生成、接口设计" },\n  { label: "视频多语种字幕翻译", path: "/tools/ai-workbench/video-translate", icon: Video, desc: "语音识别、多语言字幕" },\n];\n\nexport default function AiWorkbenchLayout({ children }: { children: React.ReactNode }) {\n  const pathname = usePathname();\n  const router = useRouter();\n  return (\n    <main className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">\n      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">\n        <nav className="flex items-center text-sm text-gray-500 mb-6">\n          <a href="/" className="hover:text-[#1e3a5f]">首页</a>\n          <ChevronRight className="w-4 h-4 mx-2" />\n          <a href="/tools" className="hover:text-[#1e3a5f]">实用工具</a>\n          <ChevronRight className="w-4 h-4 mx-2" />\n          <span className="text-[#1e3a5f] font-semibold">AI智能工作台</span>\n        </nav>\n        <section className="mb-8">\n          <div className="flex items-center gap-4 mb-3">\n            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-blue-600 flex items-center justify-center shadow-lg text-3xl">🧠</div>\n            <div>\n              <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f]">AI智能工作台</h1>\n              <p className="text-gray-500 mt-1">文档写作 · 图片解析 · PDF归纳 · 代码开发 · 视频翻译 · 开放API</p>\n            </div>\n          </div>\n          <div className="flex flex-wrap gap-2 mt-4">\n            <span className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-full border border-gray-200 shadow-sm">📝 即开即用</span>\n            <span className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-full border border-gray-200 shadow-sm">🌐 多语言支持</span>\n            <span className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-full border border-gray-200 shadow-sm">🔌 开放API接口</span>\n            <span className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-full border border-gray-200 shadow-sm">⚡ 持续更新</span>\n          </div>\n        </section>\n        <div className="flex flex-col lg:flex-row gap-6">\n          <aside className="lg:w-64 shrink-0">\n            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-4">\n              <div className="p-4 bg-gradient-to-r from-[#1e3a5f] to-blue-600 text-white">\n                <h2 className="font-bold text-base">功能菜单</h2>\n                <p className="text-xs text-blue-100 mt-1">点击切换工作流</p>\n              </div>\n              <nav className="p-2">\n                {workbenchMenus.map((item) => {\n                  const Icon = item.icon;\n                  const isActive = pathname === item.path || (item.path !== "/tools/ai-workbench" && pathname && pathname.startsWith(item.path));\n                  return (\n                    <button key={item.path} onClick={() => router.push(item.path)} className={"w-full flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-all mb-1 " + (isActive ? "bg-amber-50 text-[#1e3a5f] border border-amber-200" : "text-gray-600 hover:bg-gray-50 hover:text-[#1e3a5f]")}>\n                      <div className={"w-9 h-9 rounded-lg flex items-center justify-center shrink-0 " + (isActive ? "bg-amber-100 text-[#1e3a5f]" : "bg-gray-100 text-gray-500")}><Icon className="w-4 h-4" /></div>\n                      <div className="flex-1 min-w-0"><div className="text-sm font-semibold">{item.label}</div><div className="text-xs text-gray-400 mt-0.5">{item.desc}</div></div>\n                    </button>\n                  );\n                })}\n              </nav>\n            </div>\n          </aside>\n          <div className="flex-1 min-w-0">{children}</div>\n        </div>\n      </div>\n    </main>\n  );\n}\n';
fs.writeFileSync(path.join(root, 'app/tools/ai-workbench/layout.tsx'), layout, 'utf8');
console.log('  OK\n');

// ========== 4. page.tsx（总览首页） ==========
console.log('4/7: 创建总览首页 page.tsx');
const home = '"use client";\n\nimport { useRouter } from "next/navigation";\nimport { FileText, Image, BookOpen, Code2, Video, ArrowRight } from "lucide-react";\n\nconst workbenchTools = [\n  { title: "文字&文档处理", desc: "把图片/文档/PDF传给AI，AI总结归纳生成合理文档，支持多语言翻译", icon: FileText, color: "from-blue-500 to-blue-600", path: "/tools/ai-workbench/document", features: ["智能写作", "内容润色", "逻辑重构", "多语言翻译"] },\n  { title: "图片处理&图文解析", desc: "OCR文字识别、图片描述生成、图片压缩、去水印、裁剪多余图像、图片文字翻译", icon: Image, color: "from-emerald-500 to-emerald-600", path: "/tools/ai-workbench/image", features: ["OCR识别", "图片描述", "去水印", "图片翻译"] },\n  { title: "PDF多文件AI归纳", desc: "批量上传PDF、Word、图片，AI自动解析内容、生成摘要、产出结构化报告", icon: BookOpen, color: "from-violet-500 to-violet-600", path: "/tools/ai-workbench/pdf-summary", features: ["批量解析", "智能摘要", "关键词提取", "报告导出"] },\n  { title: "编程&前后端&API开发", desc: "网站代码生成、产品功能代码、前后端开发、API接口方案设计", icon: Code2, color: "from-amber-500 to-amber-600", path: "/tools/ai-workbench/code-dev", features: ["代码生成", "Bug排查", "API设计", "代码审查"] },\n  { title: "视频多语种字幕翻译", desc: "视频语音转文字、自动生成字幕、英语/西班牙语/葡萄牙语/俄语翻译", icon: Video, color: "from-rose-500 to-rose-600", path: "/tools/ai-workbench/video-translate", features: ["语音识别", "字幕生成", "四语翻译", "SRT导出"] },\n];\n\nexport default function WorkbenchHomePage() {\n  const router = useRouter();\n  return (\n    <div className="space-y-6">\n      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">\n        <div className="flex items-start justify-between gap-6">\n          <div className="flex-1">\n            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-3">欢迎使用 AI 智能工作台 👋</h2>\n            <p className="text-gray-600 leading-relaxed">GlobalTradeHub AI 智能工作台为您提供一站式 AI 工具集，涵盖文档写作、图片处理、PDF归纳、代码开发、视频字幕翻译等核心功能，支持文档和图片作为输入交给AI处理。</p>\n            <div className="flex flex-wrap gap-2 mt-5">\n              <span className="px-3 py-1.5 bg-blue-50 text-blue-600 text-sm rounded-full">无需安装</span>\n              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-sm rounded-full">即开即用</span>\n              <span className="px-3 py-1.5 bg-violet-50 text-violet-600 text-sm rounded-full">多语言支持</span>\n              <span className="px-3 py-1.5 bg-amber-50 text-amber-600 text-sm rounded-full">开放API</span>\n              <span className="px-3 py-1.5 bg-rose-50 text-rose-600 text-sm rounded-full">持续更新</span>\n            </div>\n          </div>\n          <div className="hidden md:block text-8xl">🧠</div>\n        </div>\n      </section>\n      <section>\n        <h2 className="text-xl font-bold text-[#1e3a5f] mb-5">功能模块</h2>\n        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">\n          {workbenchTools.map((tool) => {\n            const Icon = tool.icon;\n            return (\n              <div key={tool.path} onClick={() => router.push(tool.path)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-lg hover:border-gray-200 transition-all group">\n                <div className={"w-14 h-14 rounded-2xl bg-gradient-to-br " + tool.color + " flex items-center justify-center mb-4 text-white shadow-lg"}><Icon className="w-7 h-7" /></div>\n                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 group-hover:text-[#f59e0b] transition-colors">{tool.title}</h3>\n                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{tool.desc}</p>\n                <div className="flex flex-wrap gap-2 mb-4">{tool.features.map((f, i) => (<span key={i} className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-lg">{f}</span>))}</div>\n                <div className="flex items-center gap-2 text-[#f59e0b] text-sm font-semibold">立即使用<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>\n              </div>\n            );\n          })}\n        </div>\n      </section>\n      <section className="grid md:grid-cols-4 gap-5">\n        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center"><div className="text-3xl font-bold text-[#1e3a5f] mb-1">5</div><div className="text-sm text-gray-500">可用工具数</div></div>\n        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center"><div className="text-3xl font-bold text-[#1e3a5f] mb-1">18+</div><div className="text-sm text-gray-500">支持语言</div></div>\n        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center"><div className="text-3xl font-bold text-[#1e3a5f] mb-1">∞</div><div className="text-sm text-gray-500">使用次数</div></div>\n        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center"><div className="text-3xl font-bold text-[#1e3a5f] mb-1">24/7</div><div className="text-sm text-gray-500">在线服务</div></div>\n      </section>\n      <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">\n        <h3 className="text-lg font-bold text-[#1e3a5f] mb-2">💡 使用提示</h3>\n        <ul className="text-sm text-gray-600 space-y-2">\n          <li>• 点击左侧菜单或上方功能卡片，进入对应工具的工作区</li>\n          <li>• 所有工具均支持实时处理，无需等待</li>\n          <li>• 文档处理功能支持将图片、文档、PDF直接传给AI进行归纳总结</li>\n          <li>• 视频翻译支持英语、西班牙语、葡萄牙语、俄语四语互译</li>\n          <li>• 对外 API 接口预留，后续开放给他人调用</li>\n        </ul>\n      </section>\n    </div>\n  );\n}\n';
fs.writeFileSync(path.join(root, 'app/tools/ai-workbench/page.tsx'), home, 'utf8');
console.log('  OK\n');

// ========== 5. 子页面生成函数 ==========
function simplePage(emoji, title, subtitle, features) {
  let cards = '';
  features.forEach((f) => {
    cards += '          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"><h3 className="font-bold text-[#1e3a5f] mb-2">' + f.icon + ' ' + f.title + '</h3><p className="text-sm text-gray-500">' + f.desc + '</p></div>\n';
  });
  return '"use client";\n\nexport default function Page() {\n  return (\n    <div className="space-y-6">\n      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">\n        <div className="flex items-center gap-4 mb-4">\n          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl shadow-lg">' + emoji + '</div>\n          <div>\n            <h1 className="text-2xl font-bold text-[#1e3a5f]">' + title + '</h1>\n            <p className="text-gray-500 mt-1">' + subtitle + '</p>\n          </div>\n        </div>\n        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">\n          <div className="text-4xl mb-2">🚧</div>\n          <h2 className="font-bold text-[#1e3a5f] mb-1">功能开发中</h2>\n          <p className="text-sm text-gray-500">该功能模块正在开发中，敬请期待完整功能上线</p>\n        </div>\n      </section>\n      <section>\n        <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">核心功能</h2>\n        <div className="grid md:grid-cols-2 gap-4">\n' + cards + '        </div>\n      </section>\n    </div>\n  );\n}\n';
}

console.log('5/7: 创建文档处理页面');
fs.writeFileSync(path.join(root, 'app/tools/ai-workbench/document/page.tsx'),
  simplePage('📄', '文字&文档处理', '文章撰写、润色、内容精简、逻辑重构、多语言翻译', [
    { icon: '✍️', title: '智能写作', desc: '根据主题自动生成高质量内容文章' },
    { icon: '✨', title: '内容润色', desc: '优化文案表达，提升可读性和专业度' },
    { icon: '📂', title: '文件上传处理', desc: '把图片、文档、PDF传给AI进行归纳总结' },
    { icon: '🌐', title: '多语言翻译', desc: '支持英语、西班牙语、葡萄牙语、俄语翻译' },
  ]), 'utf8');
console.log('  OK\n');

console.log('6/7: 创建图片处理、PDF归纳、编程开发、视频翻译页面');
fs.writeFileSync(path.join(root, 'app/tools/ai-workbench/image/page.tsx'),
  simplePage('🖼️', '图片处理&图文解析', 'OCR识别、图片描述、压缩、去水印、图片文字多语言翻译', [
    { icon: '🔤', title: 'OCR文字识别', desc: '从图片中提取文字内容，支持多语言' },
    { icon: '📝', title: '图片描述生成', desc: 'AI自动描述图片内容和场景' },
    { icon: '🗜️', title: '图片压缩', desc: '保持画质的同时大幅减小文件体积' },
    { icon: '🚫', title: '去水印', desc: '智能识别和去除图片中的水印和多余图像' },
    { icon: '🌍', title: '图片文字翻译', desc: '识别文字并翻译成葡/俄/英/西语' },
    { icon: '✂️', title: '裁剪优化', desc: '裁剪多余图像，优化图片构图' },
  ]), 'utf8');

fs.writeFileSync(path.join(root, 'app/tools/ai-workbench/pdf-summary/page.tsx'),
  simplePage('📚', 'PDF多文件AI归纳', '批量上传PDF/Word/图片，AI总结提炼生成结构化报告', [
    { icon: '📂', title: '多文件批量上传', desc: '支持同时上传和解析多个PDF、Word、图片文件' },
    { icon: '📋', title: '智能摘要', desc: 'AI自动生成每篇文档的精华摘要和要点' },
    { icon: '🏷️', title: '关键词提取', desc: '自动识别文档核心主题和关键词' },
    { icon: '📊', title: '结构化报告', desc: '汇总所有内容生成可导出的分析报告' },
  ]), 'utf8');

fs.writeFileSync(path.join(root, 'app/tools/ai-workbench/code-dev/page.tsx'),
  simplePage('💻', '编程&前后端&API开发', '网站代码生成、产品功能代码、API接口方案设计', [
    { icon: '⚡', title: '代码生成', desc: '根据需求自动生成可用的网站/功能代码' },
    { icon: '🐛', title: 'Bug排查', desc: '粘贴问题代码，AI自动分析并提供修复建议' },
    { icon: '🔌', title: 'API接口设计', desc: '接口方案、请求响应示例、文档生成' },
    { icon: '🔍', title: '代码审查', desc: '检查代码质量、发现潜在问题、优化建议' },
  ]), 'utf8');

fs.writeFileSync(path.join(root, 'app/tools/ai-workbench/video-translate/page.tsx'),
  simplePage('🎬', '视频多语种字幕翻译', '语音转文字、自动生成字幕、葡/俄/英/西四语翻译', [
    { icon: '🎙️', title: '语音识别', desc: '从视频中自动提取语音转换为文字' },
    { icon: '📝', title: '字幕生成', desc: '自动生成带时间轴的字幕内容' },
    { icon: '🌍', title: '四语翻译', desc: '英语、西班牙语、葡萄牙语、俄语翻译' },
    { icon: '📤', title: 'SRT导出', desc: '导出标准SRT字幕文件，直接用于视频编辑' },
  ]), 'utf8');
console.log('  OK\n');

// ========== 完成 ==========
console.log('========================================');
console.log('✅  全部完成！');
console.log('========================================');
console.log('');
console.log('已创建/修改的文件：');
console.log('  config/tools.ts (新增AI分类和5个工具)');
console.log('  app/tools/ai-workbench/layout.tsx (左侧菜单)');
console.log('  app/tools/ai-workbench/page.tsx (总览首页)');
console.log('  app/tools/ai-workbench/document/page.tsx');
console.log('  app/tools/ai-workbench/image/page.tsx');
console.log('  app/tools/ai-workbench/pdf-summary/page.tsx');
console.log('  app/tools/ai-workbench/code-dev/page.tsx');
console.log('  app/tools/ai-workbench/video-translate/page.tsx');
console.log('');
console.log('下一步，在终端运行：');
console.log('  npm run dev');
console.log('然后用浏览器打开：');
console.log('  http://localhost:3000/tools/ai-workbench');