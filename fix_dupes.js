const fs = require('fs');
const p = 'e:\\globaltradehub\\app\\i18n\\LanguageContext.tsx';
const c = fs.readFileSync(p, 'utf8');
const lines = c.split('\n');

const keyRegex = /^\s*(?:'([^']+)'|"([^"]+)"|([a-zA-Z_][a-zA-Z0-9_-]*))\s*:\s*(['"`])/;

// Track seen keys per object
const seenKeys = [];  // array of maps - one for each nesting level we care about
let currentNesting = 0;
let result = [];
let removedCount = 0;

// Simple approach: for each line that looks like a key-value pair,
// check if we've seen that key already at the same nesting level.
// If yes, skip it.
const keyMap = new Map();  // "nesting_key" -> firstOccurrenceLine

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  
  // Track brace nesting
  for (let j = 0; j < l.length; j++) {
    if (l[j] === '{') currentNesting++;
    else if (l[j] === '}') currentNesting--;
  }
  
  const m = l.match(keyRegex);
  if (m) {
    const key = m[1] || m[2] || m[3];
    // Only dedupe at level 2 (inside 'zh-CN' or 'en' objects)
    if (currentNesting >= 2) {
      const dedupKey = currentNesting + '_' + key;
      if (keyMap.has(dedupKey)) {
        console.log(`REMOVED line ${i + 1}: ${key} (first at line ${keyMap.get(dedupKey)})`);
        removedCount++;
        continue;  // skip this line
      } else {
        keyMap.set(dedupKey, i + 1);
      }
    }
  }
  result.push(l);
}

fs.writeFileSync(p, result.join('\n'), 'utf8');
console.log(`\nTotal: removed ${removedCount} duplicate key lines`);
console.log('Done');