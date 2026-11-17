"use client";
import { useState, useMemo } from 'react';
import { useLanguage } from '../../i18n';
export default function ListingOptimizerPage() {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [keywordsRaw, setKeywordsRaw] = useState('');
  const [description, setDescription] = useState('');
  const keywordList = useMemo(() => keywordsRaw.split(/[, \n]+/).map(w => w.trim().toLowerCase()).filter(w => w.length > 0), [keywordsRaw]);
  const analysis = useMemo(() => {
    const titleLower = title.toLowerCase();
    const descLower = description.toLowerCase();
    const titleMatched = keywordList.filter(kw => titleLower.includes(kw));
    const descMatched = keywordList.filter(kw => descLower.includes(kw));
    const missingKeywords = keywordList.filter(kw => !titleLower.includes(kw) && !descLower.includes(kw));
    let score = 0;
    const totalKw = keywordList.length || 1;
    score += Math.round((titleMatched.length / totalKw) * 50);
    score += Math.round((descMatched.length / totalKw) * 50);
    const suggestions: string[] = [];
    if (title.length < 50) suggestions.push(t('lo_sug1', 'Title is too short, add attributes, materials, sizes, use cases'));
    if (title.length > 200) suggestions.push(t('lo_sug2', 'Title is too long, some platforms may truncate it'));
    if (missingKeywords.length > 0) suggestions.push(t('lo_sug3', 'Some keywords not embedded in title/description yet'));
    if (titleMatched.length === 0 && keywordList.length > 0) suggestions.push(t('lo_sug4', 'Title contains no core keywords, prioritize placing large words first'));
    return { score, titleMatched, descMatched, missingKeywords, suggestions };
  }, [title, description, keywordList, t]);
  return (
    <main className="bg-gradient-to-br from-[#0f2038] via-[#1a2b4e] to-[#2a4a7a] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <section className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('lo_title', 'Listing SEO Optimizer')}</h1>
          <p className="text-white/80 text-lg">{t('lo_subtitle', 'Analyze your product listing, identify keyword coverage, and get optimization suggestions')}</p>
        </section>
        <div className="grid lg:grid-cols-2 gap-8">
          <section className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <label className="block text-white font-semibold mb-2">{t('lo_productTitle', 'Product Title')}</label>
              <textarea value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('lo_titlePlaceholder', 'Enter your product title...')} className="w-full h-24 bg-white/90 text-[#1e3a5f] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] placeholder:text-gray-400" />
              <div className="text-white/60 text-sm mt-2">{t('lo_charCount', 'Characters')}: {title.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <label className="block text-white font-semibold mb-2">{t('lo_keywords', 'Keywords')}</label>
              <textarea value={keywordsRaw} onChange={(e) => setKeywordsRaw(e.target.value)} placeholder={t('lo_keywordPlaceholder', 'Enter keywords separated by commas or new lines...')} className="w-full h-24 bg-white/90 text-[#1e3a5f] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] placeholder:text-gray-400" />
              <div className="text-white/60 text-sm mt-2">{t('lo_keywordCount', 'Keywords')}: {analysis.titleMatched.length + analysis.descMatched.length + analysis.missingKeywords.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <label className="block text-white font-semibold mb-2">{t('lo_description', 'Product Description')}</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('lo_descPlaceholder', 'Enter your product description...')} className="w-full h-32 bg-white/90 text-[#1e3a5f] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] placeholder:text-gray-400" />
              <div className="text-white/60 text-sm mt-2">{t('lo_charCount', 'Characters')}: {description.length}</div>
            </div>
          </section>
          <section className="space-y-6">
            <div className="bg-[#fbbf24]/20 backdrop-blur-md rounded-3xl p-8 border border-[#fbbf24]/40 text-center">
              <div className="text-white/80 text-sm mb-2">{t('lo_seoScore', 'SEO Score')}</div>
              <div className="text-6xl font-bold text-[#fbbf24] mb-2">{analysis.score}</div>
              <div className="text-white/60 text-sm">/ 100</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">{t('lo_analysis', 'Keyword Analysis')}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white"><span>{t('lo_titleMatched', 'Title Matches')}</span><span className="text-green-300">{analysis.titleMatched.length}</span></div>
                <div className="flex flex-wrap gap-2">{analysis.titleMatched.map((kw, i) => (<span key={i} className="bg-green-500/20 text-green-300 px-2 py-1 rounded-lg text-xs">{kw}</span>))}{analysis.titleMatched.length === 0 && <span className="text-white/40">{t('lo_none', 'None')}</span>}</div>
                <div className="flex justify-between text-white pt-2"><span>{t('lo_descMatched', 'Description Matches')}</span><span className="text-blue-300">{analysis.descMatched.length}</span></div>
                <div className="flex flex-wrap gap-2">{analysis.descMatched.map((kw, i) => (<span key={i} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-lg text-xs">{kw}</span>))}{analysis.descMatched.length === 0 && <span className="text-white/40">{t('lo_none', 'None')}</span>}</div>
                <div className="flex justify-between text-white pt-2"><span>{t('lo_missing', 'Missing Keywords')}</span><span className="text-amber-300">{analysis.missingKeywords.length}</span></div>
                <div className="flex flex-wrap gap-2">{analysis.missingKeywords.map((kw, i) => (<span key={i} className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded-lg text-xs">{kw}</span>))}{analysis.missingKeywords.length === 0 && <span className="text-white/40">{t('lo_none', 'None')}</span>}</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">{t('lo_suggestions', 'Optimization Suggestions')}</h3>
              {analysis.suggestions.length === 0 ? (<div className="text-green-300">{t('lo_good', 'Your listing looks good')}</div>) : (<ul className="space-y-2 text-white/80 text-sm">{analysis.suggestions.map((s, i) => (<li key={i} className="flex gap-2"><span className="text-[#fbbf24]">•</span>{s}</li>))}</ul>)}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}