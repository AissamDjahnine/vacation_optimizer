import type { Metadata } from "next";
import { LeaveBudgetGuide2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Comment poser 10 jours de congés en 2026",
  description: "Comment poser 10 jours de congés en 2026, répartir votre budget entre plusieurs ponts et choisir les meilleurs mois.",
  path: "/poser-10-jours-conges-2026",
  enPath: "/en/poser-10-jours-conges-2026",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <LeaveBudgetGuide2026Page language="fr" budget={10} holidays={holidays} />;
}
