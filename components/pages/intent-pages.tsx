import { AuthorityBlock } from "@/components/content/authority-block";
import { HolidayTable } from "@/components/content/holiday-table";
import { SchoolPeriodCard } from "@/components/content/school-period-card";
import { GenericGuidePage } from "@/components/pages/generic-guide-page";
import { ResultCard } from "@/components/planner/result-card";
import { ZoneLookupPanel } from "@/components/planner/zone-lookup-panel";
import {
  ascension2026Content,
  buildLeaveBudgetGuide2026Content,
  buildSchoolZone2026Content,
  mayBridges2026Content,
  weekdayHolidays2026Content,
} from "@/content/intent-pages";
import { schoolAuthority2026Block } from "@/content/official-cases";
import { DateOptimizer } from "@/lib/domain/date-optimizer";
import type { Holiday, SchoolHolidayPeriod } from "@/lib/domain/types";
import { formatMonthYear } from "@/lib/formatting";
import type { AppLanguage } from "@/lib/i18n";
import { prefixForLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";

export function Ascension2026Page({
  language,
  holidays,
}: {
  language: AppLanguage;
  holidays: Holiday[];
}) {
  const results = DateOptimizer.findFlexiblePeriods({
    holidays,
    vacationDaysToUse: 5,
    availableRttDays: 0,
    year: 2026,
    month: 5,
  })
    .filter((period) =>
      period.includedHolidays.some((holiday) => holiday.localName.toLowerCase().includes("ascension")),
    )
    .slice(0, 2);

  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: "Ascension", en: "Ascension" }}
      content={ascension2026Content}
      extraBlocks={
        <div className="grid gap-6">
          <AuthorityBlock block={schoolAuthority2026Block} language={language} />
          <section className="editorial-panel">
            <div className="space-y-3">
              <p className="editorial-kicker">{language === "en" ? "Cases to test" : "Cas à tester"}</p>
              <h2 className="text-3xl font-black tracking-tight text-ink">
                {language === "en"
                  ? "Two clean Ascension setups to compare"
                  : "Deux configurations Ascension à comparer"}
              </h2>
            </div>
            <div className="mt-6 space-y-6">
              {results.map((period, index) => (
                <ResultCard
                  key={`${period.startDate.toISOString()}-${period.endDate.toISOString()}`}
                  language={language}
                  period={period}
                  rank={index + 1}
                  highlighted={index === 0}
                />
              ))}
            </div>
          </section>
        </div>
      }
    />
  );
}

export function MayBridges2026Page({
  language,
  holidays,
}: {
  language: AppLanguage;
  holidays: Holiday[];
}) {
  const mayResults = DateOptimizer.findFlexiblePeriods({
    holidays,
    vacationDaysToUse: 5,
    availableRttDays: 0,
    year: 2026,
    month: 5,
  }).slice(0, 3);

  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: "Mai 2026", en: "May 2026" }}
      content={mayBridges2026Content}
      extraBlocks={
        <section className="editorial-panel">
          <div className="space-y-3">
            <p className="editorial-kicker">{language === "en" ? "Shortlist" : "Short-list"}</p>
            <h2 className="text-3xl font-black tracking-tight text-ink">
              {language === "en"
                ? "The first May cases worth opening"
                : "Les premiers cas de mai à ouvrir"}
            </h2>
          </div>
          <div className="mt-6 space-y-6">
            {mayResults.map((period, index) => (
              <ResultCard
                key={`${period.startDate.toISOString()}-${period.endDate.toISOString()}`}
                language={language}
                period={period}
                rank={index + 1}
                highlighted={index === 0}
              />
            ))}
          </div>
        </section>
      }
    />
  );
}

export function SchoolZone2026Page({
  language,
  zone,
  periods,
}: {
  language: AppLanguage;
  zone: "A" | "B" | "C";
  periods: SchoolHolidayPeriod[];
}) {
  const yearPeriods = dedupePeriods(
    periods.filter((period) => period.startDate.getFullYear() === 2026 || period.endDate.getFullYear() === 2026),
  );

  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: `Zone ${zone}`, en: `Zone ${zone}` }}
      content={buildSchoolZone2026Content(zone)}
      extraBlocks={
        <div className="grid gap-6">
          <ZoneLookupPanel
            language={language}
            title={language === "en" ? "Need to confirm your zone?" : "Besoin de confirmer votre zone ?"}
            subtitle={
              language === "en"
                ? "Use a department code, department name or academy. If your lookup lands on another zone, switch there before testing the examples below."
                : "Utilisez un numéro de département, un nom de département ou une académie. Si la recherche vous mène vers une autre zone, basculez dessus avant de tester les exemples ci-dessous."
            }
            actionHrefTemplate={`${routes.home}?zone={zone}`}
            actionLabel={language === "en" ? "Open the planner with this zone" : "Ouvrir le simulateur avec cette zone"}
          />
          <section className="editorial-panel">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="editorial-kicker">{language === "en" ? "Fast view" : "Vue rapide"}</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">
                  {language === "en"
                    ? `School breaks for zone ${zone} in 2026`
                    : `Vacances scolaires pour la zone ${zone} en 2026`}
                </h2>
              </div>
              <span className="chip">
                {yearPeriods.length} {language === "en" ? "periods" : "périodes"}
              </span>
            </div>
            <div className="mt-6 editorial-grid">
              {yearPeriods.map((period) => (
                <SchoolPeriodCard
                  key={`${period.description}-${period.startDate.toISOString()}`}
                  period={period}
                  language={language}
                />
              ))}
            </div>
          </section>
        </div>
      }
    />
  );
}

export function WeekdayHolidays2026Page({
  language,
  holidays,
}: {
  language: AppLanguage;
  holidays: Holiday[];
}) {
  const weekdayHolidays = holidays.filter((holiday) => {
    const day = holiday.date.getDay();
    return day !== 0 && day !== 6;
  });

  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: "Semaine", en: "Weekdays" }}
      content={weekdayHolidays2026Content}
      extraBlocks={
        <section className="editorial-panel">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="editorial-kicker">{language === "en" ? "Useful list" : "Liste utile"}</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">
                {language === "en"
                  ? "The holidays worth opening first"
                  : "Les jours fériés à ouvrir en premier"}
              </h2>
            </div>
            <span className="chip">
              {weekdayHolidays.length} {language === "en" ? "weekday holidays" : "fériés en semaine"}
            </span>
          </div>
          <div className="mt-6">
            <HolidayTable holidays={weekdayHolidays} language={language} showWeekendColumn />
          </div>
        </section>
      }
    />
  );
}

export function LeaveBudgetGuide2026Page({
  language,
  budget,
  holidays,
}: {
  language: AppLanguage;
  budget: 5 | 10;
  holidays: Holiday[];
}) {
  const strongestMonths = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    return (
      DateOptimizer.findFlexiblePeriods({
        holidays,
        vacationDaysToUse: budget,
        availableRttDays: budget >= 10 ? 1 : 0,
        year: 2026,
        month,
      })[0] ?? null
    );
  })
    .filter((period): period is NonNullable<typeof period> => Boolean(period))
    .sort((left, right) => right.rankingScore - left.rankingScore)
    .slice(0, 3);

  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: `${budget} jours`, en: `${budget} days` }}
      content={buildLeaveBudgetGuide2026Content(budget)}
      extraBlocks={
        <section className="editorial-panel">
          <div className="space-y-3">
            <p className="editorial-kicker">{language === "en" ? "Examples" : "Exemples"}</p>
            <h2 className="text-3xl font-black tracking-tight text-ink">
              {language === "en"
                ? `Three strong openings for a ${budget}-day budget`
                : `Trois bonnes entrées pour un budget de ${budget} jours`}
            </h2>
            <p className="text-base leading-7 text-ink/72">
              {language === "en"
                ? "These cards are not meant to replace your own simulation. They show the kinds of months that deserve to be opened first."
                : "Ces cartes ne remplacent pas votre propre simulation. Elles montrent les types de mois qui méritent d’être ouverts en premier."}
            </p>
          </div>
          <div className="mt-6 space-y-6">
            {strongestMonths.map((period, index) => (
              <ResultCard
                key={`${period.startDate.toISOString()}-${period.endDate.toISOString()}`}
                language={language}
                period={period}
                rank={index + 1}
                highlighted={index === 0}
              />
            ))}
          </div>
        </section>
      }
    />
  );
}

function dedupePeriods(periods: SchoolHolidayPeriod[]) {
  const unique = new Map<string, SchoolHolidayPeriod>();
  for (const period of periods) {
    const signature = [
      period.description.trim(),
      period.startDate.toISOString(),
      period.endDate.toISOString(),
      period.zone.trim(),
      period.schoolYear.trim(),
    ].join("_");
    if (!unique.has(signature)) {
      unique.set(signature, period);
    }
  }

  return [...unique.values()].sort((left, right) => left.startDate.getTime() - right.startDate.getTime());
}
