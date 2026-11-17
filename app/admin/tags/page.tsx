// app/admin/tags/page.tsx
"use client";

import { Tag, Plus, Edit2, Trash2, User, Building } from "lucide-react";
import { useState } from "react";
import AdminLayoutClient from "../AdminLayoutClient";
import { useLanguage } from "@/app/i18n/LanguageContext";

// Mock 数据
function getMockTags(t: (key: string, fallback?: string) => string) {
  return [
    {
      id: 1,
      name: t("admin_tags_enterprise", "企业用户"),
      type: "organization",
      color: "blue",
      count: 1234,
    },
    {
      id: 2,
      name: t("admin_tags_individual", "个人卖家"),
      type: "individual",
      color: "green",
      count: 3456,
    },
    {
      id: 3,
      name: t("admin_tags_newbie", "新手卖家"),
      type: "individual",
      color: "yellow",
      count: 890,
    },
    {
      id: 4,
      name: t("admin_tags_topSeller", "大卖运营"),
      type: "organization",
      color: "purple",
      count: 456,
    },
    {
      id: 5,
      name: t("admin_tags_supplier", "供应商"),
      type: "organization",
      color: "red",
      count: 234,
    },
    {
      id: 6,
      name: t("admin_tags_service", "服务商"),
      type: "organization",
      color: "orange",
      count: 567,
    },
  ];
}

function getMockTaggedVisitors(t: (key: string, fallback?: string) => string) {
  return [
    {
      id: 1,
      name: t("admin_db_company_sz", "深圳市跨境电商有限公司"),
      type: "organization",
      tag: t("admin_tags_enterprise", "企业用户"),
      email: "contact@szcrossborder.com",
      time: t("admin_db_time_10min", "10分钟前"),
    },
    {
      id: 2,
      name: t("admin_db_visitor_zhangsan", "张三"),
      type: "individual",
      tag: t("admin_tags_individual", "个人卖家"),
      email: "zhangsan@email.com",
      time: t("admin_db_time_15min", "15分钟前"),
    },
    {
      id: 3,
      name: t("admin_db_company_gz2", "广州大卖科技有限公司"),
      type: "organization",
      tag: t("admin_tags_topSeller", "大卖运营"),
      email: "ops@guangzhoudm.com",
      time: t("admin_db_time_20min", "20分钟前"),
    },
    {
      id: 4,
      name: t("admin_db_visitor_liwei", "李薇"),
      type: "individual",
      tag: t("admin_tags_newbie", "新手卖家"),
      email: "liwei@email.com",
      time: t("admin_db_time_25min", "25分钟前"),
    },
    {
      id: 5,
      name: t("admin_db_company_yw", "义乌供应链公司"),
      type: "organization",
      tag: t("admin_tags_supplier", "供应商"),
      email: "supply@yiwu.com",
      time: t("admin_db_time_30min", "30分钟前"),
    },
  ];
}

const colorClasses: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  purple: "bg-purple-100 text-purple-700",
  red: "bg-red-100 text-red-700",
  orange: "bg-orange-100 text-orange-700",
};

export default function TagsPage() {
  const { t } = useLanguage();
  const mockTags = getMockTags(t);
  const mockTaggedVisitors = getMockTaggedVisitors(t);
  const [showModal, setShowModal] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagType, setNewTagType] = useState("individual");
  const [newTagColor, setNewTagColor] = useState("blue");

  const handleAddTag = () => {
    if (newTagName.trim()) {
      setShowModal(false);
      setNewTagName("");
    }
  };

  return (
    <AdminLayoutClient>
      <div className="space-y-6">
        {/* 头部操作 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {t("admin_tags", "机构/个人标签")}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {t("admin_tags_subtitle", "管理访客标签，分类识别不同类型的用户")}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e3a5f] font-medium rounded-lg transition"
          >
            <Plus className="w-5 h-5" />
            <span>{t("admin_tags_addTag", "添加标签")}</span>
          </button>
        </div>

        {/* 标签统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockTags.map((tag) => (
            <div
              key={tag.id}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[tag.color]}`}
                  >
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{tag.name}</p>
                    <p className="text-xs text-gray-600">
                      {tag.type === "organization"
                        ? t("admin_tags_org", "机构")
                        : t("admin_tags_ind", "个人")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">
                    {tag.count}
                  </p>
                  <p className="text-xs text-gray-600">
                    {t("admin_tags_visitorCount", "访客数")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition">
                  <Edit2 className="w-4 h-4" />
                  <span>{t("common_edit", "编辑")}</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                  <Trash2 className="w-4 h-4" />
                  <span>{t("common_delete", "删除")}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 已标记访客 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              {t("admin_tags_taggedVisitors", "已标记访客")}
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {mockTaggedVisitors.map((visitor) => (
              <div
                key={visitor.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${visitor.type === "organization" ? "bg-blue-100" : "bg-green-100"}`}
                  >
                    {visitor.type === "organization" ? (
                      <Building className="w-5 h-5 text-[#1e3a5f]" />
                    ) : (
                      <User className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{visitor.name}</p>
                    <p className="text-sm text-gray-600">{visitor.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    {visitor.tag}
                  </span>
                  <span className="text-sm text-gray-600">{visitor.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 添加标签弹窗 */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {t("admin_tags_addNewTag", "添加新标签")}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">
                    {t("admin_tags_tagName", "标签名称")}
                  </label>
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbbf24]"
                    placeholder={t(
                      "admin_tags_tagNamePlaceholder",
                      "输入标签名称",
                    )}
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">
                    {t("admin_tags_tagType", "标签类型")}
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tagType"
                        value="individual"
                        checked={newTagType === "individual"}
                        onChange={(e) => setNewTagType(e.target.value)}
                        className="text-[#1e3a5f]"
                      />
                      <span className="text-gray-600">
                        {t("admin_tags_ind", "个人")}
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tagType"
                        value="organization"
                        checked={newTagType === "organization"}
                        onChange={(e) => setNewTagType(e.target.value)}
                        className="text-[#1e3a5f]"
                      />
                      <span className="text-gray-600">
                        {t("admin_tags_org", "机构")}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">
                    {t("admin_tags_tagColor", "标签颜色")}
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {["blue", "green", "yellow", "purple", "red", "orange"].map(
                      (color) => (
                        <button
                          key={color}
                          onClick={() => setNewTagColor(color)}
                          className={`w-8 h-8 rounded-full transition ${colorClasses[color]} ${newTagColor === color ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  {t("common_cancel", "取消")}
                </button>
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e3a5f] rounded-lg transition"
                >
                  {t("common_add", "添加")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayoutClient>
  );
}
