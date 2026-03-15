import type { PlannerInitialConfig } from "@/lib/planner-config";
import type { PlanningMode } from "@/lib/domain/types";

type SearchParamValueGetter = (key: string) => string | undefined;

function parsePlannerConfig(queryValue: SearchParamValueGetter): PlannerInitialConfig | undefined {
  const year = Number.parseInt(queryValue("year") ?? "", 10);
  const month = Number.parseInt(queryValue("month") ?? "", 10);
  const paidLeaveBudget = Number.parseInt(queryValue("budget") ?? "", 10);
  const monthlyRtt = Number.parseInt(queryValue("rtt") ?? "", 10);
  const schoolZone = queryValue("zone");
  const mode = queryValue("mode") as PlanningMode | undefined;
  const nextConfig: PlannerInitialConfig = {};

  if (Number.isFinite(year)) {
    nextConfig.year = year;
  }

  if (Number.isFinite(month)) {
    nextConfig.month = month;
  }

  if (Number.isFinite(paidLeaveBudget)) {
    nextConfig.paidLeaveBudget = paidLeaveBudget;
  }

  if (Number.isFinite(monthlyRtt) && monthlyRtt >= 0 && monthlyRtt <= 3) {
    nextConfig.monthlyRtt = monthlyRtt;
  }

  if (schoolZone === "A" || schoolZone === "B" || schoolZone === "C") {
    nextConfig.schoolZone = schoolZone;
  }

  if (mode === "single" || mode === "distributed") {
    nextConfig.mode = mode;
  }

  if (Object.keys(nextConfig).length === 0) {
    return undefined;
  }

  nextConfig.scrollToPlanner = true;
  return nextConfig;
}

export function plannerConfigFromSearchParams(
  searchParams?: Record<string, string | string[] | undefined>,
): PlannerInitialConfig | undefined {
  if (!searchParams) {
    return undefined;
  }

  return parsePlannerConfig((key: string) => {
    const raw = searchParams[key];
    return Array.isArray(raw) ? raw[0] : raw;
  });
}

export function plannerConfigFromUrlSearchParams(
  searchParams?: URLSearchParams,
): PlannerInitialConfig | undefined {
  if (!searchParams) {
    return undefined;
  }

  return parsePlannerConfig((key: string) => searchParams.get(key) ?? undefined);
}
