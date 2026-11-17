import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 站内品牌徽章/封面为 SVG，next/image 默认拒绝优化 SVG（会返回 400）
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;