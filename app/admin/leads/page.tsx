// app/admin/leads/page.tsx
"use client";

import {
  FileText,
  Mail,
  Phone,
  Building,
  User,
  Calendar,
  MessageSquare,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useState } from "react";
import AdminLayoutClient from "../AdminLayoutClient";
import { useLanguage } from "@/app/i18n/LanguageContext";

// Mock 数据
function getMockLeads(t: (key: string, fallback?: string) => string) {
  return [
    {
      id: 1,
      name: t("admin_db_visitor_zhangsan", "张三"),
      company: t("admin_db_company_sz", "深圳跨境电商有限公司"),
      email: "zhangsan@example.com",
      phone: "138****8888",
      status: "pending",
      source: t("admin_leads_website", "网站表单"),
      createTime: "2024-01-15 10:30",
      lastContact: "2024-01-15 10:30",
    },
    {
      id: 2,
      name: t("admin_db_visitor_john", "John Smith"),
      company: "Global Trade Inc.",
      email: "john@globaltrade.com",
      phone: "+1-XXX-XXX-XXXX",
      status: "contacted",
      source: t("admin_leads_email", "邮件咨询"),
      createTime: "2024-01-14 15:20",
      lastContact: "2024-01-14 16:00",
    },
    {
      id: 3,
      name: t("admin_db_visitor_maria", "Maria Gonzalez"),
      company: "Brazil Export Ltd.",
      email: "maria@brazilexport.com",
      phone: "+55-XX-XXXX-XXXX",
      status: "converted",
      source: t("admin_leads_facebook", "Facebook广告"),
      createTime: "2024-01-13 09:15",
      lastContact: "2024-01-14 11:30",
    },
    {
      id: 4,
      name: t("admin_db_visitor_ivan", "Ivan Petrov"),
      company: "Russian Trade Group",
      email: "ivan@rustrade.ru",
      phone: "+7-XXX-XXX-XXXX",
      status: "pending",
      source: t("admin_leads_yandex", "Yandex搜索"),
      createTime: "2024-01-12 14:45",
      lastContact: "2024-01-12 14:45",
    },
    {
      id: 5,
      name: t("admin_db_visitor_liwei", "李薇"),
      company: t("admin_db_company_gz", "广州供应链公司"),
      email: "liwei@gzsupply.cn",
      phone: "139****6666",
      status: "contacted",
      source: t("admin_leads_website", "网站表单"),
      createTime: "2024-01-11 11:00",
      lastContact: "2024-01-12 09:00",
    },
  ];
}

export default function LeadsPage() {
  const { t } = useLanguage();
  const mockLeads = getMockLeads(t);
  const [selectedLead, setSelectedLead] = useState<
    (typeof mockLeads)[0] | null
  >(null);

  const statusConfig: Record<
    string,
    { label: string; className: string; icon: typeof Clock }
  > = {
    pending: {
      label: t("admin_leads_pending", "待跟进"),
      className: "bg-yellow-100 text-yellow-700",
      icon: Clock,
    },
    contacted: {
      label: t("admin_leads_contacted", "已联系"),
      className: "bg-blue-100 text-blue-700",
      icon: MessageSquare,
    },
    converted: {
      label: t("admin_leads_converted", "已转化"),
      className: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },
  };

  return (
    <AdminLayoutClient>
      <div className="space-y-6">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#1e3a5f]" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">
                  {t("admin_leads_total", "总留联数")}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {mockLeads.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">
                  {t("admin_leads_pending", "待跟进")}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {mockLeads.filter((l) => l.status === "pending").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">
                  {t("admin_leads_converted", "已转化")}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {mockLeads.filter((l) => l.status === "converted").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 留联列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 列表 */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                {t("admin_leads_list", "留联台账")}
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {mockLeads.map((lead) => {
                const StatusIcon = statusConfig[lead.status].icon;
                return (
                  <div
                    key={lead.id}
                    className={`flex items-center justify-between px-6 py-4 cursor-pointer transition ${selectedLead?.id === lead.id ? "bg-blue-50" : "hover:bg-gray-50"}`}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-[#1e3a5f]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{lead.name}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Building className="w-3 h-3" />
                          {lead.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${statusConfig[lead.status].className}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig[lead.status].label}
                      </span>
                      <span className="text-sm text-gray-600">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {lead.createTime.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 详情面板 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                {t("admin_leads_visitorDetail", "访客详情")}
              </h2>
            </div>

            {selectedLead ? (
              <div className="p-6 space-y-6">
                {/* 头像和名称 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <User className="w-8 h-8 text-[#1e3a5f]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mt-3">
                    {selectedLead.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {selectedLead.company}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm mt-2 ${statusConfig[selectedLead.status].className}`}
                  >
                    {statusConfig[selectedLead.status].label}
                  </span>
                </div>

                {/* 联系方式 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-600">{selectedLead.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-600">{selectedLead.phone}</span>
                  </div>
                </div>

                {/* 来源信息 */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    {t("admin_leads_sourceChannel", "来源渠道")}
                  </p>
                  <p className="text-gray-800 font-medium">
                    {selectedLead.source}
                  </p>
                </div>

                {/* 时间信息 */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      {t("admin_leads_createTime", "创建时间")}
                    </span>
                    <span className="text-sm text-gray-800 font-medium">
                      {selectedLead.createTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      {t("admin_leads_lastContact", "最后联系")}
                    </span>
                    <span className="text-sm text-gray-800 font-medium">
                      {selectedLead.lastContact}
                    </span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="pt-4 border-t border-gray-100 flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e3a5f] font-medium rounded-lg transition">
                    {t("admin_leads_markContacted", "标记已联系")}
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition">
                    {t("admin_leads_markConverted", "标记已转化")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">
                <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>
                  {t("admin_leads_selectHint", "请从左侧选择一条记录查看详情")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayoutClient>
  );
}
