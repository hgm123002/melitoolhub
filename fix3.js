const fs = require('fs');
const path = require('path');
const root = __dirname;
const toolsPath = path.join(root, 'config', 'tools.ts');
const pagePath = path.join(root, 'app', 'tools', 'page.tsx');

const toolsContent = fs.readFileSync(toolsPath, 'utf8');
const pageContent = fs.readFileSync(pagePath, 'utf8');

// 检查 categories 数组中是否有 ai-workbench
const categoriesMatch = toolsContent.match(/export const categories = ($$[\s\S]*?$$);/);
if (categoriesMatch) {
  const catCode = 'const cats=' + categoriesMatch[1] + ';cats.forEach(c=>console.log("分类:",c.slug,c.name))';
  try { new Function(catCode)(); } catch (e) { console.log('categories语法错误:', e.message); }
} else {
  console.log('未找到 categories 数组');
}

// 检查 tools 数组
const toolsMatch = toolsContent.match(/export const tools = ($$[\s\S]*?$$);/);
if (toolsMatch) {
  const toolCode = 'const tools=' + toolsMatch[1] + ';const f=tools.filter(x=>x.category==="ai-workbench");console.log("工具总数:",tools.length);console.log("AI工作台风工具:",f.length);f.forEach(t=>console.log(" -",t.slug,t.name));';
  try { new Function(toolCode)(); } catch (e) { console.log('tools语法错误:', e.message); }
} else {
  console.log('未找到 tools 数组,检查文件结构');
  // 打印文件前20行
  toolsContent.split('\n').slice(0,20).forEach((l,i)=>console.log((i+1)+':'+l));
}