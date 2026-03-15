import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BridgesYearPage } from "@/components/pages/bridges-year-page";
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
    return buildNotFoundMetadata("fr");
  }
  return buildMetadata({
    title: `Ponts ${year} en France : meilleurs mois à tester`,
    description: `Les meilleurs mois et les meilleurs ponts ${year} à tester en France avant de revenir au simulateur avec votre budget exact.`,
    path: `/ponts/${year}`,
    enPath: `/en/ponts/${year}`,
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
