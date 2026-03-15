import type { Metadata } from "next";
import { SchoolZone2026Page } from "@/components/pages/intent-pages";
import { getSchoolHolidaysForZone } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "School holidays 2026 zone A",
  description: "All the useful school periods for zone A in 2026, with a family and bridge-planning angle.",
  path: "/vacances-scolaires-2026-zone-a",
  enPath: "/en/vacances-scolaires-2026-zone-a",
});

export default async function Page() {
  const periods = await getSchoolHolidaysForZone("A");
  return <SchoolZone2026Page language="en" zone="A" periods={periods} />;
}
