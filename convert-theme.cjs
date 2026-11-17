// 把这段代码保存为 convert-theme.cjs
const fs = require('fs');
const path = require('path');

// ───────────── 颜色替换规则表 ─────────────
const replacements = [
  // → 主背景（深蓝背景 → 纯白
  ['bg-[#0a1628]', 'bg-white'],
  ['bg-[#0a1530]', 'bg-gray-50'],
  ['bg-[#0f1e3d]', 'bg-white'],
  ['bg-[#112044]', 'bg-white'],
  ['bg-[#0c1527]', 'bg-white'],

  // → 渐变背景
  ['bg-gradient-to-b from-[#06101c] via-[#0a1628] to-[#0f1e3d]', 'bg-white'],
  ['bg-gradient-to-br from-[#0f1e3d] to-[#0a1530]', 'bg-white'],
  ['bg-gradient-to-br from-[#f8fafc] via-white to-amber-50', 'bg-white'],

  // → 文字颜色（深色→海军蓝）
  ['text-[#06101c]', 'text-[#1e3a5f]'],
  ['text-[#0f1e3d]', 'text-[#1e3a5f]'],
  ['text-[#112044]', 'text-[#1e3a5f]'],
  ['text-[#64748b]', 'text-gray-600'],
  ['text-amber-500', 'text-[#f59e0b]'],
  ['text-amber-400', 'text-[#f59e0b]'],
  ['text-yellow-400', 'text-[#f59e0b]'],
  ['text-yellow-300', 'text-[#1e3a5f]'],

  // → 文字颜色（灰色系）
  ['text-gray-700', 'text-[#1e3a5f]'],
  ['text-gray-600', 'text-gray-600'],
  ['text-gray-500', 'text-gray-500'],

  // → 按钮与元素的 hover
  ['hover:text-amber-400', 'hover:text-[#1e3a5f]'],
  ['hover:text-amber-500', 'hover:text-[#f59e0b]'],
  ['hover:bg-amber-400/20', 'hover:bg-[#fef3c7] hover:shadow-md'],
  ['hover:bg-amber-400/30', 'hover:bg-[#fef3c7] hover:shadow-md'],
  ['hover:bg-amber-400/40', 'hover:bg-[#fef3c7] hover:shadow-md'],
  ['hover:bg-amber-400', 'hover:bg-[#f59e0b]'],
  ['hover:bg-yellow-300', 'hover:bg-[#f59e0b]'],
  ['hover:bg-white', 'hover:bg-white'],
  ['hover:bg-blue-700', 'hover:bg-[#f59e0b]'],
  ['hover:border-[#fbbf24]', 'hover:border-[#fbbf24]'],
  ['hover:text-[#0f1e3d]', 'hover:text-[#1e3a5f]'],
  ['hover:text-[#1e3a5f]', 'hover:text-[#1e3a5f]'],
  ['hover:bg-white', 'hover:bg-white'],
  ['hover:text-[#0f1e3d]', 'hover:text-[#1e3a5f]'],
  ['hover:text-[#1e3a5f]', 'hover:text-[#1e3a5f]'],
  ['hover:text-[#b45309]', 'hover:text-[#b45309]'],
  ['hover:text-[#f59e0b]', 'hover:text-[#f59e0b]'],
  ['hover:text-[#1e3a5f]', 'hover:text-[#1e3a5f]'],
  ['hover:text-[#f59e0b]', 'hover:text-[#f59e0b]'],
  ['hover:text-[#1e3a5f]', 'hover:text-[#1e3a5f]'],
  ['hover:text-[#f59e0b]', 'hover:text-[#f59e0b]'],
  ['hover:text-[#1e3a5f]', 'hover:text-[#1e3a5f]'],
  ['hover:text-[#f59e0b]', 'hover:text-[#f59e0b]'],
  ['hover:text-[#1e3a5f]', 'hover:text-[#1e3a5f]'],
  ['hover:text-[#f59e0b]', 'hover:text-[#f59e0b]'],
  ['hover:text-[#1e3a5f]', 'hover:text-[#1e3a5f]'],

  // → 按钮颜色（琥珀按钮）
  ['bg-amber-400', 'bg-[#fbbf24]'],
  ['bg-amber-400/20', 'bg-[#fef3c7]'],
  ['bg-amber-400/30', 'bg-[#fef3c7]'],
  ['bg-amber-400/40', 'bg-[#fef3c7]'],
  ['bg-amber-500', 'bg-[#fbbf24]'],
  ['bg-amber-500/20', 'bg-[#fef3c7]'],
  ['bg-yellow-500', 'bg-[#fbbf24]'],

  // → 边框
  ['border border-[#1e3a5f]/30', 'border border-gray-200'],
  ['border border-[#1e3a5f]/50', 'border border-gray-200'],
  ['border border-[#1e3a5f]', 'border border-gray-200'],
  ['border border-gray-700/50', 'border border-gray-200'],
  ['border border-gray-200/30', 'border border-gray-200'],
  ['border-amber-400/50', 'border-[#fbbf24]'],
  ['border-yellow-400', 'border-[#fbbf24]'],
  ['ring-2 ring-yellow-400', 'ring-2 ring-[#fbbf24]'],

  // → focus ring
  ['focus:ring-amber-400', 'focus:ring-[#fbbf24]'],
  ['focus:ring-amber-400', 'focus:ring-[#fbbf24]'],
  ['focus:border-amber-400', 'focus:border-[#fbbf24]'],
  ['focus:border-amber-400', 'focus:border-[#fbbf24]'],

  // → 特殊提示块背景
  ['bg-gradient-to-r from-blue-600/10 to-yellow-400/5', 'bg-gradient-to-r from-amber-50 to-orange-50'],
  ['bg-gradient-to-br from-blue-600/30 to-yellow-600/30', 'bg-[#fef3c7]'],
  ['bg-gradient-to-br from-blue-100 to-yellow-100', 'bg-[#fef3c7]'],
  ['bg-gradient-to-r from-blue-600/20', 'bg-gradient-to-r from-amber-100 to-orange-100'],

  // → 禁用按钮
  ['bg-gray-600', 'bg-gray-300'],
  ['bg-gray-100', 'bg-gray-100'],
  ['bg-gray-200', 'bg-gray-200'],
];

// ───────────── 处理所有 tsx 文件 ─────────────
const walk = (dir) => {
  let results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (['node_modules', '.next', '.git'].includes(item.name)) continue;
      results = results.concat(walk(full));
    } else if (item.name.endsWith('.tsx') || item.name.endsWith('.css')) {
      results.push(full);
    }
  }
  return results;
};

const files = walk(__dirname);
let changed = 0;
let total = 0;

for (const file of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    for (const [from, to] of replacements) {
      content = content.split(from).join(to);
    }
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      changed++;
      const diff = (original.length - content.length);
      console.log(`✓ ${path.relative(__dirname, file)}`);
      total++;
    }
  } catch (e) {
    console.log(`✗ 跳过 ${file}: ${e.message}`);
  }
}

console.log(`\n────────────────────`);
console.log(`完成！共修改 ${changed} 个文件。`);