import type { Metadata } from "next";
import { SchoolHolidaysFamily2026Page } from "@/components/pages/school-holidays-family-2026-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Vacances scolaires 2026 : zones A/B/C, ponts et guide famille",
  description: "Le guide familles pour croiser les vacances scolaires 2026, les zones A/B/C et les ponts utiles avant d’ouvrir le simulateur avec la bonne zone.",
  path: "/vacances-scolaires-2026-ponts",
  enPath: "/en/vacances-scolaires-2026-ponts",
});

export default function Page() {
  return <SchoolHolidaysFamily2026Page language="fr" />;
}
