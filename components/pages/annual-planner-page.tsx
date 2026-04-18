import { AnnualPlanner } from "@/components/planner/annual-planner";
import { AuthorityBlock } from "@/components/content/authority-block";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { ContentHero } from "@/components/content/content-hero";
import { LinkHubSection } from "@/components/content/link-hub-section";
import { PrimaryActionPanel } from "@/components/content/primary-action-panel";
import { PageShell, defaultPageAside } from "@/components/content/page-shell";
import { RelatedLinks } from "@/components/content/related-links";
import { schoolAuthority2026Block } from "@/content/official-cases";
import { prefixForLanguage, type AppLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";

export function AnnualPlannerPage({
  language,
  year,
}: {
  language: AppLanguage;
  year: number;
}) {
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
            name: language === "en" ? `Annual plan ${year}` : `Plan annuel ${year}`,
            url: prefixForLanguage(routes.annualPlannerYear(year), language),
          },
        ]}
      />
      <ContentHero
        badge={{ fr: "Plan annuel", en: "Annual plan" }}
        title={{
          fr: `Planifier ses congés ${year} sur l’année : mois et ponts à tester`,
          en: `Plan your ${year} leave across the full year: months and bridge days to test`,
        }}
        subtitle={{
          fr: "Une vue plus stratégique pour repérer les meilleurs mois, comparer les approches et exporter les meilleurs blocs retenus.",
          en: "A more strategic view to spot the best months, compare approaches, and export the strongest retained breaks.",
        }}
        language={language}
      />
      <p className="text-sm font-medium text-ink/60">
        {language === "en" ? `Last updated: ${updatedOn}` : `Dernière mise à jour : ${updatedOn}`}
      </p>

      <PrimaryActionPanel
        language={language}
        title={
          language === "en"
            ? `Open the strongest annual plan for ${year}`
            : `Ouvrir le meilleur plan annuel ${year}`
        }
        description={
          language === "en"
            ? "Use the annual planner to spread your budget across the year, then compare the strongest retained breaks with the monthly and bridge pages."
            : "Utilisez le plan annuel pour répartir votre budget sur l’année, puis comparez les meilleurs blocs retenus avec les pages mensuelles et les pages ponts."
        }
        primaryHref={routes.home}
        primaryLabel={language === "en" ? "Open the monthly planner" : "Ouvrir le simulateur mensuel"}
        source="annual_planner_hero"
        eventName="annual_plan_click"
        destination={routes.home}
        pageType="annual_planner_page"
        year={year}
      />

      <AnnualPlanner language={language} year={year} />

      {year === 2026 ? <AuthorityBlock block={schoolAuthority2026Block} language={language} /> : null}

      <LinkHubSection
        language={language}
        kicker={language === "en" ? "Planning hubs" : "Hubs de planification"}
        title={
          language === "en"
            ? `Open the strongest planning hubs for ${year}`
            : `Ouvrir les meilleurs hubs de planification ${year}`
        }
        intro={
          language === "en"
            ? "Use these pages as the main crawl path around the annual planner: bridge hubs, public-holiday hubs, school-holiday hubs, and the practical guides that support real planning decisions."
            : "Utilisez ces pages comme chemin principal autour du plan annuel : hubs ponts, hubs jours fériés, hubs vacances scolaires et guides pratiques qui soutiennent une vraie décision."
        }
        source="annual_planner_hub"
        pageType="annual_planner_hub"
        schemaId={`annual-planner-hub-${language}-${year}`}
        items={[
          {
            href: routes.bridgesYear(year),
            title: language === "en" ? `Bridge ideas ${year}` : `Ponts ${year}`,
            body:
              language === "en"
                ? "The strongest months and long-weekend windows to compare before narrowing the annual plan."
                : "Les meilleurs mois et les longues coupures à comparer avant de resserrer le plan annuel.",
          },
          {
            href: routes.holidaysYear(year),
            title: language === "en" ? `Public holidays ${year}` : `Jours fériés ${year}`,
            body:
              language === "en"
                ? "The official holiday grid that explains why some months deserve a closer look."
                : "La grille officielle des jours fériés qui explique pourquoi certains mois méritent un test plus poussé.",
          },
          {
            href: routes.schoolHolidaysBridgesYear(year),
            title:
              language === "en" ? `School holidays and bridges ${year}` : `Vacances scolaires et ponts ${year}`,
            body:
              language === "en"
                ? "The family-planning version of the same year, with zone logic and overlap choices."
                : "La version famille de la même année, avec logique de zone et choix de chevauchement.",
          },
          {
            href: routes.leaveGuide2026,
            title: language === "en" ? "Leave guide 2026" : "Guide congés 2026",
            body:
              language === "en"
                ? "A faster editorial entry point for choosing the first months to test."
                : "Une entrée éditoriale plus rapide pour choisir les premiers mois à tester.",
          },
          {
            href: routes.mayBridges2026,
            title: language === "en" ? "May bridge days 2026" : "Ponts de mai 2026",
            body:
              language === "en"
                ? "The strongest seasonal cluster and often the first practical bridge case worth validating."
                : "Le cluster saisonnier le plus fort et souvent le premier vrai cas de pont à valider.",
          },
          {
            href: routes.holidaysAndBridges2027,
            title: language === "en" ? "Public holidays and bridges 2027" : "Jours fériés et ponts 2027",
            body:
              language === "en"
                ? "The forward-looking hub if you want to plan beyond the current year."
                : "Le hub d’anticipation si vous voulez planifier au-delà de l’année en cours.",
          },
        ]}
      />

      <RelatedLinks
        title={language === "en" ? "Keep exploring" : "Continuer l’exploration"}
        language={language}
        source="annual_planner_related"
        pageType="annual_planner_page"
        links={[
          { href: routes.home, label: { fr: "Retour au simulateur mensuel", en: "Back to monthly planner" } },
          { href: routes.bridgesYear(year), label: { fr: `Ponts ${year}`, en: `Bridge ideas ${year}` } },
          { href: routes.leaveGuide2026, label: { fr: "Guide congés 2026", en: "Leave guide 2026" } },
        ]}
      />
    </PageShell>
  );
}
