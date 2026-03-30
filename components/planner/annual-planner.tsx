"use client";

import { useMemo, useRef, useState } from "react";
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
import { formatMonthYear } from "@/lib/formatting";
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
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const resultsRef = useRef<HTMLElement | null>(null);

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
  const previewSegments = plan.segments.slice(0, 3);

  const updatePreference = (preference: SchoolHolidayPreference) => {
    setState((current) => ({
      ...current,
      ...applySchoolHolidayPreference(preference),
    }));
  };
  const zoneSelectionLocked = state.schoolHolidayPreference === "avoid";

  return (
    <div className="space-y-8">
      <section className="site-card p-6 sm:p-8">
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

        <div className="mt-4 flex justify-center">
          <div className="w-full max-w-4xl space-y-4 rounded-[1.8rem] border border-line bg-paper/55 p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-1">
                <p className="editorial-kicker">{language === "en" ? "Strategy" : "Stratégie"}</p>
                <p className="text-sm leading-6 text-ink/72">
                  {language === "en"
                    ? "Choose the balance between efficiency, fairness, and family-friendly results."
                    : "Choisissez l’équilibre entre rendement, régularité et logique familiale."}
                </p>
              </div>
              <div className="grid w-full gap-2 sm:grid-cols-3 lg:max-w-2xl">
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
            </div>
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
          <div className="mt-4 rounded-[1.8rem] border border-line/80 bg-slate-50/70 p-5">
            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-2 rounded-[1.6rem] border border-line/80 bg-white p-4">
                <p className="text-sm font-bold text-ink/72">
                  {language === "en" ? "School zone" : "Zone scolaire"}
                </p>
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
                <p className="text-sm leading-6 text-ink/62">
                  {language === "en"
                    ? "Start with the school zone if you know it. Otherwise use the lookup below."
                    : "Commencez par la zone scolaire si vous la connaissez. Sinon utilisez la recherche ci-dessous."}
                </p>
              </div>

              <div className="space-y-4 rounded-[1.6rem] border border-line/80 bg-white p-4">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-ink/72">
                    {language === "en" ? "School holidays" : "Vacances scolaires"}
                  </p>
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
                    className={`inline-flex h-12 w-full items-center justify-center rounded-full px-6 font-bold transition ${
                        state.schoolHolidayPreference === "avoid"
                          ? "cursor-not-allowed border border-line bg-paper text-ink/40"
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
            </div>
          </div>
        ) : null}
      </section>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() =>
            resultsRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          className="rounded-full bg-coral px-10 py-4 text-lg font-bold text-white shadow-[0_10px_24px_rgba(213,90,29,0.24)] transition hover:-translate-y-0.5 hover:bg-coral/90"
        >
          {language === "en" ? "Calculate annual plan" : "Calculer le plan annuel"}
        </button>
      </div>

      <section ref={resultsRef} className="overflow-hidden rounded-[2rem] border border-line bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-4">
            <p className="editorial-kicker">{language === "en" ? "Annual results" : "Résultats annuels"}</p>
            <h2 className="max-w-3xl text-4xl font-black tracking-tight text-ink sm:text-5xl">
              {language === "en" ? (
                <>
                  Your <span className="text-coral">annual</span> bridge plan
                </>
              ) : (
                <>
                  Votre plan <span className="text-coral">annuel</span> de ponts
                </>
              )}
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-ink/72">
              {language === "en"
                ? `A full-year view for ${state.year}, keeping the leave budget under control.`
                : `Une vue annuelle pour ${state.year}, tout en gardant le budget sous contrôle.`}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-bold text-ink">
                {state.year}
              </span>
              <span className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-bold text-ink">
                {language === "en"
                  ? `Budget: ${state.paidLeaveBudget} days`
                  : `Budget : ${state.paidLeaveBudget} jours`}
              </span>
              <span className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-bold text-ink">
                {plan.segments.length} {language === "en" ? "ranked" : "classés"}
              </span>
            </div>
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

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
          <div className="rounded-[1.8rem] border border-line/80 bg-[#f7f9fc] p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-ink/55">
              {language === "en" ? "Efficiency pulse" : "Rythme d’efficacité"}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <StatCard
                label={language === "en" ? "Days off total" : "Jours de repos"}
                value={`${plan.totalDaysOff}`}
              />
              <StatCard
                label={language === "en" ? "Paid leave used" : "Congés payés utilisés"}
                value={`${plan.totalPaidLeaveUsed} ${language === "en" ? "days" : "jours"}`}
              />
              <StatCard
                label={language === "en" ? "RTT used" : "RTT utilisés"}
                value={`${plan.totalRttUsed} ${language === "en" ? "days" : "jours"}`}
              />
              <StatCard
                label={language === "en" ? "Budget left" : "Budget restant"}
                value={`${plan.remainingBudget} ${language === "en" ? "days" : "jours"}`}
              />
            </div>

            {previewSegments.length > 0 ? (
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-ink/55">
                  {language === "en" ? "Top segments" : "Meilleurs segments"}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {previewSegments.map((segment, index) => (
                    <article
                      key={`${segment.period.startDate.toISOString()}-${segment.period.endDate.toISOString()}`}
                      className="rounded-[1.4rem] border border-line/80 bg-white p-4 shadow-[0_10px_24px_rgba(31,68,113,0.03)]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                          {formatMonthYear(segment.month, state.year, language)}
                        </p>
                        <span className="rounded-full border border-line bg-paper px-2.5 py-1 text-[11px] font-bold text-ink">
                          #{index + 1}
                        </span>
                      </div>
                      <p className="mt-3 text-2xl font-black tracking-tight text-ink">
                        {segment.period.totalDaysOff}{" "}
                        <span className="text-sm font-bold text-ink/72">
                          {language === "en" ? "days" : "jours"}
                        </span>
                      </p>
                      <p className="mt-2 text-sm leading-6 text-ink/72">
                        {language === "en"
                          ? `${segment.period.paidLeaveDaysUsed} leave days • score ${segment.period.worthScore.toFixed(1)}`
                          : `${segment.period.paidLeaveDaysUsed} jours posés • score ${segment.period.worthScore.toFixed(1)}`}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6 rounded-[1.5rem] bg-white p-5 shadow-[0_10px_28px_rgba(31,68,113,0.04)]">
              <p className="text-sm font-semibold text-ink/70">
                {language === "en"
                  ? "This annual plan keeps the strongest segments first while preserving your budget."
                  : "Ce plan annuel garde les meilleurs segments en premier tout en préservant votre budget."}
              </p>
            </div>
          </div>

          <div className="rounded-[1.8rem] bg-[#2f5686] p-5 text-white shadow-[0_18px_40px_rgba(47,86,134,0.16)] sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/72">
              {language === "en" ? "Quick preview" : "Aperçu rapide"}
            </p>
            <div className="mt-4 flex items-end gap-2">
              <p className="text-6xl font-black tracking-tight text-white">{plan.totalDaysOff}</p>
              <span className="pb-2 text-xl font-bold text-white/92">
                {language === "en" ? "days" : "jours"}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-base leading-7 text-white/80">
              {language === "en"
                ? "Potential days off found across the whole year."
                : "Jours de repos potentiels trouvés sur l’année entière."}
            </p>

            <div className="mt-6 grid gap-3">
              <StatCard
                dark
                label={language === "en" ? "Segments retained" : "Ponts retenus"}
                value={`${plan.segments.length}`}
              />
              <StatCard
                dark
                label={language === "en" ? "Paid leave used" : "Congés payés utilisés"}
                value={`${plan.totalPaidLeaveUsed}`}
              />
              <StatCard
                dark
                label={language === "en" ? "Budget left" : "Budget restant"}
                value={`${plan.remainingBudget}`}
              />
            </div>

            <p className="mt-6 text-sm leading-7 text-white/70">
              {language === "en"
                ? "Tune the strategy or budget if you want a different yearly balance."
                : "Ajustez la stratégie ou le budget si vous voulez un autre équilibre annuel."}
            </p>
          </div>
        </div>
      </section>

      <section className="site-card p-6 sm:p-8">
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
        </div>

        {plan.segments.length === 0 ? (
          <div className="mt-6 rounded-[1.8rem] border border-dashed border-line/80 bg-slate-50/70 p-8 text-center">
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
    <article className="site-card h-full min-h-[138px] p-5">
      <p className="editorial-kicker">{label}</p>
      <p className="mt-3 text-4xl font-black tracking-tight text-ink">{value}</p>
    </article>
  );
}

function StatCard({
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
      className={`rounded-[1.35rem] border p-4 ${
        dark ? "border-white/14 bg-white/8" : "border-line/80 bg-white"
      }`}
    >
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${dark ? "text-white/68" : "text-slate-500"}`}>
        {label}
      </p>
      <p className={`mt-3 text-2xl font-black tracking-tight ${dark ? "text-white" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}
