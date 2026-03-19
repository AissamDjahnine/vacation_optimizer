import Link from "next/link";
import { AppLanguage, prefixForLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";

const copy = {
  fr: {
    title: "Un outil clair, des sources visibles, aucune surprise.",
    items: [
      {
        title: "Données publiques",
        body: "Jours fériés, zones scolaires et cas officiels résumés proprement puis reliés aux sources utiles.",
        href: routes.sources,
        cta: "Voir les sources",
      },
      {
        title: "Pas de compte requis",
        body: "Le simulateur fonctionne sans création de compte et sans historique à gérer pour un premier test.",
        href: routes.privacy,
        cta: "Lire la confidentialité",
      },
      {
        title: "Sortie exploitable",
        body: "Chaque suggestion peut être exportée au format .ics ou envoyée vers Google Calendar quand elle vaut le coup d’être conservée.",
        href: routes.annualPlannerYear(2026),
        cta: "Tester le plan annuel",
      },
    ],
  },
  en: {
    title: "Clear product, visible sources, no guesswork.",
    items: [
      {
        title: "Public data",
        body: "Public holidays, school zones and official bridge cases are summarized cleanly and linked back to useful sources.",
        href: routes.sources,
        cta: "See sources",
      },
      {
        title: "No account required",
        body: "The planner works without sign-up or saved history, which keeps first use fast and simple.",
        href: routes.privacy,
        cta: "Read privacy",
      },
      {
        title: "Useful output",
        body: "Each suggestion can be exported as .ics or sent to Google Calendar when it is actually worth keeping.",
        href: routes.annualPlannerYear(2026),
        cta: "Try the annual plan",
      },
    ],
  },
} as const;

export function HomeTrustStrip({ language }: { language: AppLanguage }) {
  const section = language === "en" ? copy.en : copy.fr;
  const featuredItems = section.items.slice(0, 2);

  return (
    <section className="editorial-panel space-y-5">
      <div className="space-y-2">
        <p className="editorial-kicker">
          {language === "en" ? "Before you go further" : "Avant d’aller plus loin"}
        </p>
        <h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">
          {section.title}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {featuredItems.map((item) => (
          <article key={item.title} className="rounded-3xl border border-line bg-slate-50/70 p-5">
            <h3 className="text-lg font-bold text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            <Link
              href={prefixForLanguage(item.href, language)}
              className="mt-4 inline-flex text-sm font-bold text-ink transition hover:text-coral"
            >
              {item.cta}
            </Link>
          </article>
        ))}
      </div>
      <div className="flex justify-start">
        <Link
          href={prefixForLanguage(routes.annualPlannerYear(2026), language)}
          className="inline-flex items-center rounded-full border border-line bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-coral hover:text-coral"
        >
          {language === "en" ? "Open the annual plan" : "Ouvrir le plan annuel"}
        </Link>
      </div>
    </section>
  );
}
