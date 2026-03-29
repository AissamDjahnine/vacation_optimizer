import type { GuideContent, LeaveGuideScenario } from "@/content/content-models";
import { routes } from "@/lib/routes";

export const leaveGuide2026Content: GuideContent & {
  scenarios: LeaveGuideScenario[];
} = {
  title: {
    fr: "Comment poser ses congés 2026 : meilleurs mois et ponts à tester",
    en: "How to book leave in 2026: best months and bridge days to test",
  },
  subtitle: {
    fr: "Commencez par les mois qui reviennent le plus dans les recherches, puis comparez les ponts utiles selon votre budget réel.",
    en: "Start with the months people search for most, then compare the useful bridge opportunities against your real budget.",
  },
  sections: [
    {
      title: { fr: "Les meilleurs mois à surveiller", en: "The best months to watch" },
      accent: "orange",
      chips: [{ fr: "Mai", en: "May" }, { fr: "Été", en: "Summer" }, { fr: "Fin d’année", en: "Year end" }],
      quote: {
        fr: "Le bon réflexe n’est pas de poser tout son budget d’un coup, mais de tester d’abord les mois où un petit effort crée une vraie coupure.",
        en: "The right reflex is not to spend your whole budget at once, but to test the months where a small effort creates a real break first.",
      },
      body: [
        {
          fr: "Mai reste le mois le plus dense pour les ponts, mais l’été et la fin d’année méritent aussi un test rapide selon vos objectifs.",
          en: "May stays the richest month for bridge opportunities, but summer and year end also deserve a quick check depending on your goals.",
        },
      ],
      bullets: [
        {
          fr: "Mai 2026 concentre plusieurs dates utiles autour du 1er mai, du 8 mai et de l’Ascension.",
          en: "May 2026 concentrates several useful dates around May 1st, May 8th and Ascension.",
        },
        {
          fr: "Juillet et août servent surtout à rallonger un repos déjà prévu.",
          en: "July and August are better for extending an already planned break.",
        },
        {
          fr: "Novembre et décembre peuvent devenir intéressants avec peu de jours posés.",
          en: "November and December can become interesting with only a few booked days.",
        },
      ],
      example: {
        fr: "Exemple : si vous ne voulez poser que quelques jours, commencez presque toujours par tester mai avant le reste de l’année.",
        en: "Example: if you only want to book a few days, start by testing May before the rest of the year.",
      },
    },
    {
      title: { fr: "Comment lire vos scénarios", en: "How to read the scenarios" },
      accent: "blue",
      chips: [
        { fr: "Budget congés", en: "Leave budget" },
        { fr: "Jours de repos", en: "Days off" },
        { fr: "Mode", en: "Mode" },
      ],
      body: [
        {
          fr: "Un bon scénario ne cherche pas seulement un long repos. Il cherche aussi à préserver des jours pour plus tard.",
          en: "A good scenario does not only chase a long break. It also tries to preserve days for later.",
        },
      ],
      bullets: [
        {
          fr: "Regardez toujours le rapport entre jours posés et jours de repos obtenus.",
          en: "Always look at the ratio between leave days booked and days off earned.",
        },
        {
          fr: "Testez le mode “Plusieurs ponts” quand deux fériés sont séparés de quelques jours.",
          en: "Test the “Multiple breaks” mode when two public holidays are separated by a few days.",
        },
        {
          fr: "Activez les RTT si vous voulez préserver vos congés payés.",
          en: "Enable RTT if you want to preserve paid leave.",
        },
      ],
      specialCase: {
        fr: "Se jeter automatiquement sur le “gros mois” peut être une erreur : avec peu de jours, un mois plus discret peut mieux coller à vos contraintes.",
        en: "Automatically jumping on the “big month” can be a mistake: with very few days, a quieter month can fit your constraints better.",
      },
    },
  ],
  scenarios: [
    {
      budgetLabel: { fr: "5 jours de congé", en: "5 leave days" },
      periodLabel: { fr: "Priorité à mai 2026", en: "Focus on May 2026" },
      resultLabel: {
        fr: "Vous posez quelques jours ciblés et vous gardez encore du budget pour l’été.",
        en: "You book a few targeted days and still keep budget for summer.",
      },
      note: {
        fr: "Idéal pour chercher un ou deux ponts très propres sans vider votre compteur.",
        en: "Ideal if you want one or two clean bridge breaks without using all your allowance.",
      },
    },
    {
      budgetLabel: { fr: "10 jours de congé", en: "10 leave days" },
      periodLabel: { fr: "Mai + un second temps fort", en: "May + a second strong period" },
      resultLabel: {
        fr: "Vous pouvez mixer un gros pont et une seconde coupure plus courte plus tard.",
        en: "You can mix one long bridge and a second shorter break later on.",
      },
      note: {
        fr: "C’est souvent le meilleur compromis entre rendement et confort.",
        en: "This is often the best compromise between efficiency and comfort.",
      },
    },
    {
      budgetLabel: { fr: "15 jours ou plus", en: "15 days or more" },
      periodLabel: { fr: "Structurer l’année entière", en: "Structure the whole year" },
      resultLabel: {
        fr: "Vous pouvez répartir plusieurs ponts rentables au lieu de tout concentrer sur l’été.",
        en: "You can spread several efficient bridge breaks instead of focusing everything on summer.",
      },
      note: {
        fr: "Le simulateur devient utile pour arbitrer entre un grand bloc et plusieurs respirations.",
        en: "The planner becomes useful to arbitrate between one large block and several breathing spaces.",
      },
    },
  ],
  relatedLinks: [
    { href: routes.holidaysYear(2026), label: { fr: "Jours fériés 2026", en: "Public holidays 2026" } },
    { href: routes.bridgesYear(2026), label: { fr: "Ponts 2026", en: "Bridge ideas 2026" } },
    { href: routes.schoolHolidaysBridgesYear(2026), label: { fr: "Vacances scolaires et ponts 2026", en: "School holidays and bridges 2026" } },
    { href: routes.mayBridges2026, label: { fr: "Ponts de mai 2026", en: "May 2026 bridges" } },
    { href: routes.annualPlannerYear(2026), label: { fr: "Planifier toute l’année 2026", en: "Plan the full year 2026" } },
  ],
};
