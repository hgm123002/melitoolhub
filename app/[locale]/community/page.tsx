"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  Search, Clock, Eye, ThumbsUp, MessageCircle, Users, HelpCircle, Zap,
  Plus, Flame, BarChart3, Tag, User, ArrowRight, TrendingUp, Award, X
} from 'lucide-react';
import { communitySections } from '../../../config/tools';
import { communityTags, getTagBySlug } from '../../../config/tags';
import { useLanguage } from '../../i18n';
import NewPostModal from '../../../components/NewPostModal';

interface Post {
  id: string;
  section: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  replies: number;
  likes: number;
  views: number;
  tags?: string[];
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

// 骨架屏组件
function SkeletonBlock() {
  return (
    <div className="animate-pulse bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-5/6" />
          <div className="flex gap-3 pt-1">
            <div className="h-3 bg-gray-100 rounded w-16" />
            <div className="h-3 bg-gray-100 rounded w-16" />
            <div className="h-3 bg-gray-100 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BannerSkeleton() {
  return (
    <div className="bg-gray-100 rounded-3xl p-8 md:p-10 mb-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-2/5 mb-6" />
      <div className="h-12 bg-gray-200 rounded-xl max-w-2xl mb-6" />
      <div className="flex flex-wrap gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const { t } = useLanguage();
  const sectionIcons = [MessageCircle, Users, HelpCircle, Zap];
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [sectionCounts, setSectionCounts] = useState<Record<string, number>>({});
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'hot' | 'new' | 'featured'>('all');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  // 初始 tag 状态（支持从详情页点标签跳回直接显示筛选结果）
  // 注意：直接用 useState 惰性初始化读取，避免 useEffect 异步 setState 引起的额外 re-render 和重复 fetch
  const [activeTag, setActiveTag] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const urlTag = new URLSearchParams(window.location.search).get("tag");
      if (urlTag) {
        // 清空 URL 里的 query，避免刷新时重复触发
        window.history.replaceState({}, "", "/community");
        return urlTag;
      }
    } catch {
      /* 不阻塞页面 */
    }
    return null;
  });
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [modalSection, setModalSection] = useState('operation');
  const [initialLoad, setInitialLoad] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); // 发帖后强制刷新

  // 统一加载逻辑：根据板块 / 标签 / 搜索关键字去请求
  const buildUrl = useCallback(() => {
    const params = new URLSearchParams();
    params.set('sort', activeTab === 'all' ? 'new' : activeTab);
    if (activeSection) params.set('section', activeSection);
    if (activeTag) params.set('tag', activeTag);
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    return `/api/community/posts?${params.toString()}`;
  }, [activeTab, activeSection, activeTag, searchQuery, refreshKey]);

  // 初始加载 + 筛选条件变化时重新加载
  // 用 AbortController 让"新请求发出后旧请求的响应被忽略"，避免竞态覆盖最新结果
  useEffect(() => {
    const controller = new AbortController();
    let ignoreResponse = false;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(buildUrl(), {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (ignoreResponse || !res.ok) {
          if (!res.ok && !ignoreResponse) {
            setAllPosts([]);
            setSectionCounts({});
            setTagCounts({});
          }
          return;
        }
        const data = await res.json();
        if (ignoreResponse) return;
        setAllPosts(data.posts || []);
        setSectionCounts(data.sectionCounts || {});
        setTagCounts(data.tagCounts || {});
      } catch (err) {
        if (ignoreResponse) return; // aborted，忽略
        setAllPosts([]);
        setSectionCounts({});
        setTagCounts({});
      } finally {
        if (!ignoreResponse) {
          setLoading(false);
          setTimeout(() => setInitialLoad(false), 100);
        }
      }
    })();

    return () => {
      ignoreResponse = true;
      controller.abort();
    };
  }, [buildUrl]);

  // 搜索功能：走同一逻辑（复用 URL 生成器），但手动触发一次重新加载
  // 实现方式：让"搜索提交"本质上等于"刷新 activeTab" —— 我们调用 buildUrl 的副作用即可
  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(buildUrl(), { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setAllPosts(data.posts || []);
      }
    } catch {
      /* 不覆盖旧数据，避免闪烁 */
    } finally {
      setSearching(false);
    }
  }, [buildUrl, searchQuery]);

  // 点击热门标签：切换激活状态
  const handleTagClick = useCallback((tagSlug: string) => {
    setActiveTag((prev) => (prev === tagSlug ? null : tagSlug));
    // 点击标签时不清空搜索框，让两者可以叠加；但为了体验平滑，这里只切标签
  }, []);

  // 清除所有筛选
  const clearFilters = useCallback(() => {
    setActiveSection(null);
    setActiveTag(null);
    setSearchQuery('');
  }, []);

  const getSectionName = (slug: string) => {
    const section = communitySections.find((s) => s.slug === slug);
    return section ? section.name : slug;
  };

  // 排序（数据已经从后端按 sort 返回了一定顺序，这里在前端再次按 activeTab 排序以便切换体验）
  const filteredPosts = [...allPosts].sort((a, b) => {
    if (activeTab === 'hot') return b.likes - a.likes || b.replies - a.replies;
    if (activeTab === 'featured') return b.views - a.views;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // 统计数据（用 tagCounts 拿到的全局计数，避免全量 posts 每次都扫描）
  const totalPosts = allPosts.length;
  const totalReplies = allPosts.reduce((sum, p) => sum + p.replies, 0);
  const totalViews = allPosts.reduce((sum, p) => sum + (p.views || 0), 0);
  const hotPosts = [...allPosts].sort((a, b) => b.likes - a.likes).slice(0, 5);

  const openNewPostInSection = (sectionSlug: string) => {
    setModalSection(sectionSlug);
    setShowNewPostModal(true);
  };

  const handlePostSuccess = () => {
    setShowNewPostModal(false);
    setRefreshKey((n) => n + 1); // 让 useEffect 重新发起请求
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* 面包屑 */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-[#1e3a5f] transition-colors">{t('bc_home', '首页')}</a>
          <span className="mx-2">/</span>
          <span className="text-[#1e3a5f] font-medium">{t('bc_community', '卖家社区')}</span>
        </nav>

        {/* 顶部横幅区域 */}
        {initialLoad && loading ? (
          <BannerSkeleton />
        ) : (
          <section className="rounded-3xl p-8 md:p-10 mb-8 text-white relative overflow-hidden bg-[#0f2038]">
            <img
              src="/hero/hero-network.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f2038]/95 via-[#0f2038]/75 to-[#1a3a5c]/50" />
            <div className="absolute right-0 top-0 w-64 h-64 bg-sky-400/10 rounded-full -translate-y-20 translate-x-20" />
            <div className="absolute right-20 bottom-0 w-40 h-40 bg-sky-400/10 rounded-full translate-y-10" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    {t('community_title', '跨境电商卖家社区')}
                  </h1>
                  <p className="text-blue-100 text-lg">
                    {t('community_subtitle', '卖家问答、经验交流、求助、行业讨论版')}
                  </p>
                </div>
                <button
                  onClick={() => setShowNewPostModal(true)}
                  className="flex items-center gap-2 bg-amber-400 text-[#1e3a5f] px-6 py-3 rounded-xl font-semibold hover:bg-amber-300 transition shadow-lg whitespace-nowrap"
                >
                  <Plus className="w-5 h-5" />
                  {t('community_newPost', '发布新帖')}
                </button>
              </div>

              {/* 搜索框 */}
              <form onSubmit={handleSearch} className="relative max-w-3xl">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('community_searchPlaceholder', '搜索帖子标题、内容或作者...')}
                    className="w-full pl-14 pr-28 py-4 bg-white/95 text-gray-800 rounded-2xl border-0 outline-none text-base shadow-xl placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    disabled={searching}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-[#1e3a5f] text-white rounded-xl text-sm font-medium hover:bg-[#2a4a75] transition disabled:opacity-50"
                  >
                    {searching ? t('community_searching', '搜索中...') : t('community_search', '搜索')}
                  </button>
                </div>
              </form>

              {/* 统计数据 */}
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl px-4 py-3">
                  <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{totalPosts}</div>
                    <div className="text-sm text-blue-200">{t('community_totalPosts', '帖子数')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl px-4 py-3">
                  <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{totalReplies}</div>
                    <div className="text-sm text-blue-200">{t('community_totalReplies', '回复数')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl px-4 py-3">
                  <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{totalViews}</div>
                    <div className="text-sm text-blue-200">{t('community_totalViews', '浏览量')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl px-4 py-3">
                  <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center">
                    <Tag className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{communitySections.length}</div>
                    <div className="text-sm text-blue-200">{t('community_sections', '板块数')}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 主内容区：左右布局 */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左侧：板块导航 */}
          <aside className="lg:w-72 flex-shrink-0 space-y-6">
            {/* 板块导航卡片 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-500" />
                {t('community_discussion', '讨论板块')}
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveSection(null)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${
                    activeSection === null
                      ? 'bg-amber-50 text-amber-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">📋</span>
                    {t('community_allSections', '全部板块')}
                  </span>
                  <span className="text-sm bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {totalPosts}
                  </span>
                </button>
                {communitySections.map((section, idx) => {
                  const Icon = sectionIcons[idx % sectionIcons.length];
                  const count = sectionCounts[section.slug] || 0;
                  return (
                    <button
                      key={section.slug}
                      onClick={() => setActiveSection(section.slug)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${
                        activeSection === section.slug
                          ? 'bg-amber-50 text-amber-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-amber-500" />
                        {section.name}
                      </span>
                      <span className="text-sm bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 快速发帖 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" />
                {t('community_quickPost', '快速发帖')}
              </h2>
              <div className="space-y-2">
                {communitySections.map((section, idx) => {
                  const Icon = sectionIcons[idx % sectionIcons.length];
                  return (
                    <button
                      key={section.slug}
                      onClick={() => openNewPostInSection(section.slug)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-amber-50 hover:text-amber-700 transition text-sm"
                    >
                      <Icon className="w-4 h-4 text-amber-500" />
                      {t('community_postIn', '在 {section} 发帖').replace('{section}', section.name)}
                      <ArrowRight className="w-4 h-4 ml-auto opacity-50" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 热门标签 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-500" />
                {t('community_hotTags', '热门标签')}
                <span className="ml-auto text-xs text-gray-400 font-normal">
                  点击筛选 / 再点取消
                </span>
              </h2>
              {activeTag && (
                <div className="mb-3 flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                  <span className="text-amber-700">
                    🔍 已筛选：<strong>{getTagBySlug(activeTag).name}</strong>
                  </span>
                  <button
                    onClick={() => setActiveTag(null)}
                    className="ml-auto text-amber-700 hover:text-amber-900"
                    title={t('community_clearTag', '清除标签筛选')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                {communityTags.map((tag) => {
                  const count = tagCounts[tag.slug] ?? 0;
                  const isActive = activeTag === tag.slug;
                  return (
                    <button
                      key={tag.slug}
                      onClick={() => handleTagClick(tag.slug)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition border whitespace-nowrap ${
                        isActive
                          ? 'bg-amber-100 text-amber-800 border-amber-400 font-medium shadow-sm'
                          : count > 0
                            ? 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-amber-50 hover:border-amber-200'
                            : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100'
                      }`}
                      title={`${tag.name}：${count} 篇帖子`}
                    >
                      <span className="inline-flex items-center leading-none text-base flex-shrink-0">{tag.emoji}</span>
                      <span className="leading-none flex-shrink-0">{tag.name}</span>
                      <span className={`inline-flex items-center text-xs px-1.5 py-0.5 rounded-full leading-none ml-auto ${
                        isActive ? 'bg-amber-200 text-amber-900' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* 右侧：帖子列表 + 热门帖子 */}
          <div className="flex-1 space-y-6">
            {/* 帖子列表区域 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {/* 筛选标签 */}
              <div className="flex flex-wrap items-center gap-2 p-4 border-b border-gray-100">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    activeTab === 'all'
                      ? 'bg-amber-400 text-[#1e3a5f]'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {t('community_tab_all', '全部')}
                </button>
                <button
                  onClick={() => setActiveTab('hot')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
                    activeTab === 'hot'
                      ? 'bg-amber-400 text-[#1e3a5f]'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  {t('community_tab_hot', '热门')}
                </button>
                <button
                  onClick={() => setActiveTab('new')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
                    activeTab === 'new'
                      ? 'bg-amber-400 text-[#1e3a5f]'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  {t('community_tab_new', '最新')}
                </button>
                <button
                  onClick={() => setActiveTab('featured')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
                    activeTab === 'featured'
                      ? 'bg-amber-400 text-[#1e3a5f]'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  {t('community_tab_featured', '精华')}
                </button>

                <div className="flex-1" />

                {(activeSection || activeTag) && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {activeSection && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-xl text-xs border border-amber-100">
                        📁 {getSectionName(activeSection)}
                        <button onClick={() => setActiveSection(null)} className="ml-1 hover:text-amber-900">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {activeTag && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-xl text-xs border border-amber-100">
                        <Tag className="w-3 h-3" /> {getTagBySlug(activeTag).name}
                        <button onClick={() => setActiveTag(null)} className="ml-1 hover:text-amber-900">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs text-gray-500 hover:bg-gray-100 transition"
                    >
                      清除全部
                    </button>
                  </div>
                )}
              </div>

              {/* 帖子列表 */}
              <div className="divide-y divide-gray-100">
                {initialLoad && loading ? (
                  <div className="p-4 space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <SkeletonBlock key={i} />
                    ))}
                  </div>
                ) : loading ? (
                  <div className="text-center py-12 text-gray-500">
                    {t('blog_loading', '加载中...')}
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="text-center py-16 px-6">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-gray-600 text-lg mb-2">
                      {t('community_noPosts', '暂无用户发布的帖子，快来分享您的第一篇文章吧！')}
                    </p>
                    <p className="text-gray-500 text-sm mb-6">
                      {activeSection
                        ? `${getSectionName(activeSection)}${t('community_noPostsInSection', '板块暂无内容')}`
                        : ''}
                    </p>
                    <button
                      onClick={() => setShowNewPostModal(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#1e3a5f] rounded-xl font-semibold hover:bg-amber-300 transition"
                    >
                      <Plus className="w-5 h-5" />
                      {t('community_newPost', '发布新帖')}
                    </button>
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <a
                      key={post.id}
                      href={`/community/post/${post.id}`}
                      className="block p-5 hover:bg-amber-50/50 transition group"
                    >
                      <div className="flex items-start gap-4">
                        {/* 左侧图标 */}
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-amber-600" />
                        </div>

                        {/* 中间内容 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="text-[#1e3a5f] font-semibold text-base group-hover:text-amber-600 transition line-clamp-2">
                              {post.title}
                            </h3>
                            {post.likes > 10 && (
                              <span className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-2 py-1 rounded-lg flex-shrink-0">
                                <Flame className="w-3 h-3" />
                                {t('community_hot', '热门')}
                              </span>
                            )}
                          </div>

                          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                            {post.content}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                              {getSectionName(post.section)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {formatTimeAgo(post.createdAt)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Eye className="w-3.5 h-3.5" />
                              {post.views || 0}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MessageCircle className="w-3.5 h-3.5" />
                              {post.replies}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <ThumbsUp className="w-3.5 h-3.5" />
                              {post.likes}
                            </span>
                          </div>

                          {/* 帖子标签（可点击进入标签筛选） */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3" onClick={(e) => e.stopPropagation()}>
                              {post.tags.map((slug) => {
                                const tag = getTagBySlug(slug);
                                const isActive = activeTag === slug;
                                return (
                                  <button
                                    key={slug}
                                    onClick={() => handleTagClick(slug)}
                                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition border ${
                                      isActive
                                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                                        : 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100'
                                    }`}
                                  >
                                    <span>{tag.emoji}</span>
                                    {tag.name}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* 右侧箭头 */}
                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition flex-shrink-0 mt-6" />
                      </div>
                    </a>
                  ))
                )}
              </div>
            </div>

            {/* 热门帖子侧边栏（仅在有内容时显示） */}
            {!initialLoad && hotPosts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  {t('community_hotPosts', '热门帖子')}
                </h2>
                <div className="space-y-3">
                  {hotPosts.map((post, idx) => (
                    <a
                      key={post.id}
                      href={`/community/post/${post.id}`}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-amber-50 transition group"
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        idx === 0 ? 'bg-amber-400 text-[#1e3a5f]' :
                        idx === 1 ? 'bg-gray-200 text-gray-700' :
                        idx === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm text-gray-800 font-medium group-hover:text-amber-700 transition line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {post.replies}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 社区公约 */}
            {!initialLoad && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4 flex items-center gap-2">
                  📌 {t('community_convention', '社区公约')}
                </h2>
                <div className="space-y-3 text-gray-700 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold">1.</span>
                    <span>{t('community_rule1', '友善尊重他人的观点和经验')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold">2.</span>
                    <span>{t('community_rule2', '分享有价值的信息，不发布广告或垃圾信息')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold">3.</span>
                    <span>{t('community_rule3', '保护个人隐私，不泄露敏感商业信息')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold">4.</span>
                    <span>{t('community_rule4', '遵守平台规则，共建健康的卖家社区')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 发帖弹窗 */}
      {showNewPostModal && (
        <NewPostModal
          sectionSlug={modalSection}
          sectionName={getSectionName(modalSection)}
          onClose={() => setShowNewPostModal(false)}
          onSuccess={handlePostSuccess}
        />
      )}
    </main>
  );
}