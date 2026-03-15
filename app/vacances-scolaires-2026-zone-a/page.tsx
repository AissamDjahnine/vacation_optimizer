import type { Metadata } from "next";
import { SchoolZone2026Page } from "@/components/pages/intent-pages";
import { getSchoolHolidaysForZone } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Vacances scolaires 2026 zone A",
  description: "Toutes les périodes utiles de la zone A en 2026, avec un angle familles et ponts pour savoir quand revenir au simulateur.",
  path: "/vacances-scolaires-2026-zone-a",
  enPath: "/en/vacances-scolaires-2026-zone-a",
});

export default async function Page() {
  const periods = await getSchoolHolidaysForZone("A");
  return <SchoolZone2026Page language="fr" zone="A" periods={periods} />;
}
