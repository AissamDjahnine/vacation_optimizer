import type { Metadata } from "next";
import { SchoolZone2026Page } from "@/components/pages/intent-pages";
import { getSchoolHolidaysForZone } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "School holidays 2026 zone C",
  description: "All the useful school periods for zone C in 2026, with a family and bridge-planning angle.",
  path: "/vacances-scolaires-2026-zone-c",
  enPath: "/en/vacances-scolaires-2026-zone-c",
  locale: "en",
});

export default async function Page() {
  const periods = await getSchoolHolidaysForZone("C");
  return <SchoolZone2026Page language="en" zone="C" periods={periods} />;
}
