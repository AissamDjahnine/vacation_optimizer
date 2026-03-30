import type { Metadata } from "next";
import { WeekdayHolidays2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Jours fériés 2026 en semaine : les meilleurs ponts à repérer",
  description: "La liste des jours fériés 2026 qui tombent en semaine et créent les meilleures opportunités de pont.",
  path: "/jours-feries-2026-semaine",
  enPath: "/en/jours-feries-2026-semaine",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <WeekdayHolidays2026Page language="fr" holidays={holidays} />;
}
