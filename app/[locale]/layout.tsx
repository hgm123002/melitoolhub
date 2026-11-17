import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageTransition from "../../components/PageTransition";
import { LanguageProvider } from "../i18n";
import { SUPPORTED_LANGUAGES } from "../i18n/config";
import { SITE_URL } from "../i18n/alternates";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 只预渲染支持的 18 种语言，其他 locale 直接 404
export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((l) => ({ locale: l.code }));
}

const SITE_DESC =
  "One-stop cross-border e-commerce platform: 14+ free seller tools (currency converter, profit calculator, shipping estimator, Listing SEO optimizer, AI workbench), platform policies for Amazon/Shopee/Mercado Libre/Ozon, and China sourcing agency services. 一站式跨境电商工具、政策合规与中国采购代办平台。";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default:
        "GlobalTradeHub - Cross-Border E-Commerce Tools, Compliance & Sourcing | 跨境电商工具箱",
      template: "%s | GlobalTradeHub",
    },
    description: SITE_DESC,
    keywords: [
      "cross-border e-commerce tools",
      "跨境电商工具",
      "profit calculator",
      "shipping cost calculator",
      "listing SEO optimizer",
      "Mercado Libre seller tools",
      "Shopee seller tools",
      "Amazon seller tools",
      "cross-border compliance",
      "China sourcing agent",
      "dropshipping",
    ],
    authors: [{ name: "GlobalTradeHub" }],
    openGraph: {
      type: "website",
      siteName: "GlobalTradeHub",
      url: `${SITE_URL}/${locale}`,
      title: "GlobalTradeHub - Cross-Border E-Commerce Seller Toolbox",
      description: SITE_DESC,
      locale: locale.replace("-", "_"),
    },
    twitter: {
      card: "summary_large_image",
      title: "GlobalTradeHub - Cross-Border E-Commerce Seller Toolbox",
      description: SITE_DESC,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    category: "business",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e3a5f",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const entry = SUPPORTED_LANGUAGES.find((l) => l.code === locale);
  if (!entry) notFound();

  return (
    // 服务端按 URL locale 渲染 html lang/dir —— SEO 与无障碍的权威来源
    <html lang={locale} dir={entry.dir === "rtl" ? "rtl" : "ltr"}>
      <body className={`${inter.className} min-h-screen bg-white`}>
        <LanguageProvider initialLocale={locale as any}>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
