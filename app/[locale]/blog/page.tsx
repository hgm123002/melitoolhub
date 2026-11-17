import type { Metadata } from "next";
import BlogPage from "./BlogClient";
import { localeAlternates } from "../../i18n/alternates";

type P = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: localeAlternates(locale, "/blog") };
}

export default function Page() {
  return <BlogPage />;
}
