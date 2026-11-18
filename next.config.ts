import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Workers 没有内置图片优化服务（需额外接 Cloudflare Images），
    // 直接关闭优化，远程图片由浏览器直连加载，避免运行时 /_next/image 500
    unoptimized: true,
    // 站内品牌徽章/封面为 SVG，next/image 默认拒绝优化 SVG（会返回 400）
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;