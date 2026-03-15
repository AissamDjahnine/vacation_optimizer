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
    title: `Bridge ideas ${safeYear} in France`,
    description: `The best months and bridge opportunities in France for ${safeYear}, before switching back to the planner with your exact budget.`,
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

  return <BridgesYearPage language="en" year={year} holidays={holidays} />;
}
