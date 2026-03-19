import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnnualPlannerPage } from "@/components/pages/annual-planner-page";
import { isPlannerYear, plannerYears } from "@/lib/constants";
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
    title: `Plan your ${year} leave across the full year`,
    description: `Build a yearly leave and bridge plan for ${year}, spread your budget, and export the best breaks.`,
    path: `/planifier-annee/${year}`,
    enPath: `/en/plan-year/${year}`,
    locale: "en",
  });
}

export default async function Page({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearParam } = await params;
  const year = Number.parseInt(yearParam, 10);
  if (!isPlannerYear(year)) {
    notFound();
  }
  return <AnnualPlannerPage language="en" year={year} />;
}
