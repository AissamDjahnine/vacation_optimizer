import { notFound } from "next/navigation";
import { GermanyStateBridgesPage } from "@/components/pages/germany-pages";
import { germanYears, isGermanYear } from "@/lib/germany/constants";
import { getGermanBridgeOpportunities, getGermanHolidaysForState } from "@/lib/germany/holidays";
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
    title: `Brückentage ${state.name} ${year}: alle langen Wochenenden im Überblick`,
    description: `Die stärksten Brückentage in ${state.name} ${year} mit offizieller Feiertagsbasis, Urlaubstagen und direktem Vergleich zum Folgejahr.`,
    externalPath: `/brueckentage/${state.slug}/${year}`,
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
  const opportunities = getGermanBridgeOpportunities(holidays);

  return <GermanyStateBridgesPage state={state.code} year={year} opportunities={opportunities} />;
}
