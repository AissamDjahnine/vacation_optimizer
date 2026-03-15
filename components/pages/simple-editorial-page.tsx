import Link from "next/link";
import { PageShell } from "@/components/content/page-shell";
import { AppLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";

type Section = {
  title: string;
  body: string[];
};

type SimpleEditorialPageProps = {
  language: AppLanguage;
  kicker: string;
  title: string;
  subtitle: string;
  sections: Section[];
};

export function SimpleEditorialPage({
  language,
  kicker,
  title,
  subtitle,
  sections,
}: SimpleEditorialPageProps) {
  const localized = (href: string) => (language === "en" ? `/en${href === "/" ? "" : href}` : href);

  return (
    <PageShell>
      <section className="editorial-panel space-y-5">
        <p className="editorial-kicker">{kicker}</p>
        <h1 className="section-title max-w-4xl">{title}</h1>
        <p className="editorial-lead">{subtitle}</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-4">
          {sections.map((section) => (
            <article key={section.title} className="editorial-panel space-y-4">
              <h2 className="text-2xl font-black tracking-tight text-ink">{section.title}</h2>
              <div className="content-copy space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="editorial-panel-muted space-y-3">
            <p className="editorial-kicker">
              {language === "en" ? "Useful next step" : "Bon réflexe"}
            </p>
            <p className="text-sm leading-7 text-slate-600">
              {language === "en"
                ? "Use the planner when you want to validate your own budget, month and school-holiday settings."
                : "Ouvrez le simulateur quand vous voulez tester votre propre budget, votre mois ou vos règles vacances scolaires."}
            </p>
            <Link
              href={localized(routes.home)}
              className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-coral hover:text-coral"
            >
              {language === "en" ? "Open the planner" : "Ouvrir le simulateur"}
            </Link>
          </div>
          <div className="editorial-panel-muted space-y-3">
            <p className="editorial-kicker">{language === "en" ? "Official sources" : "Sources officielles"}</p>
            <p className="text-sm leading-7 text-slate-600">
              {language === "en"
                ? "This page summarizes the product perimeter. Official holiday and school calendar references are listed separately."
                : "Cette page résume le périmètre du produit. Les références officielles sur les jours fériés et le calendrier scolaire sont listées à part."}
            </p>
            <Link
              href={localized(routes.sources)}
              className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-coral hover:text-coral"
            >
              {language === "en" ? "See source list" : "Voir la liste des sources"}
            </Link>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
