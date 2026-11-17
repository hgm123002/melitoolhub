"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Clock,
  Mail,
  MessageCircle,
  ThumbsUp,
  Eye,
  Trash2,
  Send,
  Tag,
} from "lucide-react";
import { communitySections } from "../../../../../config/tools";
import { communityTags, getTagBySlug } from "../../../../../config/tags";
import { useLanguage } from "../../../../i18n";

interface Post {
  id: string;
  section: string;
  title: string;
  content: string;
  author: string;
  contactWechat?: string;
  contactEmail?: string;
  createdAt: string;
  replies: number;
  likes: number;
  views: number;
  likedBy?: string[];
  tags?: string[];
}

interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
  contactWechat?: string;
  contactEmail?: string;
  likes: number;
  likedBy?: string[];
}

function maskEmail(email: string): string {
  const atIndex = email.indexOf("@");
  if (atIndex <= 0) return email;
  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex);
  if (local.length <= 3) {
    return local[0] + "***" + domain;
  }
  const maskCount = Math.min(3, local.length - 2);
  const keepStart = Math.floor((local.length - maskCount) / 2);
  const keepEnd = local.length - keepStart - maskCount;
  return (
    local.slice(0, keepStart) +
    "***" +
    local.slice(keepStart + maskCount) +
    domain
  );
}

function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTimeAgo(isoString: string): string {
  const now = new Date();
  const date = new Date(isoString);
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffSeconds < 60) {
    return `${diffSeconds}s`;
  } else if (diffSeconds < 3600) {
    return `${Math.floor(diffSeconds / 60)}m`;
  } else if (diffSeconds < 86400) {
    return `${Math.floor(diffSeconds / 3600)}h`;
  } else if (diffSeconds < 86400 * 7) {
    return `${Math.floor(diffSeconds / 86400)}d`;
  } else {
    return date.toLocaleDateString();
  }
}

export default function CommunityPostDetailPage() {
  const { t } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [deletingComment, setDeletingComment] = useState<string | null>(null);

  // 评论表单状态
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentWechat, setCommentWechat] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");

  // 获取帖子和评论
  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const postRes = await fetch(
          `/api/community/posts?id=${encodeURIComponent(id)}`,
        );
        const postData = await postRes.json();
        if (postData.post) {
          setPost(postData.post);

          // 增加浏览量
          try {
            await fetch("/api/community/posts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ type: "view", targetId: id }),
            });
          } catch {
            // ignore
          }

          // 加载评论
          const commentsRes = await fetch("/api/community/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "getComments", postId: id }),
          });
          const commentsData = await commentsRes.json();
          if (commentsData.comments) {
            setComments(commentsData.comments);
          }
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  // 点赞功能
  const handleLike = async () => {
    if (!post) return;
    try {
      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "like", targetId: id }),
      });
      const data = await res.json();
      if (data.success) {
        setLiked(data.liked);
        setPost((prev) => (prev ? { ...prev, likes: data.likes } : null));
      }
    } catch {
      // ignore
    }
  };

  // 评论点赞
  const handleCommentLike = async (commentId: string) => {
    try {
      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "likeComment",
          targetId: commentId,
          postId: id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const newLiked = new Set(likedComments);
        if (data.liked) {
          newLiked.add(commentId);
        } else {
          newLiked.delete(commentId);
        }
        setLikedComments(newLiked);
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, likes: data.likes } : c,
          ),
        );
      }
    } catch {
      // ignore
    }
  };

  // 发布评论
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommentError("");
    if (!commentAuthor.trim() || !commentContent.trim()) {
      setCommentError(t("community_commentRequired", "请填写昵称和评论内容"));
      return;
    }
    setSubmittingComment(true);
    try {
      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "comment",
          postId: id,
          author: commentAuthor.trim(),
          content: commentContent.trim(),
          contactWechat: commentWechat.trim(),
          contactEmail: commentEmail.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setComments((prev) => [...prev, data.comment]);
        setPost((prev) =>
          prev ? { ...prev, replies: prev.replies + 1 } : null,
        );
        setCommentAuthor("");
        setCommentContent("");
        setCommentWechat("");
        setCommentEmail("");
        setShowCommentForm(false);
      } else {
        setCommentError(data.error || t("community_commentFailed", "发布失败"));
      }
    } catch {
      setCommentError(t("community_networkError", "网络错误，请稍后重试"));
    } finally {
      setSubmittingComment(false);
    }
  };

  // 删除帖子
  const handleDeletePost = async () => {
    if (
      !confirm(
        t(
          "community_confirmDeletePost",
          "确认删除这篇帖子吗？此操作不可恢复。",
        ),
      )
    )
      return;
    try {
      const res = await fetch(
        `/api/community/posts?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        alert(t("community_deleteSuccess", "删除成功"));
        router.push("/community");
      } else {
        alert(t("community_deleteFailed", "删除失败"));
      }
    } catch {
      alert(t("community_networkError", "网络错误，请稍后重试"));
    }
  };

  // 删除评论
  const handleDeleteComment = async (commentId: string) => {
    if (!confirm(t("community_confirmDeleteComment", "确认删除这条评论吗？")))
      return;
    setDeletingComment(commentId);
    try {
      const res = await fetch(
        `/api/community/posts?commentId=${encodeURIComponent(commentId)}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
        setPost((prev) =>
          prev ? { ...prev, replies: Math.max(0, prev.replies - 1) } : null,
        );
      } else {
        alert(t("community_deleteFailed", "删除失败"));
      }
    } catch {
      alert(t("community_networkError", "网络错误，请稍后重试"));
    } finally {
      setDeletingComment(null);
    }
  };

  const sectionName = post
    ? communitySections.find((s) => s.slug === post.section)?.name ||
      post.section
    : "";

  if (loading) {
    return (
      <main className="bg-white min-h-screen page-fade-in">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="skeleton-light h-4 w-48 rounded mb-6"></div>
          <div className="skeleton-light h-4 w-32 rounded mb-8"></div>
          <div className="skeleton-light h-12 w-3/4 rounded mb-6"></div>
          <div className="flex gap-6 mb-10 pb-6 border-b border-gray-200">
            <div className="skeleton-light h-4 w-24 rounded"></div>
            <div className="skeleton-light h-4 w-20 rounded"></div>
            <div className="skeleton-light h-4 w-20 rounded"></div>
            <div className="skeleton-light h-4 w-24 rounded"></div>
          </div>
          <div className="space-y-4 mb-12">
            <div className="skeleton-light h-4 w-full rounded"></div>
            <div className="skeleton-light h-4 w-11/12 rounded"></div>
            <div className="skeleton-light h-4 w-full rounded"></div>
            <div className="skeleton-light h-4 w-10/12 rounded"></div>
            <div className="skeleton-light h-4 w-9/12 rounded"></div>
            <div className="skeleton-light h-4 w-full rounded"></div>
            <div className="skeleton-light h-4 w-8/12 rounded"></div>
          </div>
          <div className="skeleton-base h-32 rounded-2xl"></div>
        </div>
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="bg-white min-h-screen page-fade-in">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-3xl font-bold text-[#1e3a5f] mb-4">
            {t("community_postNotFound", "帖子不存在")}
          </h1>
          <p className="text-gray-600 mb-8">
            {t("community_postNotFoundDesc", "这个帖子可能已被删除或尚未发布")}
          </p>
          <a
            href="/community"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#fbbf24] text-[#1e3a5f] rounded-xl font-semibold hover:bg-[#f59e0b] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("community_backToHome", "返回社区首页")}
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 面包屑 */}
        <nav className="text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-[#1e3a5f]">
            {t("bc_home", "首页")}
          </a>
          <span className="mx-2">/</span>
          <a href="/community" className="hover:text-[#1e3a5f]">
            {t("nav_community", "卖家社区")}
          </a>
          <span className="mx-2">/</span>
          <a
            href={`/community/${post.section}`}
            className="hover:text-[#1e3a5f]"
          >
            {sectionName}
          </a>
        </nav>

        <a
          href={`/community/${post.section}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1e3a5f] transition mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("community_backToList", "返回板块")}
        </a>

        <article className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <h1 className="text-3xl font-bold text-[#1e3a5f] mb-6 leading-tight">
            {post.title}
          </h1>

          {/* 作者信息和操作栏 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {formatDateTime(post.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              {post.views || 0}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              {post.replies}
            </span>
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${liked ? "bg-[#fbbf24]/30 text-[#1e3a5f]" : "hover:bg-gray-100 text-gray-600"}`}
            >
              <ThumbsUp className="w-4 h-4" />
              {post.likes}
            </button>
            <button
              onClick={handleDeletePost}
              className="ml-auto flex items-center gap-1.5 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <Trash2 className="w-4 h-4" />
              {t("community_deletePost", "删除帖子")}
            </button>
          </div>

          {/* 帖子标签：点击跳回社区页筛选该标签 */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-gray-100">
              <Tag className="w-4 h-4 text-amber-500" />
              {post.tags.map((slug) => {
                const tag = getTagBySlug(slug);
                return (
                  <a
                    key={slug}
                    href={`/community?tag=${encodeURIComponent(slug)}`}
                    onClick={(e) => {
                      // 使用 client-side 导航
                      e.preventDefault();
                      router.push(`/community?tag=${encodeURIComponent(slug)}`);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg text-xs hover:bg-amber-100 transition"
                  >
                    <span>{tag.emoji}</span>
                    {tag.name}
                  </a>
                );
              })}
            </div>
          )}

          {/* 正文内容 */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>

          {/* 联系方式 */}
          {(post.contactWechat || post.contactEmail) && (
            <div className="mt-10 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">
                📞 {t("community_contactInfo", "作者联系方式")}
              </h3>
              <div className="space-y-2 text-sm">
                {post.contactWechat && (
                  <p className="text-gray-700">
                    <span className="font-medium">
                      {t("community_wechat", "微信")}：
                    </span>
                    {post.contactWechat}
                  </p>
                )}
                {post.contactEmail && (
                  <p className="text-gray-700 flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    <span className="font-medium">
                      {t("community_email", "邮箱")}：
                    </span>
                    <a
                      href={`mailto:${post.contactEmail}`}
                      className="text-blue-600 hover:underline"
                    >
                      {maskEmail(post.contactEmail)}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}
        </article>

        {/* 评论区 */}
        <section className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#1e3a5f] flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#f59e0b]" />
              {t("community_replies", "回复")} ({comments.length})
            </h2>
            <button
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="px-4 py-2 bg-[#fbbf24] text-[#1e3a5f] rounded-xl text-sm font-medium hover:bg-[#f59e0b] transition flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {showCommentForm
                ? t("community_collapse", "收起")
                : t("community_writeComment", "写回复")}
            </button>
          </div>

          {/* 评论表单 */}
          {showCommentForm && (
            <form
              onSubmit={handleCommentSubmit}
              className="mb-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100"
            >
              <div className="grid md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    {t("community_nickname", "昵称")}{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-white text-gray-800 rounded-lg border border-gray-200 focus:border-[#fbbf24] outline-none text-sm"
                    placeholder={t("community_yourNickname", "您的昵称")}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    {t("community_wechat", "微信")}（
                    {t("community_optional", "可选")}）
                  </label>
                  <input
                    type="text"
                    value={commentWechat}
                    onChange={(e) => setCommentWechat(e.target.value)}
                    className="w-full px-3 py-2 bg-white text-gray-800 rounded-lg border border-gray-200 focus:border-[#fbbf24] outline-none text-sm"
                    placeholder={t(
                      "community_wechatPlaceholder",
                      "方便交流的微信号",
                    )}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-medium mb-1.5">
                  <Mail className="w-3 h-3 inline-block mr-1" />
                  {t("community_email", "邮箱")}（
                  {t("community_optional", "可选")}）
                </label>
                <input
                  type="email"
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-800 rounded-lg border border-gray-200 focus:border-[#fbbf24] outline-none text-sm"
                  placeholder={t(
                    "community_emailPlaceholder",
                    "your@email.com",
                  )}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1.5">
                  {t("community_commentContent", "评论内容")}{" "}
                  <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={4}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-800 rounded-lg border border-gray-200 focus:border-[#fbbf24] outline-none text-sm resize-y"
                  placeholder={t(
                    "community_commentPlaceholder",
                    "分享您的经验、问题或观点...",
                  )}
                />
              </div>

              {commentError && (
                <div className="text-red-600 text-sm mb-3">{commentError}</div>
              )}

              <button
                type="submit"
                disabled={submittingComment}
                className="px-5 py-2 bg-[#1e3a5f] text-white rounded-lg text-sm font-medium hover:bg-[#1e3a5f]/80 transition disabled:opacity-50"
              >
                {submittingComment
                  ? t("community_submitting", "发布中...")
                  : t("community_submitComment", "发布回复")}
              </button>
            </form>
          )}

          {/* 评论列表 */}
          {comments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-lg mb-2">
                {t("community_noComments", "暂无回复")}
              </p>
              <p className="text-sm">
                {t(
                  "community_firstComment",
                  "来成为第一个回复的人吧，分享您的经验和见解！",
                )}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-3 pb-3 border-b border-gray-100">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-[#1e3a5f]">
                      <User className="w-3.5 h-3.5" />
                      {comment.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {formatTimeAgo(comment.createdAt)}
                    </span>
                    <button
                      onClick={() => handleCommentLike(comment.id)}
                      className={`flex items-center gap-1 ml-auto px-2 py-1 rounded-lg transition ${likedComments.has(comment.id) ? "bg-[#fbbf24]/30 text-[#1e3a5f]" : "hover:bg-gray-100 text-gray-600"}`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {comment.likes}
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      disabled={deletingComment === comment.id}
                      className="flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {t("community_delete", "删除")}
                    </button>
                  </div>
                  <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </div>
                  {(comment.contactWechat || comment.contactEmail) && (
                    <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600 flex flex-wrap gap-3">
                      {comment.contactWechat && (
                        <span>
                          {t("community_wechat", "微信")}：
                          {comment.contactWechat}
                        </span>
                      )}
                      {comment.contactEmail && (
                        <span>
                          {t("community_email", "邮箱")}：
                          <a
                            href={`mailto:${comment.contactEmail}`}
                            className="text-blue-600 hover:underline"
                          >
                            {maskEmail(comment.contactEmail)}
                          </a>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 底部提示 */}
        <section className="text-center text-gray-600 text-sm">
          <p className="mb-2">
            {t("community_postTips", "欢迎参与讨论，分享您的观点和经验")}
          </p>
          <a
            href="/community"
            className="text-[#f59e0b] hover:underline text-sm"
          >
            ← {t("community_backToHome", "返回社区首页")}
          </a>
        </section>
      </div>
    </main>
  );
}
