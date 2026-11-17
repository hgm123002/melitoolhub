"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, MessageSquare, ThumbsUp, Clock, User, Eye } from 'lucide-react';
import { communitySections } from '../../../../config/tools';
import { useLanguage } from '../../../i18n';
import NewPostModal from '../../../../components/NewPostModal';

interface ApiPost {
  id: string;
  section: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  replies: number;
  likes: number;
  views: number;
  contactWechat?: string;
  contactEmail?: string;
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
  } else {
    return `${Math.floor(diffSeconds / 86400)}d`;
  }
}

function SkeletonCard() {
  return (
    <div className="skeleton-light rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-white/60 rounded w-3/4" />
          <div className="flex gap-3 pt-1">
            <div className="h-3 bg-white/50 rounded w-20" />
            <div className="h-3 bg-white/50 rounded w-16" />
            <div className="h-3 bg-white/50 rounded w-16" />
            <div className="h-3 bg-white/50 rounded w-16" />
            <div className="h-3 bg-white/50 rounded w-16" />
          </div>
        </div>
        <div className="w-5 h-5 bg-white/50 rounded flex-shrink-0 mt-1" />
      </div>
    </div>
  );
}

export default function CommunitySectionPage() {
  const { t } = useLanguage();
  const params = useParams();
  const slug = params?.slug as string;
  const section = communitySections.find((s) => s.slug === slug);
  const [tab, setTab] = useState<'hot' | 'new'>('new');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [apiPosts, setApiPosts] = useState<ApiPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const loadApiPosts = async () => {
      setLoadingPosts(true);
      try {
        const res = await fetch(`/api/community/posts?section=${slug}&sort=${tab}`, {
          cache: 'no-store',
        });
        const data = await res.json();
        setApiPosts(data.posts || []);
      } catch {
        setApiPosts([]);
      } finally {
        setLoadingPosts(false);
        setTimeout(() => setInitialLoad(false), 100);
      }
    };
    loadApiPosts();
  }, [slug, tab]);

  if (!section) {
    return (
      <main className="bg-gray-50 min-h-screen page-fade-in">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-3xl font-bold text-[#1e3a5f] mb-4">{t('community_notFound', '板块未找到')}</h1>
          <p className="text-gray-600 mb-8">{t('community_notFoundDesc', '抱歉，无法找到这个讨论板块')}</p>
          <a href="/community" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#1e3a5f] rounded-xl font-semibold hover:bg-amber-300 transition">
            <ArrowLeft className="w-4 h-4" />{t('community_backToHome', '返回社区首页')}
          </a>
        </div>
      </main>
    );
  }

  const posts = apiPosts.map((p) => ({
    id: p.id,
    title: p.title,
    author: p.author,
    time: formatTimeAgo(p.createdAt),
    replies: p.replies,
    likes: p.likes,
    views: p.views || 0,
    content: p.content,
  }));

  const displayPosts = tab === 'hot' ? [...posts].sort((a, b) => b.likes - a.likes) : posts;

  return (
    <main className="bg-gray-50 min-h-screen page-fade-in">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-[#1e3a5f] transition-colors">{t('bc_home', '首页')}</a>
          <span className="mx-2">/</span>
          <a href="/community" className="hover:text-[#1e3a5f] transition-colors">{t('nav_community', '卖家社区')}</a>
          <span className="mx-2">/</span>
          <span className="text-[#1e3a5f] font-medium">{section.name}</span>
        </nav>

        <a href="/community" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1e3a5f] transition mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" />{t('community_backToHome', '返回社区首页')}
        </a>

        <section className="mb-8">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-3">{section.name}</h1>
              <p className="text-gray-600 text-lg">{section.intro}</p>
            </div>
            <button
              onClick={() => setShowNewPostModal(true)}
              className="px-5 py-3 bg-amber-400 text-[#1e3a5f] rounded-xl font-semibold hover:bg-amber-300 transition text-sm flex items-center gap-2 shadow-md whitespace-nowrap">
              <MessageSquare className="w-4 h-4" />{t('community_newPost', '发布新帖')}
            </button>
          </div>
        </section>

        <div className="flex items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2">
            <button onClick={() => setTab('new')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${tab === 'new' ? 'bg-amber-400 text-[#1e3a5f]' : 'bg-white text-[#1a2b4e] hover:bg-amber-50 border border-gray-100'}`}>
              ✨ {t('community_new', '最新')}
            </button>
            <button onClick={() => setTab('hot')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${tab === 'hot' ? 'bg-amber-400 text-[#1e3a5f]' : 'bg-white text-[#1a2b4e] hover:bg-amber-50 border border-gray-100'}`}>
              🔥 {t('community_hot', '热门')}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {initialLoad && loadingPosts ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : !initialLoad && displayPosts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-5xl mb-4">📝</div>
              <p className="text-gray-600 mb-4">{t('community_noPosts', '暂无帖子，快来分享您的第一篇文章吧！')}</p>
              <button
                onClick={() => setShowNewPostModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-[#1e3a5f] rounded-xl font-semibold hover:bg-amber-300 transition text-sm">
                <MessageSquare className="w-4 h-4" />{t('community_newPost', '发布新帖')}
              </button>
            </div>
          ) : (
            displayPosts.map((post, idx) => (
              <a
                key={post.id || idx}
                href={`/community/post/${post.id}`}
                className="block bg-white rounded-2xl p-6 transition border border-gray-100 hover:bg-amber-50/50 group shadow-sm hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#1e3a5f] font-semibold text-base md:text-lg group-hover:text-amber-600 transition line-clamp-2 mb-3">{post.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{post.author}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.time}</span>
                      <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />{post.views || 0}</span>
                      <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" />{post.replies}</span>
                      <span className="flex items-center gap-1.5"><ThumbsUp className="w-3.5 h-3.5" />{post.likes}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition flex-shrink-0 mt-1" />
                </div>
              </a>
            ))
          )}
        </div>

        <section className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100 text-center">
          <h2 className="text-lg font-semibold text-[#1e3a5f] mb-2">💡 {t('community_tipsTitle', '温馨提示')}</h2>
          <p className="text-gray-600 text-sm">{t('community_tipsDesc', '更多功能和互动模块正在持续完善中，感谢您的支持与耐心')}</p>
        </section>
      </div>

      {showNewPostModal && (
        <NewPostModal
          sectionSlug={slug}
          sectionName={section.name}
          onClose={() => setShowNewPostModal(false)}
          onSuccess={() => {
            setShowNewPostModal(false);
            const reload = async () => {
              try {
                const res = await fetch(`/api/community/posts?section=${slug}&sort=${tab}`, { cache: 'no-store' });
                const data = await res.json();
                setApiPosts(data.posts || []);
              } catch {
                setApiPosts([]);
              }
            };
            reload();
          }}
        />
      )}
    </main>
  );
}