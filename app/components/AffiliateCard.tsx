// 旧报错代码
// import type { AffiliateItem } from "@/types/affiliate";

// 修正后正确路径
import type { AffiliateItem } from "../types/affiliate";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../i18n";

interface AffiliateCardProps {
  item: AffiliateItem;
}

export default function AffiliateCard({ item }: AffiliateCardProps) {
  const [imageError, setImageError] = useState(false);
  const { t } = useLanguage();

  const renderImage = () => {
    if (imageError) {
      return (
        <div className="w-full h-48 bg-white rounded-lg flex items-center justify-center text-5xl">
          {item.icon}
        </div>
      );
    }

    return (
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain bg-white transition-transform hover:scale-105"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>
    );
  };

  return (
    <Link
      href={item.promoLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <div className="bg-[#f8fafc] rounded-xl px-6 py-8 flex flex-col items-center text-center hover:bg-white transition-colors">
        <div className="mb-4 w-full">{renderImage()}</div>
        <h3 className="text-[#1e3a5f] text-2xl font-bold mb-3 group-hover:text-[#f59e0b] transition-colors">
          {item.name}
        </h3>
        <p className="text-[#1a2b4e] text-base line-clamp-3">
          {item.desc}
        </p>
        <div className="mt-4 text-[#f59e0b] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          {t('affiliate_clickCard', '点击查看推广链接')} →
        </div>
      </div>
    </Link>
  );
}