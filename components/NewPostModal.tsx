'use client';

import { useState } from 'react';
import { X, Send, User, Mail, MessageCircle, Tag } from 'lucide-react';
import { useLanguage } from '../app/i18n';
import { communityTags } from '../config/tags';

interface NewPostModalProps {
  sectionSlug: string;
  sectionName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewPostModal({ sectionSlug, sectionName, onClose, onSuccess }: NewPostModalProps) {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [contactWechat, setContactWechat] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !content.trim() || !author.trim()) {
      setError(t('community_requiredFields', '请填写标题、内容和昵称'));
      return;
    }
    if (title.length < 5) {
      setError(t('community_titleTooShort', '标题至少需要5个字符'));
      return;
    }
    if (content.length < 10) {
      setError(t('community_contentTooShort', '内容至少需要10个字符'));
      return;
    }
    setSubmitting(true);

    try {
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: sectionSlug,
          title,
          content,
          author,
          contactWechat,
          contactEmail,
          tags: selectedTags,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsVisible(false);
        setTimeout(() => onSuccess(), 50);
      } else {
        setError(data.error || t('community_publishFailed', '发布失败'));
      }
    } catch {
      setError(t('community_networkError', '网络错误，请稍后重试'));
    } finally {
      setSubmitting(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={(e) => {
      if (e.target === e.currentTarget) closeModal();
    }}>
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-[#1e3a5f] flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#f59e0b]" />
              {t('community_newPost', '发布新帖')}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {t('community_sectionLabel', '板块')}：<span className="text-[#1e3a5f] font-medium">{sectionName}</span>
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* 标题 */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t('community_postTitle', '帖子标题')} <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 text-gray-800 rounded-xl border border-gray-200 focus:border-[#fbbf24] outline-none"
              placeholder={t('community_titlePlaceholder', '请输入标题（5个字以上）')}
              maxLength={200}
            />
          </div>

          {/* 内容 */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t('community_postContent', '帖子内容')} <span className="text-red-600">*</span>
            </label>
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 text-gray-800 rounded-xl border border-gray-200 focus:border-[#fbbf24] outline-none resize-y"
              placeholder={t('community_contentPlaceholder', '分享您的经验、问题或观点...（10个字以上）')}
            />
            <p className="text-xs text-gray-500 mt-2 text-right">{content.length} / 5000</p>
          </div>

          {/* 标签选择 */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-500" />
              {t('community_postTags', '标签')}
              <span className="text-xs text-gray-400 font-normal">
                ({t('community_tagsHint', '最多选 3 个，方便其他用户找到您的帖子')})
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {communityTags.map((tag) => {
                const isSelected = selectedTags.includes(tag.slug);
                return (
                  <button
                    type="button"
                    key={tag.slug}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedTags(selectedTags.filter((s) => s !== tag.slug));
                      } else if (selectedTags.length < 3) {
                        setSelectedTags([...selectedTags, tag.slug]);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition border ${
                      isSelected
                        ? 'bg-amber-100 text-amber-800 border-amber-400 font-medium shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-amber-50 hover:border-amber-200'
                    }`}
                  >
                    <span>{tag.emoji}</span>
                    {tag.name}
                  </button>
                );
              })}
            </div>
            {selectedTags.length > 0 && (
              <p className="text-xs text-amber-700 mt-2">
                ✅ 已选：{selectedTags.map((s) => communityTags.find((t) => t.slug === s)?.name).join('、')}
              </p>
            )}
          </div>

          {/* 作者信息 */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
            <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />{t('community_authorInfo', '作者信息')}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-xs font-medium mb-1.5">
                  {t('community_nickname', '昵称')} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-800 rounded-lg border border-gray-200 focus:border-[#fbbf24] outline-none text-sm"
                  placeholder={t('community_authorPlaceholder', '例如：跨境老手、选品达人')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1.5">
                    {t('community_wechat', '微信')}（{t('community_optional', '可选')}）
                  </label>
                  <input
                    type="text"
                    value={contactWechat}
                    onChange={(e) => setContactWechat(e.target.value)}
                    className="w-full px-3 py-2 bg-white text-gray-800 rounded-lg border border-gray-200 focus:border-[#fbbf24] outline-none text-sm"
                    placeholder={t('community_wechatPlaceholder', '方便交流的微信号')}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1.5">
                    <Mail className="w-3 h-3 inline-block mr-1" />{t('community_email', '邮箱')}（{t('community_optional', '可选')}）
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white text-gray-800 rounded-lg border border-gray-200 focus:border-[#fbbf24] outline-none text-sm"
                    placeholder={t('community_emailPlaceholder', 'your@email.com')}
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-3 leading-relaxed">
              💡 {t('community_contactHint', '留下联系方式可以让其他用户与您进一步交流讨论，您也可以选择不填写。')}
            </p>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* 按钮 */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition text-sm"
            >
              {t('community_cancel', '取消')}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#fbbf24] text-[#1e3a5f] font-semibold rounded-xl hover:bg-[#f59e0b] transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />{submitting ? t('community_publishing', '发布中...') : t('community_publish', '发布')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}