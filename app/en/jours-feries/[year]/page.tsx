import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HolidaysYearPage } from "@/components/pages/holidays-year-page";
import { isPlannerYear, plannerYears } from "@/lib/constants";
import { getHolidaysForYear } from "@/lib/page-data";
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
    title: `French public holidays ${safeYear}`,
    description: `All official public holidays in France for ${safeYear}, with the markers that deserve a real check in the planner.`,
    path: `/jours-feries/${safeYear}`,
    enPath: `/en/jours-feries/${safeYear}`,
  });
}

export default async function Page({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearParam } = await params;
  const year = Number.parseInt(yearParam, 10);
  if (!isPlannerYear(year)) {
    notFound();
  }
  const holidays = await getHolidaysForYear(year);

  return <HolidaysYearPage language="en" year={year} holidays={holidays} />;
}
