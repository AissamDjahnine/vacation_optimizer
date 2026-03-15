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
    title: `Jours fériés ${safeYear} en France`,
    description: `Toutes les dates officielles des jours fériés ${safeYear} en France, avec les repères qui valent un vrai test dans le simulateur.`,
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

  return <HolidaysYearPage language="fr" year={year} holidays={holidays} />;
}
