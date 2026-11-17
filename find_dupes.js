const fs = require('fs');
const p = 'e:\\globaltradehub\\app\\i18n\\LanguageContext.tsx';
const c = fs.readFileSync(p, 'utf8');
const lines = c.split('\n');

// Find key declarations in objects
const keyRegex = /^\s*(?:'([^']+)'|"([^"]+)"|([a-zA-Z_][a-zA-Z0-9_-]*))\s*:/;

const zhKeys = new Map();   // key -> line number
const enKeys = new Map();   // key -> line number
let currentBlock = null;    // 'zh' or 'en' or null

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.indexOf("'zh-CN':") >= 0 || l.indexOf('"zh-CN":') >= 0) currentBlock = 'zh';
  if (l.indexOf("'en':") >= 0) currentBlock = 'en';
  
  if (currentBlock && l.trim() !== '' && !l.trim().startsWith('//')) {
    const m = l.match(keyRegex);
    if (m) {
      const key = m[1] || m[2] || m[3];
      const target = currentBlock === 'zh' ? zhKeys : enKeys;
      const existing = target.get(key);
      if (existing !== undefined) {
        console.log(`DUPLICATE [${currentBlock}] line ${i+1}: ${key} (first at line ${existing})`);
      } else {
        target.set(key, i + 1);
      }
    }
  }
}

console.log(`\nzh-CN total keys: ${zhKeys.size}`);
console.log(`en total keys: ${enKeys.size}`);
console.log('\nDone - review duplicates above');