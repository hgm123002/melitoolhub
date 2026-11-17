// 工具封面图映射
// 1) TOOL_ART_BY_SLUG：每个工具一张按功能定制的主视觉（深蓝玻璃拟态风，1280x640 WebP）
// 2) TOOL_ART：分类兜底图，仅在 slug 未收录时使用
export const TOOL_ART_BY_SLUG: Record<string, string> = {
  // 选品分析
  "keyword-lab": "/tools-art/keyword-lab.webp",
  "product-analysis": "/tools-art/product-analysis.webp",
  "keyword-research": "/tools-art/keyword-research.webp",
  // 汇率 / 利润
  "rate-converter": "/tools-art/rate-converter.webp",
  "profit-calculator": "/tools-art/profit-calculator.webp",
  // 物流
  "shipping-calculator": "/tools-art/shipping-calculator.webp",
  // Listing
  "listing-optimizer": "/tools-art/listing-optimizer.webp",
  // 数据处理
  "json-formatter": "/tools-art/json-formatter.webp",
  "base64-converter": "/tools-art/base64-converter.webp",
  "url-encoder": "/tools-art/url-encoder.webp",
  // AI 工作台
  "ai-document": "/tools-art/ai-document.webp",
  "ai-image-ocr": "/tools-art/ai-image-ocr.webp",
  "ai-pdf-summary": "/tools-art/ai-pdf-summary.webp",
  "ai-code-dev": "/tools-art/ai-code-dev.webp",
  "ai-video-translate": "/tools-art/ai-video-translate.webp",
};

export const TOOL_ART: Record<string, string> = {
  "product-research": "/tools-art/product-research.webp",
  "risk-management": "/tools-art/risk-management.webp",
  "currency-tools": "/tools-art/currency-tools.webp",
  "listing-optimization": "/tools-art/listing-optimization.webp",
  "shipping-calculator": "/tools-art/shipping-calculator.webp",
  "data-processing": "/tools-art/data-processing.webp",
  "ai-workbench": "/tools-art/ai-workbench.webp",
};

/**
 * 取工具主视觉：优先工具专属图，其次分类图，最后通用图。
 * 调用方式：toolArt(tool.slug, tool.category)
 */
export const toolArt = (
  slug?: string | null,
  category?: string | null,
): string =>
  (slug && TOOL_ART_BY_SLUG[slug]) ||
  (category && TOOL_ART[category]) ||
  "/hero/hero-dashboard.webp";
