const fs = require('fs');
const path = require('path');
const root = __dirname;

// 先检查组件文件是否存在
const compDir = path.join(root, 'components', 'ai-workbench');
const pageFiles = [
  'app/tools/ai-workbench/document/page.tsx',
  'app/tools/ai-workbench/image/page.tsx',
  'app/tools/ai-workbench/pdf-summary/page.tsx',
  'app/tools/ai-workbench/code-dev/page.tsx',
  'app/tools/ai-workbench/video-translate/page.tsx',
];

console.log('=== 检查组件文件 ===');
const existFiles = fs.existsSync(compDir) ? fs.readdirSync(compDir) : [];
console.log('组件目录存在:', fs.existsSync(compDir));
console.log('组件文件:', existFiles.join(', '));

console.log('\n=== 检查页面文件 ===');
pageFiles.forEach(p => {
  const full = path.join(root, ...p.split('/'));
  console.log(p + ' -> ' + (fs.existsSync(full) ? '✓ 存在' : '❌ 不存在'));
});

// 修复导入路径: '../../../../components/ -> '../../../../../components/
console.log('\n=== 修复导入路径 ===');
pageFiles.forEach(p => {
  const full = path.join(root, ...p.split('/'));
  if (!fs.existsSync(full)) return;
  let c = fs.readFileSync(full, 'utf8');
  let changed = false;
  if (c.includes("'../../../../components/")) {
    c = c.split("'../../../../components/").join("'../../../../../components/");
    changed = true;
  }
  // 也检查其他可能的路径
  if (c.includes("\"../../../../components/")) {
    c = c.split("\"../../../../components/").join("\"../../../../../components/");
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(full, c, 'utf8');
    console.log('✓ 已修复: ' + p);
  } else {
    // 打印当前的导入行看看
    const lines = c.split('\n');
    for (let i = 0; i < Math.min(10, lines.length); i++) {
      if (lines[i].includes('import') && lines[i].includes('components')) {
        console.log('  ' + p + ' 导入行: ' + lines[i].trim());
      }
    }
  }
});

console.log('\n✓ 路径修复完成,请刷新浏览器测试');