import type { FamilyPlanningExample, GuideContent } from "@/content/content-models";
import { routes } from "@/lib/routes";

export const schoolHolidaysFamily2026Content: GuideContent & {
  examples: FamilyPlanningExample[];
} = {
  title: {
    fr: "Vacances scolaires 2026, zones A/B/C et ponts familiaux",
    en: "School holidays 2026, zones A/B/C and family bridge ideas",
  },
  subtitle: {
    fr: "Une vue pensée pour les familles : repérez la bonne zone, les périodes déjà chargées, puis testez où un pont ajoute un vrai gain.",
    en: "A family-oriented view: find the right zone, spot the busy periods, then test where a bridge actually adds value.",
  },
  sections: [
    {
      title: { fr: "Comment raisonner par zone", en: "How to think by zone" },
      accent: "purple",
      chips: [{ fr: "Zone A", en: "Zone A" }, { fr: "Zone B", en: "Zone B" }, { fr: "Zone C", en: "Zone C" }],
      quote: {
        fr: "Pour une famille, le meilleur pont n’est pas toujours le plus rentable sur le papier : c’est celui qui tombe au bon moment pour votre zone.",
        en: "For a family, the best bridge is not always the most efficient one on paper: it is the one that lands at the right time for your zone.",
      },
      body: [
        {
          fr: "Pour une famille, un pont n’a pas la même valeur selon qu’il tombe pendant les vacances scolaires ou juste à côté. C’est pour ça que la zone doit être votre premier filtre.",
          en: "For a family, a bridge does not have the same value depending on whether it falls during school holidays or right next to them. That is why zone should be your first filter.",
        },
      ],
      bullets: [
        { fr: "Commencez par choisir votre zone avant de regarder les ponts.", en: "Start by choosing your zone before looking at bridge ideas." },
        { fr: "Regardez ensuite les périodes proches du printemps et de l’Ascension.", en: "Then check the periods close to spring and Ascension." },
      ],
      example: {
        fr: "Exemple : une semaine de printemps peut être parfaite pour une zone et beaucoup moins stratégique pour une autre.",
        en: "Example: a spring week can be perfect for one zone and much less strategic for another.",
      },
    },
    {
      title: { fr: "Quand le simulateur devient vraiment utile", en: "When the planner becomes really useful" },
      accent: "blue",
      chips: [
        { fr: "Neutre", en: "Neutral" },
        { fr: "Favoriser", en: "Favor" },
        { fr: "Éviter", en: "Avoid" },
        { fr: "Chevauchement", en: "Overlap" },
      ],
      body: [
        {
          fr: "La page calendrier vous aide à voir les périodes scolaires. Le simulateur sert ensuite à décider si vous voulez prolonger ces périodes, les éviter, ou comparer les deux logiques.",
          en: "The calendar page helps you see school holiday periods. The planner then helps you decide whether you want to extend those periods, avoid them, or compare both strategies.",
        },
      ],
      bullets: [
        { fr: "Utilisez “Favoriser” si vous cherchez à rallonger une période déjà familiale.", en: "Use “Favor” if you want to extend a period that is already family-friendly." },
        { fr: "Utilisez “Éviter” si vous voulez réserver vos congés à des moments plus calmes.", en: "Use “Avoid” if you want to reserve your leave for quieter periods." },
        { fr: "Utilisez “Neutre” pour comparer les deux familles d’options sur un même mois.", en: "Use “Neutral” to compare both families of options within the same month." },
      ],
      specialCase: {
        fr: "Erreur classique : choisir un pont “parfait” pour les enfants sans regarder la circulation, les prix ou le besoin de récupérer avant la reprise.",
        en: "Classic mistake: choosing a “perfect” bridge for the children without checking traffic, prices or the need to recover before school resumes.",
      },
    },
  ],
  examples: [
    {
      title: { fr: "Rallonger les vacances de printemps", en: "Extend the spring break" },
      summary: {
        fr: "Quelques jours posés avant ou après la période scolaire peuvent transformer une semaine standard en vraie respiration familiale.",
        en: "A few booked days before or after the school period can turn a standard week into a real family break.",
      },
      note: {
        fr: "À tester dans le simulateur avec votre zone, surtout si un férié tombe à proximité.",
        en: "Worth testing in the planner with your zone, especially if a public holiday lands nearby.",
      },
    },
    {
      title: { fr: "Profiter de l’Ascension avec les enfants", en: "Use Ascension with the children" },
      summary: {
        fr: "L’Ascension reste souvent le moment le plus lisible pour obtenir un long week-end sans trop toucher au budget annuel.",
        en: "Ascension often remains the clearest moment to get a long weekend without using too much of the yearly budget.",
      },
      note: {
        fr: "Le simulateur vous dira rapidement si le mode “Favoriser” ou “Neutre” est le plus malin.",
        en: "The planner quickly tells you whether “Favor” or “Neutral” is the smarter mode.",
      },
    },
    {
      title: { fr: "Éviter les périodes les plus chargées", en: "Avoid the busiest periods" },
      summary: {
        fr: "Certaines familles préfèrent garder leurs jours pour un mois plus calme, même si le pont paraît séduisant sur le papier.",
        en: "Some families prefer to keep their days for a quieter month, even if the bridge looks attractive on paper.",
      },
      note: {
        fr: "Le mode “Éviter” sert précisément à faire ressortir ces alternatives.",
        en: "The “Avoid” mode is precisely there to surface those alternatives.",
      },
    },
  ],
  relatedLinks: [
    { href: routes.schoolHolidaysBridgesYear(2026), label: { fr: "Calendrier scolaire 2026", en: "School calendar 2026" } },
    { href: routes.home, label: { fr: "Utiliser le simulateur", en: "Use the planner" } },
  ],
};
