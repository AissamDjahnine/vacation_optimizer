import type { Metadata } from "next";
import { Assumption2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "15 August 2026 bridge",
  description: "Is the 15 August 2026 bridge worth testing, what payoff to expect, and when a stronger month is the better option.",
  path: "/pont-15-aout-2026",
  enPath: "/en/pont-15-aout-2026",
  locale: "en",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <Assumption2026Page language="en" holidays={holidays} />;
}
