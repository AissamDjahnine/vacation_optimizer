import type { Metadata } from "next";
import { HolidaysAndBridges2027Page } from "@/components/pages/holidays-and-bridges-2027-page";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Jours fériés 2027 en France et meilleurs ponts",
  description: "Préparez 2027 tôt grâce à la liste des jours fériés, aux premiers repères utiles et aux ponts à tester dans Ponts Malins.",
  path: "/jours-feries-2027-ponts",
  enPath: "/en/jours-feries-2027-ponts",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2027);
  return <HolidaysAndBridges2027Page language="fr" holidays={holidays} />;
}
