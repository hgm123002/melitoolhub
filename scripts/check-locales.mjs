// 语言包完整性检查：确保每个语言包覆盖 keys.ts 中的全部键，且没有空值 / 乱码字符
// 用法：node scripts/check-locales.mjs
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "app", "i18n", "locales");
const keysSrc = fs.readFileSync(path.join(dir, "keys.ts"), "utf8");
const shell = [...keysSrc.matchAll(/^\s{2}"([A-Za-z_][\w]*)",/gm)].map((m) => m[1]);

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".ts") && f !== "keys.ts" && f !== "index.ts");

let failed = false;
const rows = [];

for (const file of files) {
  const src = fs.readFileSync(path.join(dir, file), "utf8");
  const ids = src.match(/^const\s+([A-Za-z0-9_]+):\s*ShellPack/m);
  // 键位置：行内 `key: "value"` 或 `key: "value",` 都匹配
  const pairs = [...src.matchAll(/([A-Za-z_][\w]*)\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map(
    (m) => [m[1], m[2]],
  );
  const map = new Map(pairs);
  const missing = shell.filter((k) => !map.has(k));
  const empty = [...map.entries()].filter(([, v]) => !v.trim()).map(([k]) => k);
  const bad = [...map.entries()]
    .filter(([, v]) => /[\uFFFD\uFEFF]/.test(v))
    .map(([k]) => k);
  const extra = [...map.keys()].filter((k) => !shell.includes(k));

  if (missing.length || empty.length || bad.length || extra.length) failed = true;
  rows.push({
    file: ids?.[1] ?? file,
    total: map.size,
    missing: missing.length,
    empty: empty.length,
    bad: bad.length,
    extra: extra.length,
    detail: [...missing, ...empty, ...bad, ...extra].slice(0, 8).join(","),
  });
}

console.log(`键总数 ${shell.length}，语言包 ${files.length} 个\n`);
console.table(rows);
if (failed) {
  console.error("❌ 存在不完整的语言包，请修正上表中缺失/多余的键");
  process.exit(1);
}
console.log("✅ 全部语言包完整");
