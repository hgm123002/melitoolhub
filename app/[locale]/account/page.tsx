import type { Metadata } from "next";
import AccountClient from "./AccountClient";
import { localeAlternates } from "../../i18n/alternates";

type P = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh-CN" ? "我的中心 - GlobalTradeHub" : "My Account - GlobalTradeHub",
    description:
      locale === "zh-CN"
        ? "查看工具使用历史、已保存的分析结果，并导出你的数据备份。"
        : "View your tool usage history, saved analysis results, and export a data backup.",
    alternates: localeAlternates(locale, "/account"),
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <AccountClient />;
}
