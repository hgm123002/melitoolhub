const fs = require('fs');
const path = require('path');
const root = __dirname;

const p = path.join(root, 'app', 'tools', 'page.tsx');
let c = fs.readFileSync(p, 'utf8');
const lines = c.split('\n');

// 找到 href 行
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('href=') && lines[i].includes('tool.slug')) {
    console.log('第 ' + (i+1) + ' 行发现 href,修复中...');
    let aStart = i;
    if (lines[i-1] && lines[i-1].includes('<a')) aStart = i-1;
    
    const indent = lines[aStart].match(/^\s*/)[0];
    const line1 = indent + '<a key={tool.slug}';
    const line2 = indent + '  href={(() => { if (tool.slug && tool.slug.startsWith("ai-")) { const m = {"ai-document":"/tools/ai-workbench/document","ai-image-ocr":"/tools/ai-workbench/image","ai-pdf-summary":"/tools/ai-workbench/pdf-summary","ai-code-dev":"/tools/ai-workbench/code-dev","ai-video-translate":"/tools/ai-workbench/video-translate"}; return m[tool.slug] || "/tools/ai-workbench"; } return "/tool/" + tool.slug; })()}';
    
    const removeCount = (i - aStart + 1);
    lines.splice(aStart, removeCount, line1, line2);
    break;
  }
}

fs.writeFileSync(p, lines.join('\n'), 'utf8');
console.log('✓ 已修复');

const c2 = fs.readFileSync(p, 'utf8');
const l2 = c2.split('\n');
for (let i = 0; i < l2.length; i++) {
  if (l2[i].includes('<a') || l2[i].includes('href') || l2[i].includes('tool.slug')) {
    console.log((i+1) + ': ' + l2[i].trim().substring(0, 100));
  }
}