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
    return buildNotFoundMetadata("fr");
  }
  return buildMetadata({
    title: `Vacances scolaires et ponts ${year}`,
    description: `Les périodes scolaires par zone, les repères familles et les meilleurs moments pour revenir au simulateur en ${year}.`,
    path: `/vacances-scolaires-ponts/${year}`,
    enPath: `/en/vacances-scolaires-ponts/${year}`,
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
