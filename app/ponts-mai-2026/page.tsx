import type { Metadata } from "next";
import { MayBridges2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Ponts de mai 2026",
  description: "Les ponts de mai 2026 à ouvrir en premier : 1er mai, 8 mai, Ascension, et les meilleurs cas à tester selon votre budget.",
  path: "/ponts-mai-2026",
  enPath: "/en/ponts-mai-2026",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <MayBridges2026Page language="fr" holidays={holidays} />;
}
