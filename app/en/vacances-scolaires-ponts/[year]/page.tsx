import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SchoolHolidaysBridgesYearPage } from "@/components/pages/school-holidays-bridges-year-page";
import { isPlannerYear, plannerYears } from "@/lib/constants";
import { getSchoolHolidaysByZone } from "@/lib/page-data";
import { buildMetadata, buildNotFoundMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return plannerYears.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year: yearParam } = await params;
  const year = Number.parseInt(yearParam, 10);
  if (!isPlannerYear(year)) {
    return buildNotFoundMetadata("en");
  }
  return buildMetadata({
    title: `School holidays and bridges ${year}`,
    description: `School periods by zone, family markers and the right time to switch back to the planner in ${year}.`,
    path: `/vacances-scolaires-ponts/${year}`,
    enPath: `/en/vacances-scolaires-ponts/${year}`,
    locale: "en",
  });
}

export default async function Page({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearParam } = await params;
  const year = Number.parseInt(yearParam, 10);
  if (!isPlannerYear(year)) {
    notFound();
  }
  const initialZone = "A" as const;
  const periodsByZone = await getSchoolHolidaysByZone();

  return (
    <SchoolHolidaysBridgesYearPage
      language="en"
      year={year}
      initialZone={initialZone}
      periodsByZone={periodsByZone}
    />
  );
}
