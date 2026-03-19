"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { AuthorityBlock } from "@/components/content/authority-block";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { ContentHero } from "@/components/content/content-hero";
import { PageShell, defaultPageAside } from "@/components/content/page-shell";
import { RelatedLinks } from "@/components/content/related-links";
import { SchoolPeriodCard } from "@/components/content/school-period-card";
import { Reveal } from "@/components/motion/reveal";
import { ZoneLookupPanel } from "@/components/planner/zone-lookup-panel";
import { schoolAuthority2026Block } from "@/content/official-cases";
import type { SchoolHolidayPeriod } from "@/lib/domain/types";
import type { AppLanguage } from "@/lib/i18n";
import { prefixForLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";

function supportedNeighborYears(year: number) {
  return [year - 1, year + 1].filter((candidate) => candidate >= 2026 && candidate <= 2029);
}

export function SchoolHolidaysBridgesYearPage({
  language,
  year,
  initialZone,
  periodsByZone,
}: {
  language: AppLanguage;
  year: number;
  initialZone: "A" | "B" | "C";
  periodsByZone: Record<"A" | "B" | "C", SchoolHolidayPeriod[]>;
}) {
  const [zone, setZone] = useState<"A" | "B" | "C">(initialZone);
  const [showAllPeriods, setShowAllPeriods] = useState(false);
  const periodsByZoneForYear = useMemo(
    () => normalizePeriodsByZone(periodsByZone, year),
    [periodsByZone, year],
  );
  const periods = periodsByZoneForYear[zone] ?? [];
  const zoneSummary = periodsByZoneForYear[zone];
  const visiblePeriods = showAllPeriods ? periods : periods.slice(0, 3);
  const hiddenPeriodsCount = Math.max(periods.length - visiblePeriods.length, 0);

  return (
    <PageShell aside={defaultPageAside(language)}>
      <Breadcrumbs
        items={[
          {
            name: language === "en" ? "Home" : "Accueil",
            url: prefixForLanguage(routes.home, language),
          },
          {
            name:
              language === "en"
                ? `School holidays and bridges ${year}`
                : `Vacances scolaires et ponts ${year}`,
            url: prefixForLanguage(routes.schoolHolidaysBridgesYear(year), language),
          },
        ]}
      />
      <ContentHero
        badge={{ fr: "Vacances scolaires", en: "School holidays" }}
        title={{
          fr: `Vacances scolaires et ponts ${year}`,
          en: `School holidays and bridges ${year}`,
        }}
        subtitle={{
          fr: "Les périodes par zone, les cas les plus utiles pour les familles, puis le bon moment pour revenir au simulateur.",
          en: "Periods by zone, the most useful family cases, then the right moment to switch back to the planner.",
        }}
        language={language}
      />

      <ZoneLookupPanel
        language={language}
        title={
          language === "en"
            ? "Do not know your school zone?"
            : "Vous ne connaissez pas votre zone scolaire ?"
        }
        subtitle={
          language === "en"
            ? "A department, an academy or a department code is enough. Once the right zone is found, you can compare the cards below faster."
            : "Un département, une académie ou un code de département suffit. Une fois la bonne zone trouvée, vous comparez les cartes ci-dessous beaucoup plus vite."
        }
        actionHrefTemplate={`${routes.home}?zone={zone}`}
        actionLabel={language === "en" ? "Open the planner with this zone" : "Ouvrir le simulateur avec cette zone"}
      />

      {year === 2026 ? (
        <Reveal>
          <details className="editorial-panel group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div className="space-y-2">
                <p className="editorial-kicker">
                  {language === "en" ? "Official reference" : "Repère officiel"}
                </p>
                <h2 className="text-2xl font-black tracking-tight text-ink">
                  {language === "en"
                    ? "Important official school-break case for families"
                    : "Cas officiel important à garder pour les familles"}
                </h2>
                <p className="text-sm leading-7 text-ink/70">
                  {language === "en"
                    ? "Open this only if you need the exact official wording around the 2026 Ascension bridge."
                    : "Ouvrez ce bloc seulement si vous avez besoin du libellé officiel exact autour du pont scolaire de l’Ascension 2026."}
                </p>
              </div>
              <span className="chip shrink-0 group-open:bg-coral group-open:text-white">
                {language === "en" ? "Show source" : "Voir la source"}
              </span>
            </summary>
            <div className="mt-6">
              <AuthorityBlock block={schoolAuthority2026Block} language={language} />
            </div>
          </details>
        </Reveal>
      ) : null}

      <Reveal>
        <section className="editorial-panel space-y-6">
          <div className="space-y-3">
            <p className="editorial-kicker">{language === "en" ? "How to use this page" : "Comment utiliser cette page"}</p>
            <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {language === "en"
                ? "Start with your zone, then decide if you want to align with school breaks or avoid them"
                : "Commencez par votre zone, puis décidez si vous voulez coller aux vacances ou les éviter"}
            </h2>
            <p className="editorial-lead">
              {language === "en"
                ? "This page helps families read the calendar faster. The planner becomes useful once you want to test a real month with your own leave budget and overlap settings."
                : "Cette page aide surtout les familles à lire le calendrier plus vite. Le simulateur devient utile dès que vous voulez tester un vrai mois avec votre budget et vos réglages de chevauchement."}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(["A", "B", "C"] as const).map((value) => {
              const zonePeriods = periodsByZoneForYear[value];
              const firstPeriod = zonePeriods[0];
              const isActive = value === zone;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setZone(value)}
                  className={`rounded-4xl border p-5 text-left shadow-card transition ${
                    isActive
                      ? "border-coral bg-coral/5 shadow-soft"
                      : "border-line bg-white hover:-translate-y-0.5 hover:border-coral/50 hover:shadow-soft"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="editorial-kicker">
                        {language === "en" ? "Zone" : "Zone"}
                      </p>
                      <p className="mt-2 text-3xl font-black tracking-tight text-ink">{value}</p>
                    </div>
                    <span className="chip !px-3 !py-1.5">
                      {zonePeriods.length}{" "}
                      {language === "en"
                        ? `period${zonePeriods.length > 1 ? "s" : ""}`
                        : `période${zonePeriods.length > 1 ? "s" : ""}`}
                    </span>
                  </div>
                  <p className="mt-4 text-base font-bold text-ink">
                    {firstPeriod
                      ? firstPeriod.description
                      : language === "en"
                        ? "No period visible"
                        : "Aucune période visible"}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ink/72">
                    {firstPeriod
                      ? formatQuickPeriod(firstPeriod, language)
                      : language === "en"
                        ? "No school break overlaps this calendar year in the current dataset."
                        : "Aucune période scolaire ne recoupe cette année civile dans le jeu de données actuel."}
                  </p>
                </button>
              );
            })}
          </div>
          <p className="editorial-note">
            {language === "en"
              ? "Start by picking the right zone. The detailed period cards stay below only for the selected zone, which keeps the page shorter."
              : "Commencez par choisir la bonne zone. Les cartes détaillées ci-dessous restent limitées à la zone sélectionnée, ce qui raccourcit la page."}
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="editorial-panel">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <p className="editorial-kicker">
                {language === "en" ? "Selected zone" : "Zone sélectionnée"}
              </p>
              <h2 className="text-3xl font-black tracking-tight text-ink">
                {language === "en"
                  ? `Fast view for zone ${zone} in ${year}`
                  : `Vue rapide pour la zone ${zone} en ${year}`}
              </h2>
              <p className="editorial-lead max-w-2xl">
                {language === "en"
                  ? "Use this strip to spot the periods that matter first. Then open the full cards only if you need the exact dates."
                  : "Servez-vous de cette bande pour repérer d’abord les périodes utiles. Ouvrez ensuite les cartes complètes seulement si vous avez besoin des dates exactes."}
              </p>
            </div>
            <span className="chip">
              {zoneSummary.length}{" "}
              {language === "en"
                ? `period${zoneSummary.length > 1 ? "s" : ""} in ${year}`
                : `période${zoneSummary.length > 1 ? "s" : ""} en ${year}`}
            </span>
          </div>

          {periods.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {periods.map((period) => (
                <span
                  key={`${period.description}-${period.startDate.toISOString()}-${period.endDate.toISOString()}`}
                  className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700"
                >
                  {period.description} • {formatPeriodMonths(period, language)}
                </span>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-line bg-paper px-5 py-4 text-sm leading-7 text-ink/70">
              {language === "en"
                ? "No school-holiday period is visible for this zone in the selected calendar year."
                : "Aucune période de vacances scolaires n’est visible pour cette zone dans l’année civile choisie."}
            </div>
          )}

          <div className="mt-6 editorial-note">
            {language === "en"
              ? "Practical rule: if a month already contains school holidays, decide early whether you want to extend them, avoid them, or simply tolerate overlap. That choice changes the value of the same bridge."
              : "Règle pratique : si un mois contient déjà des vacances scolaires, décidez tôt si vous voulez les prolonger, les éviter ou simplement tolérer un chevauchement. Ce choix change la valeur d’un même pont."}
          </div>
        </section>
      </Reveal>

      {periods.length > 0 ? (
        <section className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="editorial-kicker">
                {language === "en" ? "Detailed periods" : "Périodes détaillées"}
              </p>
              <h2 className="text-2xl font-black tracking-tight text-ink">
                {language === "en"
                  ? `Full dates for zone ${zone}`
                  : `Dates complètes pour la zone ${zone}`}
              </h2>
            </div>
            {hiddenPeriodsCount > 0 ? (
              <button
                type="button"
                onClick={() => setShowAllPeriods((current) => !current)}
                className="chip border-line bg-white text-ink hover:border-coral hover:text-coral"
              >
                {showAllPeriods
                  ? language === "en"
                    ? "Show fewer periods"
                    : "Afficher moins de périodes"
                  : language === "en"
                    ? `Show ${hiddenPeriodsCount} more`
                    : `Afficher ${hiddenPeriodsCount} période${hiddenPeriodsCount > 1 ? "s" : ""} de plus`}
              </button>
            ) : null}
          </div>

          <div className="grid gap-4">
            {visiblePeriods.map((period) => (
              <SchoolPeriodCard
                key={`${period.description}-${period.startDate.toISOString()}-${period.endDate.toISOString()}`}
                period={period}
                language={language}
              />
            ))}
          </div>
        </section>
      ) : null}

      <RelatedLinks
        title={language === "en" ? "Turn this into a real test" : "Transformer ça en vrai test"}
        language={language}
        links={[
          {
            href: `${routes.home}?zone=${zone}`,
            label: { fr: `Simulateur – zone ${zone}`, en: `Planner – zone ${zone}` },
          },
          {
            href: routes.bridgesYear(year),
            label: { fr: `Ponts ${year}`, en: `Bridge ideas ${year}` },
          },
          {
            href: routes.holidaysYear(year),
            label: { fr: `Jours fériés ${year}`, en: `Public holidays ${year}` },
          },
          ...supportedNeighborYears(year).map((neighborYear) => ({
            href: routes.schoolHolidaysBridgesYear(neighborYear),
            label: {
              fr: `Vacances scolaires et ponts ${neighborYear}`,
              en: `School holidays and bridges ${neighborYear}`,
            },
          })),
          { href: routes.schoolHolidaysFamily2026, label: { fr: "Guide familles 2026", en: "Family guide 2026" } },
          ...(year === 2026
            ? ([
                {
                  href: routes.schoolHolidaysZone2026("A"),
                  label: { fr: "Vacances scolaires 2026 zone A", en: "School holidays 2026 zone A" },
                },
                {
                  href: routes.schoolHolidaysZone2026("B"),
                  label: { fr: "Vacances scolaires 2026 zone B", en: "School holidays 2026 zone B" },
                },
                {
                  href: routes.schoolHolidaysZone2026("C"),
                  label: { fr: "Vacances scolaires 2026 zone C", en: "School holidays 2026 zone C" },
                },
              ] as const)
            : []),
        ]}
      />
    </PageShell>
  );
}

function normalizePeriodsByZone(
  periodsByZone: Record<"A" | "B" | "C", SchoolHolidayPeriod[]>,
  year: number,
) {
  return {
    A: dedupePeriods(periodsByZone.A.filter((period) => overlapsCalendarYear(period, year))),
    B: dedupePeriods(periodsByZone.B.filter((period) => overlapsCalendarYear(period, year))),
    C: dedupePeriods(periodsByZone.C.filter((period) => overlapsCalendarYear(period, year))),
  } satisfies Record<"A" | "B" | "C", SchoolHolidayPeriod[]>;
}

function overlapsCalendarYear(period: SchoolHolidayPeriod, year: number) {
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);
  return period.startDate <= endOfYear && period.endDate >= startOfYear;
}

function dedupePeriods(periods: SchoolHolidayPeriod[]) {
  const unique = new Map<string, SchoolHolidayPeriod>();

  for (const period of periods) {
    const key = [
      period.description.trim(),
      period.startDate.toISOString(),
      period.endDate.toISOString(),
      period.zone.trim(),
      period.schoolYear.trim(),
    ].join("|");

    if (!unique.has(key)) {
      unique.set(key, period);
    }
  }

  return [...unique.values()].sort(
    (left, right) => left.startDate.getTime() - right.startDate.getTime(),
  );
}

function formatPeriodMonths(period: SchoolHolidayPeriod, language: AppLanguage) {
  const locale = language === "en" ? "en-US" : "fr-FR";
  const formatter = new Intl.DateTimeFormat(locale, { month: "long" });
  const startMonth = formatter.format(period.startDate);
  const endMonth = formatter.format(period.endDate);
  return startMonth === endMonth ? startMonth : `${startMonth} → ${endMonth}`;
}

function formatQuickPeriod(period: SchoolHolidayPeriod, language: AppLanguage) {
  const locale = language === "en" ? enUS : fr;
  return `${format(period.startDate, "d MMM", { locale })} ${
    language === "en" ? "to" : "au"
  } ${format(period.endDate, "d MMM yyyy", { locale })}`;
}
