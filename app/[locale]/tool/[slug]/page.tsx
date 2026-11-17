import type { Metadata } from "next";
import ToolClient from "./ToolClient";
import { tools } from "../../../../config/tools";
import { localeAlternates } from "../../../../app/i18n/alternates";

type P = { params: Promise<{ locale: string; slug: string }> };

// 每个工具页从配置读取 seo 标题/描述/关键词，服务端直出
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  // seo.title 已含品牌后缀，用 absolute 避免模板再拼一次 "| GlobalTradeHub"
  const rawTitle = tool?.seo?.title ?? tool?.name ?? slug;
  return {
    title: { absolute: rawTitle.replace(/ - GlobalTradeHub$/, "") },
    description: tool?.seo?.description ?? tool?.intro,
    keywords: tool?.seo?.keywords?.split(",").map((k) => k.trim()),
    alternates: localeAlternates(locale, `/tool/${slug}`),
  };
}

export default function Page() {
  return <ToolClient />;
}
