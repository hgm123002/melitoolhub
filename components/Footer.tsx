"use client";

import { Mail } from 'lucide-react';
import { useLanguage } from '../app/i18n';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0f2038] text-gray-300 pt-8 pb-4 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 关于我们 */}
        <div>
          <h3 className="text-[#f59e0b] text-lg font-bold mb-3">{t('aboutUs', '关于我们')}</h3>
          <p className="leading-relaxed text-sm">
            {t('aboutDescription', 'GlobalTrade Hub 专注跨境贸易工具、政策合规资讯与中国货源采购代办服务，覆盖全球主要跨境市场，18语种合规运营。')}
          </p>
        </div>

        {/* 快速链接 */}
        <div>
          <h3 className="text-[#f59e0b] text-lg font-bold mb-3">{t('quickLinks', '快速链接')}</h3>
          <div className="flex flex-col gap-2 text-sm">
            <a href="/blog" className="hover:text-[#f59e0b] transition-colors">{t('blog', '跨境干货')}</a>
            <a href="/compliance" className="hover:text-[#f59e0b] transition-colors">{t('compliance', '政策合规')}</a>
            <a href="/tools" className="hover:text-[#f59e0b] transition-colors">{t('footer_toolsNav', '实用工具')}</a>
            <a href="/purchase" className="hover:text-[#f59e0b] transition-colors">{t('footer_purchase', '采购代发')}</a>
            <a href="/affiliate" className="hover:text-[#f59e0b] transition-colors">{t('footer_affiliate', '联盟工具')}</a>
          </div>
        </div>

        {/* 合规信息 */}
        <div>
          <h3 className="text-[#f59e0b] text-lg font-bold mb-3">{t('complianceInfo', '合规信息')}</h3>
          <div className="flex flex-col gap-2 text-sm">
            <a href="#" className="hover:text-[#f59e0b] transition-colors">{t('privacyPolicy', '隐私政策')}</a>
            <a href="#" className="hover:text-[#f59e0b] transition-colors">{t('footer_settlement', '合作与结算说明')}</a>
            <a href="#" className="hover:text-[#f59e0b] transition-colors">{t('footer_siteMap', '站点地图')}</a>
          </div>
        </div>

        {/* 联系我们 */}
        <div>
          <h3 className="text-[#f59e0b] text-lg font-bold mb-3">{t('contactUs', '联系我们')}</h3>
          <div className="flex flex-col gap-2 text-sm">
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-300 flex-shrink-0" /> hgm123002@outlook.com</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-300 flex-shrink-0" /> hgm123002@gmail.com</p>
            <p>微信：hgm123002</p>
            <p>{t('footer_facebook', 'Facebook')}：hgm123002@outlook.com</p>
          </div>
        </div>
      </div>
      {/* 分割线 + 版权底部 */}
      <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-slate-700 text-center text-xs">
        <p className="text-gray-400 leading-relaxed mb-2 px-4">
          {t('footer_trademark', 'Amazon、Shopee、Mercado Libre、Ozon、TikTok Shop、AliExpress 等均为其各自所有者的注册商标。本站为独立的卖家工具与资讯平台，与上述平台无任何隶属或合作关系；相关品牌徽章仅用于标识内容指向。')}
        </p>
        <p>© 2026 GlobalTrade Hub. {t('footer_allRightsReserved', 'All Rights Reserved')}.
          <a href="#" className="mx-3 hover:text-[#f59e0b]">{t('privacyPolicy', 'Privacy Policy')}</a>
          <a href="#" className="hover:text-[#f59e0b]">{t('footer_settlement', 'Settlement Guide')}</a>
        </p>
      </div>
    </footer>
  )
}