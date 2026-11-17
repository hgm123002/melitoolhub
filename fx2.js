const fs = require('fs');
const path = require('path');
const root = __dirname;

const p = path.join(root, 'app', 'tools', 'page.tsx');
let c = fs.readFileSync(p, 'utf8');
const lines = c.split('\n');

// 找到第80和81行,修复缩进
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('href={(() => { if (tool.slug') && !lines[i].match(/^\s+href=/)) {
    const indent = lines[i-1] && lines[i-1].match(/^\s*/) ? lines[i-1].match(/^\s*/)[0] + '  ' : '              ';
    lines[i] = indent + lines[i].trim();
    console.log('✓ 修复第 ' + (i+1) + ' 行缩进');
    break;
  }
}

fs.writeFileSync(p, lines.join('\n'), 'utf8');
console.log('✓ 已写入');

// 验证: 显示79-85行
const c2 = fs.readFileSync(p, 'utf8');
const l2 = c2.split('\n');
console.log('\n=== 79-85行 ===');
for (let i = 78; i < 85 && i < l2.length; i++) {
  console.log((i+1) + '|' + l2[i]);
}