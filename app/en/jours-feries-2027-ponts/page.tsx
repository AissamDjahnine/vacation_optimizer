import type { Metadata } from "next";
import { HolidaysAndBridges2027Page } from "@/components/pages/holidays-and-bridges-2027-page";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "French public holidays 2027 and best bridges",
  description: "Prepare 2027 early with the public holiday list, the first useful markers and bridge ideas to validate in Ponts Malins.",
  path: "/jours-feries-2027-ponts",
  enPath: "/en/jours-feries-2027-ponts",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2027);
  return <HolidaysAndBridges2027Page language="en" holidays={holidays} />;
}
