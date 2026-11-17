import type { Metadata } from "next";
import ArticleDetailClient from "./ArticleDetailClient";
import { localeAlternates } from "../../../i18n/alternates";
import { getArticleById, type Article } from "../../../../lib/articles";
import { articleBodyFor } from "../../../../lib/articles-i18n";
import { blogCopyFor } from "../../../../lib/blog";

/** 按语言覆盖标题/摘要/正文：命中译文用译文，未命中诚实回退原文 */
const localized = (article: Article, locale: string): Article => {
  if (locale.startsWith("zh")) return article;
  const copy = blogCopyFor(locale)?.[article.id];
  return {
    ...article,
    title: copy?.title ?? article.title,
    summary: copy?.summary ?? article.summary,
    content: articleBodyFor(locale, article.id) ?? article.content,
  };
};

type P = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, id } = await params;
  const found = getArticleById(id);
  const article = found ? localized(found, locale) : null;

  if (!article || article.status !== "published") {
    return {
      title: locale === "zh-CN" ? "文章不存在 - GlobalTradeHub" : "Article not found - GlobalTradeHub",
      alternates: localeAlternates(locale, `/blog/${id}`),
      robots: { index: false, follow: true },
    };
  }

  const ogImage = `/api/og?title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.summary)}`;

  return {
    title: article.title,
    description: article.summary,
    alternates: localeAlternates(locale, `/blog/${id}`),
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, type: "image/png" }],
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: P) {
  const { locale, id } = await params;
  const found = getArticleById(id);
  const article = found ? localized(found, locale) : null;
  const published = article && article.status === "published" ? article : null;

  const jsonLd = published
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: published.title,
        description: published.summary,
        image: [`https://www.melitoolhub.com${published.cover}`],
        datePublished: published.createdAt,
        dateModified: published.updatedAt,
        inLanguage: locale,
        author: { "@type": "Organization", name: "GlobalTradeHub" },
        publisher: { "@type": "Organization", name: "GlobalTradeHub" },
        mainEntityOfPage: `https://www.melitoolhub.com/${locale}/blog/${id}`,
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ArticleDetailClient initialArticle={published} />
    </>
  );
}
