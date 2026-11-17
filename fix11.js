const fs = require('fs');
const path = require('path');
const root = __dirname;

const toolsPagePath = path.join(root, 'app', 'tools', 'page.tsx');
let c = fs.readFileSync(toolsPagePath, 'utf8');
const lines = c.split('\n');

console.log('=== 当前 78-92 行 ===');
for (let i = 77; i < 92 && i < lines.length; i++) {
  console.log((i+1) + ': ' + lines[i].substring(0, 120));
}

// 找到 href 所在的行,然后往前检查是否缺少 <a 标签
// 重新构建正确的结构
const aiPathMap = {
  'ai-document': '/tools/ai-workbench/document',
  'ai-image-ocr': '/tools/ai-workbench/image',
  'ai-pdf-summary': '/tools/ai-workbench/pdf-summary',
  'ai-code-dev': '/tools/ai-workbench/code-dev',
  'ai-video-translate': '/tools/ai-workbench/video-translate',
};

let hrefLine = -1;
let aStartLine = -1;

// 找到包含 href 的行
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('href=') && lines[i].includes('tool.slug')) {
    hrefLine = i;
    // 检查前一行是否有 <a
    if (lines[i-1] && lines[i-1].includes('<a')) {
      aStartLine = i - 1;
    } else if (lines[i].includes('<a')) {
      aStartLine = i;
    }
    break;
  }
}

console.log('\nhref所在行:', hrefLine + 1);
console.log('<a标签所在行:', aStartLine + 1);

// 现在构建正确的行
if (hrefLine !== -1) {
  if (aStartLine === hrefLine) {
    // <a 和 href 在同一行
    const indent = lines[hrefLine].match(/^\s*/)[0];
    lines[hrefLine] = indent + '<a key={tool.slug} href={tool.slug && tool.slug.startsWith(\'ai-\') ? ({\'ai-document\':\'/tools/ai-workbench/document\',\'ai-image-ocr\':\'/tools/ai-workbench/image\',\'ai-pdf-summary\':\'/tools/ai-workbench/pdf-summary\',\'ai-code-dev\':\'/tools/ai-workbench/code-dev\',\'ai-video-translate\':\'/tools/ai-workbench/video-translate\'}[tool.slug] || \'/tools/ai-workbench\') : `/tool/${tool.slug}`}';
    console.log('✓ 修复方式1: 同一行');
  } else if (aStartLine === hrefLine - 1) {
    // <a 和 href 在两行
    const indent = lines[hrefLine].match(/^\s*/)[0];
    // 修复 href 行
    lines[hrefLine] = indent + '              href={tool.slug && tool.slug.startsWith(\'ai-\') ? ({\'ai-document\':\'/tools/ai-workbench/document\',\'ai-image-ocr\':\'/tools/ai-workbench/image\',\'ai-pdf-summary\':\'/tools/ai-workbench/pdf-summary\',\'ai-code-dev\':\'/tools/ai-workbench/code-dev\',\'ai-video-translate\':\'/tools/ai-workbench/video-translate\'}[tool.slug] || \'/tools/ai-workbench\') : `/tool/${tool.slug}`}';
    console.log('✓ 修复方式2: 两行分开');
  } else {
    // 无法找到 <a 标签,在 href 行前添加
    const indent = lines[hrefLine].match(/^\s*/)[0];
    lines.splice(hrefLine, 0, indent + '            <a key={tool.slug}');
    // 修复 href 行
    lines[hrefLine + 1] = indent + '              href={tool.slug && tool.slug.startsWith(\'ai-\') ? ({\'ai-document\':\'/tools/ai-workbench/document\',\'ai-image-ocr\':\'/tools/ai-workbench/image\',\'ai-pdf-summary\':\'/tools/ai-workbench/pdf-summary\',\'ai-code-dev\':\'/tools/ai-workbench/code-dev\',\'ai-video-translate\':\'/tools/ai-workbench/video-translate\'}[tool.slug] || \'/tools/ai-workbench\') : `/tool/${tool.slug}`}';
    console.log('✓ 修复方式3: 添加缺失的 <a 标签');
  }

  fs.writeFileSync(toolsPagePath, lines.join('\n'), 'utf8');
  console.log('✓ 已写入 tools/page.tsx');

  // 验证: 重新读取并