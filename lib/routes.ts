export type ContentPageType = "ponts" | "jours-feries" | "vacances-scolaires-ponts";
export type GuidePageType =
  | "guide-poser-conges-2026"
  | "vacances-scolaires-2026-ponts"
  | "jours-feries-2027-ponts"
  | "faq-ponts-jours-feries"
  | "pont-ascension-2026"
  | "ponts-mai-2026"
  | "vacances-scolaires-2026-zone-a"
  | "vacances-scolaires-2026-zone-b"
  | "vacances-scolaires-2026-zone-c"
  | "jours-feries-2026-semaine"
  | "poser-5-jours-conges-2026"
  | "poser-10-jours-conges-2026";

export const routes = {
  home: "/",
  annualPlannerYear: (year: number) => `/planifier-annee/${year}`,
  bridgesYear: (year: number) => `/ponts/${year}`,
  holidaysYear: (year: number) => `/jours-feries/${year}`,
  schoolHolidaysBridgesYear: (year: number) => `/vacances-scolaires-ponts/${year}`,
  leaveGuide2026: "/guide-poser-conges-2026",
  schoolHolidaysFamily2026: "/vacances-scolaires-2026-ponts",
  holidaysAndBridges2027: "/jours-feries-2027-ponts",
  faq: "/faq-ponts-jours-feries",
  ascension2026: "/pont-ascension-2026",
  mayBridges2026: "/ponts-mai-2026",
  schoolHolidaysZone2026: (zone: "A" | "B" | "C") =>
    `/vacances-scolaires-2026-zone-${zone.toLowerCase()}`,
  weekdayHolidays2026: "/jours-feries-2026-semaine",
  leaveBudget5Guide2026: "/poser-5-jours-conges-2026",
  leaveBudget10Guide2026: "/poser-10-jours-conges-2026",
};
