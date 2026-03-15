import type { Metadata } from "next";
import { SchoolZone2026Page } from "@/components/pages/intent-pages";
import { getSchoolHolidaysForZone } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Vacances scolaires 2026 zone B",
  description: "Toutes les périodes utiles de la zone B en 2026, avec un angle familles et ponts pour savoir quand revenir au simulateur.",
  path: "/vacances-scolaires-2026-zone-b",
  enPath: "/en/vacances-scolaires-2026-zone-b",
});

export default async function Page() {
  const periods = await getSchoolHolidaysForZone("B");
  return <SchoolZone2026Page language="fr" zone="B" periods={periods} />;
}
