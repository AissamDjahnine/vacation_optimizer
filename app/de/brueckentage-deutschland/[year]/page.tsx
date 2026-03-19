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
    title: `Brückentage Deutschland ${year}`,
    description: `Die föderale Übersicht der wichtigsten Brückentage in Deutschland ${year}.`,
    externalPath: `/brueckentage-deutschland/${year}`,
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
      kind="bridges"
      year={year}
      summary={`Die föderale Übersicht der wichtigsten Brückentage in Deutschland ${year}, sauber gegliedert nach Bundesland.`}
      sources={germanNationalSources}
    />
  );
}
