import type { Metadata } from "next";
import { AllSaints2026Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pont du 1er novembre 2026 : la Toussaint ou le 11 novembre ?",
  description: "Pont du 1er novembre 2026 : la Toussaint vaut-elle le détour et quand le 11 novembre devient un meilleur cas.",
  path: "/pont-1er-novembre-2026",
  enPath: "/en/pont-1er-novembre-2026",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2026);
  return <AllSaints2026Page language="fr" holidays={holidays} />;
}
