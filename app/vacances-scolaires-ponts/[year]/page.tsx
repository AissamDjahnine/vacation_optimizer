import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SchoolHolidaysBridgesYearPage } from "@/components/pages/school-holidays-bridges-year-page";
import { isPlannerYear, plannerYears } from "@/lib/constants";
import { getSchoolHolidaysByZone } from "@/lib/page-data";
import { buildMetadata } from "@/lib/seo";

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
  const safeYear = isPlannerYear(year) ? year : plannerYears[0];
  return buildMetadata({
    title: `Vacances scolaires et ponts ${safeYear}`,
    description: `Les périodes scolaires par zone, les repères familles et les meilleurs moments pour revenir au simulateur en ${safeYear}.`,
    path: `/vacances-scolaires-ponts/${safeYear}`,
    enPath: `/en/vacances-scolaires-ponts/${safeYear}`,
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
      language="fr"
      year={year}
      initialZone={initialZone}
      periodsByZone={periodsByZone}
    />
  );
}
