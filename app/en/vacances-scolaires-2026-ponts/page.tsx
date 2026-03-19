import type { Metadata } from "next";
import { SchoolHolidaysFamily2026Page } from "@/components/pages/school-holidays-family-2026-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "School holidays 2026 and bridges",
  description: "The family-focused guide to combine 2026 school holidays, zones A/B/C and useful bridge ideas before switching back to the planner.",
  path: "/vacances-scolaires-2026-ponts",
  enPath: "/en/vacances-scolaires-2026-ponts",
  locale: "en",
});

export default function Page() {
  return <SchoolHolidaysFamily2026Page language="en" />;
}
