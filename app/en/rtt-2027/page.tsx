import type { Metadata } from "next";
import { Rtt2027Page } from "@/components/pages/intent-pages";
import { getHolidaysForYear } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "RTT 2027: how to place RTT days with French public holidays",
  description:
    "RTT 2027: the best months to open first, the bridge opportunities worth testing, and how to combine RTT with paid leave.",
  path: "/rtt-2027",
  enPath: "/en/rtt-2027",
  locale: "en",
});

export default async function Page() {
  const holidays = await getHolidaysForYear(2027);
  return <Rtt2027Page language="en" holidays={holidays} />;
}
