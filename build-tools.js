const fs = require('fs');
const path = require('path');
const root = __dirname;

function writeFile(relPath, content) {
  const fullPath = path.join(root, ...relPath.split('/'));
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('✓ 创建:', relPath);
}

// ============ 文件 1: 通用 UI 组件 ============
writeFile('components/ai-workbench/ToolLayout.jsx', `"use client";

import { useState } from 'react';
import { ChevronLeft, Settings, Key, Zap, Info } from 'lucide-react';

export default function ToolLayout({ title, icon: Icon, description, children }) {
  const [showSettings, setShowSettings] = useState(false);
  const [service, setService] = useState('mock');
  const [apiKey, setApiKey] = useState('');

  return (
    <main className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <a href="/tools" className="hover:text-[#1e3a5f] flex items-center gap-1"><ChevronLeft className="w-4 h-4" />实用工具</a>
          <span>/</span>
          <a href="/tools/ai-workbench" className="hover:text-[#1e3a5f]">AI智能工作台</a>
          <span>/</span>
          <span className="text-[#1e3a5f] font-semibold">{title}</span>
        </div>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-blue-600 flex items-center justify-center text-white shadow-lg">
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1e3a5f]">{title}</h1>
                <p className="text-gray-500 mt-1">{description}</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={"px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition " + (showSettings ? "bg-amber-100 text-amber-700" : "bg-gray-50 text-gray-600 hover:bg-gray-100")}>
              <Settings className="w-4 h-4" />
              {service === 'mock' ? '本地模式' : 'AI模式'}
            </button>
          </div>

          {showSettings && (
            <div className="mt-6 p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-[#1e3a5f]"><Zap className="w-4 h-4" />AI服务配置</div>
              <p className="text-sm text-gray-600 mb-4">默认使用本地规则引擎,无需任何配置即可使用。如需更智能的AI处理,请选择下方服务并填写API Key。</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">选择AI服务</label>
                  <select value={service} onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1e3a5f]">
                    <option value="mock">🔧 本地规则引擎(免费,无需配置)</option>
                    <option value="openrouter">🌐 OpenRouter (支持免费模型)</option>
                    <option value="gemini">✨ Google Gemini (免费调用)</option>
                  </select>
                </div>
                {service !== 'mock' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <Key className="w-4 h-4" />API Key
                    </label>
                    <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)}
                      placeholder={service === 'openrouter' ? '从 openrouter.ai 获取 Key' : '从 Google AI Studio 获取 Key'}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1e3a5f]" />
                  </div>
                )}
              </div>
              {service !== 'mock' && !apiKey && (
                <p className="mt-3 text-xs text-amber-700">💡 请填写API Key以启用真实AI服务。未填写时将自动使用本地规则引擎。</p>
              )}
              <div className="mt-4 flex items-start gap-2 text-xs text-gray-500">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p><strong>OpenRouter:</strong> 访问 openrouter.ai 免费注册,支持多种开源模型</p>
                  <p className="mt-1"><strong>Google Gemini:</strong> 访问 aistudio.google.com 免费获取 Key</p>
                  <p className="mt-1">Key仅保存在浏览器本地(LocalStorage),不会上传到服务器</p>
                </div>
              </div>
            </div>
          )}
        </section>

        <div>
          {children && typeof children === 'function' ? children({ service, apiKey, isMock: service === 'mock' || !apiKey }) : children}
        </div>
      </div>
    </main>
  );
}
`);

// ============ 文件 2: 通用文本输入组件 ============
writeFile('components/ai-workbench/TextPanel.jsx', `"use client";

import { useState } from 'react';
import { FileText, Trash2, Copy, Check } from 'lucide-react';

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
`);

// ============ 文件 3: 文件上传组件 ============
writeFile('components/ai-workbench/FileUploader.jsx', `"use client";

import { useRef, useState } from 'react';
import { Upload, X, File, Image, FileText, Film, FileSpreadsheet } from 'lucide-react';

export default function FileUploader({ files, onFilesChange, accept = '*', multiple = true, maxFiles = 10, maxSize = 50 }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const fileIcon = (name) => {
    const ext = name.toLowerCase().split('.').pop();
    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'].includes(ext)) return <Image className="w-5 h-5 text-emerald-600" />;
    if (['mp4', 'mov', 'avi', 'webm', 'mkv'].includes(ext)) return <Film className="w-5 h-5 text-rose-600" />;
    if (['pdf'].includes(ext)) return <FileText className="w-5 h-5 text-red-600" />;
    if (['doc', 'docx', 'xls', 'xlsx', 'csv'].includes(ext)) return <FileSpreadsheet className="w-5 h-5 text-blue-600" />;
    return <File className="w-5 h-5 text-gray-600" />;
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(f => ({ file: f, name: f.name, size: (f.size / 1024).toFixed(1) + 'KB' }));
    const valid = newFiles.filter(f => f.file.size < maxSize * 1024 * 1024);
    const combined = [...(files || []), ...valid].slice(0, maxFiles);
    onFilesChange && onFilesChange(combined);
  };

  const removeFile = (idx) => {
    const newFiles = [...files];
    newFiles.splice(idx, 1);
    onFilesChange && onFilesChange(newFiles);
  };

  return (
    <div className="space-y-3">
      <div onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        className={"border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition " + (dragOver ? 'border-[#1e3a5f] bg-[#1e3a5f]/5' : 'border-gray-200 hover:border-[#1e3a5f]/50 hover:bg-gray-50')}>
        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 font-semibold">点击或拖拽文件到此处</p>
        <p className="text-xs text-gray-400 mt-1">最多 {maxFiles} 个文件,单个文件不超过 {maxSize}MB</p>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      </div>

      {files && files.length > 0 && (
        <div className="space-y-2">
          {files.map((f, idx) => (
            <div key={idx} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-100">
              {fileIcon(f.name)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">{f.name}</p>
                <p className="text-xs text-gray-400">{f.size}</p>
              </div>
              <button onClick={() => removeFile(idx)} className="text-gray-400 hover:text-red-500 p-1 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`);

// ============ 文件 4: 按钮/状态组件 ============
writeFile('components/ai-workbench/ActionButton.jsx', `"use client";

import { Zap, Loader2, Sparkles } from 'lucide-react';

export function ActionButton({ onClick, disabled, loading, label = '开始处理', variant = 'primary' }) {
  const styles = {
    primary: 'bg-gradient-to-r from-[#1e3a5f] to-blue-600 text-white hover:shadow-lg',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg',
    warning: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-lg',
    ghost: 'bg-white text-gray-700 border border-gray-200 hover:border-[#1e3a5f]',
  };
  return (
    <button onClick={onClick} disabled={disabled || loading}
      className={"px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed " + styles[variant]}>
      {loading ? <><Loader2 className="w-4 h-4 animate-spin" />处理中...</> : <><Sparkles className="w-4 h-4" />{label}</>}
    </button>
  );
}

export function StatusBar({ loading, error, isMock, result }) {
  if (loading) {
    return (
      <div className="flex items-center gap-3 px-5 py-4 bg-blue-50 border border-blue-200 rounded-xl text-sm">
        <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
        <span className="text-blue-700 font-medium">正在处理中,请稍候...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-start gap-3 px-5 py-4 bg-red-50 border border-red-200 rounded-xl text-sm">
        <span className="text-red-500 text-lg">⚠️</span>
        <span className="text-red-700">{error}</span>
      </div>
    );
  }
  if (result !== undefined && result !== null && result !== '') {
    return (
      <div className="flex items-center gap-3 px-5 py-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm">
        <span className="text-emerald-500 text-lg">✓</span>
        <span className="text-emerald-700 font-medium">处理完成</span>
        {isMock && <span className="text-xs text-emerald-600/80">(本地规则引擎 - 如需AI处理请配置API Key)</span>}
      </div>
    );
  }
  return null;
}

export function Tag({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-gray-100 text-gray-600',
    primary: 'bg-blue-100 text-blue-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
  };
  return <span className={"text-xs px-2.5 py-1 rounded-full font-medium " + styles[variant]}>{children}</span>;
}

export default ActionButton;
`);

console.log('\n✓✓✓ 4个通用UI组件已创建!');
console.log('下一步:创建完整功能页面...');