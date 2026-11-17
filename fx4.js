const fs = require('fs');
const path = require('path');
const root = __dirname;

// 需要修复的文件: 5个工具页面 + 工作台首页
const filesToFix = [
  'app/tools/ai-workbench/document/page.tsx',
  'app/tools/ai-workbench/image/page.tsx',
  'app/tools/ai-workbench/pdf-summary/page.tsx',
  'app/tools/ai-workbench/code-dev/page.tsx',
  'app/tools/ai-workbench/video-translate/page.tsx',
  'app/tools/ai-workbench/page.tsx',
];

console.log('=== 修复导入路径 (5个../ → 4个../) ===\n');

filesToFix.forEach(f => {
  const full = path.join(root, ...f.split('/'));
  if (!fs.existsSync(full)) {
    console.log('⚠️  跳过: ' + f + ' (不存在)');
    return;
  }
  let c = fs.readFileSync(full, 'utf8');
  let changed = false;
  
  // 把 ../../../../../components/ (5个) 改成 ../../../../components/ (4个)
  if (c.includes("'../../../../../components/")) {
    c = c.split("'../../../../../components/").join("'../../../../components/");
    changed = true;
  }
  if (c.includes('"../../../../../components/')) {
    c = c.split('"../../../../../components/').join('"../../../../components/');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(full, c, 'utf8');
    console.log('✓ 已修复: ' + f);
  } else {
    console.log('  ' + f + ' (无需修改)');
  }
});

console.log('\n✓✓✓ 路径修复完成,刷新浏览器测试!');