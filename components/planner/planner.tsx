"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ZoneLookupPanel } from "@/components/planner/zone-lookup-panel";
import { parseDateLike } from "@/lib/domain/date-utils";
import { DateOptimizer } from "@/lib/domain/date-optimizer";
import { getHolidaySnapshot, getSchoolHolidaySnapshot } from "@/lib/data-snapshots";
import type {
  Holiday,
  SchoolHolidayPeriod,
  PlannerState,
  SchoolHolidayPreference,
} from "@/lib/domain/types";
import { plannerYears } from "@/lib/constants";
import { formatMonthYear, formatShortRange } from "@/lib/formatting";
import type { AppLanguage } from "@/lib/i18n";
import { prefixForLanguage } from "@/lib/i18n";
import {
  applySchoolHolidayPreference,
  defaultPlannerState,
  hydratePlannerState,
  type PlannerInitialConfig,
} from "@/lib/planner-config";
import { plannerConfigFromUrlSearchParams } from "@/lib/search-params";
import { routes } from "@/lib/routes";
import { Reveal } from "@/components/motion/reveal";
import { ResultCard } from "@/components/planner/result-card";
import { SkeletonCard } from "@/components/planner/skeleton-card";
import { trackEvent } from "@/lib/analytics";

const holidayCache = new Map<number, Holiday[]>();
const schoolHolidayCache = new Map<"A" | "B" | "C", SchoolHolidayPeriod[]>();

const fetchJson = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network request failed");
  }
  return response.json();
};

type PlannerProps = {
  language: AppLanguage;
  initialConfig?: PlannerInitialConfig;
};

export function Planner({ language, initialConfig }: PlannerProps) {
  const searchParams = useSearchParams();
  const [state, setState] = useState<PlannerState>(() => hydratePlannerState(initialConfig));
  const [hasSearchedOnce, setHasSearchedOnce] = useState(false);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [schoolHolidayPeriods, setSchoolHolidayPeriods] = useState<SchoolHolidayPeriod[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [visibleResultCount, setVisibleResultCount] = useState(5);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const resultsRef = useRef<HTMLElement | null>(null);
  const lastTrackedResultsKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const nextConfig = plannerConfigFromUrlSearchParams(searchParams);
    if (!nextConfig) {
      return;
    }

    setState((current) => ({ ...current, ...nextConfig }));
  }, [searchParams]);

  const safeYear = plannerYears.includes(state.year) ? state.year : defaultPlannerState.year;
  const safeMonth =
    Number.isFinite(state.month) && state.month >= 1 && state.month <= 12
      ? state.month
      : defaultPlannerState.month;
  const safePaidLeaveBudget =
    Number.isFinite(state.paidLeaveBudget) && state.paidLeaveBudget >= 1
      ? Math.min(state.paidLeaveBudget, 20)
      : defaultPlannerState.paidLeaveBudget;
  const safeMonthlyRtt =
    Number.isFinite(state.monthlyRtt) && state.monthlyRtt >= 0 && state.monthlyRtt <= 3
      ? state.monthlyRtt
      : defaultPlannerState.monthlyRtt;
  const zoneSelectionLocked = state.schoolHolidayPreference === "avoid";

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      const snapshotHolidays = getHolidaySnapshot(safeYear) ?? undefined;
      const snapshotSchoolHolidays = getSchoolHolidaySnapshot(state.schoolZone);
      const cachedHolidays = holidayCache.get(safeYear) ?? snapshotHolidays;
      const cachedSchoolHolidays =
        schoolHolidayCache.get(state.schoolZone) ?? snapshotSchoolHolidays;

      if (cachedHolidays && cachedSchoolHolidays) {
        holidayCache.set(safeYear, cachedHolidays);
        schoolHolidayCache.set(state.schoolZone, cachedSchoolHolidays);
        setHolidays(cachedHolidays);
        setSchoolHolidayPeriods(cachedSchoolHolidays);
        setDataReady(true);
        return;
      }

      setLoading(true);

      try {
        const [holidayResponse, schoolHolidayResponse] = await Promise.all([
          cachedHolidays
            ? Promise.resolve({ holidays: cachedHolidays.map((holiday) => ({
                localName: holiday.localName,
                date: holiday.date.toISOString(),
              })) })
            : fetchJson<{ holidays: Array<{ localName: string; date: string }> }>(
                `/api/holidays?country=FR&year=${safeYear}`,
              ),
          cachedSchoolHolidays
            ? Promise.resolve({
                periods: cachedSchoolHolidays.map((period) => ({
                  description: period.description,
                  startDate: period.startDate.toISOString(),
                  endDate: period.endDate.toISOString(),
                  zone: period.zone,
                  schoolYear: period.schoolYear,
                })),
              })
            : fetchJson<{
                periods: Array<{
                  description: string;
                  startDate: string;
                  endDate: string;
                  zone: string;
                  schoolYear: string;
                }>;
              }>(`/api/school-holidays?zone=${state.schoolZone}`),
        ]);

        if (cancelled) {
          return;
        }

        const nextHolidays = cachedHolidays
          ? cachedHolidays
          : holidayResponse.holidays.map((holiday) => ({
              localName: holiday.localName,
              date: parseDateLike(holiday.date),
            }));
        const nextSchoolPeriods = cachedSchoolHolidays
          ? cachedSchoolHolidays
          : schoolHolidayResponse.periods.map((period) => ({
              description: period.description,
              startDate: parseDateLike(period.startDate),
              endDate: parseDateLike(period.endDate),
              zone: period.zone,
              schoolYear: period.schoolYear,
            }));

        holidayCache.set(safeYear, nextHolidays);
        schoolHolidayCache.set(state.schoolZone, nextSchoolPeriods);
        setHolidays(nextHolidays);
        setSchoolHolidayPeriods(nextSchoolPeriods);
        setDataReady(true);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      cancelled = true;
    };
  }, [safeYear, state.schoolZone]);

  const computation = useMemo(() => {
    if (!hasSearchedOnce || !dataReady || holidays.length === 0) {
      return null;
    }

    const exactResults =
      state.mode === "distributed"
        ? DateOptimizer.findBestDistributedPeriods({
            holidays,
            vacationDaysToUse: safePaidLeaveBudget,
            availableRttDays: safeMonthlyRtt,
            year: safeYear,
            month: safeMonth,
            schoolHolidayPeriods,
            schoolHolidayPreference: state.schoolHolidayPreference,
            allowSchoolHolidayOverlap: state.allowSchoolHolidayOverlap,
          })
        : DateOptimizer.findAllOptimizedPeriods({
            holidays,
            vacationDaysToUse: safePaidLeaveBudget,
            availableRttDays: safeMonthlyRtt,
            year: safeYear,
            month: safeMonth,
            schoolHolidayPeriods,
            schoolHolidayPreference: state.schoolHolidayPreference,
            allowSchoolHolidayOverlap: state.allowSchoolHolidayOverlap,
          });

    const fallbackResults =
      exactResults.length === 0
        ? DateOptimizer.findFlexiblePeriods({
            holidays,
            vacationDaysToUse: safePaidLeaveBudget,
            availableRttDays: safeMonthlyRtt,
            year: safeYear,
            month: safeMonth,
            schoolHolidayPeriods,
            schoolHolidayPreference: state.schoolHolidayPreference,
            allowSchoolHolidayOverlap: state.allowSchoolHolidayOverlap,
          }).slice(0, 6)
        : [];

    const periods = exactResults.length > 0 ? exactResults : fallbackResults;
    const exact = exactResults.length > 0;
    const usedBudget = periods[0]?.paidLeaveDaysUsed ?? 0;

    return {
      exact,
      periods,
      usedBudget,
    };
  }, [
    dataReady,
    hasSearchedOnce,
    holidays,
    safeMonth,
    safeMonthlyRtt,
    safePaidLeaveBudget,
    safeYear,
    schoolHolidayPeriods,
    state.allowSchoolHolidayOverlap,
    state.mode,
    state.schoolHolidayPreference,
  ]);

  const primaryPeriod = computation?.periods[0];
  const previewPeriods = computation?.periods.slice(0, 3) ?? [];

  const previewComputation = useMemo(() => {
    if (!dataReady || holidays.length === 0) {
      return null;
    }

    const periods =
      state.mode === "distributed"
        ? DateOptimizer.findBestDistributedPeriods({
            holidays,
            vacationDaysToUse: safePaidLeaveBudget,
            availableRttDays: safeMonthlyRtt,
            year: safeYear,
            month: safeMonth,
            schoolHolidayPeriods,
            schoolHolidayPreference: state.schoolHolidayPreference,
            allowSchoolHolidayOverlap: state.allowSchoolHolidayOverlap,
          })
        : DateOptimizer.findFlexiblePeriods({
            holidays,
            vacationDaysToUse: safePaidLeaveBudget,
            availableRttDays: safeMonthlyRtt,
            year: safeYear,
            month: safeMonth,
            schoolHolidayPeriods,
            schoolHolidayPreference: state.schoolHolidayPreference,
            allowSchoolHolidayOverlap: state.allowSchoolHolidayOverlap,
          });

    if (state.mode === "distributed") {
      const total = periods.reduce((sum, p) => sum + p.totalDaysOff, 0);
      return total > 0 ? { totalDaysOff: total } : null;
    }

    return periods[0] ?? null;
  }, [
    dataReady,
    holidays,
    safeMonth,
    safeMonthlyRtt,
    safePaidLeaveBudget,
    safeYear,
    schoolHolidayPeriods,
    state.allowSchoolHolidayOverlap,
    state.mode,
    state.schoolHolidayPreference,
  ]);

  const updateSchoolPreference = (preference: SchoolHolidayPreference) => {
    setState((current) => ({
      ...current,
      ...applySchoolHolidayPreference(preference),
    }));
  };

  const submit = () => {
    trackEvent("planner_start", {
      language,
      year: safeYear,
      month: safeMonth,
      mode: state.mode,
      paid_leave_budget: safePaidLeaveBudget,
      monthly_rtt: safeMonthlyRtt,
      school_zone: state.schoolZone,
      school_holiday_preference: state.schoolHolidayPreference,
      allow_school_holiday_overlap: state.allowSchoolHolidayOverlap,
    });
    setHasSearchedOnce(true);
    setVisibleResultCount(5);
  };

  const shiftResultMonth = (delta: number) => {
    setState((current) => {
      const nextDate = new Date(current.year, current.month - 1 + delta, 1);
      if (!plannerYears.includes(nextDate.getFullYear())) {
        return current;
      }

      return {
        ...current,
        year: nextDate.getFullYear(),
        month: nextDate.getMonth() + 1,
      };
    });
    setVisibleResultCount(5);
  };

  const plannerIntroId = "planner-intro";

  useEffect(() => {
    if (!hasSearchedOnce || !computation || loading) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const resultsElement = resultsRef.current;
      if (resultsElement && typeof resultsElement.scrollIntoView === "function") {
        resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [computation, hasSearchedOnce, loading]);

  useEffect(() => {
    if (!hasSearchedOnce || !computation || loading) {
      return;
    }

    const topResult = computation.periods[0];
    const resultsKey = [
      safeYear,
      safeMonth,
      state.mode,
      safePaidLeaveBudget,
      safeMonthlyRtt,
      state.schoolZone,
      state.schoolHolidayPreference,
      state.allowSchoolHolidayOverlap,
      computation.exact ? "exact" : "fallback",
      computation.periods.length,
      topResult?.startDate.toISOString() ?? "none",
      topResult?.endDate.toISOString() ?? "none",
    ].join("|");

    if (lastTrackedResultsKeyRef.current === resultsKey) {
      return;
    }

    lastTrackedResultsKeyRef.current = resultsKey;
    trackEvent("planner_result_view", {
      language,
      year: safeYear,
      month: safeMonth,
      mode: state.mode,
      paid_leave_budget: safePaidLeaveBudget,
      monthly_rtt: safeMonthlyRtt,
      school_zone: state.schoolZone,
      school_holiday_preference: state.schoolHolidayPreference,
      allow_school_holiday_overlap: state.allowSchoolHolidayOverlap,
      result_count: computation.periods.length,
      result_kind: computation.exact ? "exact" : "fallback",
      used_budget: computation.usedBudget,
      top_days_off: topResult?.totalDaysOff ?? 0,
      top_paid_leave_days_used: topResult?.paidLeaveDaysUsed ?? 0,
    });
  }, [
    computation,
    hasSearchedOnce,
    language,
    loading,
    safeMonth,
    safeMonthlyRtt,
    safePaidLeaveBudget,
    safeYear,
    state.allowSchoolHolidayOverlap,
    state.mode,
    state.schoolHolidayPreference,
    state.schoolZone,
  ]);

  const visiblePeriods = computation ? computation.periods.slice(0, visibleResultCount) : [];
  const hasHiddenPeriods = computation ? computation.periods.length > visibleResultCount : false;
  const shiftMonth = (direction: -1 | 1) => {
    setState((current) => {
      const currentYear = plannerYears.includes(current.year) ? current.year : defaultPlannerState.year;
      const currentMonth =
        Number.isFinite(current.month) && current.month >= 1 && current.month <= 12
          ? current.month
          : defaultPlannerState.month;
      const date = new Date(currentYear, currentMonth - 1 + direction, 1);
      return {
        ...current,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      };
    });
    if (hasSearchedOnce) {
      setHasSearchedOnce(true);
    }
  };

  return (
    <div className="space-y-8">
      <Reveal>
        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-stretch">
          <div className="space-y-5 rounded-[2.2rem] border border-line bg-white p-6 sm:p-8">
            <div className="max-w-4xl space-y-5">
              <h2 className="max-w-3xl text-5xl font-black tracking-tight text-ink sm:text-6xl">
                {language === "en"
                  ? "Find the best bridge days for your leave budget"
                  : "Simulateur de ponts et congés 2026"}
              </h2>
              <p id={plannerIntroId} className="max-w-[44rem] text-lg leading-8 text-ink/80">
                {language === "en"
                  ? "Pick a month, your leave budget, and see the bridge ideas that give you the most days off first."
                  : "Choisissez un mois, un budget, puis voyez d’abord les ponts qui vous donnent le plus de jours de repos."}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={prefixForLanguage(routes.annualPlannerYear(safeYear), language)}
                  onClick={() =>
                    trackEvent("annual_plan_click", {
                      language,
                      source: "planner_hero",
                      year: safeYear,
                    })
                  }
                  className="rounded-full border border-line bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-coral hover:text-coral"
                >
                  {language === "en" ? "See the yearly plan" : "Voir le plan annuel"}
                </Link>
                <span className="rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink/72">
                  {language === "en"
                    ? "No account, official dates, exportable results"
                    : "Pas de compte, dates officielles, résultats exportables"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-[#4f6e8f] bg-[#5f7f9b] p-6 text-white shadow-card sm:p-8">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <span className="text-lg">✦</span>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/72">
                    {language === "en" ? "Quick result" : "Aperçu rapide"}
                  </p>
                  <p className="mt-4 text-5xl font-black tracking-tight text-white">
                    {dataReady && previewComputation ? `${previewComputation.totalDaysOff}` : "—"}{" "}
                    {language === "en" ? "Days" : "Jours"}
                  </p>
                  <p className="mt-3 max-w-sm text-base leading-7 text-white/80">
                    {dataReady && previewComputation
                      ? language === "en"
                        ? `Total potential days off found for ${formatMonthYear(safeMonth, safeYear, language)}.`
                        : `Jours de repos potentiels trouvés pour ${formatMonthYear(safeMonth, safeYear, language)}.`
                      : language === "en"
                        ? "Loading the first useful preview."
                        : "Chargement du premier aperçu utile."}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={submit}
                  className="inline-flex w-full items-center justify-center rounded-full bg-coral px-6 py-4 text-lg font-bold text-white transition hover:-translate-y-0.5 hover:bg-coral/90"
                >
                  {language === "en" ? "Get my best bridges" : "Voir mes meilleurs ponts"}
                </button>
                <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  {language === "en"
                    ? "Powered by official public dates"
                    : "Alimenté par les dates officielles"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="site-card p-5 sm:p-8">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Field label={language === "en" ? "Year" : "Année"}>
                <select
                  aria-label={language === "en" ? "Select year" : "Choisir l’année"}
                  value={safeYear}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      year: Number(event.target.value),
                    }))
                  }
                  className="h-12 w-full rounded-2xl border border-line bg-slate-50 px-4 font-semibold text-ink"
                >
                  {plannerYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={language === "en" ? "Month" : "Mois"}>
                <select
                  aria-label={language === "en" ? "Select month" : "Choisir le mois"}
                  value={safeMonth}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      month: Number(event.target.value),
                    }))
                  }
                  className="h-12 w-full rounded-2xl border border-line bg-slate-50 px-4 font-semibold text-ink"
                >
                  {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                    <option key={month} value={month}>
                      {formatMonthYear(month, safeYear, language)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={language === "en" ? "Monthly RTT" : "RTT mensuel"}>
                <select
                  aria-label={language === "en" ? "Select monthly RTT" : "Choisir le RTT mensuel"}
                  value={safeMonthlyRtt}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      monthlyRtt: Number(event.target.value),
                    }))
                  }
                  className="h-12 w-full rounded-2xl border border-line bg-slate-50 px-4 font-semibold text-ink"
                >
                  {[0, 1, 2, 3].map((value) => (
                    <option key={value} value={value}>
                      {value === 0
                        ? language === "en"
                          ? "No RTT"
                          : "Sans RTT"
                        : language === "en"
                          ? `${value} RTT day${value > 1 ? "s" : ""}`
                          : `${value} RTT par mois`}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex rounded-full border border-line bg-white p-1">
                <ModeButton
                  active={state.mode === "single"}
                  onClick={() => setState((current) => ({ ...current, mode: "single" }))}
                  label={language === "en" ? "Long bridge" : "Gros pont"}
                />
                <ModeButton
                  active={state.mode === "distributed"}
                  onClick={() => setState((current) => ({ ...current, mode: "distributed" }))}
                  label={language === "en" ? "Multiple bridges" : "Plusieurs ponts"}
                />
              </div>
            </div>

            <div className="site-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-bold text-ink">
                    {language === "en" ? "Paid leave budget" : "Budget de congés payés"}
                  </p>
                  <p className="mt-3 text-4xl font-black tracking-tight text-ink">
                    {safePaidLeaveBudget}{" "}
                    {language === "en"
                      ? `day${safePaidLeaveBudget > 1 ? "s" : ""} available`
                      : `jour${safePaidLeaveBudget > 1 ? "s" : ""} disponible${safePaidLeaveBudget > 1 ? "s" : ""}`}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ink/82">
                    {language === "en"
                      ? "Maximum number of working days to book. RTT is used first when enabled."
                      : "Maximum de jours ouvrés à poser. Les RTT, si activés, sont utilisés avant."}
                  </p>
                </div>
                <div className="rounded-full border border-line bg-paper px-4 py-2 text-lg font-bold text-ink">
                  {safePaidLeaveBudget} {language === "en" ? "days" : "jours"}
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <label className="flex items-center gap-3 text-sm font-semibold text-ink/82">
                  <span>{language === "en" ? "Direct input" : "Saisie directe"}</span>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={safePaidLeaveBudget}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        paidLeaveBudget: Math.max(
                          1,
                          Math.min(20, Number.parseInt(event.target.value || "1", 10)),
                        ),
                      }))
                    }
                    className="h-11 w-24 rounded-2xl border border-line bg-paper px-3 text-center font-bold text-ink"
                  />
                </label>
              </div>
              <input
                aria-label={
                  language === "en" ? "Paid leave budget slider" : "Curseur du budget de congés payés"
                }
                type="range"
                min={1}
                max={20}
                value={safePaidLeaveBudget}
                onChange={(event) =>
                  setState((current) => ({
                    ...current,
                    paidLeaveBudget: Number(event.target.value),
                  }))
                }
                className="mt-8 h-2 w-full accent-coral"
              />
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={submit}
                  className="rounded-full bg-coral px-10 py-4 text-lg font-bold text-white transition hover:-translate-y-0.5 hover:bg-coral/90"
                >
                  {language === "en" ? "Calculate my best bridges" : "Calculer mes meilleurs ponts"}
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowAdvancedOptions((current) => !current)}
                aria-expanded={showAdvancedOptions}
                className="rounded-full border border-line bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-coral hover:text-coral"
              >
                {showAdvancedOptions
                  ? language === "en"
                    ? "Hide advanced options"
                    : "Masquer les options avancées"
                  : language === "en"
                    ? "Show advanced options"
                    : "Afficher les options avancées"}
              </button>
            </div>

            {showAdvancedOptions ? (
              <div className="space-y-5 rounded-[1.8rem] border border-line/80 bg-slate-50/70 p-5">
                <ZoneLookupPanel
                  language={language}
                  disabled={zoneSelectionLocked}
                  onZoneResolved={(zone) =>
                    setState((current) => ({
                      ...current,
                      schoolZone: zone,
                    }))
                  }
                  title={
                    language === "en"
                      ? "Don't know your zone yet?"
                      : "Vous ne connaissez pas encore votre zone ?"
                  }
                  subtitle={
                    language === "en"
                      ? "A department code, department name, or academy is enough."
                      : "Un numéro de département, un nom de département ou une académie suffit."
                  }
                  className="bg-white shadow-none"
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-ink/72">
                      {language === "en" ? "School holidays" : "Vacances scolaires"}
                    </p>
                    <div
                      aria-label={
                        language === "en"
                          ? "Choose school holiday preference"
                          : "Choisir la préférence vacances scolaires"
                      }
                      role="group"
                      className="grid w-full grid-cols-3 rounded-full border border-line bg-white p-1"
                    >
                      {[
                        { value: "neutral" as const, label: language === "en" ? "Neutral" : "Neutre" },
                        { value: "favor" as const, label: language === "en" ? "Favor" : "Favoriser" },
                        { value: "avoid" as const, label: language === "en" ? "Avoid" : "Éviter" },
                      ].map((item) => (
                        <ModeButton
                          key={item.value}
                          active={state.schoolHolidayPreference === item.value}
                          onClick={() => updateSchoolPreference(item.value)}
                          label={item.label}
                          className="w-full px-2"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-bold text-ink/72">
                      {language === "en" ? "Overlap rule" : "Chevauchement"}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setState((current) =>
                          current.schoolHolidayPreference === "avoid"
                            ? current
                            : {
                                ...current,
                                allowSchoolHolidayOverlap: !current.allowSchoolHolidayOverlap,
                              },
                        )
                      }
                      disabled={state.schoolHolidayPreference === "avoid"}
                      aria-label={language === "en" ? "Overlap rule" : "Chevauchement"}
                      className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition ${
                        state.schoolHolidayPreference === "avoid"
                          ? "cursor-not-allowed border border-line bg-white text-ink/40"
                          : state.allowSchoolHolidayOverlap
                            ? "bg-coral text-white"
                            : "border border-line bg-white text-ink"
                      }`}
                    >
                      {state.allowSchoolHolidayOverlap ? "✓ " : ""}
                      {language === "en"
                        ? "Allow overlap with school holidays"
                        : "Autoriser le chevauchement avec les vacances scolaires"}
                    </button>
                  </div>
                </div>
                <Field label={language === "en" ? "School zone" : "Zone scolaire"}>
                  <div
                    aria-label={language === "en" ? "Choose school zone" : "Choisir la zone scolaire"}
                    role="group"
                    className={`inline-flex rounded-full border border-line bg-white p-1 ${
                      zoneSelectionLocked ? "cursor-not-allowed opacity-60" : ""
                    }`}
                  >
                    {(["A", "B", "C"] as const).map((zone) => (
                      <ModeButton
                        key={zone}
                        active={state.schoolZone === zone}
                        disabled={zoneSelectionLocked}
                        onClick={() => setState((current) => ({ ...current, schoolZone: zone }))}
                        label={zone}
                      />
                    ))}
                  </div>
                </Field>
              </div>
            ) : null}
          </div>
        </section>
      </Reveal>

      {hasSearchedOnce ? (
        <section ref={resultsRef} className="space-y-6">
          <div className="overflow-hidden rounded-[2rem] border border-line bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <div className="space-y-4">
                <p className="editorial-kicker">
                  {language === "en" ? "Results" : "Résultats"}
                </p>
                <h2 className="max-w-3xl text-4xl font-black tracking-tight text-ink sm:text-5xl">
                  {language === "en" ? (
                    <>
                      Your <span className="text-coral">recommended</span> bridges
                    </>
                  ) : (
                    <>
                      Vos <span className="text-coral">ponts</span> recommandés
                    </>
                  )}
                </h2>
                <p className="max-w-3xl text-lg leading-8 text-ink/72">
                  {language === "en"
                    ? `${computation?.exact ? "Exact" : "Estimated"} results for ${formatMonthYear(safeMonth, safeYear, language)}.`
                    : `Résultats ${computation?.exact ? "exacts" : "estimés"} pour ${formatMonthYear(safeMonth, safeYear, language)}.`}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-bold text-ink">
                    {formatMonthYear(safeMonth, safeYear, language)}
                  </span>
                  <span className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-bold text-ink">
                    {language === "en"
                      ? `Budget: ${safePaidLeaveBudget} days`
                      : `Budget : ${safePaidLeaveBudget} jours`}
                  </span>
                  <span className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-bold text-ink">
                    {computation?.periods.length ?? 0} {language === "en" ? "ranked" : "classés"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-sm font-medium text-ink/70">
                  <LegendItem color="bg-[#fff0d8]" label={language === "en" ? "Holiday" : "Férié"} />
                  <LegendItem color="bg-[#dff0e5]" label={language === "en" ? "Weekend" : "Week-end"} />
                  <LegendItem color="bg-[#e9ecff]" label="RTT" />
                  <LegendItem color="bg-[#f9dfd2]" label={language === "en" ? "Leave" : "Congé payé"} />
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
              <div className="rounded-[1.6rem] border border-line/80 bg-[#f7f9fc] p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-ink/55">
                  {language === "en" ? "Efficiency pulse" : "Rythme d’efficacité"}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <ResultSummaryStat
                    label={language === "en" ? "Total rest" : "Repos total"}
                    value={`${computation?.periods[0]?.totalDaysOff ?? 0} ${language === "en" ? "days" : "jours"}`}
                  />
                  <ResultSummaryStat
                    label={language === "en" ? "Leave used" : "Congé utilisé"}
                    value={`${computation?.usedBudget ?? 0} ${language === "en" ? "days" : "jours"}`}
                  />
                  <ResultSummaryStat
                    label={language === "en" ? "Public holidays" : "Fériés"}
                    value={`${primaryPeriod?.includedHolidays.length ?? 0} ${language === "en" ? "days" : "jours"}`}
                  />
                  <ResultSummaryStat
                    label={language === "en" ? "Efficiency score" : "Score"}
                    value={computation?.periods[0]?.worthScore.toFixed(1) ?? "0.0"}
                  />
                </div>

                <div className="mt-4 rounded-[1.35rem] bg-white p-4 shadow-[0_10px_28px_rgba(31,68,113,0.04)]">
                  <p className="text-sm leading-6 text-ink/70">
                    {language === "en"
                      ? "By bridging these dates, you unlock the full rest window while keeping the leave budget under control."
                      : "En posant ces dates, vous débloquez la fenêtre complète tout en gardant le budget sous contrôle."}
                  </p>
                </div>

                {previewPeriods.length > 0 ? (
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-ink/55">
                      {language === "en" ? "Top windows" : "Meilleures fenêtres"}
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {previewPeriods.map((period, index) => (
                        <article
                          key={`${period.startDate.toISOString()}-${period.endDate.toISOString()}`}
                          className="rounded-[1.2rem] border border-line/80 bg-white p-4 shadow-[0_8px_20px_rgba(31,68,113,0.03)]"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="inline-flex h-8 items-center justify-center rounded-full bg-ink px-2.5 text-xs font-black text-white">
                              #{index + 1}
                            </span>
                            <span className="rounded-full border border-line/80 bg-paper px-2 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/68">
                              {period.totalDaysOff} {language === "en" ? "days" : "jours"}
                            </span>
                          </div>
                          <p className="mt-3 text-sm font-bold text-ink">
                            {formatShortRange(period.startDate, period.endDate, language)}
                          </p>
                          <p className="mt-2 text-xs leading-5 text-ink/68">
                            {language === "en"
                              ? `${period.paidLeaveDaysUsed} leave day${period.paidLeaveDaysUsed > 1 ? "s" : ""} • score ${period.worthScore.toFixed(1)}`
                              : `${period.paidLeaveDaysUsed} jour${period.paidLeaveDaysUsed > 1 ? "s" : ""} posé${period.paidLeaveDaysUsed > 1 ? "s" : ""} • score ${period.worthScore.toFixed(1)}`}
                          </p>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="rounded-[1.6rem] bg-[#2f5686] p-4 text-white shadow-[0_18px_40px_rgba(47,86,134,0.16)] sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/72">
                  {language === "en" ? "Quick preview" : "Aperçu rapide"}
                </p>
                <div className="mt-3 flex items-end gap-2">
                  <p className="text-5xl font-black tracking-tight text-white">
                    {computation?.periods[0]?.totalDaysOff ?? 0}
                  </p>
                  <span className="pb-1.5 text-lg font-bold text-white/92">
                    {language === "en" ? "days" : "jours"}
                  </span>
                </div>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
                  {language === "en"
                    ? "Potential days off found on a single window."
                    : "Jours de repos potentiels trouvés sur une seule fenêtre."}
                </p>

                <div className="mt-4 grid gap-2.5">
                  <ResultSummaryStat
                    dark
                    label={language === "en" ? "Leave to book" : "Congé à poser"}
                    value={`${computation?.periods[0]?.paidLeaveDaysUsed ?? 0}`}
                  />
                  <ResultSummaryStat
                    dark
                    label={language === "en" ? "RTT used" : "RTT utilisés"}
                    value={`${computation?.periods[0]?.rttDaysUsed ?? 0}`}
                  />
                  <ResultSummaryStat
                    dark
                    label={language === "en" ? "Score" : "Score"}
                    value={computation?.periods[0]?.worthScore.toFixed(1) ?? "0.0"}
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => shiftResultMonth(-1)}
                    className="rounded-full border border-white/18 bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/15"
                  >
                    {language === "en" ? "Previous month" : "Mois précédent"}
                  </button>
                  <button
                    type="button"
                    onClick={() => shiftResultMonth(1)}
                    className="rounded-full border border-white/18 bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/15"
                  >
                    {language === "en" ? "Next month" : "Mois suivant"}
                  </button>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/70">
                  {language === "en"
                    ? "Choose a month first. Refine only if you want different dates or a different budget."
                    : "Choisissez d’abord un mois. Affinez seulement si vous voulez d’autres dates ou un autre budget."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : computation && computation.periods.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {visiblePeriods.map((period, index) => (
                  <div
                    key={`${period.startDate.toISOString()}-${period.endDate.toISOString()}-${index}`}
                    className={index === 0 ? "lg:col-span-2" : ""}
                  >
                    <ResultCard
                      language={language}
                      period={period}
                      rank={index + 1}
                      highlighted={index === 0}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-4xl border border-dashed border-line bg-white p-8 text-center shadow-card">
                <p className="text-2xl font-black text-ink">
                  {language === "en"
                    ? "No useful bridge found for this month."
                    : "Aucun pont utile trouvé pour ce mois."}
                </p>
                <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink/80">
                  {language === "en"
                    ? "Try another month or increase the budget. If your settings are strict, the planner can still surface close suggestions."
                    : "Essayez un autre mois ou augmentez le budget. Si vos réglages sont stricts, le simulateur peut encore faire remonter des suggestions proches."}
                </p>
              </div>
            )}
          </div>

          {hasHiddenPeriods ? (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleResultCount((current) =>
                    Math.min(current + 5, computation?.periods.length ?? current),
                  )
                }
                className="rounded-full border border-ink bg-white px-6 py-3 font-bold text-ink transition hover:bg-ink hover:text-white"
              >
                {language === "en" ? "Show 5 more" : "Voir 5 de plus"}
              </button>
            </div>
          ) : null}

          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-full border border-ink bg-white px-6 py-3 font-bold text-ink transition hover:bg-ink hover:text-white"
            >
              {language === "en" ? "Back to top" : "Retour en haut"}
            </button>
            <button
              type="button"
              onClick={() =>
                document.getElementById(plannerIntroId)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="rounded-full border border-line bg-paper px-6 py-3 font-bold text-ink transition hover:border-coral hover:text-coral"
            >
              {language === "en" ? "Edit this simulation" : "Modifier la simulation"}
            </button>
          </div>
        </section>
      ) : null}

    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-2">
      <span className="text-sm font-bold text-ink/88">{label}</span>
      {children}
    </label>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-medium text-ink">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function ResultSummaryStat({
  label,
  value,
  dark = false,
}: {
  label: string;
  value: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.25rem] border p-3.5 ${
        dark ? "border-white/14 bg-white/8" : "border-line/80 bg-white"
      }`}
    >
      <p
        className={`text-xs font-bold uppercase tracking-[0.18em] ${
          dark ? "text-white/68" : "text-slate-500"
        }`}
      >
        {label}
      </p>
      <p className={`mt-2.5 text-xl font-black tracking-tight ${dark ? "text-white" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  label,
  className,
  disabled = false,
  ariaLabel,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      aria-pressed={active}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-center text-sm font-bold leading-tight transition ${
        disabled
          ? active
            ? "bg-coral/80 text-white"
            : "cursor-not-allowed text-ink/35"
          : active
            ? "bg-coral text-white"
            : "text-ink hover:bg-paper"
      } ${className ?? ""}`}
    >
      {label}
    </button>
  );
}
