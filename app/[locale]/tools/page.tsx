import type { Metadata } from "next";
import ToolsPage from "./ToolsClient";
import { localeAlternates } from "../../i18n/alternates";

type P = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: localeAlternates(locale, "/tools") };
}

export default function Page() {
  return <ToolsPage />;
}
