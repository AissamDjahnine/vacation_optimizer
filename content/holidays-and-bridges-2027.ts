import type { GuideContent, HolidaysPlanIdea } from "@/content/content-models";
import { routes } from "@/lib/routes";

export const holidaysAndBridges2027Content: GuideContent & {
  planIdeas: HolidaysPlanIdea[];
} = {
  title: {
    fr: "Jours fériés 2027 en France et meilleurs ponts à prévoir",
    en: "French public holidays in 2027 and best bridges to plan ahead",
  },
  subtitle: {
    fr: "Préparez 2027 tôt : repérez les dates qui tombent bien, les saisons les plus riches, puis validez vos idées dans le simulateur.",
    en: "Prepare 2027 early: spot well-placed dates, the richest seasons, then validate your ideas in the planner.",
  },
  sections: [
    {
      title: { fr: "Pourquoi regarder 2027 dès maintenant", en: "Why look at 2027 right now" },
      accent: "green",
      chips: [
        { fr: "Anticipation", en: "Planning ahead" },
        { fr: "Calendrier annuel", en: "Yearly calendar" },
        { fr: "Ponts futurs", en: "Future bridges" },
      ],
      quote: {
        fr: "Préparer tôt ne veut pas dire figer l’année, mais repérer les fenêtres qui mériteront un vrai arbitrage plus tard.",
        en: "Planning early does not mean locking the year. It means spotting the windows that will deserve a real decision later on.",
      },
      body: [
        {
          fr: "Les meilleures stratégies de congés se préparent tôt. Un simple regard sur les jours fériés 2027 permet déjà d’identifier les saisons à fort potentiel.",
          en: "The best leave strategies are prepared early. A simple look at 2027 public holidays already helps identify the seasons with the highest potential.",
        },
      ],
      bullets: [
        { fr: "Le printemps reste souvent la première zone à examiner.", en: "Spring often remains the first area to examine." },
        { fr: "L’été et la fin d’année servent ensuite à affiner votre répartition.", en: "Summer and year end then help refine your split." },
      ],
    },
    {
      title: { fr: "Comment lire les ponts 2027", en: "How to read 2027 bridge opportunities" },
      accent: "orange",
      chips: [{ fr: "Printemps", en: "Spring" }, { fr: "Été", en: "Summer" }, { fr: "Fin d’année", en: "Year end" }],
      body: [
        {
          fr: "Toutes les dates n’ont pas le même intérêt. Celles qui tombent près d’un week-end méritent un test prioritaire dans Ponts Malins.",
          en: "Not all dates have the same value. Those that land close to a weekend deserve a priority test in Ponts Malins.",
        },
      ],
      example: {
        fr: "Exemple : un férié qui tombe un mardi peut devenir plus intéressant qu’un “gros mois” mal placé.",
        en: "Example: a public holiday on Tuesday can become more interesting than a badly positioned “big month”.",
      },
      specialCase: {
        fr: "À éviter : regarder uniquement la quantité de jours fériés sans vérifier leur position exacte dans la semaine.",
        en: "Avoid this trap: looking only at the number of public holidays without checking where they land in the week.",
      },
    },
  ],
  planIdeas: [
    {
      title: { fr: "Ponts du printemps 2027", en: "Spring bridge ideas for 2027" },
      summary: {
        fr: "C’est souvent la première zone à tester si vous voulez un maximum d’effet avec peu de jours posés.",
        en: "This is often the first area to test if you want maximum impact with only a few booked days.",
      },
    },
    {
      title: { fr: "Ponts d’été 2027", en: "Summer bridge ideas for 2027" },
      summary: {
        fr: "Moins explosifs que mai, mais utiles pour rallonger une pause déjà prévue.",
        en: "Less explosive than May, but useful for extending an already planned break.",
      },
    },
    {
      title: { fr: "Fin d’année 2027", en: "Year-end 2027" },
      summary: {
        fr: "Une bonne fin d’année peut équilibrer toute la stratégie si vous avez encore du budget.",
        en: "A strong year end can rebalance the whole strategy if you still have budget left.",
      },
    },
  ],
  relatedLinks: [
    { href: routes.holidaysYear(2027), label: { fr: "Jours fériés 2027", en: "Public holidays 2027" } },
    { href: routes.home, label: { fr: "Tester 2027 dans le simulateur", en: "Test 2027 in the planner" } },
  ],
};
