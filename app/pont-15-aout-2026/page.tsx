import type { Metadata } from "next";
import { Assumption2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pont du 15 août 2026",
  description: "Pont du 15 août 2026 : faut-il vraiment le tester, quel rendement attendre et quand passer à un mois plus fort.",
  path: "/pont-15-aout-2026",
  enPath: "/en/pont-15-aout-2026",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <Assumption2026Page language="fr" holidays={holidays} />;
}
