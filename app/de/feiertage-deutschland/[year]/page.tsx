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
    title: `Feiertage Deutschland ${year}: alle Termine nach Bundesland`,
    description: `Alle Feiertage Deutschland ${year} mit Fokus auf bundeseinheitliche und landesspezifische Unterschiede sowie den schnellsten Weg zu den relevanten Brückentagen.`,
    externalPath: `/feiertage-deutschland/${year}`,
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
      kind="holidays"
      year={year}
      summary={`Die Feiertagsübersicht für Deutschland ${year}, mit klarem Fokus auf Unterschiede zwischen den Bundesländern und die daraus entstehenden Brückentag-Chancen.`}
      sources={germanNationalSources}
    />
  );
}
