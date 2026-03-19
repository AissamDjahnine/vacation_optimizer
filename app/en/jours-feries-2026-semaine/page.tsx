import type { Metadata } from "next";
import { WeekdayHolidays2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Public holidays 2026 on weekdays",
  description: "The 2026 public holidays that fall on weekdays and create the best bridge opportunities.",
  path: "/jours-feries-2026-semaine",
  enPath: "/en/jours-feries-2026-semaine",
  locale: "en",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <WeekdayHolidays2026Page language="en" holidays={holidays} />;
}
