import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BridgesYearPage } from "@/components/pages/bridges-year-page";
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
    title: `Ponts ${safeYear} en France`,
    description: `Les meilleurs mois et les meilleurs ponts ${safeYear} à tester en France avant de revenir au simulateur avec votre budget exact.`,
    path: `/ponts/${safeYear}`,
    enPath: `/en/ponts/${safeYear}`,
  });
}

export default async function Page({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearParam } = await params;
  const year = Number.parseInt(yearParam, 10);
  if (!isPlannerYear(year)) {
    notFound();
  }
  const holidays = await getHolidaysForYear(year);

  return <BridgesYearPage language="fr" year={year} holidays={holidays} />;
}
