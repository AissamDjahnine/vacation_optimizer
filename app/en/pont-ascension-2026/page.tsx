import type { Metadata } from "next";
import { Ascension2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Ascension bridge 2026: the first case to test",
  description: "Useful dates, official school bridge days and the best cases to test around Ascension 2026 in France.",
  path: "/pont-ascension-2026",
  enPath: "/en/pont-ascension-2026",
  locale: "en",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <Ascension2026Page language="en" holidays={holidays} />;
}
