import { notFound } from "next/navigation";
import { GermanyStateHolidaysPage } from "@/components/pages/germany-pages";
import { germanYears, isGermanYear } from "@/lib/germany/constants";
import { getGermanHolidaysForState } from "@/lib/germany/holidays";
import { buildGermanMetadata } from "@/lib/germany/seo";
import { getGermanStateBySlug, germanStates } from "@/lib/germany/states";

export function generateStaticParams() {
  return germanStates.flatMap((state) => germanYears.map((year) => ({ state: state.slug, year: String(year) })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; year: string }>;
}) {
  const { state: stateSlug, year: yearParam } = await params;
  const state = getGermanStateBySlug(stateSlug);
  const year = Number.parseInt(yearParam, 10);

  if (!state || !isGermanYear(year)) {
    notFound();
  }

  return buildGermanMetadata({
    title: `Feiertage ${state.name} ${year}`,
    description: `Die Feiertage in ${state.name} ${year} mit offizieller Einordnung.`,
    externalPath: `/feiertage/${state.slug}/${year}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ state: string; year: string }>;
}) {
  const { state: stateSlug, year: yearParam } = await params;
  const state = getGermanStateBySlug(stateSlug);
  const year = Number.parseInt(yearParam, 10);

  if (!state || !isGermanYear(year)) {
    notFound();
  }

  const holidays = getGermanHolidaysForState(year, state.code);
  return <GermanyStateHolidaysPage state={state.code} year={year} holidays={holidays} />;
}
