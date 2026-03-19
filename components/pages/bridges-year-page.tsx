import { ContentHero } from "@/components/content/content-hero";
import { PageShell, defaultPageAside } from "@/components/content/page-shell";
import { RelatedLinks } from "@/components/content/related-links";
import { Reveal } from "@/components/motion/reveal";
import { ResultCard } from "@/components/planner/result-card";
import { DateOptimizer } from "@/lib/domain/date-optimizer";
import type { BestVacationPeriod, Holiday } from "@/lib/domain/types";
import { formatMonthYear } from "@/lib/formatting";
import type { AppLanguage } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { routes } from "@/lib/routes";

function supportedNeighborYears(year: number) {
  return [year - 1, year + 1].filter((candidate) => candidate >= 2026 && candidate <= 2029);
}

export function BridgesYearPage({
  language,
  year,
  holidays,
}: {
  language: AppLanguage;
  year: number;
  holidays: Holiday[];
}) {
  const monthlyHighlights = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    return (
      DateOptimizer.findFlexiblePeriods({
        holidays,
        vacationDaysToUse: 5,
        availableRttDays: 0,
        year,
        month,
      })[0] ?? null
    );
  }).filter((period): period is BestVacationPeriod => period !== null);

  const topPeriods = monthlyHighlights.slice(0, 3);
  const seasonalExamples = [
    { month: 5, label: { fr: "Printemps", en: "Spring" } },
    { month: 7, label: { fr: "Été", en: "Summer" } },
    { month: 11, label: { fr: "Fin d’année", en: "Late year" } },
  ]
    .map(({ month, label }) => ({
      label,
      month,
      result:
        DateOptimizer.findFlexiblePeriods({
          holidays,
          vacationDaysToUse: 5,
          availableRttDays: 0,
          year,
          month,
        })[0] ?? null,
    }))
    .filter((entry): entry is { label: { fr: string; en: string }; month: number; result: BestVacationPeriod } => Boolean(entry.result));

  const holidayMonths = new Set(holidays.map((holiday) => holiday.date.getMonth() + 1));

  return (
    <PageShell aside={defaultPageAside(language)}>
      <ContentHero
        badge={{ fr: "Ponts", en: "Bridges" }}
        title={{
          fr: `Ponts ${year} en France`,
          en: `Bridge ideas ${year} in France`,
        }}
        subtitle={{
          fr: "Les mois à ouvrir en premier, les meilleurs cas à tester, puis les périodes les plus propres à vérifier dans le simulateur.",
          en: "The months worth opening first, the strongest examples to test, then the cleanest periods to validate in the planner.",
        }}
        language={language}
      />

      <Reveal>
        <section className="editorial-panel space-y-6">
          <div className="space-y-3">
            <p className="editorial-kicker">
              {language === "en" ? "Quick reading" : "Lecture rapide"}
            </p>
            <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {language === "en"
                ? "You do not need to inspect every month"
                : "Inutile de vérifier tous les mois un par un"}
            </h2>
            <p className="editorial-lead">
              {language === "en"
                ? "The goal here is to narrow the year down quickly. Start with the strongest months below, then go back to the planner if your real budget, RTT or family constraints change the decision."
                : "Le but ici est de réduire l’année rapidement. Commencez par les mois les plus prometteurs ci-dessous, puis revenez dans le simulateur si votre vrai budget, vos RTT ou vos contraintes familiales changent la décision."}
            </p>
          </div>

          <div className="editorial-grid">
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">{language === "en" ? "Useful months" : "Mois utiles"}</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">{holidayMonths.size}</p>
              <p className="mt-2 text-sm leading-7 text-ink/72">
                {language === "en"
                  ? "months include at least one public holiday."
                  : "mois comportent au moins un jour férié."}
              </p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">{language === "en" ? "Best quick bridge" : "Meilleur pont rapide"}</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">
                {topPeriods[0]?.totalDaysOff ?? 0}
              </p>
              <p className="mt-2 text-sm leading-7 text-ink/72">
                {language === "en"
                  ? "days off found in the strongest example."
                  : "jours de repos trouvés dans l’exemple le plus fort."}
              </p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">{language === "en" ? "Start here" : "Commencez ici"}</p>
              <p className="mt-3 text-2xl font-black tracking-tight text-ink">
                {topPeriods[0]
                  ? formatMonthYear(topPeriods[0].startDate.getMonth() + 1, year, language)
                  : formatMonthYear(5, year, language)}
              </p>
              <p className="mt-2 text-sm leading-7 text-ink/72">
                {language === "en"
                  ? "Usually the first month worth checking with your own settings."
                  : "Souvent le premier mois à vérifier avec vos propres réglages."}
              </p>
            </article>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="editorial-panel">
          <div className="space-y-3">
            <p className="editorial-kicker">
              {language === "en" ? "Examples" : "Exemples"}
            </p>
            <h2 className="text-3xl font-black tracking-tight text-ink">
              {language === "en"
                ? "Three moments that usually deserve a quick check"
                : "Trois moments qui méritent presque toujours un test rapide"}
            </h2>
          </div>
          <div className="mt-6 editorial-grid">
            {seasonalExamples.map(({ label, month, result }) => (
              <article
                key={`${month}-${result.startDate.toISOString()}`}
                className="rounded-4xl border border-line bg-paper p-6"
              >
                <p className="editorial-kicker">{t(label, language)}</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-ink">
                  {formatMonthYear(month, year, language)}
                </h3>
                <p className="mt-3 text-base leading-7 text-ink/74">
                  {language === "en"
                    ? `${result.paidLeaveDaysUsed} day${result.paidLeaveDaysUsed > 1 ? "s" : ""} booked can unlock ${result.totalDaysOff} days off.`
                    : `${result.paidLeaveDaysUsed} jour${result.paidLeaveDaysUsed > 1 ? "s" : ""} posé${result.paidLeaveDaysUsed > 1 ? "s" : ""} peut débloquer ${result.totalDaysOff} jours de repos.`}
                </p>
                <div className="mt-4 editorial-example">
                  {language === "en"
                    ? `Example: open ${formatMonthYear(month, year, language)} in the planner, then adjust your budget to see if the bridge still holds.`
                    : `Exemple : ouvrez ${formatMonthYear(month, year, language)} dans le simulateur, puis ajustez votre budget pour voir si le pont tient encore.`}
                </div>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="editorial-panel space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-black tracking-tight text-ink">
              {language === "en" ? "Best months to test first" : "Les meilleurs mois à tester d’abord"}
            </h2>
            <span className="chip">{monthlyHighlights.length}</span>
          </div>
            <p className="text-base leading-7 text-ink/72">
              {language === "en"
                ? "Each card below is one strong candidate found with a five-day budget. Use this list as a shortlist before switching to your exact constraints."
              : "Chaque carte ci-dessous est un bon candidat trouvé avec un budget de cinq jours. Utilisez cette liste comme une sélection avant de passer à vos contraintes exactes."}
            </p>
        </section>
      </Reveal>

      <div className="space-y-6">
        {monthlyHighlights.map((period, index) => (
          <ResultCard
            key={`${period.startDate.toISOString()}-${period.endDate.toISOString()}`}
            language={language}
            period={period}
            rank={index + 1}
            highlighted={index === 0}
          />
        ))}
      </div>

      <RelatedLinks
        title={language === "en" ? "Continue with concrete checks" : "Continuer avec des vérifications concrètes"}
        language={language}
        links={[
          { href: routes.holidaysYear(year), label: { fr: `Jours fériés ${year}`, en: `Public holidays ${year}` } },
          { href: routes.schoolHolidaysBridgesYear(year), label: { fr: `Vacances scolaires et ponts ${year}`, en: `School holidays and bridges ${year}` } },
          ...supportedNeighborYears(year).map((neighborYear) => ({
            href: routes.bridgesYear(neighborYear),
            label: { fr: `Ponts ${neighborYear}`, en: `Bridge ideas ${neighborYear}` },
          })),
          ...(year === 2026
            ? [
                { href: routes.mayBridges2026, label: { fr: "Ponts de mai 2026", en: "May bridges 2026" } },
                { href: routes.ascension2026, label: { fr: "Pont de l’Ascension 2026", en: "Ascension bridge 2026" } },
                { href: routes.leaveGuide2026, label: { fr: "Guide congés 2026", en: "Leave guide 2026" } },
              ]
            : [
                { href: routes.holidaysAndBridges2027, label: { fr: "Jours fériés et ponts 2027", en: "Public holidays and bridges 2027" } },
              ]),
          { href: routes.home, label: { fr: "Retour au simulateur", en: "Back to planner" } },
        ]}
      />
    </PageShell>
  );
}
