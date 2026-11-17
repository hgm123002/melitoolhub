"use client";

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
