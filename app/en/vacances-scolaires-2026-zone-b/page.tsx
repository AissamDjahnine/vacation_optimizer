import type { Metadata } from "next";
import { SchoolZone2026Page } from "@/components/pages/intent-pages";
import { getSchoolHolidaysForZone } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "School holidays 2026 zone B",
  description: "All the useful school periods for zone B in 2026, with a family and bridge-planning angle.",
  path: "/vacances-scolaires-2026-zone-b",
  enPath: "/en/vacances-scolaires-2026-zone-b",
});

export default async function Page() {
  const periods = await getSchoolHolidaysForZone("B");
  return <SchoolZone2026Page language="en" zone="B" periods={periods} />;
}
