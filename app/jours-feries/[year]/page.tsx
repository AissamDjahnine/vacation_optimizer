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
    return buildNotFoundMetadata("fr");
  }
  return buildMetadata({
    title: `Jours fériés ${year} en France`,
    description: `Toutes les dates officielles des jours fériés ${year} en France, avec les repères qui valent un vrai test dans le simulateur.`,
    path: `/jours-feries/${year}`,
    enPath: `/en/jours-feries/${year}`,
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
