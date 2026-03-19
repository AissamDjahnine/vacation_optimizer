import type { Metadata } from "next";
import { LeaveBudgetGuide2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How to book 5 leave days in 2026",
  description: "How to book 5 leave days in 2026, which bridge ideas to test first, and which months give the best time off.",
  path: "/poser-5-jours-conges-2026",
  enPath: "/en/poser-5-jours-conges-2026",
  locale: "en",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <LeaveBudgetGuide2026Page language="en" budget={5} holidays={holidays} />;
}
