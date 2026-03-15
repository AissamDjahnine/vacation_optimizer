import type { Metadata } from "next";
import { LeaveBudgetGuide2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How to book 10 leave days in 2026",
  description: "Concrete examples to spread 10 leave days in 2026 between one major bridge and a second useful period.",
  path: "/poser-10-jours-conges-2026",
  enPath: "/en/poser-10-jours-conges-2026",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <LeaveBudgetGuide2026Page language="en" budget={10} holidays={holidays} />;
}
