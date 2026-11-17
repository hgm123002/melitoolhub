import type { Metadata } from "next";
import Home from "./HomeClient";
import { localeAlternates } from "../i18n/alternates";

type P = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: localeAlternates(locale, "/") };
}

export default function Page() {
  return <Home />;
}
