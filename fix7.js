const fs = require('fs');
const path = require('path');
const root = __dirname;
const toolsPath = path.join(root, 'config', 'tools.ts');
let c = fs.readFileSync(toolsPath, 'utf8');
const lines = c.split('\n');

// 第一步: 找到 tools 数组中的 '];' (结束标记)
// 找到第一个 tools 数组后的 '];' 应该在 communitySections 之前
let toolsEndLine = -1;
let communityStart = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('communitySections') && communityStart === -1) {
    communityStart = i;
    // tools 数组结束标记应该在这之前几行,往上找
    for (let j = i - 1; j >= 0; j--) {
      if (lines[j].trim() === '];') {
        toolsEndLine = j;
        break;
      }
    }
    break;
  }
}

console.log('✓ communitySections 在第', communityStart + 1, '行');
console.log('✓ tools 数组结束于第', toolsEndLine + 1, '行:', lines[toolsEndLine].trim());

// 第二步: 构造新的 AI 工具
const newAiTools = `  { slug: 'ai-document', name: 'AI文档处理', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '📄', intro: '智能文章撰写、润色、内容精简、逻辑重构,支持多语言内容翻译与优化。', seo: { title: 'AI文档处理 - GlobalTradeHub', keywords: 'AI写作, 文档润色, 内容优化', description: '智能文章撰写、润色、内容精简与逻辑重构', h1Text: 'AI文档处理' }, content: { intro: '智能文章撰写、润色、内容精简、逻辑重构,支持多语言内容翻译与优化。', tutorial: ['上传文档或粘贴文本', '选择处理模式', '设置AI参数', '查看并导出结果'], faq: [{ question: '支持哪些文档格式?', answer: '支持TXT、DOC、DOCX、PDF等常见格式。' }, { question: '内容是否安全?', answer: '所有处理均通过加密通道。' }] } },
  { slug: 'ai-image-ocr', name: '图片OCR识别', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '🖼️', intro: '智能图片识别、文字OCR提取、图片压缩与格式转换,支持多语言图文解析。', seo: { title: '图片OCR识别 - GlobalTradeHub', keywords: 'OCR识别, 图片处理, 文字提取', description: '智能图片识别、OCR文字提取与格式转换', h1Text: '图片OCR识别' }, content: { intro: '智能图片识别、文字OCR提取、图片压缩与格式转换,支持多语言图文解析。', tutorial: ['上传图片', '选择处理模式', '设置参数', '下载处理结果'], faq: [{ question: '支持哪些图片格式?', answer: '支持JPG、PNG、WEBP、BMP等主流格式。' }, { question: 'OCR支持哪些语言?', answer: '支持中文、英文、西班牙语、葡萄牙语、俄语等多语言。' }] } },
  { slug: 'ai-pdf-summary', name: 'PDF批量AI归纳', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '📚', intro: '批量上传PDF文档,AI自动解析内容、生成摘要、合并汇总、产出结构化报告。', seo: { title: 'PDF批量AI归纳 - GlobalTradeHub', keywords: 'PDF处理, AI摘要, 文档汇总', description: '批量PDF解析、AI摘要与结构化报告生成', h1Text: 'PDF批量AI归纳' }, content: { intro: '批量上传PDF文档,AI自动解析内容、生成摘要、合并汇总、产出结构化报告。', tutorial: ['批量上传PDF/Word/图片文件', '设置归纳目标', '启动AI处理', '查看并下载结构化报告'], faq: [{ question: '一次能处理多少个文件?', answer: '单次最多支持50个文件,单个文件不超过50MB。' }, { question: '报告支持哪些格式导出?', answer: '支持PDF、Word、Markdown、HTML等多种格式。' }] } },
  { slug: 'ai-code-dev', name: 'AI编程开发助手', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '💻', intro: '代码生成、错误排查、API接口方案设计、前后端开发辅助,支持多语言编程。', seo: { title: 'AI编程开发助手 - GlobalTradeHub', keywords: '代码生成, AI编程, 接口设计', description: 'AI代码生成、排错与前后端开发辅助', h1Text: 'AI编程开发助手' }, content: { intro: '代码生成、错误排查、API接口方案设计、前后端开发辅助,支持多语言编程。', tutorial: ['输入开发需求或代码问题', '选择编程语言/框架', '查看AI生成的代码或方案', '调试优化并使用'], faq: [{ question: '支持哪些编程语言?', answer: '支持JavaScript、Python、Java、Go、PHP等主流语言。' }, { question: '能调试我的代码吗?', answer: '可以粘贴代码,AI会分析问题并提供修复建议。' }] } },
  { slug: 'ai-video-translate', name: '视频字幕翻译', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '🎬', intro: '视频语音转文字、自动生成字幕、英/西/葡/俄多语言翻译、SRT字幕文件导出。', seo: { title: '视频字幕翻译 - GlobalTradeHub', keywords: '视频字幕, 语音转文字, 多语言翻译', description: '视频语音转字幕、多语言翻译与SRT导出', h1Text: '视频字幕翻译' }, content: { intro: '视频语音转文字、自动生成字幕、英/西/葡/俄多语言翻译、SRT字幕文件导出。', tutorial: ['上传视频文件', '选择源语言与目标语言', '启动语音识别与翻译', '下载SRT字幕文件'], faq: [{ question: '支持哪些视频格式?', answer: '支持MP4、AVI、MOV、MKV等主流视频格式。' }, { question: '支持哪些目标语言?', answer: '支持英语、西班牙语、葡萄牙语、俄语等跨境主流市场语言。' }] } },
`;

// 第三步: 在 tools 数组的 '];' 之前插入 AI 工具
// 首先检查当前 toolsEndLine 是否真的是 '];'
if (lines[toolsEndLine].trim() === '];') {
  // 在 toolsEndLine 之前插入
  lines.splice(toolsEndLine, 0, newAiTools);
  const newContent = lines.join('\n');
  fs.writeFileSync(toolsPath, newContent, 'utf8');
  console.log('✓ AI 工具已插入到 tools 数组的 ]; 之前');

  // 第四步: 验证语法
  try {
    const newLines = newContent.split('\n');
    let newToolsStart = -1;
    let newToolsEnd = -1;
    for (let i = 0; i < newLines.length; i++) {
      if (newLines[i].includes('export const tools =') && newToolsStart === -1) {
        newToolsStart = i;
      }
      if (newToolsStart !== -1 && i > newToolsStart && newLines[i].trim() === '];' && newToolsEnd === -1) {
        newToolsEnd = i;
        break;
      }
    }
    const arrLines = newLines.slice(newToolsStart, newToolsEnd + 1);
    let arrCode = arrLines.join('\n');
    arrCode = arrCode.replace('export const tools =', 'const tools =');
    const fn = new Function(arrCode + ';return tools;');
    const tools = fn();
    const aiTools = tools.filter(t => t.category === 'ai-workbench');
    console.log('✓ 验证通过,工具总数:', tools.length);
    console.log('✓ AI工作台分类工具数:', aiTools.length);
    aiTools.forEach(t => console.log('  -', t.slug, t.name));
  } catch (e) {
    console.log('✗ 验证失败:', e.message);
  }
} else {
  console.log('✗ toolsEndLine 不是 ]; , 实际内容:', lines[toolsEndLine].trim());
}