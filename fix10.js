const fs = require('fs');
const path = require('path');
const root = __dirname;

const toolsPagePath = path.join(root, 'app', 'tools', 'page.tsx');
let c = fs.readFileSync(toolsPagePath, 'utf8');

// 先打印当前第78-85行
const lines = c.split('\n');
console.log('=== 当前 78-85 行 ===');
for (let i = 77; i < 85 && i < lines.length; i++) {
  console.log((i+1) + ': ' + lines[i].substring(0, 120));
}

// 找到包含 'href={' 和 'tool.slug' 的行,重新构建正确的链接
let fixed = false;
const newLines = lines.map(line => {
  if (line.includes('href={') && line.includes('tool.slug') && !fixed) {
    fixed = true;
    const indent = line.match(/^\s*/)[0];
    const newHref = indent + "href={tool.slug && tool.slug.startsWith('ai-') ? ({'ai-document':'/tools/ai-workbench/document','ai-image-ocr':'/tools/ai-workbench/image','ai-pdf-summary':'/tools/ai-workbench/pdf-summary','ai-code-dev':'/tools/ai-workbench/code-dev','ai-video-translate':'/tools/ai-workbench/video-translate'}[tool.slug] || '/tools/ai-workbench') : `/tool/${tool.slug}`}";
    console.log('\n✓ 已替换为:', newHref.trim().substring(0, 150));
    return newHref;
  }
  return line;
});

if (fixed) {
  fs.writeFileSync(toolsPagePath, newLines.join('\n'), 'utf8');
  console.log('\n✓ 已写入文件 tools/page.tsx');
} else {
  console.log('\n❌ 未找到匹配的行');
}