import Link from "next/link";
import Script from "next/script";
import { AuthorityBlock } from "@/components/content/authority-block";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { ContentHero } from "@/components/content/content-hero";
import { HolidayTable } from "@/components/content/holiday-table";
import { PageShell, defaultPageAside } from "@/components/content/page-shell";
import { trackEvent } from "@/lib/analytics";
import { RelatedLinks } from "@/components/content/related-links";
import { Reveal } from "@/components/motion/reveal";
import { holidaysAuthority2027Block } from "@/content/official-cases";
import { holidaysAndBridges2027Content } from "@/content/holidays-and-bridges-2027";
import type { Holiday } from "@/lib/domain/types";
import type { AppLanguage } from "@/lib/i18n";
import { prefixForLanguage, t } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { buildArticleSchema } from "@/lib/seo";

export function HolidaysAndBridges2027Page({
  language,
  holidays,
}: {
  language: AppLanguage;
  holidays: Holiday[];
}) {
  const path = prefixForLanguage(routes.holidaysAndBridges2027, language);
  const articleSchema = buildArticleSchema({
    headline: t(holidaysAndBridges2027Content.title, language),
    description: t(holidaysAndBridges2027Content.subtitle, language),
    path,
    language,
  });

  const quickSignals = [
    {
      label: language === "en" ? "Best early check" : "Premier test utile",
      value: language === "en" ? "Spring 2027" : "Printemps 2027",
    },
    {
      label: language === "en" ? "Official family marker" : "Repère officiel famille",
      value: language === "en" ? "Friday 7 May" : "Vendredi 7 mai",
    },
    {
      label: language === "en" ? "Holiday count" : "Nombre de fériés",
      value: `${holidays.length} ${language === "en" ? "dates" : "dates"}`,
    },
  ];

  return (
    <PageShell aside={defaultPageAside(language)}>
      <Script
        id={`article-schema-${path}-${language}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Breadcrumbs
        items={[
          {
            name: language === "en" ? "Home" : "Accueil",
            url: prefixForLanguage(routes.home, language),
          },
          {
            name: t(holidaysAndBridges2027Content.title, language),
            url: path,
          },
        ]}
      />

      <ContentHero
        badge={{ fr: "2027", en: "2027" }}
        title={holidaysAndBridges2027Content.title}
        subtitle={holidaysAndBridges2027Content.subtitle}
        language={language}
      />

      <Reveal>
        <section className="editorial-panel space-y-6">
          <div className="space-y-3">
            <p className="editorial-kicker">
              {language === "en" ? "What matters first" : "Ce qui compte d’abord"}
            </p>
            <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {language === "en"
                ? "Use this page to shortlist the months worth testing"
                : "Utilisez cette page pour réduire vite les mois à tester"}
            </h2>
            <p className="editorial-lead">
              {language === "en"
                ? "Do not read 2027 as a wall of dates. Start with the official marker in May, then keep only the seasons that still look promising for your own budget."
                : "Ne lisez pas 2027 comme un mur de dates. Commencez par le repère officiel de mai, puis gardez seulement les saisons qui semblent encore prometteuses pour votre propre budget."}
            </p>
          </div>

          <div className="editorial-grid">
            {quickSignals.map((signal) => (
              <article key={signal.label} className="editorial-panel-muted">
                <p className="editorial-kicker">{signal.label}</p>
                <p className="mt-3 text-2xl font-black tracking-tight text-ink">{signal.value}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <AuthorityBlock block={holidaysAuthority2027Block} language={language} />

      <Reveal>
        <section className="editorial-panel space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="editorial-kicker">{language === "en" ? "Reference" : "Repère"}</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">
                {language === "en" ? "Full 2027 holiday list" : "Liste complète des jours fériés 2027"}
              </h2>
            </div>
            <span className="chip">
              {holidays.length} {language === "en" ? "public holidays" : "jours fériés"}
            </span>
          </div>
          <HolidayTable holidays={holidays} language={language} showWeekendColumn />
        </section>
      </Reveal>

      <Reveal>
        <section className="editorial-panel">
          <div className="space-y-3">
            <p className="editorial-kicker">{language === "en" ? "Planning ideas" : "Idées de planning"}</p>
            <h2 className="text-3xl font-black tracking-tight text-ink">
              {language === "en" ? "Three ways to start planning 2027" : "Trois façons de commencer à préparer 2027"}
            </h2>
          </div>
          <div className="mt-6 editorial-grid">
            {holidaysAndBridges2027Content.planIdeas.map((idea) => (
              <article
                key={t(idea.title, language)}
                className="rounded-4xl border border-line bg-paper p-6"
              >
                <p className="text-2xl font-black tracking-tight text-ink">
                  {t(idea.title, language)}
                </p>
                <p className="mt-4 text-base leading-7 text-ink/74">
                  {t(idea.summary, language)}
                </p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="editorial-panel">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-3">
              <p className="editorial-kicker">
                {language === "en" ? "Next move" : "Étape suivante"}
              </p>
              <h2 className="text-3xl font-black tracking-tight text-ink">
                {language === "en"
                  ? "Validate one promising month in the planner"
                  : "Validez un mois prometteur dans le simulateur"}
              </h2>
              <p className="text-base leading-7 text-ink/74">
                {language === "en"
                  ? "If you are planning early, May is usually the right first pass. Then compare summer and year end only if spring does not fit your real constraints."
                  : "Si vous préparez tôt, mai est souvent le bon premier passage. Comparez ensuite l’été et la fin d’année seulement si le printemps ne colle pas à vos contraintes réelles."}
              </p>
            </div>
            <Link
              href={prefixForLanguage(routes.home, language)}
              onClick={() =>
                trackEvent("guide_click", {
                  language,
                  source: "holidays_and_bridges_2027_cta",
                  page_type: "guide_page",
                  destination: routes.home,
                })
              }
              className="rounded-full bg-coral px-6 py-3 text-lg font-bold text-white transition hover:-translate-y-0.5"
            >
              {language === "en" ? "Use the planner" : "Utiliser le simulateur"}
            </Link>
          </div>
        </section>
      </Reveal>

      <RelatedLinks
        title={language === "en" ? "Continue reading" : "Aller plus loin"}
        links={holidaysAndBridges2027Content.relatedLinks ?? []}
        language={language}
      />
    </PageShell>
  );
}
