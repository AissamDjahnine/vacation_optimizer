import { notFound } from "next/navigation";
import { GermanyCountryYearPage } from "@/components/pages/germany-pages";
import { germanYears, isGermanYear } from "@/lib/germany/constants";
import { germanNationalSources } from "@/lib/germany/content";
import { buildGermanMetadata } from "@/lib/germany/seo";

export function generateStaticParams() {
  return germanYears.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearParam } = await params;
  const year = Number.parseInt(yearParam, 10);
  if (!isGermanYear(year)) {
    notFound();
  }
  return buildGermanMetadata({
    title: `Schulferien Deutschland ${year}`,
    description: `Die Deutschland-Übersicht der Schulferien ${year}, gelesen über die KMK und aufbereitet nach Bundesland.`,
    externalPath: `/schulferien-deutschland/${year}`,
  });
}

export default async function Page({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearParam } = await params;
  const year = Number.parseInt(yearParam, 10);
  if (!isGermanYear(year)) {
    notFound();
  }

  return (
    <GermanyCountryYearPage
      kind="school-holidays"
      year={year}
      summary={`Die Deutschland-Übersicht der Schulferien ${year}, mit KMK-Lesart und klarem Fokus auf Bundesländer.`}
      sources={germanNationalSources}
    />
  );
}
