"use client";

import { useMemo, useState } from "react";
import { IcsExportButton } from "@/components/planner/ics-export-button";
import { ResultCard } from "@/components/planner/result-card";
import { DateOptimizer } from "@/lib/domain/date-optimizer";
import type {
  AnnualPlanningStrategy,
  PlannerState,
  SchoolHolidayPreference,
} from "@/lib/domain/types";
import { getHolidaySnapshot, getSchoolHolidaySnapshot } from "@/lib/data-snapshots";
import { plannerYears } from "@/lib/constants";
import type { AppLanguage } from "@/lib/i18n";
import { buildAnnualPlanCalendarBundle } from "@/lib/calendar-export";
import { defaultPlannerState, applySchoolHolidayPreference } from "@/lib/planner-config";

const annualBudgetOptions = [5, 10, 15, 20, 25];

export function AnnualPlanner({
  language,
  year,
}: {
  language: AppLanguage;
  year: number;
}) {
  const [state, setState] = useState<
    Pick<
      PlannerState,
      | "year"
      | "paidLeaveBudget"
      | "monthlyRtt"
      | "schoolZone"
      | "schoolHolidayPreference"
      | "allowSchoolHolidayOverlap"
    > & {
      strategy: AnnualPlanningStrategy;
    }
  >({
    year,
    paidLeaveBudget: 15,
    monthlyRtt: 0,
    schoolZone: "A",
    schoolHolidayPreference: defaultPlannerState.schoolHolidayPreference,
    allowSchoolHolidayOverlap: defaultPlannerState.allowSchoolHolidayOverlap,
    strategy: "max-efficiency",
  });

  const holidays = useMemo(() => getHolidaySnapshot(state.year) ?? [], [state.year]);
  const schoolHolidayPeriods = useMemo(
    () => getSchoolHolidaySnapshot(state.schoolZone),
    [state.schoolZone],
  );

  const plan = useMemo(
    () =>
      DateOptimizer.buildAnnualPlan({
        holidays,
        paidLeaveBudget: state.paidLeaveBudget,
        availableRttDays: state.monthlyRtt,
        year: state.year,
        strategy: state.strategy,
        schoolHolidayPeriods,
        schoolHolidayPreference: state.schoolHolidayPreference,
        allowSchoolHolidayOverlap: state.allowSchoolHolidayOverlap,
      }),
    [
      holidays,
      schoolHolidayPeriods,
      state.allowSchoolHolidayOverlap,
      state.monthlyRtt,
      state.paidLeaveBudget,
      state.schoolHolidayPreference,
      state.schoolZone,
      state.strategy,
      state.year,
    ],
  );

  const updatePreference = (preference: SchoolHolidayPreference) => {
    setState((current) => ({
      ...current,
      ...applySchoolHolidayPreference(preference),
    }));
  };
  const zoneSelectionLocked = state.schoolHolidayPreference === "avoid";

  return (
    <div className="space-y-8">
      <section className="rounded-[2.2rem] border border-line bg-white p-6 shadow-card sm:p-8">
        <div className="space-y-3">
          <p className="editorial-kicker">{language === "en" ? "Annual plan" : "Plan annuel"}</p>
          <h1 className="text-4xl font-black tracking-tight text-ink sm:text-5xl">
            {language === "en"
              ? `Plan your ${state.year} leave budget`
              : `Planifier vos congés ${state.year} sur l’année`}
          </h1>
          <p className="editorial-lead">
            {language === "en"
              ? "Instead of testing one month after another, build a full-year shortlist and keep your budget under control."
              : "Au lieu de tester un mois après l’autre, construisez une sélection annuelle et gardez votre budget sous contrôle."}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-[0.85fr_1fr_0.9fr]">
          <Field label={language === "en" ? "Year" : "Année"}>
            <select
              value={state.year}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  year: Number(event.target.value),
                }))
              }
              className="h-12 w-full rounded-2xl border border-line bg-paper px-4 font-semibold text-ink"
            >
              {plannerYears.map((optionYear) => (
                <option key={optionYear} value={optionYear}>
                  {optionYear}
                </option>
              ))}
            </select>
          </Field>

          <Field label={language === "en" ? "Paid leave budget" : "Budget congés payés"}>
            <select
              value={state.paidLeaveBudget}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  paidLeaveBudget: Number(event.target.value),
                }))
              }
              className="h-12 w-full rounded-2xl border border-line bg-paper px-4 font-semibold text-ink"
            >
              {annualBudgetOptions.map((budget) => (
                <option key={budget} value={budget}>
                  {budget} {language === "en" ? "days" : "jours"}
                </option>
              ))}
            </select>
          </Field>

          <Field label={language === "en" ? "Monthly RTT" : "RTT mensuel"}>
            <select
              value={state.monthlyRtt}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  monthlyRtt: Number(event.target.value),
                }))
              }
              className="h-12 w-full rounded-2xl border border-line bg-paper px-4 font-semibold text-ink"
            >
              {[0, 1, 2, 3].map((rtt) => (
                <option key={rtt} value={rtt}>
                  {rtt === 0
                    ? language === "en"
                      ? "No RTT"
                      : "Sans RTT"
                    : `${rtt} RTT`}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[0.95fr_1.45fr] lg:items-start">
          <Field label={language === "en" ? "School zone" : "Zone scolaire"}>
            <div
              className={`grid w-full grid-cols-3 rounded-full border border-ink bg-white p-1 ${
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
                  className="w-full"
                />
              ))}
            </div>
          </Field>

          <Field label={language === "en" ? "Strategy" : "Stratégie"}>
            <div className="grid w-full grid-cols-1 gap-2 rounded-[1.6rem] border border-line bg-paper/70 p-2 sm:grid-cols-3">
              <ModeButton
                active={state.strategy === "max-efficiency"}
                onClick={() =>
                  setState((current) => ({ ...current, strategy: "max-efficiency" }))
                }
                label={language === "en" ? "Efficiency" : "Rendement"}
                className="w-full"
              />
              <ModeButton
                active={state.strategy === "balanced"}
                onClick={() => setState((current) => ({ ...current, strategy: "balanced" }))}
                label={language === "en" ? "Balanced" : "Équilibré"}
                className="w-full"
              />
              <ModeButton
                active={state.strategy === "family"}
                onClick={() => setState((current) => ({ ...current, strategy: "family" }))}
                label={language === "en" ? "Family" : "Famille"}
                className="w-full"
              />
            </div>
            <p className="max-w-2xl text-sm leading-6 text-ink/62">
              {language === "en"
                ? "Efficiency prioritizes the best ratio. Balanced spreads the effort. Family gives more weight to school-holiday overlap."
                : "Rendement privilégie le meilleur ratio. Équilibré répartit l’effort. Famille donne plus de poids aux chevauchements scolaires."}
            </p>
          </Field>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.45fr] lg:items-start">
          <Field label={language === "en" ? "School holidays" : "Vacances scolaires"}>
            <div className="grid w-full grid-cols-3 rounded-full border border-ink bg-white p-1">
              <ModeButton
                active={state.schoolHolidayPreference === "neutral"}
                onClick={() => updatePreference("neutral")}
                label={language === "en" ? "Neutral" : "Neutre"}
                className="w-full px-2"
              />
              <ModeButton
                active={state.schoolHolidayPreference === "favor"}
                onClick={() => updatePreference("favor")}
                label={language === "en" ? "Favor" : "Favoriser"}
                className="w-full px-2"
              />
              <ModeButton
                active={state.schoolHolidayPreference === "avoid"}
                onClick={() => updatePreference("avoid")}
                label={language === "en" ? "Avoid" : "Éviter"}
                className="w-full px-2"
              />
            </div>
          </Field>

          <Field label={language === "en" ? "Overlap rule" : "Chevauchement"}>
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
              className={`inline-flex h-12 w-full items-center justify-center rounded-full px-6 font-bold transition sm:w-auto ${
                state.schoolHolidayPreference === "avoid"
                  ? "cursor-not-allowed border border-line bg-paper text-ink/40"
                  : "bg-ink text-white"
              }`}
            >
              {state.allowSchoolHolidayOverlap ? "✓ " : ""}
              {language === "en"
                ? "Allow overlap with school holidays"
                : "Autoriser le chevauchement avec les vacances scolaires"}
            </button>
          </Field>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label={language === "en" ? "Segments retained" : "Ponts retenus"}
          value={String(plan.segments.length)}
        />
        <SummaryCard
          label={language === "en" ? "Paid leave used" : "Congés payés utilisés"}
          value={`${plan.totalPaidLeaveUsed} ${language === "en" ? "days" : "jours"}`}
        />
        <SummaryCard
          label={language === "en" ? "Days off total" : "Jours de repos au total"}
          value={`${plan.totalDaysOff}`}
        />
        <SummaryCard
          label={language === "en" ? "Budget left" : "Budget restant"}
          value={`${plan.remainingBudget} ${language === "en" ? "days" : "jours"}`}
        />
      </section>

      <section className="rounded-[2.1rem] border border-line bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="editorial-kicker">{language === "en" ? "Year overview" : "Vue d’ensemble"}</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">
              {language === "en"
                ? "Suggested annual plan"
                : "Plan annuel suggéré"}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-ink/72">
              {language === "en"
                ? "This first version keeps the strongest non-overlapping periods while preserving your budget."
                : "Cette sélection est optimisée pour le rendement et reste dans votre budget."}
            </p>
          </div>
          {plan.segments.length > 0 ? (
            <IcsExportButton
              bundle={buildAnnualPlanCalendarBundle({
                plan,
                language,
                year: state.year,
              })}
              analyticsContext="annual_planner"
              label={
                language === "en"
                  ? "Export annual plan (.ics)"
                  : "Exporter le plan annuel (.ics)"
              }
            />
          ) : null}
        </div>

        {plan.segments.length === 0 ? (
          <div className="mt-6 rounded-4xl border border-dashed border-line bg-paper p-8 text-center">
            <h3 className="text-3xl font-black tracking-tight text-ink">
              {language === "en"
                ? "No useful annual plan found"
                : "Aucun plan annuel utile trouvé"}
            </h3>
            <p className="mt-4 text-base leading-7 text-ink/72">
              {language === "en"
                ? "Try another strategy, increase the budget, or loosen the school-holiday rule."
                : "Essayez une autre stratégie, augmentez le budget ou assouplissez la règle vacances scolaires."}
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {plan.segments.map((segment, index) => (
              <ResultCard
                key={`${segment.period.startDate.toISOString()}-${segment.period.endDate.toISOString()}`}
                language={language}
                period={segment.period}
                rank={index + 1}
                highlighted={index === 0}
              />
            ))}
          </div>
        )}
      </section>
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
      <span className="text-sm font-bold text-ink/72">{label}</span>
      {children}
    </label>
  );
}

function ModeButton({
  active,
  onClick,
  label,
  className,
  disabled = false,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-12 items-center justify-center rounded-full border px-4 text-center text-sm font-bold leading-tight whitespace-nowrap transition ${
        disabled
          ? active
            ? "border-coral bg-coral/75 text-white"
            : "cursor-not-allowed border-line bg-white text-ink/35"
          : active
            ? "border-coral bg-coral text-white"
            : "border-line bg-white text-ink hover:border-coral"
      } ${className ?? ""}`}
    >
      {label}
    </button>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <article className="h-full min-h-[138px] rounded-4xl border border-line bg-white p-5 shadow-card">
      <p className="editorial-kicker">{label}</p>
      <p className="mt-3 text-4xl font-black tracking-tight text-ink">{value}</p>
    </article>
  );
}
