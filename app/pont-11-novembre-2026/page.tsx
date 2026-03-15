import type { Metadata } from "next";
import { Armistice2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pont du 11 novembre 2026 : cas et stratégies",
  description: "Pourquoi le 11 novembre 2026 est un bon pont d’automne, quels cas tester, et quand revenir au simulateur pour arbitrer.",
  path: "/pont-11-novembre-2026",
  enPath: "/en/pont-11-novembre-2026",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <Armistice2026Page language="fr" holidays={holidays} />;
}
