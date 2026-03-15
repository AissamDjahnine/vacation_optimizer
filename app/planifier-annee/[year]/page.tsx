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
    return buildNotFoundMetadata("fr");
  }
  return buildMetadata({
    title: `Planifier ses congés ${year} sur l’année`,
    description: `Construisez un plan annuel de ponts et de congés ${year}, répartissez votre budget et exportez vos meilleurs blocs.`,
    path: `/planifier-annee/${year}`,
    enPath: `/en/plan-year/${year}`,
  });
}

export default async function Page({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearParam } = await params;
  const year = Number.parseInt(yearParam, 10);
  if (!isPlannerYear(year)) {
    notFound();
  }
  return <AnnualPlannerPage language="fr" year={year} />;
}
