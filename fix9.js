const fs = require('fs');
const path = require('path');
const root = __dirname;

const toolsPagePath = path.join(root, 'app', 'tools', 'page.tsx');
let c = fs.readFileSync(toolsPagePath, 'utf8');

console.log('原文件大小:', c.length);

// 找到 tool.slug 的链接部分
// 原代码: href={`/tool/${tool.slug}`}
// 需要: AI 工具用特殊路径,其他工具保持原有

// 方法: 在页面的关键部分添加逻辑
// 让我先看看完整的循环结构
const lines = c.split('\n');
const toolLoopLines = [];
let inLoop = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('filteredTools.map') || lines[i].includes('tools.map')) {
    inLoop = true;
  }
  if (inLoop && lines[i].includes('href') && lines[i].includes('tool.slug')) {
    toolLoopLines.push(i + 1);
    console.log('找到工具链接:第 ' + (i + 1) + ' 行:', lines[i].trim().substring(0, 80));
    break;
  }
}

if (toolLoopLines.length === 0) {
  console.log('❌ 没有找到链接逻辑,尝试查找其他方式...');
  // 查找所有 href 相关行
  lines.forEach((line, i) => {
    if (line.includes('href') && line.includes('tool')) {
      console.log('L' + (i + 1) + ': ' + line.trim());
    }
  });
} else {
  // 替换 href 逻辑: 区分 AI 工具和其他工具
  const aiToolSlugs = ['ai-document', 'ai-image-ocr', 'ai-pdf-summary', 'ai-code-dev', 'ai-video-translate'];
  const aiPathMap = {
    'ai-document': '/tools/ai-workbench/document',
    'ai-image-ocr': '/tools/ai-workbench/image',
    'ai-pdf-summary': '/tools/ai-workbench/pdf-summary',
    'ai-code-dev': '/tools/ai-workbench/code-dev',
    'ai-video-translate': '/tools/ai-workbench/video-translate',
  };

  // 在文件顶部添加一个辅助函数(简单方法)
  // 在 tools/page.tsx 中修改 href 的生成方式
  // 用模板字符串方式替换

  // 找到 `href={...tool.slug}` 这行替换
  let changed = false;
  const newLines = lines.map((line, i) => {
    if (line.includes('href={') && line.includes('tool.slug') && !changed) {
      changed = true;
      // 在这行之前添加逻辑,或者直接替换
      // 简单的做法: 添加条件判断
      const indent = line.match(/^\s*/)[0];
      const newLink = indent + "href={tool.slug && tool.slug.startsWith('ai-') ? ({'ai-document':'/tools/ai-workbench/document','ai-image-ocr':'/tools/ai-workbench/image','ai-pdf-summary':'/tools/ai-workbench/pdf-summary','ai-code-dev':'/tools/ai-workbench/code-dev','ai-video-translate':'/tools/ai-workbench/video-translate'}[tool.slug] || '/tools/ai-workbench') : `/tool/${tool.slug}`}";
      console.log('✓ 已替换第 ' + (i + 1) + ' 行');
      return newLink;
    }
    return line;
  });

  if (!changed) {
    console.log('⚠️ 未找到需要替换的 href 行,显示所有工具循环相关行:');
    lines.forEach((line, i) => {
      if ((line.includes('tool') && line.includes('href')) || line.includes('filteredTools')) {
        console.log('L' + (i + 1) + ': ' + line.trim().substring(0, 100));
      }
    });
  } else {
    const newContent = newLines.join('\n');
    fs.writeFileSync(toolsPagePath, newContent, 'utf8');
    console.log('✓ 已写入文件 tools/page.tsx');
  }
}