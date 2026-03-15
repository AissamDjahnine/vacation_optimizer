import type { PageAuthorityBlock } from "@/lib/domain/types";
import { routes } from "@/lib/routes";

export const schoolAuthority2026Block: PageAuthorityBlock = {
  title: {
    fr: "Cas officiels à ne pas rater en 2026",
    en: "Official cases not to miss in 2026",
  },
  intro: {
    fr: "Ces cas viennent des calendriers scolaires officiels. Ils comptent surtout pour les familles, car ils peuvent créer un vrai pont scolaire sans être un jour férié national.",
    en: "These cases come from the official school calendars. They matter especially for families because they can create a real school bridge without being a national public holiday.",
  },
  notes: [
    {
      badge: { fr: "Pont scolaire officiel", en: "Official school bridge" },
      title: {
        fr: "Ascension 2026 : vendredi 15 et samedi 16 mai vaqués",
        en: "Ascension 2026: Friday 15 May and Saturday 16 May off",
      },
      summary: {
        fr: "Pour l’année scolaire 2025-2026, les classes sont vaquées le vendredi 15 mai 2026 et le samedi 16 mai 2026 après l’Ascension. C’est un repère clé pour les familles qui cherchent à prolonger ce moment sans gaspiller leur budget.",
        en: "For the 2025-2026 school year, classes are cancelled on Friday 15 May 2026 and Saturday 16 May 2026 after Ascension. It is a key reference point for families trying to extend that period without wasting leave budget.",
      },
      source: {
        label: {
          fr: "Source officielle Service-Public.fr",
          en: "Official source on Service-Public.fr",
        },
        href: "https://www.service-public.fr/particuliers/vosdroits/F31952",
      },
      href: `${routes.home}?year=2026&month=5&zone=A&mode=distributed`,
    },
  ],
};

export const holidaysAuthority2027Block: PageAuthorityBlock = {
  title: {
    fr: "Repères officiels pour 2027",
    en: "Official markers for 2027",
  },
  intro: {
    fr: "2027 vaut déjà le détour car certains repères sont connus officiellement à l’avance. Ils donnent une vraie longueur d’avance aux familles et aux salariés qui préparent tôt.",
    en: "2027 is already worth preparing because some markers are officially known in advance. They give a real head start to families and employees planning early.",
  },
  notes: [
    {
      badge: { fr: "Pont scolaire officiel", en: "Official school bridge" },
      title: {
        fr: "Vendredi 7 mai 2027 : classes vaquées",
        en: "Friday 7 May 2027: classes cancelled",
      },
      summary: {
        fr: "Le calendrier scolaire 2026-2027 prévoit que les classes seront vaquées le vendredi 7 mai 2027. Ce n’est pas un jour férié national, mais c’est une information majeure pour préparer un pont familial autour du 8 mai.",
        en: "The 2026-2027 school calendar states that classes will be cancelled on Friday 7 May 2027. It is not a national public holiday, but it is a major marker for family planning around 8 May.",
      },
      source: {
        label: {
          fr: "Source officielle Service-Public.fr",
          en: "Official source on Service-Public.fr",
        },
        href: "https://www.service-public.fr/particuliers/actualites/A18563",
      },
      href: `${routes.home}?year=2027&month=5&mode=distributed&zone=A`,
    },
  ],
};

export const rulesAuthorityBlock: PageAuthorityBlock = {
  title: {
    fr: "Ce qui relève de la règle nationale",
    en: "What belongs to the national rule set",
  },
  intro: {
    fr: "Certaines questions relèvent d’un texte national, d’autres dépendent de votre employeur, de votre convention ou de votre statut. Ponts Malins doit être clair sur cette frontière.",
    en: "Some questions come from national rules, others depend on your employer, collective agreement or status. Ponts Malins should stay clear about that boundary.",
  },
  notes: [
    {
      badge: { fr: "Règle officielle", en: "Official rule" },
      title: {
        fr: "Jours fériés, ponts et jours payés : vérifier le cadre exact",
        en: "Public holidays, bridge days and paid days: check the exact framework",
      },
      summary: {
        fr: "Le simulateur aide à repérer les meilleures dates, mais il ne remplace pas les règles applicables à votre entreprise. Le caractère payé d’un jour férié, la possibilité d’un pont ou l’effet d’un dimanche férié doivent être vérifiés dans le bon cadre.",
        en: "The planner helps identify the best dates, but it does not replace the rules applying to your workplace. Whether a public holiday is paid, whether a bridge day is granted or what happens when a holiday falls on Sunday must be checked in the right framework.",
      },
      source: {
        label: {
          fr: "Voir la fiche Service-Public.fr",
          en: "See the Service-Public.fr sheet",
        },
        href: "https://www.service-public.fr/particuliers/vosdroits/F2405",
      },
    },
    {
      badge: { fr: "Calendrier officiel", en: "Official calendar" },
      title: {
        fr: "Zones A, B, C : seul le calendrier scolaire officiel fait foi",
        en: "Zones A, B, C: only the official school calendar is authoritative",
      },
      summary: {
        fr: "Les zones et dates de vacances scolaires doivent être lues à partir du calendrier publié par l’Éducation nationale. Ponts Malins les résume pour vous aider à décider plus vite, pas pour remplacer la source.",
        en: "School zones and holiday dates must be read from the calendar published by the Ministry of Education. Ponts Malins summarizes them to help you decide faster, not to replace the source.",
      },
      source: {
        label: {
          fr: "Voir education.gouv.fr",
          en: "See education.gouv.fr",
        },
        href: "https://www.education.gouv.fr/calendrier-scolaire-100148",
      },
    },
  ],
};
