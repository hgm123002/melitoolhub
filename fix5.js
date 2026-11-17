const fs = require('fs');
const path = require('path');
const root = __dirname;
const toolsPath = path.join(root, 'config', 'tools.ts');
const c = fs.readFileSync(toolsPath, 'utf8');

// 打印文件总行数
const lines = c.split('\n');
console.log('总行数:', lines.length);

// 找到 'export const tools = [' 所在行
let toolsStart = -1;
let toolsEnd = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('export const tools =') && toolsStart === -1) {
    toolsStart = i;
    console.log('✓ tools数组开始于第 ' + (i+1) + ' 行');
  }
  if (toolsStart !== -1 && i > toolsStart && lines[i].trim() === '];' && toolsEnd === -1) {
    toolsEnd = i;
    console.log('✓ tools数组结束于第 ' + (i+1) + ' 行');
    break;
  }
}

// 提取 tools 数组内容并测试解析
if (toolsStart !== -1 && toolsEnd !== -1) {
  const arrLines = lines.slice(toolsStart, toolsEnd + 1);
  let arrCode = arrLines.join('\n');
  arrCode = arrCode.replace('export const tools =', 'const tools =');
  try {
    const fn = new Function(arrCode + ';return tools;');
    const tools = fn();
    const aiTools = tools.filter(t => t.category === 'ai-workbench');
    console.log('\n✓ 语法解析成功,工具总数:', tools.length);
    console.log('✓ AI工作台分类工具数:', aiTools.length);
    aiTools.forEach(t => console.log('  -', t.slug, t.name));
  } catch (e) {
    console.log('\n✗ 语法错误:', e.message);
    // 打印错误附近的行
    const match = e.message.match(/line (\d+)/);
    if (match) {
      const errLine = parseInt(match[1]) - 1;
      console.log('\n错误附近:');
      for (let i = Math.max(0, errLine - 3); i < Math.min(arrLines.length, errLine + 4); i++) {
        console.log((i+1) + ':' + arrLines[i]);
      }
    }
  }
} else {
  console.log('✗ 未找到tools数组,搜索关键信息:');
  // 打印235-245行查看
  for (let i = 234; i < 245 && i < lines.length; i++) {
    console.log((i+1) + ':' + lines[i].substring(0, 80));
  }
}