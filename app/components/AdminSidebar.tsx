// src/components/AdminSidebar.tsx
"use client";

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  MapPin, 
  Tags, 
  Users, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', name: '访客总览', icon: LayoutDashboard, href: '/admin/dashboard' },
  { id: 'source', name: '来源分析', icon: BarChart3, href: '/admin/source' },
  { id: 'country', name: '国别监控', icon: Globe, href: '/admin/country' },
  { id: 'tags', name: '机构/个人标签', icon: Tags, href: '/admin/tags' },
  { id: 'leads', name: '留联台账', icon: Users, href: '/admin/leads' },
  { id: 'settings', name: '系统设置', icon: Settings, href: '/admin/settings' },
];

export default function AdminSidebar({ activeItem }: { activeItem: string }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <aside className={`bg-white text-[#1e3a5f] h-screen fixed left-0 top-0 z-50 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-gray-200 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="w-10 h-10 bg-[#fbbf24] rounded-lg flex items-center justify-center">
          <LayoutDashboard className="w-5 h-5" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="font-bold">
              <span className="text-[#f59e0b]">Global</span>
              <span className="text-[#f59e0b]">Trade</span>
              <span className="text-[#1e3a5f]">Hub</span>
            </h1>
            <p className="text-xs text-gray-600">管理后台</p>
          </div>
        )}
      </div>

      {/* 菜单 */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[#fbbf24] text-[#1e3a5f]'
                      : 'text-[#1a2b4e] hover:bg-gray-50 hover:text-[#1e3a5f]'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="font-medium">{item.name}</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 分隔线和底部 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center justify-center py-2 text-gray-600 hover:text-[#1e3a5f] hover:bg-gray-50 rounded-lg transition ${collapsed ? 'justify-center' : 'justify-between'}`}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!collapsed && <span className="text-sm">收起菜单</span>}
        </button>
        
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 mt-2 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">退出登录</span>}
        </button>
      </div>
    </aside>
  );
}