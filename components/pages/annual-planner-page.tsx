import { AnnualPlanner } from "@/components/planner/annual-planner";
import { AuthorityBlock } from "@/components/content/authority-block";
import { ContentHero } from "@/components/content/content-hero";
import { PageShell, defaultPageAside } from "@/components/content/page-shell";
import { RelatedLinks } from "@/components/content/related-links";
import { schoolAuthority2026Block } from "@/content/official-cases";
import type { AppLanguage } from "@/lib/i18n";
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
      <ContentHero
        badge={{ fr: "Plan annuel", en: "Annual plan" }}
        title={{
          fr: `Planifier ses congés ${year} sur l’année`,
          en: `Plan your ${year} leave across the full year`,
        }}
        subtitle={{
          fr: "Une vue plus stratégique : répartir votre budget sur plusieurs mois, comparer les approches, puis exporter les meilleurs blocs retenus.",
          en: "A more strategic view: spread your budget across several months, compare approaches, then export the best retained breaks.",
        }}
        language={language}
      />
      <p className="text-sm font-medium text-ink/60">
        {language === "en" ? `Last updated: ${updatedOn}` : `Dernière mise à jour : ${updatedOn}`}
      </p>

      <AnnualPlanner language={language} year={year} />

      {year === 2026 ? <AuthorityBlock block={schoolAuthority2026Block} language={language} /> : null}

      <RelatedLinks
        title={language === "en" ? "Keep exploring" : "Continuer l’exploration"}
        language={language}
        links={[
          { href: routes.home, label: { fr: "Retour au simulateur mensuel", en: "Back to monthly planner" } },
          { href: routes.bridgesYear(year), label: { fr: `Ponts ${year}`, en: `Bridge ideas ${year}` } },
          { href: routes.leaveGuide2026, label: { fr: "Guide congés 2026", en: "Leave guide 2026" } },
        ]}
      />
    </PageShell>
  );
}
