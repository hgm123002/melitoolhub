import type { Metadata } from "next";
import PlatformClient from "./PlatformClient";
import { platforms } from "../../../../config/tools";
import { localeAlternates } from "../../../../app/i18n/alternates";

type P = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const platform = platforms.find((p) => p.slug === slug);
  return {
    title: platform?.name ?? slug,
    description: platform?.description,
    alternates: localeAlternates(locale, `/platform/${slug}`),
  };
}

export default function Page() {
  return <PlatformClient />;
}
