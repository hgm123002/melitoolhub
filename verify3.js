const fs = require('fs');
const p = 'e:\\globaltradehub\\app\\i18n\\LanguageContext.tsx';
const c = fs.readFileSync(p, 'utf8');
const lines = c.split('\n');

// Print lines around the zh-CN and en block starts
console.log('=== Lines 30-40 (zh-CN start area) ===');
for (let i = 29; i < 40 && i < lines.length; i++) console.log(`${i+1}: ${lines[i]}`);

console.log('\n=== Lines 858-870 (en start area) ===');
for (let i = 857; i < 870 && i < lines.length; i++) console.log(`${i+1}: ${lines[i]}`);

console.log('\n=== Last 20 lines ===');
for (let i = Math.max(0, lines.length - 20); i < lines.length; i++) console.log(`${i+1}: ${lines[i]}`);

// Quick check: does zh-CN block have content?
let inZh = false, zhLines = 0, enLines = 0;
let zhEnd = -1, enStart = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].indexOf("'zh-CN':") >= 0 || lines[i].indexOf('"zh-CN":') >= 0) inZh = true;
  if (lines[i].indexOf("'en':") >= 0) { inZh = false; enStart = i; }
  if (inZh) zhLines++;
}
console.log(`\nzh-CN block lines (after key): ${zhLines}`);
console.log(`en block starts at line: ${enStart}`);
console.log(`total lines: ${lines.length}`);