import type { GuideContent } from "@/content/content-models";
import { routes } from "@/lib/routes";

export const ascension2026Content: GuideContent = {
  title: {
    fr: "Pont de l’Ascension 2026 : comment en profiter vraiment",
    en: "Ascension bridge 2026: how to make the most of it",
  },
  subtitle: {
    fr: "Le cas le plus scruté de l’année : ce qu’il faut regarder, ce qui change pour les familles et comment le tester proprement dans Ponts Malins.",
    en: "The most watched case of the year: what to look at, what changes for families, and how to test it cleanly in Ponts Malins.",
  },
  sections: [
    {
      title: { fr: "Pourquoi l’Ascension 2026 compte autant", en: "Why Ascension 2026 matters so much" },
      accent: "orange",
      chips: [{ fr: "Mai 2026", en: "May 2026" }, { fr: "Familles", en: "Families" }, { fr: "Pont scolaire", en: "School bridge" }],
      body: [
        {
          fr: "L’Ascension concentre souvent le cas le plus lisible de l’année. Elle tombe déjà à un moment naturellement favorable, puis le calendrier scolaire peut encore renforcer l’intérêt pour les familles.",
          en: "Ascension often concentrates the clearest opportunity of the year. It already falls at a naturally useful moment, then the school calendar can strengthen its value for families.",
        },
      ],
      example: {
        fr: "Exemple : commencez par mai 2026 dans le simulateur, puis comparez le mode gros pont et le mode plusieurs ponts avec votre vrai budget.",
        en: "Example: start with May 2026 in the planner, then compare long bridge and multiple bridge modes with your real budget.",
      },
      specialCase: {
        fr: "À éviter : croire que le même raisonnement vaut pour tous sans regarder votre zone scolaire ou vos contraintes employeur.",
        en: "Avoid this trap: assuming the same reasoning works for everyone without checking your school zone or work constraints.",
      },
    },
    {
      title: { fr: "Le bon usage de cette page", en: "The right use of this page" },
      accent: "blue",
      chips: [{ fr: "Données utiles", en: "Useful data" }, { fr: "Exemples", en: "Examples" }, { fr: "Simulateur", en: "Planner" }],
      body: [
        {
          fr: "Cette page sert à cadrer le sujet et à savoir quoi tester. Le simulateur reste la bonne étape dès que vous voulez arbitrer entre plusieurs budgets ou entre un gros pont et plusieurs respirations.",
          en: "This page helps frame the topic and decide what to test. The planner remains the right step as soon as you want to arbitrate between budgets or between one long bridge and several shorter breaks.",
        },
      ],
    },
  ],
  relatedLinks: [
    { href: routes.mayBridges2026, label: { fr: "Ponts de mai 2026", en: "May 2026 bridges" } },
    { href: routes.schoolHolidaysFamily2026, label: { fr: "Vacances scolaires 2026 et ponts", en: "School holidays 2026 and bridges" } },
    { href: routes.bridgesYear(2026), label: { fr: "Ponts 2026", en: "Bridge ideas 2026" } },
    { href: routes.holidaysYear(2026), label: { fr: "Jours fériés 2026", en: "Public holidays 2026" } },
    { href: routes.home, label: { fr: "Retour au simulateur", en: "Back to planner" } },
  ],
};

export const mayBridges2026Content: GuideContent = {
  title: {
    fr: "Ponts de mai 2026 : les meilleurs cas à ouvrir d’abord",
    en: "May 2026 bridges: the first cases worth opening",
  },
  subtitle: {
    fr: "Mai 2026 concentre plusieurs cas utiles. L’objectif n’est pas de tout tester au hasard, mais de savoir par où commencer selon votre budget.",
    en: "May 2026 concentrates several useful cases. The goal is not to test everything randomly, but to know where to start depending on your budget.",
  },
  sections: [
    {
      title: { fr: "Les trois dates qui structurent le mois", en: "The three dates shaping the month" },
      accent: "orange",
      chips: [{ fr: "1er mai", en: "May 1st" }, { fr: "8 mai", en: "May 8th" }, { fr: "Ascension", en: "Ascension" }],
      body: [
        {
          fr: "Le mois concentre trois points d’entrée naturels. Selon votre budget, vous pouvez chercher un seul gros bloc ou plusieurs ponts plus courts.",
          en: "The month concentrates three natural entry points. Depending on your budget, you can look for one long block or several shorter bridge breaks.",
        },
      ],
      example: {
        fr: "Exemple : avec peu de jours, commencez par comparer 1er mai et 8 mai ; avec plus de marge, l’Ascension devient vite centrale.",
        en: "Example: with few days, start by comparing May 1st and May 8th; with more flexibility, Ascension quickly becomes central.",
      },
    },
  ],
  relatedLinks: [
    { href: routes.ascension2026, label: { fr: "Pont de l’Ascension 2026", en: "Ascension bridge 2026" } },
    { href: routes.bridgesYear(2026), label: { fr: "Ponts 2026", en: "Bridge ideas 2026" } },
    { href: routes.holidaysYear(2026), label: { fr: "Jours fériés 2026", en: "Public holidays 2026" } },
    { href: routes.assumption2026, label: { fr: "Pont du 15 août 2026", en: "15 August 2026 bridge" } },
    { href: routes.armistice2026, label: { fr: "Pont du 11 novembre 2026", en: "11 November 2026 bridge" } },
    { href: routes.leaveBudget5Guide2026, label: { fr: "Poser 5 jours en 2026", en: "Book 5 days in 2026" } },
    { href: routes.leaveBudget10Guide2026, label: { fr: "Poser 10 jours en 2026", en: "Book 10 days in 2026" } },
  ],
};

export const assumption2026Content: GuideContent = {
  title: {
    fr: "Pont du 15 août 2026 : faut-il vraiment le tester ?",
    en: "15 August 2026 bridge: is it really worth testing?",
  },
  subtitle: {
    fr: "Le 15 août 2026 tombe un samedi. Cette page aide à voir si le week-end reste exploitable et quand il vaut mieux passer à d’autres mois.",
    en: "15 August 2026 falls on a Saturday. This page helps you see whether the weekend is still usable and when another month is the better bet.",
  },
  sections: [
    {
      title: { fr: "Pourquoi ce cas est particulier", en: "Why this case is special" },
      accent: "orange",
      chips: [{ fr: "Été 2026", en: "Summer 2026" }, { fr: "Assomption", en: "Assumption" }],
      body: [
        {
          fr: "Quand un jour férié tombe déjà dans le week-end, le gain potentiel devient plus faible. Cette page sert donc surtout à éviter de perdre du temps sur un faux bon plan.",
          en: "When a public holiday already falls on a weekend, the upside becomes smaller. This page mainly helps you avoid wasting time on a false good idea.",
        },
      ],
      specialCase: {
        fr: "À éviter : traiter le 15 août comme un grand pont alors qu’il demande souvent plus de jours pour un rendement faible.",
        en: "Avoid this trap: treating 15 August like a major bridge when it often needs more days for a weak payoff.",
      },
    },
  ],
  relatedLinks: [
    { href: routes.holidaysYear(2026), label: { fr: "Jours fériés 2026", en: "Public holidays 2026" } },
    { href: routes.mayBridges2026, label: { fr: "Ponts de mai 2026", en: "May 2026 bridges" } },
    { href: routes.bridgesYear(2026), label: { fr: "Ponts 2026", en: "Bridge ideas 2026" } },
    { href: routes.schoolHolidaysBridgesYear(2026), label: { fr: "Vacances scolaires et ponts 2026", en: "School holidays and bridges 2026" } },
    { href: routes.home, label: { fr: "Tester dans le simulateur", en: "Test in the planner" } },
  ],
};

export const allSaints2026Content: GuideContent = {
  title: {
    fr: "Pont du 1er novembre 2026 : la Toussaint vaut-elle le détour ?",
    en: "1 November 2026 bridge: is All Saints’ Day worth a look?",
  },
  subtitle: {
    fr: "La Toussaint 2026 tombe un dimanche. Cette page sert à comprendre vite pourquoi le 11 novembre est souvent un meilleur cas d’automne.",
    en: "All Saints’ Day 2026 falls on a Sunday. This page helps you understand quickly why 11 November is often the better autumn case.",
  },
  sections: [
    {
      title: { fr: "Le bon arbitrage à faire", en: "The right comparison to make" },
      accent: "green",
      chips: [{ fr: "Toussaint", en: "All Saints" }, { fr: "Automne", en: "Autumn" }],
      body: [
        {
          fr: "La Toussaint attire beaucoup de recherches, mais elle n’offre pas toujours le meilleur levier calendrier. L’intérêt de cette page est de comparer vite ce cas à un autre pont d’automne plus rentable.",
          en: "All Saints’ Day attracts plenty of searches, but it does not always offer the best calendar leverage. The goal of this page is to compare it quickly with a stronger autumn bridge.",
        },
      ],
      example: {
        fr: "Exemple : ouvrez d’abord novembre 2026, puis comparez la Toussaint au 11 novembre avec le même budget.",
        en: "Example: open November 2026 first, then compare All Saints’ Day with 11 November using the same budget.",
      },
    },
  ],
  relatedLinks: [
    { href: routes.armistice2026, label: { fr: "Pont du 11 novembre 2026", en: "11 November 2026 bridge" } },
    { href: routes.weekdayHolidays2026, label: { fr: "Jours fériés 2026 en semaine", en: "Weekday public holidays in 2026" } },
    { href: routes.holidaysYear(2026), label: { fr: "Jours fériés 2026", en: "Public holidays 2026" } },
    { href: routes.bridgesYear(2026), label: { fr: "Ponts 2026", en: "Bridge ideas 2026" } },
    { href: routes.home, label: { fr: "Tester dans le simulateur", en: "Test in the planner" } },
  ],
};

export const armistice2026Content: GuideContent = {
  title: {
    fr: "Pont du 11 novembre 2026 : le bon cas d’automne à tester",
    en: "11 November 2026 bridge: the autumn case worth testing",
  },
  subtitle: {
    fr: "Si vous cherchez un pont propre hors mai, le 11 novembre 2026 est souvent le premier cas à ouvrir.",
    en: "If you want a clean bridge outside May, 11 November 2026 is often the first case to open.",
  },
  sections: [
    {
      title: { fr: "Pourquoi ce cas mérite sa propre page", en: "Why this case deserves its own page" },
      accent: "green",
      chips: [{ fr: "Novembre 2026", en: "November 2026" }, { fr: "Automne", en: "Autumn" }],
      body: [
        {
          fr: "Le 11 novembre donne un point d’entrée simple à lire et souvent rentable. C’est utile si vous n’avez rien trouvé de convaincant au printemps ou si vous préférez répartir vos jours.",
          en: "11 November offers a simple and often profitable entry point. It helps if spring was not convincing or if you prefer to spread your days off.",
        },
      ],
      example: {
        fr: "Exemple : testez novembre 2026 avec un petit budget pour comparer un week-end prolongé propre à une stratégie plus étalée sur l’année.",
        en: "Example: test November 2026 with a small budget to compare one clean long weekend against a more spread annual strategy.",
      },
    },
  ],
  relatedLinks: [
    { href: routes.bridgesYear(2026), label: { fr: "Ponts 2026", en: "Bridge ideas 2026" } },
    { href: routes.holidaysYear(2026), label: { fr: "Jours fériés 2026", en: "Public holidays 2026" } },
    { href: routes.yearEnd2026, label: { fr: "Noël et fin d’année 2026", en: "Christmas and late-year 2026" } },
    { href: routes.weekdayHolidays2026, label: { fr: "Jours fériés 2026 en semaine", en: "Weekday public holidays in 2026" } },
    { href: routes.home, label: { fr: "Tester dans le simulateur", en: "Test in the planner" } },
  ],
};

export const yearEnd2026Content: GuideContent = {
  title: {
    fr: "Pont de Noël et fin d’année 2026 : ce qu’il reste à jouer",
    en: "Christmas and late-year 2026 bridge: what is still worth testing",
  },
  subtitle: {
    fr: "La fin d’année ne donne pas toujours le meilleur rendement, mais elle peut encore offrir une coupure propre selon votre budget réel.",
    en: "Late year does not always produce the best return, but it can still offer a clean break depending on your real budget.",
  },
  sections: [
    {
      title: { fr: "Le bon angle à adopter", en: "The right angle" },
      accent: "blue",
      chips: [{ fr: "Noël", en: "Christmas" }, { fr: "Nouvel An", en: "New Year" }],
      body: [
        {
          fr: "En fin d’année, l’intérêt dépend davantage de votre budget restant et des jours déjà posés. Cette page aide surtout à décider s’il faut encore tester décembre ou passer directement au plan annuel.",
          en: "Late in the year, the value depends more on your remaining budget and the days you have already booked. This page mainly helps decide whether December is still worth testing or whether you should switch straight to the annual plan.",
        },
      ],
      specialCase: {
        fr: "À éviter : forcer un plan de fin d’année alors que les meilleurs blocs ont déjà été consommés plus tôt.",
        en: "Avoid this trap: forcing a late-year plan when the strongest blocks have already been used earlier.",
      },
    },
  ],
  relatedLinks: [
    { href: routes.armistice2026, label: { fr: "Pont du 11 novembre 2026", en: "11 November 2026 bridge" } },
    { href: routes.annualPlannerYear(2026), label: { fr: "Planifier toute l’année 2026", en: "Plan the full year 2026" } },
    { href: routes.bridgesYear(2026), label: { fr: "Ponts 2026", en: "Bridge ideas 2026" } },
    { href: routes.holidaysYear(2026), label: { fr: "Jours fériés 2026", en: "Public holidays 2026" } },
    { href: routes.home, label: { fr: "Retour au simulateur", en: "Back to planner" } },
  ],
};

export function buildSchoolZone2026Content(zone: "A" | "B" | "C"): GuideContent {
  return {
    title: {
      fr: `Vacances scolaires 2026 zone ${zone}`,
      en: `School holidays 2026 zone ${zone}`,
    },
    subtitle: {
      fr: `Une page simple pour lire vite les périodes utiles de la zone ${zone}, puis voir quand un pont familial mérite un vrai test.`,
      en: `A simple page to read the useful periods for zone ${zone} quickly, then see when a family bridge deserves a real test.`,
    },
    sections: [
      {
        title: { fr: `Comment lire la zone ${zone}`, en: `How to read zone ${zone}` },
        accent: "purple",
        chips: [{ fr: `Zone ${zone}`, en: `Zone ${zone}` }, { fr: "Famille", en: "Family" }],
        body: [
          {
            fr: `Le bon réflexe est de partir de votre zone scolaire avant de juger un pont. Une même période peut être très utile pour la zone ${zone} et beaucoup moins pour une autre.`,
            en: `The right reflex is to start from your school zone before judging a bridge. The same period can be very useful for zone ${zone} and much less so for another.`,
          },
        ],
        specialCase: {
          fr: "À éviter : lire une recommandation famille sans vérifier d’abord si elle correspond bien à votre zone.",
          en: "Avoid this trap: reading a family recommendation without first checking whether it really matches your zone.",
        },
      },
    ],
    relatedLinks: [
      { href: routes.schoolHolidaysFamily2026, label: { fr: "Guide familles 2026", en: "Family guide 2026" } },
      { href: routes.schoolHolidaysBridgesYear(2026), label: { fr: "Calendrier scolaire 2026", en: "School calendar 2026" } },
      { href: routes.bridgesYear(2026), label: { fr: "Ponts 2026", en: "Bridge ideas 2026" } },
      { href: routes.holidaysYear(2026), label: { fr: "Jours fériés 2026", en: "Public holidays 2026" } },
      { href: routes.home, label: { fr: "Tester dans le simulateur", en: "Test in the planner" } },
    ],
  };
}

export const weekdayHolidays2026Content: GuideContent = {
  title: {
    fr: "Jours fériés 2026 qui tombent en semaine",
    en: "Public holidays 2026 that fall on weekdays",
  },
  subtitle: {
    fr: "Tous les jours fériés ne se valent pas. Ceux qui tombent en semaine sont les premiers à regarder si vous cherchez un vrai pont.",
    en: "Not all public holidays matter equally. Those falling on weekdays are the first ones to inspect if you are looking for a real bridge opportunity.",
  },
  sections: [
    {
      title: { fr: "Pourquoi ils comptent plus", en: "Why they matter more" },
      accent: "green",
      chips: [{ fr: "En semaine", en: "Weekday" }, { fr: "Pont utile", en: "Useful bridge" }],
      body: [
        {
          fr: "Un jour férié placé en semaine peut prolonger un week-end ou ouvrir une vraie coupure. À l’inverse, un férié tombant le dimanche ne crée souvent rien à lui seul.",
          en: "A weekday holiday can extend a weekend or open a real break. By contrast, a holiday falling on Sunday often creates nothing on its own.",
        },
      ],
    },
  ],
  relatedLinks: [
    { href: routes.holidaysYear(2026), label: { fr: "Tous les jours fériés 2026", en: "All public holidays 2026" } },
    { href: routes.bridgesYear(2026), label: { fr: "Ponts 2026", en: "Bridge ideas 2026" } },
    { href: routes.schoolHolidaysBridgesYear(2026), label: { fr: "Vacances scolaires et ponts 2026", en: "School holidays and bridges 2026" } },
    { href: routes.allSaints2026, label: { fr: "Pont du 1er novembre 2026", en: "1 November 2026 bridge" } },
  ],
};

export function buildLeaveBudgetGuide2026Content(budget: 5 | 10): GuideContent {
  const higherBudget = budget === 5 ? 10 : 15;
  return {
    title: {
      fr: `Comment poser ${budget} jours de congés en 2026`,
      en: `How to book ${budget} leave days in 2026`,
    },
    subtitle: {
      fr: `Un guide simple pour transformer ${budget} jours en vraies respirations, sans partir d’un calendrier vide.`,
      en: `A simple guide to turn ${budget} days into real breaks without starting from a blank calendar.`,
    },
    sections: [
      {
        title: { fr: "Par où commencer", en: "Where to start" },
        accent: "orange",
        chips: [{ fr: `${budget} jours`, en: `${budget} days` }, { fr: "Mai", en: "May" }, { fr: "Scénarios", en: "Scenarios" }],
        body: [
          {
            fr: `Avec ${budget} jours, le bon réflexe est de tester d’abord les périodes denses comme mai, puis de voir si un second moment fort mérite encore un arbitrage.`,
            en: `With ${budget} days, the right reflex is to test dense periods such as May first, then see whether a second strong moment is still worth arbitrating.`,
          },
        ],
        example: {
          fr: `Exemple : commencez par le mois de mai, puis vérifiez si un second bloc plus tard dans l’année est plus utile que de tout dépenser d’un coup.`,
          en: `Example: start with May, then check whether a second block later in the year is more useful than spending everything at once.`,
        },
        specialCase: {
          fr: `À éviter : copier un plan conçu pour ${higherBudget} jours alors que votre budget réel reste inférieur.`,
          en: `Avoid this trap: copying a plan designed for ${higherBudget} days when your actual budget stays lower.`,
        },
      },
    ],
    relatedLinks: [
      { href: routes.leaveGuide2026, label: { fr: "Guide congés 2026", en: "Leave guide 2026" } },
      { href: routes.mayBridges2026, label: { fr: "Ponts de mai 2026", en: "May 2026 bridges" } },
      { href: routes.bridgesYear(2026), label: { fr: "Ponts 2026", en: "Bridge ideas 2026" } },
      { href: routes.annualPlannerYear(2026), label: { fr: "Planifier toute l’année 2026", en: "Plan the full year 2026" } },
      { href: routes.home, label: { fr: "Tester dans le simulateur", en: "Test in the planner" } },
    ],
  };
}
