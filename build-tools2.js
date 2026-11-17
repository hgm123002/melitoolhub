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

// ============ 工具 1: AI 文档处理 ============
writeFile('app/tools/ai-workbench/document/page.tsx', `"use client";

import { useState } from 'react';
import ToolLayout from '../../../../../components/ai-workbench/ToolLayout';
import TextPanel from '../../../../../components/ai-workbench/TextPanel';
import { ActionButton, StatusBar, Tag } from '../../../../../components/ai-workbench/ActionButton';
import { useAI } from '../../../../../components/ai-workbench/useAI';
import { FileText, Sparkles, ArrowRight, Languages } from 'lucide-react';

export default function DocumentPage() {
  const { service, setService, apiKey, setApiKey, loading, error, result, process, reset } = useAI();
  const [text, setText] = useState('');
  const [mode, setMode] = useState('polish');
  const [targetLang, setTargetLang] = useState('en');

  const modes = [
    { id: 'polish', name: '内容润色', desc: '优化文字表达,提升专业度', icon: '✨' },
    { id: 'summarize', name: '内容精简', desc: '提炼核心要点,保留关键信息', icon: '📋' },
    { id: 'expand', name: '逻辑重构', desc: '扩展内容,补充论证', icon: '🔍' },
    { id: 'translate', name: '多语言翻译', desc: '英语/西语/葡语/俄语互译', icon: '🌐' },
  ];

  const handleProcess = async () => {
    if (!text.trim()) return;
    let task = mode;
    let prompt = text;
    if (mode === 'translate') {
      prompt = text;
      await process(prompt, { task: 'translate', service, apiKey, fromLang: 'auto', toLang: targetLang });
    } else if (mode === 'polish') {
      await process(text, { task: 'polish', service, apiKey });
    } else if (mode === 'summarize') {
      await process(text, { task: 'summarize', service, apiKey, ratio: 0.3 });
    } else {
      await process(text, { task: 'polish', service, apiKey });
    }
  };

  const isMock = service === 'mock' || !apiKey;

  return (
    <ToolLayout title="AI文档处理" icon={FileText} description="智能文章撰写、润色、内容精简、逻辑重构,支持多语言内容翻译与优化">
      <div className="space-y-5">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4" />选择处理模式</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {modes.map(m => (
              <button key={m.id} onClick={() => { setMode(m.id); reset(); }}
                className={"p-4 rounded-xl border text-left transition " + (mode === m.id ? 'border-[#1e3a5f] bg-blue-50 text-[#1e3a5f]' : 'border-gray-200 hover:border-gray-300 bg-white')}>
                <div className="text-2xl mb-2">{m.icon}</div>
                <div className="text-sm font-bold">{m.name}</div>
                <div className="text-xs text-gray-500 mt-1">{m.desc}</div>
              </button>
            ))}
          </div>
          {mode === 'translate' && (
            <div className="mt-4 flex items-center gap-3">
              <Languages className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">目标语言:</span>
              <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm">
                <option value="en">英语 English</option>
                <option value="es">西班牙语 Español</option>
                <option value="pt">葡萄牙语 Português</option>
                <option value="ru">俄语 Русский</option>
                <option value="zh-cn">中文</option>
              </select>
            </div>
          )}
        </section>

        <TextPanel title="📝 输入内容" placeholder="粘贴或输入您要处理的文字内容..." value={text} onChange={setText} minHeight={180} maxLength={10000} />

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {isMock && <Tag variant="warning">本地规则引擎</Tag>}
            {!isMock && <Tag variant="success">AI智能模式</Tag>}
          </div>
          <div className="flex gap-3">
            <ActionButton onClick={handleProcess} disabled={!text.trim()} loading={loading} label="开始处理" />
          </div>
        </div>

        <StatusBar loading={loading} error={error} isMock={isMock} result={result} />

        {result && <TextPanel title="✅ 处理结果" placeholder="处理结果将在此显示..." value={typeof result === 'string' ? result : JSON.stringify(result, null, 2)} minHeight={250} />}
      </div>
    </ToolLayout>
  );
}
`);

// ============ 工具 2: 图片 OCR 识别 ============
writeFile('app/tools/ai-workbench/image/page.tsx', `"use client";

import { useState } from 'react';
import ToolLayout from '../../../../../components/ai-workbench/ToolLayout';
import TextPanel from '../../../../../components/ai-workbench/TextPanel';
import FileUploader from '../../../../../components/ai-workbench/FileUploader';
import { ActionButton, StatusBar, Tag } from '../../../../../components/ai-workbench/ActionButton';
import { useAI } from '../../../../../components/ai-workbench/useAI';
import { Image, Download, Copy, Check } from 'lucide-react';

export default function ImagePage() {
  const { service, apiKey, loading, error, result, process, reset } = useAI();
  const [files, setFiles] = useState([]);
  const [mode, setMode] = useState('ocr');
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    if (!files || files.length === 0) return;
    const fileName = files.map(f => f.name).join(', ');
    await process(fileName, { task: 'ocr', service, apiKey, files: files });
  };

  const textResult = typeof result === 'string' ? result : (result?.text || '');
  const isMock = service === 'mock' || !apiKey;

  const copyToClipboard = () => {
    if (!textResult) return;
    navigator.clipboard.writeText(textResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadResult = () => {
    if (!textResult) return;
    const blob = new Blob([textResult], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'OCR识别结果.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout title="图片OCR识别" icon={Image} description="智能图片识别、文字OCR提取、图片压缩与格式转换、支持多语言图文解析">
      <div className="space-y-5">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">选择处理模式</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: 'ocr', name: 'OCR文字识别', desc: '提取图片中的文字内容', icon: '🔤' },
              { id: 'describe', name: '图片描述生成', desc: 'AI描述图片内容和场景', icon: '📝' },
              { id: 'compress', name: '图片压缩', desc: '减小图片体积保持画质', icon: '🗜️' },
            ].map(m => (
              <button key={m.id} onClick={() => { setMode(m.id); reset(); }}
                className={"p-4 rounded-xl border text-left transition " + (mode === m.id ? 'border-[#1e3a5f] bg-blue-50 text-[#1e3a5f]' : 'border-gray-200 hover:border-gray-300 bg-white')}>
                <div className="text-2xl mb-2">{m.icon}</div>
                <div className="text-sm font-bold">{m.name}</div>
                <div className="text-xs text-gray-500 mt-1">{m.desc}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">上传图片</h3>
          <FileUploader files={files} onFilesChange={setFiles} accept="image/*" multiple={true} maxFiles={10} maxSize={50} />
        </section>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span className="text-gray-500 mr-2">已选择 {files.length} 个图片</span>
            {isMock && <Tag variant="warning">本地规则引擎</Tag>}
            {!isMock && <Tag variant="success">AI智能模式</Tag>}
          </div>
          <ActionButton onClick={handleProcess} disabled={files.length === 0} loading={loading} label="开始识别" />
        </div>

        <StatusBar loading={loading} error={error} isMock={isMock} result={result} />

        {textResult && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 justify-end">
              <button onClick={copyToClipboard} className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 flex items-center gap-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? '已复制' : '复制文字'}
              </button>
              <button onClick={downloadResult} className="px-4 py-2 text-sm bg-[#1e3a5f] text-white rounded-xl flex items-center gap-2 hover:shadow-lg">
                <Download className="w-4 h-4" />下载TXT
              </button>
            </div>
            <TextPanel title="✅ 识别结果" placeholder="识别的文字内容将在此显示..." value={textResult} minHeight={250} />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
`);

// ============ 工具 3: PDF 批量归纳 ============
writeFile('app/tools/ai-workbench/pdf-summary/page.tsx', `"use client";

import { useState } from 'react';
import ToolLayout from '../../../../../components/ai-workbench/ToolLayout';
import TextPanel from '../../../../../components/ai-workbench/TextPanel';
import FileUploader from '../../../../../components/ai-workbench/FileUploader';
import { ActionButton, StatusBar, Tag } from '../../../../../components/ai-workbench/ActionButton';
import { useAI } from '../../../../../components/ai-workbench/useAI';
import { BookOpen, Download, FileText, Sparkles } from 'lucide-react';

export default function PdfSummaryPage() {
  const { service, apiKey, loading, error, result, process, reset } = useAI();
  const [files, setFiles] = useState([]);
  const [summaryRatio, setSummaryRatio] = useState('detailed');
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    if (!files || files.length === 0) return;
    const fileNames = files.map(f => f.name);
    await process('PDF解析', { task: 'pdf-parse', service, apiKey, files: fileNames, ratio: summaryRatio });
  };

  const textResult = typeof result === 'string' ? result : (result?.summary || result?.text || '');
  const isMock = service === 'mock' || !apiKey;

  const downloadMarkdown = () => {
    if (!textResult) return;
    const content = '# 文档批量AI归纳报告\\n\\n' + textResult + '\\n\\n---\\n*Generated by GlobalTradeHub AI Workbench*';
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AI归纳报告.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout title="PDF批量AI归纳" icon={BookOpen} description="批量上传PDF文档,AI自动解析内容、生成摘要、合并汇总、产出结构化报告">
      <div className="space-y-5">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4" />摘要详细程度</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'brief', name: '精简版', desc: '核心要点和结论', icon: '📋' },
              { id: 'detailed', name: '详细版', desc: '完整内容提取', icon: '📚' },
              { id: 'report', name: '结构化报告', desc: '章节、关键词、图表', icon: '📊' },
            ].map(m => (
              <button key={m.id} onClick={() => { setSummaryRatio(m.id); reset(); }}
                className={"p-4 rounded-xl border text-left transition " + (summaryRatio === m.id ? 'border-[#1e3a5f] bg-blue-50 text-[#1e3a5f]' : 'border-gray-200 hover:border-gray-300 bg-white')}>
                <div className="text-xl mb-2">{m.icon}</div>
                <div className="text-sm font-bold">{m.name}</div>
                <div className="text-xs text-gray-500 mt-1">{m.desc}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">上传文档 (PDF / Word / 图片)</h3>
          <FileUploader files={files} onFilesChange={setFiles} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple={true} maxFiles={20} maxSize={100} />
        </section>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span className="text-gray-500 mr-2">已选择 {files.length} 个文档</span>
            {isMock && <Tag variant="warning">本地规则引擎</Tag>}
            {!isMock && <Tag variant="success">AI智能模式</Tag>}
          </div>
          <ActionButton onClick={handleProcess} disabled={files.length === 0} loading={loading} label="开始归纳" />
        </div>

        <StatusBar loading={loading} error={error} isMock={isMock} result={result} />

        {textResult && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 justify-end">
              <button onClick={downloadMarkdown} className="px-4 py-2 text-sm bg-[#1e3a5f] text-white rounded-xl flex items-center gap-2 hover:shadow-lg">
                <Download className="w-4 h-4" />下载 Markdown
              </button>
            </div>
            <TextPanel title="✅ 归纳报告" placeholder="AI生成的归纳报告将在此显示..." value={textResult} minHeight={400} />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
`);

// ============ 工具 4: 编程开发助手 ============
writeFile('app/tools/ai-workbench/code-dev/page.tsx', `"use client";

import { useState } from 'react';
import ToolLayout from '../../../../../components/ai-workbench/ToolLayout';
import TextPanel from '../../../../../components/ai-workbench/TextPanel';
import { ActionButton, StatusBar, Tag } from '../../../../../components/ai-workbench/ActionButton';
import { useAI } from '../../../../../components/ai-workbench/useAI';
import { Code2, FileCode, Bug, Sparkles, Download } from 'lucide-react';

export default function CodeDevPage() {
  const { service, apiKey, loading, error, result, process, reset } = useAI();
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('generate');
  const [language, setLanguage] = useState('javascript');

  const modes = [
    { id: 'generate', name: '代码生成', desc: '根据需求描述生成代码', icon: '✨' },
    { id: 'debug', name: 'Bug排查', desc: '分析代码,找出并修复问题', icon: '🐛' },
    { id: 'api', name: 'API接口设计', desc: '接口方案、请求响应示例', icon: '🔌' },
    { id: 'review', name: '代码审查', desc: '检查代码质量,提出优化建议', icon: '🔍' },
  ];

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'php', name: 'PHP' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'go', name: 'Go' },
  ];

  const handleProcess = async () => {
    if (!prompt.trim()) return;
    await process(prompt, { task: mode === 'generate' || mode === 'api' || mode === 'review' ? 'code-gen' : 'code-debug', service, apiKey, language, mode });
  };

  const textResult = typeof result === 'string' ? result : (result?.code || result?.text || JSON.stringify(result));
  const isMock = service === 'mock' || !apiKey;

  const downloadCode = () => {
    if (!textResult) return;
    const ext = { javascript: 'js', python: 'py', typescript: 'ts', java: 'java', php: 'php', go: 'go' }[language] || 'txt';
    const blob = new Blob([textResult], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-code.' + ext;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout title="AI编程开发助手" icon={Code2} description="代码生成、错误排查、API接口方案设计、前后端开发辅助、支持多语言编程">
      <div className="space-y-5">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4" />选择功能</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {modes.map(m => (
              <button key={m.id} onClick={() => { setMode(m.id); reset(); }}
                className={"p-4 rounded-xl border text-left transition " + (mode === m.id ? 'border-[#1e3a5f] bg-blue-50 text-[#1e3a5f]' : 'border-gray-200 hover:border-gray-300 bg-white')}>
                <div className="text-2xl mb-2">{m.icon}</div>
                <div className="text-sm font-bold">{m.name}</div>
                <div className="text-xs text-gray-500 mt-1">{m.desc}</div>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-sm text-gray-600">编程语言:</span>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm">
              {languages.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
        </section>

        <TextPanel
          title={mode === 'debug' || mode === 'review' ? '💻 输入代码' : '📝 描述需求'}
          placeholder={mode === 'debug' ? '粘贴需要检查的代码...' : mode === 'review' ? '粘贴需要审查的代码...' : mode === 'api' ? '描述你需要设计的API接口: 用途、请求参数、响应格式...' : '描述你需要实现的功能,例如: 创建一个用户登录页面,包含表单验证...'}
          value={prompt} onChange={setPrompt} minHeight={mode === 'debug' || mode === 'review' ? 300 : 200} maxLength={15000} />

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {isMock && <Tag variant="warning">本地规则引擎</Tag>}
            {!isMock && <Tag variant="success">AI智能模式</Tag>}
          </div>
          <ActionButton onClick={handleProcess} disabled={!prompt.trim()} loading={loading} label={mode === 'debug' ? '开始调试' : '开始生成'} />
        </div>

        <StatusBar loading={loading} error={error} isMock={isMock} result={result} />

        {textResult && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 justify-end">
              <button onClick={downloadCode} className="px-4 py-2 text-sm bg-[#1e3a5f] text-white rounded-xl flex items-center gap-2 hover:shadow-lg">
                <Download className="w-4 h-4" />下载代码
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#1e3a5f] font-semibold"><FileCode className="w-4 h-4" /><span>✅ 生成结果</span></div>
                <span className="text-xs text-gray-400">{language.toUpperCase()}</span>
              </div>
              <div className="p-4">
                <pre className="bg-gray-50 rounded-xl p-4 text-xs leading-relaxed overflow-auto" style={{ maxHeight: '500px' }}>
                  <code className="text-gray-700 whitespace-pre">{textResult}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
`);

// ============ 工具 5: 视频字幕翻译 ============
writeFile('app/tools/ai-workbench/video-translate/page.tsx', `"use client";

import { useState } from 'react';
import ToolLayout from '../../../../../components/ai-workbench/ToolLayout';
import TextPanel from '../../../../../components/ai-workbench/TextPanel';
import FileUploader from '../../../../../components/ai-workbench/FileUploader';
import { ActionButton, StatusBar, Tag } from '../../../../../components/ai-workbench/ActionButton';
import { useAI } from '../../../../../components/ai-workbench/useAI';
import { Film, Download, Languages } from 'lucide-react';

export default function VideoTranslatePage() {
  const { service, apiKey, loading, error, result, process, reset } = useAI();
  const [files, setFiles] = useState([]);
  const [targetLang, setTargetLang] = useState('en');
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);

  const languages = [
    { id: 'en', name: '英语', native: 'English' },
    { id: 'es', name: '西班牙语', native: 'Español' },
    { id: 'pt', name: '葡萄牙语', native: 'Português' },
    { id: 'ru', name: '俄语', native: 'Русский' },
    { id: 'zh-cn', name: '中文', native: '中文' },
  ];

  const handleProcess = async () => {
    const hasFiles = files && files.length > 0;
    const hasText = inputText && inputText.trim().length > 0;
    if (!hasFiles && !hasText) return;
    const content = hasFiles ? files.map(f => f.name).join(', ') : inputText;
    await process(content, { task: 'subtitle', service, apiKey, toLang: targetLang });
  };

  const textResult = typeof result === 'string' ? result : (result?.text || result?.srt || '');
  const isMock = service === 'mock' || !apiKey;

  const downloadSRT = () => {
    if (!textResult) return;
    const blob = new Blob([textResult], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'translated-subtitle-' + targetLang + '.srt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout title="视频字幕翻译" icon={Film} description="视频语音转文字、自动生成字幕、英/西/葡/俄多语言翻译、SRT字幕文件导出">
      <div className="space-y-5">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2"><Languages className="w-4 h-4" />选择目标语言</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {languages.map(l => (
              <button key={l.id} onClick={() => { setTargetLang(l.id); reset(); }}
                className={"p-4 rounded-xl border text-center transition " + (targetLang === l.id ? 'border-[#1e3a5f] bg-blue-50 text-[#1e3a5f]' : 'border-gray-200 hover:border-gray-300 bg-white')}>
                <div className="text-sm font-bold">{l.name}</div>
                <div className="text-xs text-gray-500 mt-1">{l.native}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">上传视频 (或直接粘贴字幕文本)</h3>
          <FileUploader files={files} onFilesChange={setFiles} accept="video/*" multiple={true} maxFiles={5} maxSize={200} />
        </section>

        <TextPanel title="💬 或直接粘贴字幕文本" placeholder="粘贴字幕内容(SRT/VTT格式或纯文本),直接进行翻译处理..." value={inputText} onChange={setInputText} minHeight={150} maxLength={20000} />

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {files.length > 0 && <span className="text-gray-500 mr-2">{files.length} 个视频文件</span>}
            {isMock && <Tag variant="warning">本地规则引擎</Tag>}
            {!isMock && <Tag variant="success">AI智能模式</Tag>}
          </div>
          <ActionButton onClick={handleProcess} disabled={files.length === 0 && !inputText.trim()} loading={loading} label="开始翻译" />
        </div>

        <StatusBar loading={loading} error={error} isMock={isMock} result={result} />

        {textResult && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 justify-end">
              <button onClick={downloadSRT} className="px-4 py-2 text-sm bg-[#1e3a5f] text-white rounded-xl flex items-center gap-2 hover:shadow-lg">
                <Download className="w-4 h-4" />下载 SRT 字幕
              </button>
            </div>
            <TextPanel title="✅ 翻译结果" placeholder="翻译后的字幕内容将在此显示..." value={textResult} minHeight={350} />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
`);

console.log('\n✓✓✓ 5个工具功能页面全部创建完成!');
console.log('下一步:刷新浏览器验证功能...');