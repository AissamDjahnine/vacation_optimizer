import type { Metadata } from "next";
import { SchoolZone2026Page } from "@/components/pages/intent-pages";
import { getSchoolHolidaysForZone } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Vacances scolaires 2026 zone C",
  description: "Toutes les périodes utiles de la zone C en 2026, avec un angle familles et ponts pour savoir quand revenir au simulateur.",
  path: "/vacances-scolaires-2026-zone-c",
  enPath: "/en/vacances-scolaires-2026-zone-c",
});

export default async function Page() {
  const periods = await getSchoolHolidaysForZone("C");
  return <SchoolZone2026Page language="fr" zone="C" periods={periods} />;
}
