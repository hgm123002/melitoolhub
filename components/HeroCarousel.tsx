"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../app/i18n';
import PlatformBadge from './PlatformBadge';

export default function HeroCarousel() {
  const { t, language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [, setRerender] = useState(0);

  // 关键：监听 language 变化，触发重新渲染
  useEffect(() => {
    setRerender((n) => n + 1);
  }, [language]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 6);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const goPrev = () => setCurrent((prev) => (prev - 1 + 6) % 6);
  const goNext = () => setCurrent((prev) => (prev + 1) % 6);

  const slides = [
    {
      tag: t('hero_main_tag', 'GLOBAL TRADE HUB'),
      title: t('hero_main_title', '跨境电商卖家专属工具箱'),
      subtitle: t('hero_main_subtitle', 'GlobalTradeHub 提供专业的跨境电商资讯、政策解读、一站式跨境电商服务平台'),
      desc: t('hero_main_desc', '✈️ 全球航线 · ⚓ 港口物流 · 🌐 跨境互联'),
      stats: [
        { value: t('hero_main_stat1', '200+'), label: t('hero_main_stat1_label', '覆盖国家') },
        { value: t('hero_main_stat2', '50+'), label: t('hero_main_stat2_label', '港口城市') },
        { value: t('hero_main_stat3', '24/7'), label: t('hero_main_stat3_label', '物流服务') },
      ],
      cta: t('hero_main_cta', '开始使用'),
      ctaLink: '/tools',
      bg: 'from-[#0f2038] via-[#1a2b4e] to-[#2a4a7a]',
      bgImage: '/hero/hero-network.webp',
      isMain: true,
    },
    {
      tag: t('hero_latam_tag', 'LATAM MARKET'),
      title: t('hero_latam_title', '拉美电商爆发式增长'),
      subtitle: t('hero_latam_subtitle', 'Mercado Libre 美客多 · 6亿消费者的蓝海市场'),
      desc: t('hero_latam_desc', '2024年拉美电商GMV突破2200亿美元，年复合增长率23%。墨西哥、巴西、阿根廷、哥伦比亚是四大核心市场。'),
      stats: [
        { value: t('hero_latam_stat1', '$220B'), label: t('hero_latam_stat1_label', 'GMV') },
        { value: t('hero_latam_stat2', '600M+'), label: t('hero_latam_stat2_label', '消费者') },
        { value: t('hero_latam_stat3', '23%'), label: t('hero_latam_stat3_label', '年增长') },
      ],
      cta: t('hero_latam_cta', '入驻美客多'),
      ctaLink: '/platform/mercado-libre',
      platformSlug: 'mercado-libre',
      bgImage: '/hero/hero-dashboard.webp',
      emoji: '🌎',
      bg: 'from-[#0f2038] via-[#1a2b4e] to-[#2a4a7a]',
    },
    {
      tag: t('hero_russia_tag', 'RUSSIA & EEUR'),
      title: t('hero_russia_title', '俄罗斯 & 东欧电商机遇'),
      subtitle: t('hero_russia_subtitle', 'Ozon · Wildberries · 三大主流平台'),
      desc: t('hero_russia_desc', '俄罗斯电商市场规模超800亿美元，Ozon活跃卖家超50万，订单量月均增长15%。'),
      stats: [
        { value: t('hero_russia_stat1', '$80B'), label: t('hero_russia_stat1_label', '市场规模') },
        { value: t('hero_russia_stat2', '500K+'), label: t('hero_russia_stat2_label', 'Ozon卖家') },
        { value: t('hero_russia_stat3', '15%'), label: t('hero_russia_stat3_label', '月增长') },
      ],
      cta: t('hero_russia_cta', '开通Ozon'),
      ctaLink: '/platform/ozon',
      platformSlug: 'ozon',
      bgImage: '/hero/hero-network.webp',
      emoji: '❄️',
      bg: 'from-[#1a2b4e] via-[#2a4a7a] to-[#3a6a9a]',
    },
    {
      tag: t('hero_sea_tag', 'S.E.ASIA MARKET'),
      title: t('hero_sea_title', '东南亚跨境电商红利'),
      subtitle: t('hero_sea_subtitle', 'Shopee · Lazada · TikTok Shop 三大平台'),
      desc: t('hero_sea_desc', '东南亚6.7亿人口，互联网渗透率78%，电商年增速25%。Shopee社交属性强，Lazada品牌路线优。'),
      stats: [
        { value: t('hero_sea_stat1', '670M'), label: t('hero_sea_stat1_label', '人口红利') },
        { value: t('hero_sea_stat2', '25%'), label: t('hero_sea_stat2_label', '年增速') },
        { value: t('hero_sea_stat3', '78%'), label: t('hero_sea_stat3_label', '互联网率') },
      ],
      cta: t('hero_sea_cta', '开通Shopee'),
      ctaLink: '/platform/shopee',
      platformSlug: 'shopee',
      bgImage: '/hero/hero-dashboard.webp',
      emoji: '🌴',
      bg: 'from-[#0f2038] via-[#1e3a5f] to-[#2d4a7a]',
    },
    {
      tag: t('hero_eu_tag', 'EUROPE & US'),
      title: t('hero_eu_title', '欧美市场合规运营'),
      subtitle: t('hero_eu_subtitle', 'Amazon · eBay · TikTok Shop US · 品牌出海'),
      desc: t('hero_eu_desc', '欧美成熟市场客单价高，品牌溢价强。注意IOSS增值税、产品合规、WEEE回收等合规要求。'),
      stats: [
        { value: t('hero_eu_stat1', 'High AOV'), label: t('hero_eu_stat1_label', '溢价市场') },
        { value: t('hero_eu_stat2', 'Amazon'), label: t('hero_eu_stat2_label', '全球最大') },
        { value: t('hero_eu_stat3', 'Branding'), label: t('hero_eu_stat3_label', '趋势') },
      ],
      cta: t('hero_eu_cta', '亚马逊运营'),
      ctaLink: '/platform/amazon',
      platformSlug: 'amazon',
      bgImage: '/hero/hero-network.webp',
      emoji: '🌐',
      bg: 'from-[#2a4a7a] via-[#1a2b4e] to-[#0f2038]',
    },
    {
      tag: t('hero_china_tag', 'CHINA SOURCING'),
      title: t('hero_china_title', '中国采购代办服务'),
      subtitle: t('hero_china_subtitle', '义乌 · 广州 · 深圳 · 一站式全球发货'),
      desc: t('hero_china_desc', 'GlobalTradeHub自营采购团队，覆盖1688、义乌小商品、广交会货源。代采购、代验货、代仓储、代打包、代清关、代运输，一单到底。'),
      stats: [
        { value: t('hero_china_stat1', '1688'), label: t('hero_china_stat1_label', '覆盖平台') },
        { value: t('hero_china_stat2', '18'), label: t('hero_china_stat2_label', '语言支持') },
        { value: t('hero_china_stat3', '7 Days'), label: t('hero_china_stat3_label', '极速发货') },
      ],
      cta: t('hero_china_cta', '立即采购'),
      ctaLink: '/purchase',
      platformSlug: 'sourcing',
      bgImage: '/hero/hero-port.webp',
      emoji: '📦',
      bg: 'from-[#1e3a5f] via-[#2a4a7a] to-[#3a6a9a]',
    },
  ];

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[460px] md:h-[420px] bg-gradient-to-br from-[#0f2038] via-[#1a2b4e] to-[#2a4a7a]">
        {/* 科技感背景图 + 渐变叠加（左侧压暗保证文字可读） */}
        {slide.bgImage && (
          <>
            <img
              src={slide.bgImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f2038]/95 via-[#0f2038]/70 to-[#1a2b4e]/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2038]/60 via-transparent to-transparent pointer-events-none" />
          </>
        )}

        {/* 背景装饰 - 主 slide 的飞机/港口/地球图案 */}
        {slide.isMain && (
          <>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-8 left-[10%] w-1 h-1 rounded-full bg-[#fbbf24]/60" />
              <div className="absolute top-20 right-[15%] w-1.5 h-1.5 rounded-full bg-[#fbbf24]/40" />
              <div className="absolute bottom-20 left-[20%] w-2 h-2 rounded-full bg-[#fbbf24]/30" />
              <div className="absolute top-1/2 right-[8%] w-1 h-1 rounded-full bg-white/40" />
              <div className="absolute top-32 left-[35%] w-1 h-1 rounded-full bg-white/30" />
              <div className="absolute bottom-32 right-[30%] w-1.5 h-1.5 rounded-full bg-[#fbbf24]/50" />
              <div className="absolute top-[60%] left-[5%] w-1 h-1 rounded-full bg-white/20" />
              <div className="absolute bottom-10 right-[12%] w-1 h-1 rounded-full bg-[#fbbf24]/40" />
            </div>
            <div className="absolute top-14 right-[10%] md:right-[14%] text-5xl md:text-6xl opacity-90 animate-pulse pointer-events-none">✈️</div>
            <div className="absolute top-20 right-[22%] md:right-[26%] text-3xl md:text-4xl opacity-40 pointer-events-none">✈️</div>
            <svg className="absolute top-6 right-0 w-[65%] h-44 opacity-30 pointer-events-none" viewBox="0 0 600 170" preserveAspectRatio="none">
              <path d="M 580 30 Q 400 8 200 60 T 20 130" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 6" fill="none" />
            </svg>
            <div className="absolute bottom-16 left-[8%] text-4xl md:text-5xl opacity-85 pointer-events-none">⚓</div>
            <div className="absolute bottom-16 left-[18%] text-3xl md:text-4xl opacity-65 pointer-events-none">🚢</div>
            <div className="absolute bottom-10 left-[30%] text-2xl md:text-3xl opacity-55 pointer-events-none">🏗️</div>
            <div className="absolute bottom-14 right-[22%] text-4xl md:text-5xl opacity-85 pointer-events-none">🌐</div>
            <div className="absolute top-20 left-[12%] text-3xl md:text-4xl opacity-65 pointer-events-none">🌍</div>
            <div className="absolute top-1/2 left-[8%] text-2xl opacity-55 pointer-events-none">📦</div>
            <div className="absolute bottom-24 right-[36%] text-2xl opacity-55 pointer-events-none">🌏</div>
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#fbbf24]/5 border border-[#fbbf24]/10 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#fbbf24]/5 border border-[#fbbf24]/10 pointer-events-none" />
          </>
        )}

        {/* 内容 */}
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center relative z-10">
          {slide.isMain ? (
            <div className="flex-1 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-[#fbbf24] text-xs tracking-widest font-semibold">{slide.tag}</span>
                <span className="h-px w-10 bg-[#fbbf24]/40" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{slide.title}</h2>
              <p className="text-[#fbbf24] text-base md:text-lg font-medium mb-3">{slide.desc}</p>
              <p className="text-white/80 text-base md:text-lg max-w-4xl mx-auto leading-relaxed mb-6">{slide.subtitle}</p>
              <div className="flex gap-6 mb-6 justify-center">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[#fbbf24] text-xl md:text-2xl font-bold">{s.value}</div>
                    <div className="text-white/60 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <a href={slide.ctaLink} className="inline-flex items-center gap-2 px-8 py-3 bg-[#fbbf24] text-[#0f2038] font-semibold rounded-xl hover:bg-[#f59e0b] transition text-lg shadow-lg shadow-[#fbbf24]/20">
                {slide.cta}
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          ) : (
            <div className="flex-1 grid md:grid-cols-2 gap-8 items-center py-8">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#fbbf24] text-xs tracking-widest font-semibold">{slide.tag}</span>
                  <span className="h-px w-10 bg-[#fbbf24]/40" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{slide.title}</h2>
                <p className="text-[#fbbf24] text-lg mb-4 font-medium">{slide.subtitle}</p>
                <p className="text-white/80 leading-relaxed mb-6 text-sm md:text-base">{slide.desc}</p>
                <div className="flex gap-6 mb-6">
                  {slide.stats.map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="text-[#fbbf24] text-xl md:text-2xl font-bold">{s.value}</div>
                      <div className="text-white/60 text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
                <a href={slide.ctaLink} className="inline-flex items-center gap-2 px-6 py-3 bg-[#fbbf24] text-[#0f2038] font-semibold rounded-xl hover:bg-[#f59e0b] transition shadow-lg shadow-[#fbbf24]/20">
                  {slide.cta}
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="relative">
                  <div className="w-72 h-72 rounded-full bg-[#fbbf24]/5 flex items-center justify-center border border-[#fbbf24]/20">
                    <div className="w-56 h-56 rounded-full bg-[#fbbf24]/10 flex items-center justify-center border border-[#fbbf24]/30">
                      {slide.platformSlug && slide.platformSlug !== 'sourcing' ? (
                        <PlatformBadge slug={slide.platformSlug} size="lg" />
                      ) : (
                        <div className="text-7xl">{slide.emoji}</div>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#fbbf24] animate-pulse" />
                  <div className="absolute bottom-8 left-0 w-2 h-2 rounded-full bg-white/40" />
                  <div className="absolute top-12 right-8 w-2 h-2 rounded-full bg-white/60" />
                  <div className="absolute bottom-4 right-12 w-3 h-3 rounded-full bg-[#fbbf24]/60" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 左右控制按钮 */}
        <button onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition z-20">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition z-20">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 指示器 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20" style={{ marginTop: '-15px', position: 'relative', top: '-40px', justifyContent: 'center', display: 'flex' }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === current ? 'w-10 bg-[#fbbf24]' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>

      <div className="h-8 bg-gradient-to-b from-[#1a2b4e] to-white" />
    </section>
  );
}