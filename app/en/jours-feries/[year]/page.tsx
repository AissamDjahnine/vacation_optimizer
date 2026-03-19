import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HolidaysYearPage } from "@/components/pages/holidays-year-page";
import { isPlannerYear, plannerYears } from "@/lib/constants";
import { getHolidaysForYear } from "@/lib/page-data";
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
    title: `French public holidays ${year}`,
    description: `All official public holidays in France for ${year}, with the markers that deserve a real check in the planner.`,
    path: `/jours-feries/${year}`,
    enPath: `/en/jours-feries/${year}`,
    locale: "en",
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
