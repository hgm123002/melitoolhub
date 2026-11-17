const fs = require('fs');
const p = 'e:\\globaltradehub\\app\\i18n\\LanguageContext.tsx';
const c = fs.readFileSync(p, 'utf8');
const lines = c.split('\n');
console.log(`File: ${lines.length} lines, ${c.length} chars`);
for (let i = 0; i < lines.length; i++) console.log(`${i+1}: ${lines[i]}`);