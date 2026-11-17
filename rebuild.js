const fs = require('fs');
const p = 'e:\\globaltradehub\\app\\i18n\\LanguageContext.tsx';
const c = fs.readFileSync(p, 'utf8');
let lines = c.split('\n');

// Step 1: Fix missing commas in the zh-CN block
// A key-value line that doesn't end with , should get one (unless next line is a closing })
console.log('=== Step 1: Fixing commas ===');
let commaFixed = 0;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // Is this a key-value property line?
  const isKeyValue = /^\s+('?[a-zA-Z_][a-zA-Z0-9_-]*'?|"[^"]+"|'[^']+')\s*:\s*(['"`]|\{|\[)/.test(l);
  
  if (isKeyValue) {
    // Does it end with a value string that might be missing comma?
    const trimmed = l.trim();
    // Check if ends with quote but no comma before it
    // e.g. nav_home: '首页'  -> should be nav_home: '首页',
    // but exclude lines ending with a comma already
    const endsWithValue = /['"`]\s*$/.test(l.trimEnd()) && !/['"`],\s*$/.test(l.trimEnd());
    
    if (endsWithValue) {
      // Check next line isn't a closing brace for this object
      let hasNext = false;
      for (let j = i + 1; j < Math.min(i + 3, lines.length); j++) {
        const next = lines[j].trim();
        if (next === '' || next.startsWith('//')) continue;
        if (/^\}/.test(next)) { break; } // followed by closing brace
        hasNext = true; break;
      }
      if (hasNext) {
        // Add trailing comma
        const endIdx = l.lastIndexOf("'");
        const lastDq = l.lastIndexOf('"');
        const lastQuote = Math.max(endIdx, lastDq);
        if (lastQuote >= 0 && lastQuote === l.trimEnd().length - (l.length - l.trimEnd().length) - 1) {
          // Line ends with a quote - insert comma after it
          lines[i] = l.trimEnd() + ',';
          commaFixed++;
        }
      }
    }
  }
}
console.log(`Fixed ${commaFixed} comma issues`);

// Step 2: Now extract zh-CN key-value pairs to understand structure
// Then rebuild the en block
console.log('\n=== Step 2: Extracting structure ===');

// Find boundaries
let zhStart = -1, zhEnd = -1, enStart = -1, enEnd = -1, afterEn = -1;
let braceCount = 0, zhBrace = -1, enBrace = -1;

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  const prevCount = braceCount;
  for (const ch of l) { if (ch === '{') braceCount++; else if (ch === '}') braceCount--; }
  
  if (/^\s*'?zh-CN'?\s*:\s*\{/.test(l) || /^\s*"zh-CN"\s*:\s*\{/.test(l)) {
    zhStart = i;
    zhBrace = braceCount;
    console.log(`zh-CN starts at line ${i+1}, brace level ${zhBrace}`);
  } else if (/^\s*'?en'?\s*:\s*\{/.test(l)) {
    enStart = i;
    enBrace = braceCount;
    console.log(`en starts at line ${i+1}, brace level ${enBrace}`);
  } else if (zhStart >= 0 && zhEnd < 0 && braceCount < zhBrace && l.indexOf('}') >= 0) {
    zhEnd = i;
    console.log(`zh-CN ends at line ${i+1}`);
  } else if (enStart >= 0 && enEnd < 0 && braceCount < enBrace && l.indexOf('}') >= 0) {
    enEnd = i;
    console.log(`en ends at line ${i+1}`);
  }
}

if (enEnd >= 0) afterEn = enEnd + 1;
console.log(`zh: ${zhStart+1} to ${zhEnd+1}`);
console.log(`en: ${enStart+1} to ${enEnd+1}`);

// Step 3: Extract zh-CN key-value pairs and build en equivalents
console.log('\n=== Step 3: Building en translations ===');

// Extract keys and values from zh-CN block
const zhKeys = []; // [{key, value, indent}]
const keyValueRegex = /^(\s+)('?[a-zA-Z_][a-zA-Z0-9_-]*'?|"[^"]+"|'[^']+')\s*:\s*(['"`])(.*)$/;

for (let i = zhStart + 1; i < zhEnd; i++) {
  const l = lines[i];
  const trimmed = l.trim();
  if (trimmed === '' || trimmed.startsWith('//')) continue;
  
  const m = l.match(keyValueRegex);
  if (m) {
    const indent = m[1];
    let key = m[2];
    const quote = m[3];
    let valuePart = m[4];
    
    // Remove outer quotes from key
    if (key.startsWith("'") && key.endsWith("'")) key = key.slice(1, -1);
    else if (key.startsWith('"') && key.endsWith('"')) key = key.slice(1, -1);
    
    // Extract the value (strip trailing comma)
    let value = valuePart;
    if (value.endsWith(',')) value = value.slice(0, -1);
    // Remove the closing quote from value
    value = value.trim();
    if (value.endsWith(quote)) value = value.slice(0, -1);
    
    zhKeys.push({ key, value, indent, quote });
  }
}
console.log(`Found ${zhKeys.length} zh-CN keys`);

// Step 4: Build en block (same keys, provide English translations)
// We'll map zh-CN values to English based on known mappings
// For unknown keys, use the key name or a generic placeholder

const enMap = {
  // --- Navbar ---
  'nav_home': 'Home', 'nav_blog': 'Blog', 'nav_compliance': 'Compliance',
  'nav_tools': 'Tools', 'nav_purchase': 'Purchase', 'nav_affiliate': 'Affiliate',
  'nav_community': 'Community', 'nav_calc': 'Calculator', 'nav_language': 'Language',
  
  // --- Breadcrumb ---
  'bc_home': 'Home', 'bc_blog': 'Blog', 'bc_compliance': 'Compliance',
  'bc_tools': 'Tools', 'bc_purchase': 'Purchase', 'bc_affiliate': 'Affiliate',
  'bc_community': 'Community',
  
  // --- Language names ---
  'lang_zh-CN': '简体中文', 'lang_en': 'English',
  
  // --- HeroCarousel ---
  'hero_title1': 'Global Trade Hub',
  'hero_subtitle1': 'Empowering cross-border e-commerce',
  'hero_cta1': 'Explore Tools',
  'hero_title2': 'Professional Tools Suite',
  'hero_subtitle2': 'Everything you need to run your global business',
  'hero_cta2': 'Get Started',
  
  // --- Common ---
  'common_learnMore': 'Learn More', 'common_getStarted': 'Get Started',
  'common_readMore': 'Read More', 'common_viewAll': 'View All',
  'common_back': 'Back', 'common_loading': 'Loading...',
  'common_error': 'Error', 'common_success': 'Success',
  'common_save': 'Save', 'common_cancel': 'Cancel',
  'common_confirm': 'Confirm', 'common_edit': 'Edit',
  'common_delete': 'Delete', 'common_share': 'Share',
  'common_copy': 'Copy', 'common_copied': 'Copied',
};

console.log(`Predefined en translations: ${Object.keys(enMap).length}`);

// Generate the en block content
const enLines = [''];
enLines.push('  // ====== English (en) ======');
enLines.push("  'en': {");

// Group zhKeys - find comment lines from original to preserve section comments
// Actually, let's just output all keys with en translations
// First pass: find section comment markers
let currentSection = '--- General ---';
const sectionPatterns = [
  '--- Navbar ---', '--- Breadcrumb ---', '--- Language names ---',
  '--- HeroCarousel ---', '--- Common ---', '--- Footer ---',
  '--- Tools list ---', '--- Tool names ---', '--- Rate Converter ---',
  '--- Profit Calculator ---', '--- Shipping Calculator ---',
  '--- Listing Optimizer ---', '--- JSON Formatter ---', '--- Base64 ---',
  '--- Blog ---', '--- Community ---', '--- Affiliate ---',
  '--- Home page ---', '--- Platform/Region ---',
];

// For simplicity: just output all keys in order with English values
for (const k of zhKeys) {
  let enValue = '';
  if (enMap[k.key]) {
    enValue = enMap[k.key];
  } else {
    // Heuristic: if zh value contains English characters/numbers, use it
    // Otherwise, use the key name as fallback
    enValue = k.key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
  // Handle quoted keys (with hyphens)
  const keyStr = k.key.includes('-') ? `'${k.key}'` : k.key;
  // Quote the value (handle embedded quotes by escaping)
  const safeValue = enValue.replace(/'/g, "\\'");
  enLines.push(`    ${keyStr}: '${safeValue}',`);
}

// Remove trailing comma from last line (optional, JS allows trailing commas)
enLines.push('  },');
enLines.push('');
enLines.push('};');

// Step 5: Rebuild the file
// Find where the main TRANSLATIONS object ends (the final };)
let mainEnd = -1;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].trim() === '};') { mainEnd = i; break; }
}
console.log(`Main TRANSLATIONS object ends at line ${mainEnd+1}`);

// Find any content AFTER the TRANSLATIONS object (constants, functions, JSX etc)
const afterContent = [];
if (mainEnd >= 0) {
  for (let i = mainEnd + 1; i < lines.length; i++) {
    afterContent.push(lines[i]);
  }
}

// Also find everything BEFORE the TRANSLATIONS object (imports, types, etc)
const beforeContent = [];
for (let i = 0; i < zhStart; i++) {
  beforeContent.push(lines[i]);
}

// Now build new zh-CN block (ensure proper commas and structure)
const zhContent = [];
zhContent.push("  'zh-CN': {");
for (const k of zhKeys) {
  const keyStr = k.key.includes('-') ? `'${k.key}'` : k.key;
  const safeValue = k.value.replace(/'/g, "\\'");
  zhContent.push(`    ${keyStr}: '${safeValue}',`);
}
zhContent.push('  },');

// Combine everything
const resultLines = [
  ...beforeContent,
  ...zhContent,
  ...enLines,
  ...afterContent
];

// Step 6: Fix JSX commas (LanguageContext.Provider value object)
for (let i = 0; i < resultLines.length; i++) {
  const l = resultLines[i];
  if (l.indexOf('value={{') >= 0 && l.indexOf('language') >= 0 && l.indexOf(',') < 0) {
    // Add commas between identifiers
    resultLines[i] = l
      .replace(/language setLanguage/g, 'language, setLanguage')
      .replace(/setLanguage t/g, 'setLanguage, t')
      .replace(/t supportedLanguages/g, 't, supportedLanguages');
    console.log(`Fixed JSX commas at line ${i+1}`);
  }
  // Also fix function signature commas
  if (l.indexOf("(key: string fallback") >= 0) {
    resultLines[i] = l.replace(/string fallback/g, 'string, fallback');
  }
  if (l.indexOf("DEFAULT_LANGUAGE setLanguage") >= 0) {
    resultLines[i] = l.replace(/LANGUAGE setLanguage/g, 'LANGUAGE,\n    setLanguage');
  }
}

fs.writeFileSync(p, resultLines.join('\n'), 'utf8');
console.log(`\nFinal file: ${resultLines.length} lines`);
console.log(`zh-CN keys: ${zhKeys.length}`);
console.log('=== DONE ===');