import Link from "next/link";
import { ContentHero } from "@/components/content/content-hero";
import { ContentSectionCard } from "@/components/content/content-section-card";
import { PageShell, defaultPageAside } from "@/components/content/page-shell";
import { RelatedLinks } from "@/components/content/related-links";
import { Reveal } from "@/components/motion/reveal";
import type { GuideContent } from "@/content/content-models";
import type { AppLanguage } from "@/lib/i18n";
import { prefixForLanguage, t } from "@/lib/i18n";
import { routes } from "@/lib/routes";

export function GenericGuidePage({
  language,
  badge,
  content,
  extraBlocks,
}: {
  language: AppLanguage;
  badge: { fr: string; en: string };
  content: GuideContent;
  extraBlocks?: React.ReactNode;
}) {
  return (
    <PageShell aside={defaultPageAside(language)}>
      <ContentHero badge={badge} title={content.title} subtitle={content.subtitle} language={language} />
      <Reveal>
        <section className="editorial-panel">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="editorial-kicker">
                {language === "en" ? "How to read this guide" : "Comment lire ce guide"}
              </p>
              <p className="mt-4 editorial-lead">
                {language === "en"
                  ? "Start with the examples and the highlighted cases. Once one situation looks close to yours, switch back to the planner to validate the exact dates."
                  : "Commencez par les exemples et les cas mis en avant. Dès qu’une situation ressemble à la vôtre, repassez dans le simulateur pour valider les dates exactes."}
              </p>
            </div>
            <div className="rounded-4xl border border-line bg-paper p-6">
              <p className="editorial-kicker">{language === "en" ? "Search intent" : "Intention de recherche"}</p>
              <p className="mt-4 text-base leading-7 text-ink/74">
                {language === "en"
                  ? "These pages are meant to answer one concrete planning question fast. The planner remains the place where your budget, RTT and school-holiday settings actually decide."
                  : "Ces pages sont là pour répondre vite à une question concrète. Le simulateur reste l’endroit où votre budget, vos RTT et vos réglages vacances scolaires décident vraiment."}
              </p>
            </div>
          </div>
        </section>
      </Reveal>
      {extraBlocks}
      {content.sections.map((section, index) => (
        <ContentSectionCard
          key={t(section.title, language)}
          section={section}
          language={language}
        />
      ))}
      <Reveal>
        <div className="editorial-panel">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="editorial-kicker">
                {language === "en" ? "Ready to test?" : "Prêt à tester ?"}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">
                {language === "en"
                  ? "Use the planner to validate these ideas"
                  : "Utilisez le simulateur pour valider ces idées"}
              </h2>
            </div>
            <Link
              href={prefixForLanguage(routes.home, language)}
              className="rounded-full bg-coral px-6 py-3 text-lg font-bold text-white transition hover:-translate-y-0.5"
            >
              {language === "en" ? "Use the planner" : "Utiliser le simulateur"}
            </Link>
          </div>
        </div>
      </Reveal>
      {content.relatedLinks?.length ? (
        <RelatedLinks
          title={language === "en" ? "Continue reading" : "Aller plus loin"}
          links={content.relatedLinks}
          language={language}
        />
      ) : null}
    </PageShell>
  );
}
