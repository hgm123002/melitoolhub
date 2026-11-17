"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Clock, Eye, Lightbulb } from "lucide-react";

export interface ComplianceItem {
  id: string;
  icon: string;
  category: string;
  title: string;
  summary: string;
  updatedAt: string;
  views: number;
  readMinutes: number;
}

export interface ComplianceCategoryView {
  id: string;
  icon: string;
  label: string;
  count: number;
}

interface Props {
  locale: string;
  items: ComplianceItem[];
  categories: ComplianceCategoryView[];
  labels: {
    all: string;
    views: string;
    minutes: string;
    readMore: string;
    tipsTitle: string;
    tips: string[];
    disclaimer: string;
    empty: string;
  };
}

export default function ComplianceBrowser({ locale, items, categories, labels }: Props) {
  const [active, setActive] = useState<string>("all");

  const visible = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.category === active)),
    [active, items]
  );

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-8">
      {/* 侧边分类 */}
      <aside className="space-y-2">
        <button
          onClick={() => setActive("all")}
          className={`w-full text-left px-4 py-3 rounded-xl transition font-medium flex items-center justify-between ${
            active === "all"
              ? "bg-[#fbbf24] text-[#1e3a5f]"
              : "bg-white text-[#1a2b4e] hover:bg-[#fbbf24]/25 hover:text-[#1e3a5f]"
          }`}
        >
          <span>🗂️ {labels.all}</span>
          <span
            className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
              active === "all" ? "bg-white/30" : "bg-[#fbbf24]/20 text-[#f59e0b]"
            }`}
          >
            {items.length}
          </span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`w-full text-left px-4 py-3 rounded-xl transition font-medium flex items-center justify-between ${
              active === cat.id
                ? "bg-[#fbbf24] text-[#1e3a5f]"
                : "bg-white text-[#1a2b4e] hover:bg-[#fbbf24]/25 hover:text-[#1e3a5f]"
            }`}
          >
            <span className="truncate">
              {cat.icon} {cat.label}
            </span>
            <span
              className={`ml-2 shrink-0 text-xs px-2 py-0.5 rounded-full ${
                active === cat.id ? "bg-white/30" : "bg-[#fbbf24]/20 text-[#f59e0b]"
              }`}
            >
              {cat.count}
            </span>
          </button>
        ))}

        {/* 合规小贴士 */}
        <div className="mt-6 bg-sky-50 border border-sky-100 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-sky-500" />
            {labels.tipsTitle}
          </h3>
          <ul className="space-y-2 text-xs text-gray-600 leading-relaxed">
            {labels.tips.map((tip) => (
              <li key={tip} className="flex gap-2">
                <span className="text-sky-400">·</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* 列表 */}
      <div>
        {visible.length === 0 ? (
          <p className="text-gray-500 py-16 text-center">{labels.empty}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {visible.map((item) => (
              <a
                key={item.id}
                href={`/${locale}/compliance/${item.id}`}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#fbbf24] hover:shadow-lg transition flex flex-col"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <h2 className="text-lg font-semibold text-[#1e3a5f] leading-snug group-hover:text-[#0f7491] transition-colors">
                    {item.title}
                  </h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
                  {item.summary}
                </p>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 text-xs text-gray-500">
                  <span className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {item.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.readMinutes}
                      {labels.minutes}
                    </span>
                  </span>
                  <span className="text-[#f59e0b] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    {labels.readMore}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        <p className="mt-8 text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-4">
          {labels.disclaimer}
        </p>
      </div>
    </div>
  );
}
