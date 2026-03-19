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
    return buildNotFoundMetadata("en");
  }
  return buildMetadata({
    title: `Bridge ideas ${year} in France`,
    description: `The best months and bridge opportunities in France for ${year}, before switching back to the planner with your exact budget.`,
    path: `/ponts/${year}`,
    enPath: `/en/ponts/${year}`,
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

  return <BridgesYearPage language="en" year={year} holidays={holidays} />;
}
