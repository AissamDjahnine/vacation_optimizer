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
import { formatMonthYear } from "@/lib/formatting";
import type { AppLanguage } from "@/lib/i18n";
import { prefixForLanguage } from "@/lib/i18n";
import {
  applySchoolHolidayPreference,
  defaultPlannerState,
  hydratePlannerState,
  plannerPresets,
  type PlannerInitialConfig,
} from "@/lib/planner-config";
import { plannerConfigFromUrlSearchParams } from "@/lib/search-params";
import { routes } from "@/lib/routes";
import { Reveal } from "@/components/motion/reveal";
import { ResultCard } from "@/components/planner/result-card";
import { SkeletonCard } from "@/components/planner/skeleton-card";

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
  const resultsRef = useRef<HTMLElement | null>(null);

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
      ? state.paidLeaveBudget
      : defaultPlannerState.paidLeaveBudget;
  const safeMonthlyRtt =
    Number.isFinite(state.monthlyRtt) && state.monthlyRtt >= 0 && state.monthlyRtt <= 3
      ? state.monthlyRtt
      : defaultPlannerState.monthlyRtt;
  const zoneSelectionLocked = state.schoolHolidayPreference === "avoid";

  useEffect(() => {
    if (!hasSearchedOnce) {
      return;
    }

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
  }, [hasSearchedOnce, safeYear, state.schoolZone]);

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
    const usedBudget = periods.reduce((sum, period) => sum + period.paidLeaveDaysUsed, 0);

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

  const applyPreset = (presetState: Partial<PlannerState>) => {
    setState((current) => ({ ...current, ...presetState }));
    setVisibleResultCount(5);
    setHasSearchedOnce(true);
  };

  const updateSchoolPreference = (preference: SchoolHolidayPreference) => {
    setState((current) => ({
      ...current,
      ...applySchoolHolidayPreference(preference),
    }));
  };

  const submit = () => {
    setHasSearchedOnce(true);
    setVisibleResultCount(5);
  };

  useEffect(() => {
    if (!hasSearchedOnce || !computation || loading) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [computation, hasSearchedOnce, loading]);

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
        <section className="space-y-5 text-center">
          <h2 className="text-5xl font-black tracking-tight text-ink sm:text-6xl">
            {language === "en"
              ? "French leave planner and bridge ideas"
              : "Simulateur de ponts et congés 2026"}
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-ink/80">
            {language === "en"
              ? "Pick a month, your leave budget, and compare the bridge ideas that give you the most days off."
              : "Choisissez un mois, un budget, puis regardez quelles dates vous donnent le plus de jours de repos."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={prefixForLanguage(routes.annualPlannerYear(safeYear), language)}
              className="rounded-full border border-line bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-coral hover:text-coral"
            >
              {language === "en" ? "Plan the full year" : "Planifier toute l’année"}
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="grid gap-4 lg:grid-cols-3">
          {plannerPresets.map((preset) => (
            <button
              key={preset.frTitle}
              type="button"
              onClick={() => applyPreset(preset.state)}
              aria-label={
                language === "en"
                  ? `Test preset: ${preset.enTitle}`
                  : `Tester le scénario : ${preset.frTitle}`
              }
              className="cursor-pointer rounded-4xl border border-line bg-white p-6 text-left shadow-card transition hover:-translate-y-1 hover:border-coral hover:shadow-soft"
            >
              <p className="text-2xl font-black tracking-tight text-ink">
                {language === "en" ? preset.enTitle : preset.frTitle}
              </p>
              <p className="mt-3 text-base leading-7 text-ink/80">
                {language === "en" ? preset.enBody : preset.frBody}
              </p>
              <span className="mt-5 inline-flex font-bold text-coral">
                {language === "en" ? "Test" : "Tester"}
              </span>
            </button>
          ))}
        </section>
      </Reveal>

      <Reveal>
        <section className="glass-panel rounded-[2.2rem] p-5 sm:p-8">
          <div className="grid gap-6 xl:grid-cols-[1fr_auto]">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="inline-flex rounded-full border border-ink bg-white p-1">
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

              <div className="rounded-4xl border border-line bg-white p-5">
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
                      ? "A department code, department name, or academy is enough. The planner will keep the manual A/B/C toggle afterwards."
                      : "Un numéro de département, un nom de département ou une académie suffit. Le simulateur garde ensuite le réglage manuel A/B/C."
                  }
                  className="mb-5 bg-paper shadow-none"
                />

                <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr_1fr_auto_1.25fr] xl:items-start">
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
                      className="h-12 w-full rounded-2xl border border-line bg-paper px-4 font-semibold text-ink"
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
                      className="h-12 w-full rounded-2xl border border-line bg-paper px-4 font-semibold text-ink"
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
                      className="h-12 w-full rounded-2xl border border-line bg-paper px-4 font-semibold text-ink"
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
                  <Field
                    label={
                      language === "en" ? "French school zone (A, B or C)" : "Zone scolaire"
                    }
                  >
                    <div
                      aria-label={language === "en" ? "Choose school zone" : "Choisir la zone scolaire"}
                      role="group"
                      className={`inline-flex rounded-full border border-ink bg-white p-1 ${
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
                  <Field label={language === "en" ? "School holidays" : "Vacances scolaires"}>
                    <div
                      aria-label={
                        language === "en"
                          ? "Choose school holiday preference"
                          : "Choisir la préférence vacances scolaires"
                      }
                      role="group"
                      className="grid w-full grid-cols-3 rounded-full border border-ink bg-white p-1"
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
                  </Field>
                </div>

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
                    className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition ${
                      state.schoolHolidayPreference === "avoid"
                        ? "cursor-not-allowed border border-line bg-paper text-ink/40"
                        : state.allowSchoolHolidayOverlap
                          ? "bg-ink text-white"
                          : "border border-line bg-white text-ink"
                    }`}
                  >
                    {state.allowSchoolHolidayOverlap ? "✓ " : ""}
                    {language === "en"
                      ? "Allow overlap with school holidays"
                      : "Autoriser le chevauchement avec les vacances scolaires"}
                  </button>
              </div>

              <div className="rounded-4xl border border-line bg-white p-6">
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
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={submit}
                  className="rounded-full bg-coral px-10 py-4 text-lg font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  {language === "en" ? "Calculate my best bridges" : "Calculer mes meilleurs ponts"}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-4 text-sm text-ink">
                <LegendItem color="bg-sand" label={language === "en" ? "Public holiday" : "Férié"} />
                <LegendItem color="bg-mint" label={language === "en" ? "Weekend" : "Week-end"} />
                <LegendItem color="bg-lavender" label="RTT" />
                <LegendItem color="bg-peach" label={language === "en" ? "Paid leave" : "Congé payé"} />
                <LegendItem
                  color="bg-violet-400"
                  label={language === "en" ? "School holidays" : "Vacances scolaires"}
                />
                <div className="group relative inline-flex items-center">
                  <button
                    type="button"
                    aria-label={language === "en" ? "Score explanation" : "Explication du score"}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-sm font-bold text-ink transition hover:border-coral hover:text-coral"
                  >
                    ?
                  </button>
                  <div className="pointer-events-none absolute bottom-full right-0 z-20 mb-3 w-64 rounded-2xl border border-line bg-white p-3 text-left text-xs font-medium leading-5 text-ink opacity-0 shadow-card transition duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                    {language === "en"
                      ? "Score compares the total days off to the paid leave days you actually book."
                      : "Le score compare le nombre total de jours de repos aux jours de congé payé réellement posés."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {hasSearchedOnce ? (
        <section ref={resultsRef} className="glass-panel rounded-[2.25rem] p-6 sm:p-8">
            <div className="space-y-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="section-title">
                    {language === "en" ? "Recommended bridges" : "Ponts recommandés"}
                  </h2>
                  <CounterPill value={computation?.periods.length ?? 0} suffix={language === "en" ? "options ranked" : "options classées"} />
                  <span className="chip">{formatMonthYear(safeMonth, safeYear, language)}</span>
                  <span className="chip">
                    {language === "en" ? "Budget" : "Budget"} : {safePaidLeaveBudget}{" "}
                    {language === "en" ? "days" : "jours"}
                  </span>
                </div>
                </div>

                <div className="flex shrink-0 flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => shiftMonth(-1)}
                    className="rounded-full border border-ink px-6 py-3 font-bold text-ink transition hover:bg-ink hover:text-white"
                  >
                    {language === "en" ? "Previous month" : "Mois précédent"}
                  </button>
                  <button
                    type="button"
                    onClick={() => shiftMonth(1)}
                    className="rounded-full border border-ink px-6 py-3 font-bold text-ink transition hover:bg-ink hover:text-white"
                  >
                    {language === "en" ? "Next month" : "Mois suivant"}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-ink/82">
                  {computation?.exact
                    ? language === "en"
                      ? `Exact results for ${formatMonthYear(safeMonth, safeYear, language)}.`
                      : `Résultats exacts pour ${formatMonthYear(safeMonth, safeYear, language)}.`
                    : language === "en"
                      ? `No exact bridge uses the full budget. Here are the closest useful suggestions for ${formatMonthYear(
                          safeMonth,
                          safeYear,
                          language,
                        )}.`
                      : `Aucun pont exact n’utilise tout le budget. Voici les suggestions utiles les plus proches pour ${formatMonthYear(
                          safeMonth,
                          safeYear,
                          language,
                        )}.`}
                </p>
                <p className="font-semibold text-ink/80">
                  {language === "en"
                    ? `If you kept every displayed suggestion, the cumulative total would be ${computation?.usedBudget ?? 0} paid leave day${(computation?.usedBudget ?? 0) > 1 ? "s" : ""}.`
                    : `Si vous gardiez toutes les suggestions affichées, le total cumulé serait de ${computation?.usedBudget ?? 0} jour${(computation?.usedBudget ?? 0) > 1 ? "s" : ""} de congé payé.`}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {loading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : computation && computation.periods.length > 0 ? (
                visiblePeriods.map((period, index) => (
                  <div
                    key={`${period.startDate.toISOString()}-${period.endDate.toISOString()}-${index}`}
                  >
                    <ResultCard
                      language={language}
                      period={period}
                      rank={index + 1}
                      highlighted={index === 0}
                    />
                  </div>
                ))
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
              <div className="mt-8 flex justify-center">
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
            ? "bg-coral/75 text-white"
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

function CounterPill({ value, suffix }: { value: number; suffix: string }) {
  return (
    <span className="rounded-full bg-mint px-5 py-3 text-sm font-bold text-emerald-800">
      {value} {suffix}
    </span>
  );
}
