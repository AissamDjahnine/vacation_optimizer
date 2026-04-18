import { AuthorityBlock } from "@/components/content/authority-block";
import { FaqListSection } from "@/components/content/faq-list-section";
import { HolidayTable } from "@/components/content/holiday-table";
import { SchoolPeriodCard } from "@/components/content/school-period-card";
import { GenericGuidePage } from "@/components/pages/generic-guide-page";
import { ResultCard } from "@/components/planner/result-card";
import { ZoneLookupPanel } from "@/components/planner/zone-lookup-panel";
import {
  allSaints2026Content,
  ascension2026Content,
  assumption2026Content,
  armistice2026Content,
  buildLeaveBudgetGuide2026Content,
  buildSchoolZone2026Content,
  mayBridges2026Content,
  rtt2027Content,
  yearEnd2026Content,
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
      path={prefixForLanguage(routes.ascension2026, language)}
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
                  travelSource="guide_page"
                  pageType="guide_page"
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
      path={prefixForLanguage(routes.mayBridges2026, language)}
      extraBlocks={
        <div className="grid gap-6">
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
                  travelSource="guide_page"
                  pageType="guide_page"
                />
              ))}
            </div>
          </section>
          <FaqListSection
            kicker={language === "en" ? "FAQ" : "FAQ"}
            schemaId={`faq-may-bridges-2026-${language}`}
            title={language === "en" ? "Questions about May bridge days" : "Questions fréquentes sur les ponts de mai"}
            items={
              language === "en"
                ? [
                    {
                      question: "Which May holiday should I test first in 2026?",
                      answer:
                        "Start with the first card on this page, then compare it with the other May windows using your exact leave budget in the planner.",
                    },
                    {
                      question: "Why are May bridge days so valuable?",
                      answer:
                        "May often clusters public holidays close to weekends, which makes it one of the fastest months for finding long breaks with few leave days.",
                    },
                  ]
                : [
                    {
                      question: "Quel pont de mai faut-il tester en premier en 2026 ?",
                      answer:
                        "Commencez par la première carte de cette page, puis comparez-la aux autres fenêtres de mai avec votre budget exact dans le simulateur.",
                    },
                    {
                      question: "Pourquoi les ponts de mai sont-ils si utiles ?",
                      answer:
                        "Mai regroupe souvent plusieurs jours fériés proches des week-ends, ce qui en fait l’un des mois les plus rapides pour obtenir de longues coupures avec peu de jours posés.",
                    },
                  ]
            }
          />
        </div>
      }
    />
  );
}

export function Armistice2026Page({
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
    month: 11,
  }).slice(0, 2);

  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: "11 novembre", en: "11 November" }}
      content={armistice2026Content}
      path={prefixForLanguage(routes.armistice2026, language)}
      extraBlocks={
        <section className="editorial-panel">
          <div className="space-y-3">
            <p className="editorial-kicker">{language === "en" ? "Autumn examples" : "Exemples d’automne"}</p>
            <h2 className="text-3xl font-black tracking-tight text-ink">
              {language === "en" ? "Two November setups to compare" : "Deux configurations de novembre à comparer"}
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
                travelSource="guide_page"
                pageType="guide_page"
              />
            ))}
          </div>
        </section>
      }
    />
  );
}

export function YearEnd2026Page({
  language,
  holidays,
}: {
  language: AppLanguage;
  holidays: Holiday[];
}) {
  const decemberResults = DateOptimizer.findFlexiblePeriods({
    holidays,
    vacationDaysToUse: 5,
    availableRttDays: 0,
    year: 2026,
    month: 12,
  }).slice(0, 2);

  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: "Fin d’année 2026", en: "Late year 2026" }}
      content={yearEnd2026Content}
      path={prefixForLanguage(routes.yearEnd2026, language)}
      extraBlocks={
        <section className="editorial-panel">
          <div className="space-y-3">
            <p className="editorial-kicker">{language === "en" ? "Late-year checks" : "Vérifications de fin d’année"}</p>
            <h2 className="text-3xl font-black tracking-tight text-ink">
              {language === "en" ? "What December still makes possible" : "Ce que décembre permet encore"}
            </h2>
          </div>
          <div className="mt-6 space-y-6">
            {decemberResults.map((period, index) => (
              <ResultCard
                key={`${period.startDate.toISOString()}-${period.endDate.toISOString()}`}
                language={language}
                period={period}
                rank={index + 1}
                highlighted={index === 0}
                travelSource="guide_page"
                pageType="guide_page"
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
      path={prefixForLanguage(routes.schoolHolidaysZone2026(zone), language)}
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
      path={prefixForLanguage(routes.weekdayHolidays2026, language)}
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

export function Rtt2027Page({
  language,
  holidays,
}: {
  language: AppLanguage;
  holidays: Holiday[];
}) {
  const strongestMonths = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    return (
      DateOptimizer.findFlexiblePeriods({
        holidays,
        vacationDaysToUse: 5,
        availableRttDays: 1,
        year: 2027,
        month,
      })[0] ?? null
    );
  })
    .filter((period): period is NonNullable<typeof period> => Boolean(period))
    .sort((left, right) => right.rankingScore - left.rankingScore)
    .slice(0, 3);

  const annualPlan = DateOptimizer.buildAnnualPlan({
    holidays,
    paidLeaveBudget: 10,
    availableRttDays: 1,
    year: 2027,
    strategy: "balanced",
  });

  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: "RTT 2027", en: "RTT 2027" }}
      content={rtt2027Content}
      path={prefixForLanguage(routes.rtt2027, language)}
      extraBlocks={
        <div className="grid gap-6">
          <section className="editorial-panel">
            <div className="space-y-3">
              <p className="editorial-kicker">{language === "en" ? "Top RTT openings" : "Premiers cas RTT"}</p>
              <h2 className="text-3xl font-black tracking-tight text-ink">
                {language === "en"
                  ? "Three 2027 setups where one RTT changes the result"
                  : "Trois configurations 2027 où 1 RTT change vraiment le résultat"}
              </h2>
              <p className="text-base leading-7 text-ink/72">
                {language === "en"
                  ? "These examples use 1 RTT day plus up to 5 paid leave days to show where the leverage is highest."
                  : "Ces exemples utilisent 1 RTT plus jusqu’à 5 jours de congés payés pour montrer où le levier est le plus fort."}
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
                  travelSource="guide_page"
                  pageType="guide_page"
                />
              ))}
            </div>
          </section>
          <section className="editorial-panel">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="editorial-kicker">{language === "en" ? "Annual reading" : "Lecture annuelle"}</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">
                  {language === "en"
                    ? "A balanced 2027 plan with RTT in the mix"
                    : "Un plan 2027 équilibré avec RTT dans l’équation"}
                </h2>
              </div>
              <span className="chip">
                {annualPlan.totalDaysOff} {language === "en" ? "days off" : "jours de repos"}
              </span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <article className="editorial-panel-muted">
                <p className="editorial-kicker">{language === "en" ? "Paid leave used" : "Congés payés utilisés"}</p>
                <p className="mt-3 text-4xl font-black tracking-tight text-ink">{annualPlan.totalPaidLeaveUsed}</p>
              </article>
              <article className="editorial-panel-muted">
                <p className="editorial-kicker">{language === "en" ? "RTT used" : "RTT utilisés"}</p>
                <p className="mt-3 text-4xl font-black tracking-tight text-ink">{annualPlan.totalRttUsed}</p>
              </article>
              <article className="editorial-panel-muted">
                <p className="editorial-kicker">{language === "en" ? "Selected blocks" : "Blocs retenus"}</p>
                <p className="mt-3 text-4xl font-black tracking-tight text-ink">{annualPlan.segments.length}</p>
              </article>
            </div>
          </section>
        </div>
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
      path={prefixForLanguage(
        budget === 5 ? routes.leaveBudget5Guide2026 : routes.leaveBudget10Guide2026,
        language,
      )}
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
                travelSource="guide_page"
                pageType="guide_page"
              />
            ))}
          </div>
        </section>
      }
    />
  );
}

export function Assumption2026Page({
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
    month: 8,
  })
    .filter((period) =>
      period.includedHolidays.some((holiday) => holiday.localName.toLowerCase().includes("assomption")),
    )
    .slice(0, 2);

  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: "15 août", en: "15 August" }}
      content={assumption2026Content}
      path={prefixForLanguage(routes.assumption2026, language)}
      extraBlocks={
        <section className="editorial-panel">
          <div className="space-y-3">
            <p className="editorial-kicker">{language === "en" ? "Summer examples" : "Exemples d’été"}</p>
            <h2 className="text-3xl font-black tracking-tight text-ink">
              {language === "en"
                ? "What the Assumption weekend can unlock"
                : "Ce que le week-end du 15 août peut débloquer"}
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
                travelSource="guide_page"
                pageType="guide_page"
              />
            ))}
          </div>
        </section>
      }
    />
  );
}

export function AllSaints2026Page({
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
    month: 11,
  })
    .filter((period) =>
      period.includedHolidays.some((holiday) => holiday.localName.toLowerCase().includes("toussaint")),
    )
    .slice(0, 2);

  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: "1er novembre", en: "1 November" }}
      content={allSaints2026Content}
      path={prefixForLanguage(routes.allSaints2026, language)}
      extraBlocks={
        <section className="editorial-panel">
          <div className="space-y-3">
            <p className="editorial-kicker">{language === "en" ? "Autumn timing" : "Timing d’automne"}</p>
            <h2 className="text-3xl font-black tracking-tight text-ink">
              {language === "en"
                ? "Compare All Saints’ Day with the 11 November setup"
                : "Comparer la Toussaint au cas du 11 novembre"}
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
                travelSource="guide_page"
                pageType="guide_page"
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
