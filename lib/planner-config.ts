import type {
  PlannerState,
  SchoolHolidayPeriod,
  SchoolHolidayPreference,
  PlanningMode,
} from "@/lib/domain/types";

export type PlannerInitialConfig = Partial<
  Pick<PlannerState, "year" | "schoolZone" | "month" | "paidLeaveBudget" | "monthlyRtt" | "mode">
> & {
  scrollToPlanner?: boolean;
};

export const defaultPlannerState: PlannerState = {
  year: 2026,
  month: 5,
  paidLeaveBudget: 5,
  monthlyRtt: 0,
  mode: "single",
  schoolZone: "A",
  schoolHolidayPreference: "neutral",
  allowSchoolHolidayOverlap: true,
};

export function hydratePlannerState(initialConfig?: PlannerInitialConfig): PlannerState {
  return {
    ...defaultPlannerState,
    ...initialConfig,
  };
}

export function schoolPeriodsForMonth(
  periods: SchoolHolidayPeriod[],
  year: number,
  month: number,
) {
  return periods.filter((period) => {
    const start = period.startDate;
    const end = period.endDate;
    return (
      (start.getFullYear() === year && start.getMonth() + 1 === month) ||
      (end.getFullYear() === year && end.getMonth() + 1 === month)
    );
  });
}

export function applySchoolHolidayPreference(
  preference: SchoolHolidayPreference,
): Pick<PlannerState, "schoolHolidayPreference" | "allowSchoolHolidayOverlap"> {
  switch (preference) {
    case "favor":
      return { schoolHolidayPreference: "favor", allowSchoolHolidayOverlap: true };
    case "avoid":
      return { schoolHolidayPreference: "avoid", allowSchoolHolidayOverlap: false };
    case "neutral":
    default:
      return { schoolHolidayPreference: "neutral", allowSchoolHolidayOverlap: true };
  }
}

export const plannerPresets: Array<{
  frTitle: string;
  enTitle: string;
  frBody: string;
  enBody: string;
  state: Partial<PlannerState>;
}> = [
  {
    frTitle: "5 jours en mai 2026",
    enTitle: "5 days in May 2026",
    frBody: "Pour trouver un premier gros pont propre sans vider votre budget.",
    enBody: "To find a first clean long bridge without draining your budget.",
    state: { year: 2026, month: 5, paidLeaveBudget: 5, mode: "single" },
  },
  {
    frTitle: "10 jours, plusieurs ponts",
    enTitle: "10 days, multiple bridges",
    frBody: "Pour répartir votre budget sur plusieurs respirations utiles.",
    enBody: "To spread your budget across several useful breathing spaces.",
    state: { year: 2026, month: 5, paidLeaveBudget: 10, mode: "distributed", monthlyRtt: 1 },
  },
  {
    frTitle: "Famille, zone B",
    enTitle: "Family, zone B",
    frBody: "Pour tester un mois familial avec les vacances scolaires visibles.",
    enBody: "To test a family month with visible school holiday periods.",
    state: {
      year: 2026,
      month: 5,
      paidLeaveBudget: 5,
      schoolZone: "B",
      schoolHolidayPreference: "favor",
      allowSchoolHolidayOverlap: true,
    },
  },
];
