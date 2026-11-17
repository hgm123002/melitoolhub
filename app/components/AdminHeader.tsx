// src/components/AdminHeader.tsx
import { Bell, Search, User } from 'lucide-react';

export default function AdminHeader({ title }: { title: string }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        
        <div className="flex items-center gap-4">
          {/* 搜索 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="搜索..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent"
            />
          </div>

          {/* 通知 */}
          <button className="relative p-2 text-gray-600 hover:text-[#1a2b4e] hover:bg-gray-100 rounded-lg transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* 用户 */}
          <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-[#fbbf24] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-[#1e3a5f]" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-[#1a2b4e]">管理员</p>
              <p className="text-xs text-gray-600">admin@globaltradehub.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}