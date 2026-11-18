import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// 默认配置：不启用增量缓存（ISR）。
// 本站 536 个页面全部在构建期静态生成，无需运行时缓存即可正常服务。
// 若后续需要 ISR/缓存，可在此接入 R2（incrementalCache: r2IncrementalCache）。
export default defineCloudflareConfig({});
