import { AuthorityBlock } from "@/components/content/authority-block";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { FaqListSection } from "@/components/content/faq-list-section";
import { HolidayTable } from "@/components/content/holiday-table";
import { PrimaryActionPanel } from "@/components/content/primary-action-panel";
import { rulesAuthorityBlock } from "@/content/official-cases";
import { ContentHero } from "@/components/content/content-hero";
import { PageShell, defaultPageAside } from "@/components/content/page-shell";
import { RelatedLinks } from "@/components/content/related-links";
import { Reveal } from "@/components/motion/reveal";
import type { Holiday } from "@/lib/domain/types";
import { formatFullDate, formatMonthYear } from "@/lib/formatting";
import type { AppLanguage } from "@/lib/i18n";
import { prefixForLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";

function supportedNeighborYears(year: number) {
  return [year - 1, year + 1].filter((candidate) => candidate >= 2026 && candidate <= 2029);
}

export function HolidaysYearPage({
  language,
  year,
  holidays,
}: {
  language: AppLanguage;
  year: number;
  holidays: Holiday[];
}) {
  const weekdayHolidays = holidays.filter((holiday) => {
    const day = holiday.date.getDay();
    return day !== 0 && day !== 6;
  });
  const weekendHolidays = holidays.filter((holiday) => {
    const day = holiday.date.getDay();
    return day === 0 || day === 6;
  });
  const bestBridgeCandidates = weekdayHolidays.slice(0, 3);
  const plannerHref = prefixForLanguage(routes.home, language);
  const updatedOn = new Intl.DateTimeFormat(language === "en" ? "en-US" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date("2026-03-25T00:00:00.000Z"));

  return (
    <PageShell aside={defaultPageAside(language)}>
      <Breadcrumbs
        items={[
          {
            name: language === "en" ? "Home" : "Accueil",
            url: prefixForLanguage(routes.home, language),
          },
          {
            name: language === "en" ? `Public holidays ${year}` : `Jours fériés ${year}`,
            url: prefixForLanguage(routes.holidaysYear(year), language),
          },
        ]}
      />
      <ContentHero
        badge={{ fr: "Calendrier", en: "Calendar" }}
        title={{
          fr: `Jours fériés ${year} en France`,
          en: `French public holidays ${year}`,
        }}
        subtitle={{
          fr: "Le tableau complet, les dates qui comptent vraiment, puis quelques réflexes simples pour savoir quand revenir au simulateur.",
          en: "The full calendar, the dates that matter most, then a few simple reading cues to know when to switch back to the planner.",
        }}
        language={language}
      />
      <p className="text-sm font-medium text-ink/60">
        {language === "en" ? `Last updated: ${updatedOn}` : `Dernière mise à jour : ${updatedOn}`}
      </p>

      <Reveal>
        <PrimaryActionPanel
          language={language}
          title={
            language === "en"
              ? `Turn the ${year} calendar into real bridge ideas`
              : `Transformer le calendrier ${year} en vrais ponts`
          }
          description={
            language === "en"
              ? "Use the official holiday dates as a shortlist, then open the planner to see which weekdays actually create the best days off for your budget."
              : "Utilisez les dates officielles comme présélection, puis ouvrez le simulateur pour voir quels jours fériés créent vraiment les meilleurs ponts selon votre budget."
          }
          primaryHref={plannerHref}
          primaryLabel={language === "en" ? "Open the planner" : "Voir les meilleurs ponts"}
          source="holidays_year_hero"
          eventName="guide_click"
          destination={routes.home}
          pageType="holidays_year"
          year={year}
        />
      </Reveal>

      <AuthorityBlock block={rulesAuthorityBlock} language={language} />

      <Reveal>
        <section className="editorial-panel space-y-5">
          <div className="space-y-3">
            <p className="editorial-kicker">{language === "en" ? "At a glance" : "À retenir"}</p>
            <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {language === "en"
                ? "The useful question is not “how many holidays” but “which ones help”"
                : "La vraie question n’est pas “combien de jours fériés” mais “lesquels aident vraiment”."}
            </h2>
            <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              {language === "en"
                ? "A yearly list is useful only if it helps you spot the dates that create a bridge opportunity. Start with weekdays, then focus on the dates closest to a weekend."
                : "Une liste annuelle n’est utile que si elle aide à repérer les dates qui créent une opportunité de pont. Commencez par les jours en semaine, puis regardez ceux qui tombent près d’un week-end."}
            </p>
          </div>

          <div className="editorial-grid">
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">{language === "en" ? "Official dates" : "Dates officielles"}</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">{holidays.length}</p>
              <p className="mt-2 text-sm leading-7 text-ink/72">
                {language === "en" ? "public holidays in the French calendar." : "jours fériés au calendrier français."}
              </p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">{language === "en" ? "Useful first" : "À regarder d’abord"}</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">{weekdayHolidays.length}</p>
              <p className="mt-2 text-sm leading-7 text-ink/72">
                {language === "en"
                  ? "fall on weekdays and can create a bridge."
                  : "tombent en semaine et peuvent créer un pont."}
              </p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">{language === "en" ? "Already lost" : "Déjà perdus"}</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">{weekendHolidays.length}</p>
              <p className="mt-2 text-sm leading-7 text-ink/72">
                {language === "en"
                  ? "fall on a weekend and usually need no action."
                  : "tombent un week-end et demandent rarement une action."}
              </p>
            </article>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="editorial-panel">
          <div className="space-y-3">
            <p className="editorial-kicker">{language === "en" ? "Examples" : "Exemples"}</p>
            <h2 className="text-3xl font-black tracking-tight text-ink">
              {language === "en" ? "Three dates worth opening in the planner" : "Trois dates à ouvrir dans le simulateur"}
            </h2>
          </div>
          <div className="mt-6 editorial-grid">
            {bestBridgeCandidates.map((holiday) => (
              <article
                key={`${holiday.localName}-${holiday.date.toISOString()}`}
                className="rounded-4xl border border-line/80 bg-slate-50/80 p-5"
              >
                <p className="editorial-kicker">{formatMonthYear(holiday.date.getMonth() + 1, year, language)}</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-ink">{holiday.localName}</h3>
                <p className="mt-3 text-base leading-7 text-ink/74">{formatFullDate(holiday.date, language)}</p>
                <div className="mt-4 rounded-3xl border border-sky-100 bg-white px-4 py-3 text-sm font-medium leading-6 text-slate-700">
                  {language === "en"
                    ? "Open the planner on this month, keep your real leave budget, then compare the single-bridge and multiple-bridges modes."
                    : "Ouvrez le simulateur sur ce mois, gardez votre vrai budget, puis comparez le mode gros pont et le mode plusieurs ponts."}
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
              {language === "en" ? "All official dates" : "Toutes les dates officielles"}
            </h2>
            <span className="chip">
              {holidays.length} {language === "en" ? "public holidays" : "jours fériés"}
            </span>
          </div>
          <p className="text-sm leading-6 text-ink/70">
            {language === "en"
              ? "Keep this table as a reference, then switch back to the bridge page or the planner when one date deserves a real test."
              : "Gardez ce tableau comme repère, puis revenez vers la page ponts ou le simulateur quand une date mérite un vrai test."}
          </p>
          <HolidayTable holidays={holidays} language={language} showWeekendColumn />
        </section>
      </Reveal>

      <RelatedLinks
        title={language === "en" ? "Use these dates well" : "Bien utiliser ces dates"}
        language={language}
        links={[
          { href: routes.bridgesYear(year), label: { fr: `Ponts ${year}`, en: `Bridge ideas ${year}` } },
          { href: routes.schoolHolidaysBridgesYear(year), label: { fr: `Vacances scolaires et ponts ${year}`, en: `School holidays and bridges ${year}` } },
          ...supportedNeighborYears(year).map((neighborYear) => ({
            href: routes.holidaysYear(neighborYear),
            label: { fr: `Jours fériés ${neighborYear}`, en: `Public holidays ${neighborYear}` },
          })),
          ...(year === 2026
            ? [
                {
                  href: routes.weekdayHolidays2026,
                  label: {
                    fr: "Jours fériés 2026 qui tombent en semaine",
                    en: "Weekday public holidays in 2026",
                  },
                },
                {
                  href: routes.leaveGuide2026,
                  label: {
                    fr: "Guide congés 2026",
                    en: "Leave guide 2026",
                  },
                },
              ]
            : []),
          { href: routes.home, label: { fr: "Retour au simulateur", en: "Back to planner" } },
        ]}
      />
      <Reveal>
        <FaqListSection
          kicker={language === "en" ? "FAQ" : "FAQ"}
          schemaId={`faq-holidays-year-${language}-${year}`}
          title={
            language === "en"
              ? `Questions people ask before using public holidays ${year}`
              : `Questions fréquentes avant d’utiliser les jours fériés ${year}`
          }
          items={
            language === "en"
              ? [
                  {
                    question: `How should I use public holidays ${year} first?`,
                    answer:
                      "Start with the weekday holidays, then open the planner on the matching month to see whether one leave day unlocks a longer break.",
                  },
                  {
                    question: `Do all public holidays ${year} create a bridge opportunity?`,
                    answer:
                      "No. Weekend holidays rarely change anything. The useful cases are the holidays that land near a Friday, Monday or a short leave window.",
                  },
                ]
              : [
                  {
                    question: `Comment utiliser d’abord les jours fériés ${year} ?`,
                    answer:
                      "Commencez par les jours fériés qui tombent en semaine, puis ouvrez le simulateur sur le mois concerné pour voir si un ou deux jours posés suffisent à créer un vrai pont.",
                  },
                  {
                    question: `Tous les jours fériés ${year} créent-ils un pont ?`,
                    answer:
                      "Non. Ceux qui tombent le week-end changent rarement quelque chose. Les cas utiles sont surtout ceux proches d’un vendredi, d’un lundi ou d’une courte fenêtre de congés.",
                  },
                ]
          }
        />
      </Reveal>
    </PageShell>
  );
}
