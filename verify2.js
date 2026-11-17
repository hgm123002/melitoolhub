const fs = require('fs');
const p = 'e:\\globaltradehub\\app\\i18n\\LanguageContext.tsx';
const c = fs.readFileSync(p, 'utf8');
const lines = c.split('\n');

console.log(`Total lines: ${lines.length}`);
console.log(`Total chars: ${c.length}`);

// Check balance of braces
let open = 0, close = 0;
for (const ch of c) { if (ch === '{') open++; else if (ch === '}') close++; }
console.log(`Braces: {${open} }${close} ${open === close ? 'BALANCED' : 'UNBALANCED'}`);

// Find structure
const keyRegex = /^\s*(?:'([^']+)'|"([^"]+)"|([a-zA-Z_][a-zA-Z0-9_-]*))\s*:/;
let zhCount = 0, enCount = 0, inZh = false, inEn = false, nesting = 0, zhNest = -1, enNest = -1;
let zhEnd = -1, enStart = -1;

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  for (const ch of l) { if (ch === '{') nesting++; else if (ch === '}') nesting--; }
  
  const m = l.match(keyRegex);
  if (m) {
    const key = m[1] || m[2] || m[3];
    if (key === 'zh-CN' || key === 'en') {
      console.log(`\nBlock start: ${key} at line ${i+1}, nesting=${nesting}`);
    }
  }
}

// Count keys in each block
nesting = 0;
let atRoot = true;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  const prevNesting = nesting;
  for (const ch of l) { if (ch === '{') nesting++; else if (ch === '}') nesting--; }
  
  const m = l.match(keyRegex);
  if (m) {
    const key = m[1] || m[2] || m[3];
    if (key === 'zh-CN') { inZh = true; zhNest = nesting; continue; }
    if (key === 'en') { inZh = false; inEn = true; enNest = nesting; continue; }
    if (inZh && nesting > zhNest) zhCount++;
    else if (inEn && nesting > enNest) enCount++;
  }
}

console.log(`\nzh-CN keys: ${zhCount}`);
console.log(`en keys: ${enCount}`);

// Check for remaining hyphenated keys
let hyphenKeys = 0;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  const m = l.match(/^\s*[a-zA-Z_][a-zA-Z0-9_-]*-[a-zA-Z0-9_-]*\s*:/);
  if (m) {
    hyphenKeys++;
    if (hyphenKeys <= 5) console.log(`  Line ${i+1}: ${l.trim().substring(0, 60)}`);
  }
}
console.log(`\nUnquoted hyphen keys: ${hyphenKeys} ${hyphenKeys === 0 ? 'ALL GOOD!' : 'NEED FIX!'}`);

console.log('\n=== DONE ===');