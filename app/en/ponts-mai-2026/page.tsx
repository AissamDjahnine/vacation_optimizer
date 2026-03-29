import type { Metadata } from "next";
import { MayBridges2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "May 2026 bridges: the first cases worth testing",
  description: "The May 2026 bridge opportunities worth opening first: May 1st, May 8th, Ascension, and the strongest budget-based cases.",
  path: "/ponts-mai-2026",
  enPath: "/en/ponts-mai-2026",
  locale: "en",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <MayBridges2026Page language="en" holidays={holidays} />;
}
