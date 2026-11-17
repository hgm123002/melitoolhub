const fs = require('fs');
const path = require('path');
const root = __dirname;

// 检查 tool 动态路由
const checkPath = (rel) => {
  const full = path.join(root, ...rel.split('/'));
  if (fs.existsSync(full)) {
    const stats = fs.statSync(full);
    if (stats.isDirectory()) {
      const children = fs.readdirSync(full);
      console.log('📁 ' + rel + ' -> ' + children.join(', '));
    } else {
      const content = fs.readFileSync(full, 'utf8');
      console.log('📄 ' + rel + ' (文件大小: ' + content.length + ' 字符)');
      console.log('   前100字符: ' + content.substring(0, 100).replace(/\n/g, ' '));
    }
    return true;
  } else {
    console.log('❌ 不存在: ' + rel);
    return false;
  }
};

console.log('=== 检查路由结构 ===\n');

// 检查工具详情路由
checkPath('app/tool');

// 检查 tools 目录
checkPath('app/tools');

// 检查 ai-workbench 目录
console.log('\n=== AI工作台文件 ===\n');
['', 'document', 'image', 'pdf-summary', 'code-dev', 'video-translate'].forEach(sub => {
  const rel = sub ? 'app/tools/ai-workbench/' + sub + '/page.tsx' : 'app/tools/ai-workbench/page.tsx';
  const full = path.join(root, ...rel.split('/'));
  if (fs.existsSync(full)) {
    const content = fs.readFileSync(full, 'utf8');
    console.log('✅ ' + rel + ' (' + content.length + ' 字符)');
  } else {
    console.log('❌ 缺失: ' + rel);
  }
});

// 检查 tools 首页逻辑
const toolsPage = path.join(root, 'app', 'tools', 'page.tsx');
if (fs.existsSync(toolsPage)) {
  const content = fs.readFileSync(toolsPage, 'utf8');
  console.log('\n=== tools/page.tsx 关键部分 ===\n');
  const lines = content.split('\n');
  for (let i = 0; i < Math.min(lines.length, 150); i++) {
    if (lines[i].includes('href') || lines[i].includes('/tool') || lines[i].includes('/tools')) {
      console.log('L' + (i+1) + ': ' + lines[i].trim());
    }
  }
}