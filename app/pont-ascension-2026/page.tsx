import type { Metadata } from "next";
import { Ascension2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pont de l’Ascension 2026 : le cas à tester en premier",
  description: "Dates utiles, pont scolaire officiel et meilleurs cas à tester pour profiter du pont de l’Ascension 2026 en France.",
  path: "/pont-ascension-2026",
  enPath: "/en/pont-ascension-2026",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <Ascension2026Page language="fr" holidays={holidays} />;
}
