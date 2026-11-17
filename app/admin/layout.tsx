// app/admin/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GlobalTradeHub - 管理后台",
  description: "管理后台",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 不统一包裹管理布局，由每个页面组件自己决定
  return <>{children}</>;
}