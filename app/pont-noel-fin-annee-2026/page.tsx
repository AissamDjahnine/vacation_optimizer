import type { Metadata } from "next";
import { YearEnd2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pont de Noël et fin d’année 2026 : ce qui vaut encore le coup",
  description: "Ce qu’il reste à jouer autour de Noël et du Nouvel An 2026, et quand un test dans le simulateur vaut encore le détour.",
  path: "/pont-noel-fin-annee-2026",
  enPath: "/en/pont-noel-fin-annee-2026",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <YearEnd2026Page language="fr" holidays={holidays} />;
}
