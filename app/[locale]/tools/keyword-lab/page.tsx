import type { Metadata } from "next";
import KeywordLabClient from "./KeywordLabClient";
import { localeAlternates } from "../../../i18n/alternates";

type P = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh-CN";
  const title = isZh
    ? "跨境电商关键词实验室 - 真实搜索量与标题诊断"
    : "Ecommerce Keyword Lab - Real Search Volume & Title Audit";
  const description = isZh
    ? "按 Amazon、Shopee、Mercado Libre、Ozon 标题规则生成关键词矩阵，诊断竞品标题缺口词并测算真实利润。支持接入自有数据源获取真实搜索量。"
    : "Build keyword matrices against Amazon, Shopee, Mercado Libre and Ozon title rules, audit competitor title gaps, and model real profit. Bring your own data source for real search volume.";
  return {
    title,
    description,
    keywords: [
      "keyword research", "amazon keyword tool", "keyword matrix", "title optimization",
      "关键词研究", "选品分析", "标题优化", "跨境电商关键词",
    ],
    alternates: localeAlternates(locale, "/tools/keyword-lab"),
    openGraph: { title, description, type: "website" },
  };
}

export default function Page() {
  return <KeywordLabClient />;
}
