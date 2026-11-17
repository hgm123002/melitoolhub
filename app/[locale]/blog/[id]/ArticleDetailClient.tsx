// app/blog/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Eye } from "lucide-react";
import { getArticleById, incrementArticleViews } from "../../../../lib/articles";
import { useLanguage } from "../../../i18n";
import { blogCopyFor } from "../../../../lib/blog";

function ArticleDetailPage({ initialArticle = null }: { initialArticle?: ReturnType<typeof getArticleById> } = {}) {
  const { t, language } = useLanguage();
  const pack = blogCopyFor(language);
  const params = useParams();
  const id = params?.id as string;
  const [article, setArticle] =
    useState<ReturnType<typeof getArticleById>>(initialArticle);
  const [notFound, setNotFound] = useState(false);
  const [viewCount, setViewCount] = useState(initialArticle?.views ?? 0);

  useEffect(() => {
    if (!id) return;
    // 服务端已按语言下发标题/摘要/正文，这里不再用原文覆盖，
    // 否则 /es/blog/1、/ja/blog/3 在挂载后会被中文原文顶掉
    if (initialArticle) {
      setViewCount(initialArticle.views + 1);
      return;
    }
    const data = getArticleById(id);
    if (!data) {
      setNotFound(true);
      return;
    }
    // 状态为草稿的文章前台不允许查看
    if (data.status !== "published") {
      setNotFound(true);
      return;
    }
    incrementArticleViews(id);
    setArticle(data);
    setViewCount(data.views + 1);
  }, [id, initialArticle]);

  // 骨架屏 - 先显示骨架屏再判断未找到
  if (!article && !notFound) {
    return (
      <main className="bg-white min-h-screen page-fade-in">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="skeleton-light h-4 w-48 rounded mb-8"></div>
          <div className="skeleton-light h-10 w-3/4 rounded mb-6"></div>
          <div className="skeleton-light h-6 w-1/2 rounded mb-8"></div>
          <div className="flex gap-6 mb-10 pb-8 border-b border-gray-200">
            <div className="skeleton-light h-4 w-32 rounded"></div>
            <div className="skeleton-light h-4 w-32 rounded"></div>
          </div>
          <div className="skeleton-base h-64 md:h-80 rounded-3xl mb-12"></div>
          <div className="space-y-4">
            <div className="skeleton-light h-4 w-full rounded"></div>
            <div className="skeleton-light h-4 w-11/12 rounded"></div>
            <div className="skeleton-light h-4 w-full rounded"></div>
            <div className="skeleton-light h-4 w-10/12 rounded"></div>
            <div className="skeleton-light h-4 w-9/12 rounded"></div>
            <div className="skeleton-light h-4 w-full rounded"></div>
            <div className="skeleton-light h-4 w-10/12 rounded"></div>
          </div>
        </div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="bg-white min-h-screen page-fade-in">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="text-6xl mb-6">📭</div>
          <h1 className="text-3xl font-bold text-[#1e3a5f] mb-4">
            {t("blog_articleNotFound", "文章不存在")}
          </h1>
          <p className="text-gray-600 mb-8">
            {t("blog_articleNotFoundDesc", "这篇文章可能已被删除或未发布。")}
          </p>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#fbbf24] hover:bg-[#fbbf24] text-[#1e3a5f] rounded-xl transition font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            {t("blog_backToList", "返回文章列表")}
          </a>
        </div>
      </main>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <main className="bg-white min-h-screen page-fade-in">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 面包屑导航 */}
        <nav className="text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-[#1e3a5f]">
            {t("bc_home", "首页")}
          </a>
          <span className="mx-2">/</span>
          <a href="/blog" className="hover:text-[#1e3a5f]">
            {t("bc_blog", "跨境干货")}
          </a>
          <span className="mx-2">/</span>
          <span className="text-[#1e3a5f] truncate inline-block max-w-[200px] align-bottom">
            {(pack && pack[article.id]?.title) || article.title}
          </span>
        </nav>

        {/* 返回按钮 */}
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1e3a5f] transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("blog_backToList", "返回文章列表")}
        </a>

        {/* 文章分类标签 */}
        <span className="inline-block px-4 py-1.5 bg-[#fbbf24] text-[#1e3a5f] text-sm font-semibold rounded-full mb-6">
          {article.category}
        </span>

        {/* 文章标题 */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] leading-tight mb-6">
          {(pack && pack[article.id]?.title) || article.title}
        </h1>

        {/* 文章摘要 */}
        <p className="text-xl text-[#1a2b4e] leading-relaxed mb-8">
          {(pack && pack[article.id]?.summary) || article.summary}
        </p>

        {/* 元信息 */}
        <div className="flex items-center gap-6 text-gray-600 text-sm mb-10 pb-8 border-b border-gray-700/50">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{article.updatedAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>
              {viewCount.toLocaleString()} {t("blog_viewSuffix", "次浏览")}
            </span>
          </div>
        </div>

        {/* 封面图 */}
        <div className="aspect-[16/9] w-full bg-white rounded-3xl mb-12 shadow-2xl overflow-hidden relative">
          {article.cover.startsWith("http") || article.cover.startsWith("/") ? (
            <img
              src={article.cover}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[28rem] md:text-[36rem] leading-none scale-110">
                {article.cover}
              </span>
            </div>
          )}
        </div>

        {/* 文章正文 */}
        <article className="max-w-none">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* 底部返回 */}
        <div className="mt-16 pt-8 border-t border-gray-700/50 text-center">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#fbbf24]/30 text-[#1a2b4e] hover:text-[#1e3a5f] rounded-xl transition font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("blog_viewMore", "查看更多文章")}
          </a>
        </div>
      </div>
    </main>
  );
}

export default ArticleDetailPage;
