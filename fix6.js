const fs = require('fs');
const path = require('path');
const root = __dirname;
const toolsPath = path.join(root, 'config', 'tools.ts');
const c = fs.readFileSync(toolsPath, 'utf8');
const lines = c.split('\n');

// 打印 235-250 行看看 AI 工具插入的位置
console.log('=== 第235-250行 ===');
for (let i = 234; i < 250 && i < lines.length; i++) {
  const line = lines[i];
  const hasAi = line.includes('ai-') ? ' [AI工具标记]' : '';
  const isEnd = line.trim() === '];' ? ' [数组结束标记!]' : '';
  console.log((i+1) + ':' + hasAi + isEnd);
  if (line.trim().length > 0) console.log('    ' + line.trim().substring(0, 100));
}