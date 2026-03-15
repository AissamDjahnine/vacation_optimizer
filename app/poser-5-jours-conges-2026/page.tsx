import type { Metadata } from "next";
import { LeaveBudgetGuide2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Comment poser 5 jours de congés en 2026",
  description: "Des exemples concrets pour transformer 5 jours de congés en 2026 en vrais blocs de repos, puis les tester dans le simulateur.",
  path: "/poser-5-jours-conges-2026",
  enPath: "/en/poser-5-jours-conges-2026",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <LeaveBudgetGuide2026Page language="fr" budget={5} holidays={holidays} />;
}
