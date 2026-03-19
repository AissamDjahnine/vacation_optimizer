import type { Metadata } from "next";
import { YearEnd2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Christmas and late-year 2026 bridge",
  description: "What is still worth testing around Christmas and New Year 2026, and when to switch back to the planner.",
  path: "/pont-noel-fin-annee-2026",
  enPath: "/en/pont-noel-fin-annee-2026",
  locale: "en",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <YearEnd2026Page language="en" holidays={holidays} />;
}
