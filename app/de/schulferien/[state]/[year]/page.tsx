import { notFound } from "next/navigation";
import { GermanyStateSchoolHolidaysPage } from "@/components/pages/germany-pages";
import { germanYears, isGermanYear } from "@/lib/germany/constants";
import { buildGermanMetadata } from "@/lib/germany/seo";
import { getGermanSchoolHolidaysForState } from "@/lib/germany/school-holidays";
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
    title: `Schulferien ${state.name} ${year}`,
    description: `Die Schulferien in ${state.name} ${year} mit offizieller KMK-Quelle.`,
    externalPath: `/schulferien/${state.slug}/${year}`,
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

  const periods = getGermanSchoolHolidaysForState(year, state.code);
  return <GermanyStateSchoolHolidaysPage state={state.code} year={year} periods={periods} />;
}
