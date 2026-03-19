import type { AppLanguage } from "@/lib/i18n";
import { prefixForLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";

const guides = [
  {
    href: routes.annualPlannerYear(2026),
    frTitle: "Planifier toute l’année 2026",
    enTitle: "Plan the full year 2026",
    frBody:
      "Une vue annuelle pour répartir votre budget sur plusieurs mois et exporter un vrai plan.",
    enBody:
      "A yearly view to spread your budget across several months and export a real plan.",
  },
  {
    href: routes.leaveGuide2026,
    frTitle: "Comment bien poser ses congés en 2026",
    enTitle: "How to plan leave well in 2026",
    frBody:
      "Les meilleurs mois, quelques scénarios concrets, et quand utiliser le simulateur pour arbitrer.",
    enBody:
      "The best months, a few concrete scenarios, and when the planner becomes the right call.",
  },
  {
    href: routes.schoolHolidaysFamily2026,
    frTitle: "Vacances scolaires 2026 et ponts",
    enTitle: "School holidays 2026 and bridges",
    frBody:
      "Une page spéciale familles avec toggle de zone A, B, C et repères utiles avant simulation.",
    enBody:
      "A dedicated family page with zone toggle A, B, C and useful markers before running the planner.",
  },
  {
    href: routes.mayBridges2026,
    frTitle: "Ponts de mai 2026",
    enTitle: "May 2026 bridges",
    frBody:
      "Les trois dates qui structurent vraiment mai, avec les premiers cas à ouvrir dans le simulateur.",
    enBody:
      "The three dates that really shape May, with the first cases worth opening in the planner.",
  },
  {
    href: routes.armistice2026,
    frTitle: "Pont du 11 novembre 2026",
    enTitle: "11 November 2026 bridge",
    frBody:
      "Un cas simple mais rentable pour l’automne, utile si vous cherchez un pont hors mai.",
    enBody:
      "A simple but profitable autumn case, useful if you want a bridge outside May.",
  },
  {
    href: routes.yearEnd2026,
    frTitle: "Pont de Noël et fin d’année 2026",
    enTitle: "Christmas and late-year 2026 bridge",
    frBody:
      "Ce qu’il reste à jouer en fin d’année, avec les cas utiles autour de Noël et du Nouvel An.",
    enBody:
      "What is still worth testing late in the year, around Christmas and New Year.",
  },
  {
    href: routes.holidaysAndBridges2027,
    frTitle: "Jours fériés 2027 et ponts",
    enTitle: "Public holidays 2027 and bridges",
    frBody: "Une vue en avance sur 2027 pour commencer à préparer les bons mois dès maintenant.",
    enBody: "An early look at 2027 so you can already prepare the right months.",
  },
  {
    href: routes.faq,
    frTitle: "FAQ ponts et jours fériés",
    enTitle: "Bridge and holiday FAQ",
    frBody:
      "Les réponses courtes aux questions fréquentes, avec sources officielles quand il faut.",
    enBody: "Short answers to common questions, with official sources where they matter.",
  },
];

export function GuidesSection({ language }: { language: AppLanguage }) {
  const featuredGuides = guides.slice(0, 4);

  return (
    <section className="rounded-[2.1rem] border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="space-y-3">
        <h2 className="text-3xl font-black tracking-tight text-ink">
          {language === "en" ? "Useful guides" : "Guides utiles"}
        </h2>
        <p className="section-subtitle max-w-none">
          {language === "en"
            ? "Start with these four pages, then open the wider guide hub only if you need more context."
            : "Commencez par ces quatre pages, puis ouvrez le hub complet seulement si vous avez besoin de plus de contexte."}
        </p>
      </div>
      <div className="mt-8 grid gap-4 xl:grid-cols-3">
        {featuredGuides.map((guide) => (
          <a
            key={guide.href}
            href={prefixForLanguage(guide.href, language)}
            className="flex h-full flex-col rounded-4xl border border-line bg-paper p-5 shadow-card transition hover:-translate-y-1 hover:border-coral hover:shadow-soft"
          >
            <p className="text-2xl font-black tracking-tight text-ink">
              {language === "en" ? guide.enTitle : guide.frTitle}
            </p>
            <p className="mt-4 flex-1 text-base leading-7 text-ink/70">
              {language === "en" ? guide.enBody : guide.frBody}
            </p>
            <span className="mt-6 text-lg font-bold text-coral">
              {language === "en" ? "Open" : "Ouvrir"}
            </span>
          </a>
        ))}
      </div>
      <div className="mt-6 flex justify-start">
        <a
          href={prefixForLanguage(routes.faq, language)}
          className="inline-flex items-center rounded-full border border-line bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-coral hover:text-coral"
        >
          {language === "en" ? "Open the FAQ and more guides" : "Ouvrir la FAQ et plus de guides"}
        </a>
      </div>
    </section>
  );
}
