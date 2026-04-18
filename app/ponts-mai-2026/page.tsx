import type { Metadata } from "next";
import { MayBridges2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Ponts de mai 2026 : meilleurs cas, jours fériés et week-ends prolongés",
  description: "Les ponts de mai 2026 à ouvrir en premier, du 1er mai à l’Ascension, avec les cas les plus utiles à tester selon votre budget.",
  path: "/ponts-mai-2026",
  enPath: "/en/ponts-mai-2026",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <MayBridges2026Page language="fr" holidays={holidays} />;
}
