import type { GermanStateCode } from "@/lib/domain/types";
import { germanStateMap } from "@/lib/germany/states";

export const deRoutes = {
  home: "/de",
  countryBridgesYear: (year: number) => `/de/brueckentage-deutschland/${year}`,
  countryHolidaysYear: (year: number) => `/de/feiertage-deutschland/${year}`,
  countrySchoolHolidaysYear: (year: number) => `/de/schulferien-deutschland/${year}`,
  sources: "/de/offizielle-quellen",
  legal: "/de/impressum",
  privacy: "/de/datenschutz",
  stateBridgesYear: (year: number, state: GermanStateCode) =>
    `/de/brueckentage/${germanStateMap[state].slug}/${year}`,
  stateHolidaysYear: (year: number, state: GermanStateCode) =>
    `/de/feiertage/${germanStateMap[state].slug}/${year}`,
  stateSchoolHolidaysYear: (year: number, state: GermanStateCode) =>
    `/de/schulferien/${germanStateMap[state].slug}/${year}`,
  guide: (slug: string) => `/de/ratgeber/${slug}`,
};

export function toGermanyExternalPath(internalPath: string) {
  return internalPath === "/de" ? "/" : internalPath.replace(/^\/de/, "") || "/";
}
