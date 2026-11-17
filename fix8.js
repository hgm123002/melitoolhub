const fs = require('fs');
const path = require('path');
const root = __dirname;
const toolsPath = path.join(root, 'config', 'tools.ts');
let c = fs.readFileSync(toolsPath, 'utf8');
const lines = c.split('\n');

// 打印前 30 行看结构
console.log('=== 第 1-30 行 ===');
for (let i = 0; i < 30 && i < lines.length; i++) {
  const line = lines[i];
  let mark = '';
  if (line.includes('categories')) mark = ' [CATEGORIES 数组]';
  if (line.includes('export const tools')) mark = ' [TOOLS 数组开始]';
  if (line.includes('ai-document')) mark = ' [AI 工具!]';
  if (line.includes('Brain')) mark = ' [AI 分类]';
  console.log((i+1) + mark + ': ' + line.trim().substring(0, 80));
}

// 找到 categories 数组中的 AI 工具位置(从第 13 行附近)
// categories 数组在第 5-13 行,tools 数组在第 64 行之后
// 我们需要:
// 1. 找到 categories 数组中的 '];' (结束)
// 2. 删除 categories 中混入的 AI 工具行
// 3. 确保 categories 正确结束
// 4. 在 tools 数组的 '];' 前插入 AI 工具

// 先找到 categories 数组结束位置
let categoriesEnd = -1;
for (let i = 4; i < 30; i++) {
  if (lines[i].trim() === '];') {
    categoriesEnd = i;
    console.log('✓ categories 数组结束于第', i+1, '行');
    break;
  }
}

// 再找到 tools 数组开始和结束位置
let toolsStart = -1;
let toolsEnd = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('export const tools') && toolsStart === -1) {
    toolsStart = i;
  }
  if (toolsStart !== -1 && i > toolsStart && lines[i].trim() === '];' && toolsEnd === -1) {
    toolsEnd = i;
    console.log('✓ tools 数组开始于第', toolsStart+1, '行, 结束于第', toolsEnd+1, '行');
    break;
  }
}

// 现在清理: 删除所有包含 'ai-' 的工具行,并确保 categories 正确
const aiSlugs = ['ai-document', 'ai-image-ocr', 'ai-pdf-summary', 'ai-code-dev', 'ai-video-translate'];
const newLines = [];
let removedFromCategories = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const isAiTool = aiSlugs.some(slug => line.includes("slug: '" + slug + "'"));
  if (isAiTool) {
    // 如果这行在 categories 数组中, 说明是错误插入的, 需要删除
    console.log('删除第', i+1, '行的 AI 工具');
    removedFromCategories++;
  } else {
    newLines.push(line);
  }
}
console.log('✓ 已删除', removedFromCategories, '个 AI 工具行');

// 现在重新构造内容
let newContent = newLines.join('\n');

// 找到 tools 数组的结束位置(重新搜索,因为行数变了)
const newContentLines = newContent.split('\n');
let newToolsStart = -1;
let newToolsEnd = -1;
for (let i = 0; i < newContentLines.length; i++) {
  if (newContentLines[i].includes('export const tools') && newToolsStart === -1) {
    newToolsStart = i;
  }
  if (newToolsStart !== -1 && i > newToolsStart && newContentLines[i].trim() === '];' && newToolsEnd === -1) {
    newToolsEnd = i;
    console.log('✓ 新 tools 数组结束于第', newToolsEnd+1, '行');
    break;
  }
}

// 在 tools 数组的 '];' 前插入 AI 工具
const newAiTools = `  { slug: 'ai-document', name: 'AI文档处理', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '📄', intro: '智能文章撰写、润色、内容精简、逻辑重构,支持多语言内容翻译与优化。', seo: { title: 'AI文档处理 - GlobalTradeHub', keywords: 'AI写作, 文档润色, 内容优化', description: '智能文章撰写、润色、内容精简与逻辑重构', h1Text: 'AI文档处理' }, content: { intro: '智能文章撰写、润色、内容精简、逻辑重构,支持多语言内容翻译与优化。', tutorial: ['上传文档或粘贴文本', '选择处理模式', '设置AI参数', '查看并导出结果'], faq: [{ question: '支持哪些文档格式?', answer: '支持TXT、DOC、DOCX、PDF等常见格式。' }, { question: '内容是否安全?', answer: '所有处理均通过加密通道。' }] } },
  { slug: 'ai-image-ocr', name: '图片OCR识别', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '🖼️', intro: '智能图片识别、文字OCR提取、图片压缩与格式转换,支持多语言图文解析。', seo: { title: '图片OCR识别 - GlobalTradeHub', keywords: 'OCR识别, 图片处理, 文字提取', description: '智能图片识别、OCR文字提取与格式转换', h1Text: '图片OCR识别' }, content: { intro: '智能图片识别、文字OCR提取、图片压缩与格式转换,支持多语言图文解析。', tutorial: ['上传图片', '选择处理模式', '设置参数', '下载处理结果'], faq: [{ question: '支持哪些图片格式?', answer: '支持JPG、PNG、WEBP、BMP等主流格式。' }, { question: 'OCR支持哪些语言?', answer: '支持中文、英文、西班牙语、葡萄牙语、俄语等多语言。' }] } },
  { slug: 'ai-pdf-summary', name: 'PDF批量AI归纳', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '📚', intro: '批量上传PDF文档,AI自动解析内容、生成摘要、合并汇总、产出结构化报告。', seo: { title: 'PDF批量AI归纳 - GlobalTradeHub', keywords: 'PDF处理, AI摘要, 文档汇总', description: '批量PDF解析、AI摘要与结构化报告生成', h1Text: 'PDF批量AI归纳' }, content: { intro: '批量上传PDF文档,AI自动解析内容、生成摘要、合并汇总、产出结构化报告。', tutorial: ['批量上传PDF/Word/图片文件', '设置归纳目标', '启动AI处理', '查看并下载结构化报告'], faq: [{ question: '一次能处理多少个文件?', answer: '单次最多支持50个文件,单个文件不超过50MB。' }, { question: '报告支持哪些格式导出?', answer: '支持PDF、Word、Markdown、HTML等多种格式。' }] } },
  { slug: 'ai-code-dev', name: 'AI编程开发助手', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '💻', intro: '代码生成、错误排查、API接口方案设计、前后端开发辅助,支持多语言编程。', seo: { title: 'AI编程开发助手 - GlobalTradeHub', keywords: '代码生成, AI编程, 接口设计', description: 'AI代码生成、排错与前后端开发辅助', h1Text: 'AI编程开发助手' }, content: { intro: '代码生成、错误排查、API接口方案设计、前后端开发辅助,支持多语言编程。', tutorial: ['输入开发需求或代码问题', '选择编程语言/框架', '查看AI生成的代码或方案', '调试优化并使用'], faq: [{ question: '支持哪些编程语言?', answer: '支持JavaScript、Python、Java、Go、PHP等主流语言。' }, { question: '能调试我的代码吗?', answer: '可以粘贴代码,AI会分析问题并提供修复建议。' }] } },
  { slug: 'ai-video-translate', name: '视频字幕翻译', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '🎬', intro: '视频语音转文字、自动生成字幕、英/西/葡/俄多语言翻译、SRT字幕文件导出。', seo: { title: '视频字幕翻译 - GlobalTradeHub', keywords: '视频字幕, 语音转文字, 多语言翻译', description: '视频语音转字幕、多语言翻译与SRT导出', h1Text: '视频字幕翻译' }, content: { intro: '视频语音转文字、自动生成字幕、英/西/葡/俄多语言翻译、SRT字幕文件导出。', tutorial: ['上传视频文件', '选择源语言与目标语言', '启动语音识别与翻译', '下载SRT字幕文件'], faq: [{ question: '支持哪些视频格式?', answer: '支持MP4、AVI、MOV、MKV等主流视频格式。' }, { question: '支持哪些目标语言?', answer: '支持英语、西班牙语、葡萄牙语、俄语等跨境主流市场语言。' }] } },
`;

// 在 tools 数组结束标记前插入
newContentLines.splice(newToolsEnd, 0, newAiTools);
newContent = newContentLines.join('\n');

fs.writeFileSync(toolsPath, newContent, 'utf8');
console.log('✓ 已写回文件,并在 tools 数组正确位置插入 AI 工具');

// 最终验证
try {
  const finalLines = newContent.split('\n');
  let fs2 = -1, fe2 = -1;
  for (let i = 0; i < finalLines.length; i++) {
    if (finalLines[i].includes('export const tools') && fs2 === -1) fs2 = i;
    if (fs2 !== -1 && i > fs2 && finalLines[i].trim() === '];' && fe2 === -1) {
      fe2 = i;
      break;
    }
  }
  const arrLines = finalLines.slice(fs2, fe2 + 1);
  let arrCode = arrLines.join('\n');
  arrCode = arrCode.replace('export const tools =', 'const tools =');
  const fn = new Function(arrCode + ';return tools;');
  const tools = fn();
  const aiTools = tools.filter(t => t.category === 'ai-workbench');
  console.log('✓ 最终验证 - 工具总数:', tools.length, ', AI工具数:', aiTools.length);
  aiTools.forEach(t => console.log('  -', t.slug, t.name));
} catch (e) {
  console.log('✗ 验证失败:', e.message);
}