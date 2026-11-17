"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Clock, Bookmark, Download, Trash2, LogOut, User, ArrowRight,
  BarChart3, ShieldCheck, Info, AlertTriangle, ChevronDown,
} from "lucide-react";
import { useLanguage } from "../../i18n";
import {
  getSession, logout, listHistory, listSaved, removeSaved, clearMyData,
  exportMyData, myStats, HistoryEntry, SavedResult,
} from "../../../lib/user-store";
import { downloadText } from "../../../lib/keyword-engine";

const fmt = (ts: number) => {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function AccountClient() {
  const { language } = useLanguage();
  const zh = language === "zh-CN";

  const [session, setSession] = useState(getSession());
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [saved, setSaved] = useState<SavedResult[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const refresh = () => {
    setSession(getSession());
    setHistory(listHistory());
    setSaved(listSaved());
  };

  useEffect(() => { refresh(); }, []);

  const stats = useMemo(() => myStats(), [history, saved]);

  const doLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0f2038] via-[#1a2b4e] to-[#2a4a7a] text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center">
                <User className="w-6 h-6 text-sky-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{zh ? "我的中心" : "My Account"}</h1>
                <p className="text-white/60 text-sm mt-0.5">
                  {session ? session.email : zh ? "未登录（当前为访客记录）" : "Not signed in (guest records)"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {session ? (
                <button onClick={doLogout} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm hover:bg-white/20 transition flex items-center gap-1.5">
                  <LogOut className="w-4 h-4" /> {zh ? "退出登录" : "Sign out"}
                </button>
              ) : (
                <>
                  <a href="/register" className="px-4 py-2 rounded-xl bg-sky-500 text-white text-sm font-medium hover:bg-sky-400 transition">
                    {zh ? "注册账号" : "Sign up"}
                  </a>
                  <a href="/login" className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm hover:bg-white/20 transition">
                    {zh ? "登录" : "Sign in"}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-6 pb-16">
        {/* 数据说明 */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-2.5 mb-6">
          <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-800 leading-relaxed">
            {zh
              ? "当前账号与数据保存在本机浏览器（加密存储），不会上传到服务器，因此换设备或清除浏览器数据后不保留。建议定期用右下角「导出数据」备份；开启云端账号后可直接迁移。"
              : "Your account and data live in this browser only (encrypted). Nothing is uploaded, so clearing browser data removes it. Use “Export data” regularly to back up."}
          </p>
        </div>

        {/* 概览 */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { icon: <Clock className="w-4 h-4" />, label: zh ? "工具使用次数" : "Tool runs", value: stats.historyCount },
            { icon: <Bookmark className="w-4 h-4" />, label: zh ? "已保存结果" : "Saved results", value: stats.savedCount },
            { icon: <BarChart3 className="w-4 h-4" />, label: zh ? "使用过的工具" : "Tools used", value: stats.toolsUsed },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                {s.icon}{s.label}
              </div>
              <p className="text-3xl font-bold text-[#1a3a5c] mt-2">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 使用历史 */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-[#1a3a5c] text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-500" /> {zh ? "使用历史" : "Usage history"}
              </h2>
              <span className="text-xs text-slate-400">{history.length}/200</span>
            </div>
            {history.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm text-slate-400 mb-3">{zh ? "还没有记录，去用个工具试试" : "No records yet"}</p>
                <a href="/tools" className="inline-flex items-center gap-1 text-sm text-sky-600 hover:underline">
                  {zh ? "浏览工具" : "Browse tools"} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100 max-h-[520px] overflow-y-auto">
                {history.map((h) => (
                  <li key={h.id} className="px-5 py-3 hover:bg-slate-50/70">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-slate-800 font-medium truncate">{h.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{h.summary}</p>
                      </div>
                      <span className="text-xs text-slate-400 whitespace-nowrap">{fmt(h.at)}</span>
                    </div>
                    <a href={h.toolPath} className="text-xs text-sky-600 hover:underline mt-1 inline-block">
                      {zh ? "回到该工具" : "Open tool"} →
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 已保存结果 */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-[#1a3a5c] text-sm flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-sky-500" /> {zh ? "已保存结果" : "Saved results"}
              </h2>
              <span className="text-xs text-slate-400">{saved.length}/300</span>
            </div>
            {saved.length === 0 ? (
              <div className="p-10 text-center text-sm text-slate-400">
                {zh ? "在工具里点「保存到我的中心」即可出现在这里" : "Save a result from any tool to see it here"}
              </div>
            ) : (
              <ul className="divide-y divide-gray-100 max-h-[520px] overflow-y-auto">
                {saved.map((s) => (
                  <li key={s.id} className="px-5 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <button onClick={() => setOpenId(openId === s.id ? null : s.id)} className="text-left min-w-0 flex-1">
                        <p className="text-sm text-slate-800 font-medium truncate flex items-center gap-1.5">
                          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition ${openId === s.id ? "rotate-180" : ""}`} />
                          {s.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">{fmt(s.at)} · {(s.payload.length / 1024).toFixed(1)} KB</p>
                      </button>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => downloadText(`${s.tool}-${s.id}.json`, s.payload, "application/json")}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100" title="下载 JSON"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { removeSaved(s.id); refresh(); }}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500" title="删除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {openId === s.id && (
                      <pre className="mt-2 max-h-52 overflow-auto bg-slate-900 text-slate-100 text-[11px] leading-relaxed rounded-xl p-3">
                        {s.payload.length > 4000 ? s.payload.slice(0, 4000) + "\n… (完整内容请下载)" : s.payload}
                      </pre>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 常用工具 */}
        {stats.topTools.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 mt-6">
            <h2 className="font-semibold text-[#1a3a5c] text-sm mb-3">{zh ? "你最常用的工具" : "Your most used tools"}</h2>
            <div className="flex flex-wrap gap-2">
              {stats.topTools.map(([tool, count]) => (
                <span key={tool} className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 text-xs border border-sky-200">
                  {tool} <b>×{count}</b>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 数据管理 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mt-6">
          <h2 className="font-semibold text-[#1a3a5c] text-sm mb-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-500" /> {zh ? "数据管理" : "Data management"}
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            {zh ? "导出为 JSON 备份，或清空本机的历史与保存记录（账号本身保留）。" : "Export a JSON backup, or clear local history and saved results (account stays)."}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => downloadText(`gth-backup-${Date.now()}.json`, exportMyData(), "application/json")}
              className="px-4 py-2 rounded-xl border border-gray-300 text-sm text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> {zh ? "导出全部数据" : "Export all data"}
            </button>
            {!confirmClear ? (
              <button
                onClick={() => setConfirmClear(true)}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm text-slate-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> {zh ? "清空记录" : "Clear records"}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-600 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {zh ? "不可恢复，确认？" : "Irreversible, confirm?"}
                </span>
                <button
                  onClick={() => { clearMyData(); setConfirmClear(false); refresh(); }}
                  className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600"
                >
                  {zh ? "确认清空" : "Yes, clear"}
                </button>
                <button onClick={() => setConfirmClear(false)} className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs">
                  {zh ? "取消" : "Cancel"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
