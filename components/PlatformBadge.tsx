"use client";

/**
 * 平台品牌徽章
 *
 * 版权说明：不直接复制/热链各平台的官方 Logo 图片（商标侵权风险 + 防盗链失效），
 * 而是使用「品牌主色 + 首字母缩写」的原创徽章设计，用于指示平台指向性（nominative use），
 * 既保持视觉辨识度，又规避法律风险。
 */

export const PLATFORM_BRANDS: Record<
  string,
  { abbr: string; gradient: string; text: string }
> = {
  "mercado-libre": {
    abbr: "ML",
    gradient: "from-[#FFE600] to-[#F5C518]",
    text: "#2D3277",
  },
  ozon: {
    abbr: "OZ",
    gradient: "from-[#005BFF] to-[#F91155]",
    text: "#ffffff",
  },
  shopee: {
    abbr: "SP",
    gradient: "from-[#EE4D2D] to-[#F5722F]",
    text: "#ffffff",
  },
  amazon: {
    abbr: "AZ",
    gradient: "from-[#232F3E] to-[#FF9900]",
    text: "#ffffff",
  },
  "tiktok-shop": {
    abbr: "TT",
    gradient: "from-[#25F4EE] via-[#111111] to-[#FE2C55]",
    text: "#ffffff",
  },
  aliexpress: {
    abbr: "AE",
    gradient: "from-[#FF4747] to-[#E62E04]",
    text: "#ffffff",
  },
};

export default function PlatformBadge({
  slug,
  size = "md",
}: {
  slug: string;
  size?: "sm" | "md" | "lg";
}) {
  const brand =
    PLATFORM_BRANDS[slug] || { abbr: slug.slice(0, 2).toUpperCase(), gradient: "from-[#1e3a5f] to-[#2a4a7a]", text: "#ffffff" };
  const sizeCls =
    size === "sm"
      ? "w-6 h-6 text-[10px] rounded-md"
      : size === "lg"
        ? "w-16 h-16 text-2xl rounded-2xl"
        : "w-10 h-10 text-sm rounded-xl";

  return (
    <span
      className={`${sizeCls} inline-flex items-center justify-center bg-gradient-to-br ${brand.gradient} font-extrabold shadow-sm shrink-0`}
      style={{ color: brand.text }}
      title={slug}
    >
      {brand.abbr}
    </span>
  );
}
