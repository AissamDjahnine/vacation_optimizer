import type { Metadata } from "next";
import { Armistice2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "11 November 2026 bridge",
  description: "Why 11 November 2026 is a useful autumn bridge, which setups to test, and when to switch back to the planner.",
  path: "/pont-11-novembre-2026",
  enPath: "/en/pont-11-novembre-2026",
  locale: "en",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <Armistice2026Page language="en" holidays={holidays} />;
}
