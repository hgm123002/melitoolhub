"use client";

/**
 * 页面过渡动画容器（客户端组件）
 * 从根布局抽离出来，让根布局保持为服务端组件以支持 metadata 导出
 */
import { useEffect, useState } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pageKey, setPageKey] = useState(0);

  // 监听路由变化，触发页面过渡动画
  useEffect(() => {
    const handleRouteChange = () => {
      setPageKey((k) => k + 1);
      // 切换瞬间滚动到顶部，避免跳动
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", handleRouteChange);

    // 监听原生点击（拦截内部链接）
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A") {
        const href = target.getAttribute("href");
        if (
          href &&
          !href.startsWith("http") &&
          !href.startsWith("#") &&
          !href.startsWith("mailto:")
        ) {
          // 延迟更新 key，让 Next 路由先工作
          setTimeout(() => {
            setPageKey((k) => k + 1);
          }, 10);
        }
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <main key={pageKey} className="page-fade-in">
      {children}
    </main>
  );
}
