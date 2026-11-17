"use client";

import { useState } from 'react';
import { FileText, Trash2, Copy, Check } from 'lucide-react';

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.placeholder
 * @param {string} props.value
 * @param {Function} [props.onChange]
 * @param {number} [props.minHeight]
 * @param {number} [props.maxLength]
 * @param {React.ReactNode} [props.children]
 */
export default function TextPanel({ title, placeholder, value, onChange, minHeight = 200, maxLength, children }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-[#1e3a5f] font-semibold">
          <FileText className="w-4 h-4" />
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {value && (
            <button onClick={() => onChange && onChange('')} className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 px-2 py-1 rounded-lg">
              <Trash2 className="w-3.5 h-3.5" />清空
            </button>
          )}
          {onChange === undefined && value && (
            <button onClick={copyToClipboard} className="text-xs text-gray-400 hover:text-[#1e3a5f] flex items-center gap-1 px-2 py-1 rounded-lg">
              {copied ? <><Check className="w-3.5 h-3.5" />已复制</> : <><Copy className="w-3.5 h-3.5" />复制</>}
            </button>
          )}
          {maxLength && <span className="text-xs text-gray-400">{value?.length || 0}/{maxLength}</span>}
        </div>
      </div>
      <div className="p-4">
        {onChange ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ minHeight: minHeight + 'px' }}
            maxLength={maxLength}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10 resize-y leading-relaxed"
          />
        ) : (
          <div className="px-4 py-3 rounded-xl bg-gray-50 text-sm leading-relaxed whitespace-pre-wrap text-gray-700" style={{ minHeight: minHeight + 'px' }}>
            {value || <span className="text-gray-400 italic">{placeholder}</span>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}