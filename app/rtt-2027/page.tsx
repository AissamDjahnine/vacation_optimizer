import type { Metadata } from "next";
import { Rtt2027Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "RTT 2027 : comment poser vos RTT avec les jours fériés",
  description:
    "RTT 2027 : les meilleurs mois à ouvrir, les ponts à tester en premier et comment combiner RTT et congés payés.",
  path: "/rtt-2027",
  enPath: "/en/rtt-2027",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2027);
  return <Rtt2027Page language="fr" holidays={holidays} />;
}
