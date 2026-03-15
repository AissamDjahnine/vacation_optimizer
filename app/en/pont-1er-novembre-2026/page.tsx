import type { Metadata } from "next";
import { AllSaints2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "1 November 2026 bridge",
  description: "Is the 1 November 2026 bridge worth testing, and when 11 November is the stronger autumn option.",
  path: "/pont-1er-novembre-2026",
  enPath: "/en/pont-1er-novembre-2026",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <AllSaints2026Page language="en" holidays={holidays} />;
}
