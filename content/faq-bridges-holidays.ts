import type { FaqEntry, GuideContent } from "@/content/content-models";
import { routes } from "@/lib/routes";

export const faqBridgesHolidaysContent: GuideContent & {
  generalQuestions: FaqEntry[];
  privateVsPublicQuestions: FaqEntry[];
  rulesQuestions: FaqEntry[];
} = {
  title: {
    fr: "FAQ – Ponts, jours fériés et congés",
    en: "FAQ – Bridges, public holidays, and leave",
  },
  subtitle: {
    fr: "Les réponses courtes à ce qu’on cherche le plus souvent avant de poser des jours. Puis, si besoin, le simulateur prend le relais.",
    en: "Short answers to the most common questions people ask before booking leave. Then, if needed, the planner takes over.",
  },
  sections: [
    {
      title: { fr: "À quoi sert cette FAQ", en: "What this FAQ is for" },
      accent: "blue",
      chips: [
        { fr: "Questions fréquentes", en: "Common questions" },
        { fr: "Sources officielles", en: "Official sources" },
        { fr: "Simulateur", en: "Planner" },
      ],
      quote: {
        fr: "Une bonne FAQ doit faire gagner du temps. Si une réponse reste trop générale pour votre cas, le simulateur ou la source officielle prend le relais.",
        en: "A good FAQ should save time. If an answer stays too general for your case, the planner or the official source should take over.",
      },
      body: [
        {
          fr: "Cette page ne remplace pas les textes officiels. Elle sert à répondre vite, clairement, puis à vous renvoyer vers les bonnes sources et vers le simulateur si vous voulez passer à l’action.",
          en: "This page does not replace official texts. It is here to answer quickly and clearly, then point you to the right sources and to the planner if you want to take action.",
        },
      ],
      specialCase: {
        fr: "À éviter : appliquer une règle lue trop vite à votre propre situation sans vérifier le secteur, le statut ou l’accord d’entreprise.",
        en: "Avoid this trap: applying a rule you read quickly to your own situation without checking sector, status or company agreement.",
      },
    },
  ],
  generalQuestions: [
    {
      question: { fr: "Un pont est-il obligatoire pour l’employeur ?", en: "Is a bridge day mandatory for the employer?" },
      answer: { fr: "Non. Un pont peut être accordé selon l’entreprise, la convention ou l’organisation interne, mais il n’est pas automatique.", en: "No. A bridge day may be granted depending on the company, agreement, or internal organization, but it is not automatic." },
      sourceLabel: { fr: "Voir Service-Public.fr", en: "See Service-Public.fr" },
      sourceUrl: "https://www.service-public.fr/particuliers/actualites/A15602",
    },
    {
      question: { fr: "Que se passe-t-il si un jour férié tombe un dimanche ?", en: "What happens if a public holiday falls on Sunday?" },
      answer: { fr: "Dans beaucoup de cas, cela ne crée pas de jour supplémentaire à récupérer. Il faut regarder les règles applicables à votre situation.", en: "In many cases, it does not create an extra day to recover. You need to check the rules that apply to your situation." },
      sourceLabel: { fr: "Voir Service-Public.fr", en: "See Service-Public.fr" },
      sourceUrl: "https://www.service-public.fr/particuliers/vosdroits/F2405",
    },
    {
      question: { fr: "Les jours fériés sont-ils toujours payés ?", en: "Are public holidays always paid?" },
      answer: { fr: "Pas dans tous les cas ni dans tous les statuts. La règle dépend notamment du secteur et de la situation du salarié.", en: "Not in every case and not for every status. The rule depends in particular on the sector and the employee situation." },
      sourceLabel: { fr: "Voir Service-Public.fr", en: "See Service-Public.fr" },
      sourceUrl: "https://www.service-public.fr/particuliers/vosdroits/F2405",
    },
  ],
  privateVsPublicQuestions: [
    {
      question: { fr: "Les règles sont-elles les mêmes dans le privé et dans le public ?", en: "Are the rules the same in the private and public sectors?" },
      answer: { fr: "Non. Les principes peuvent être proches, mais l’application concrète, les jours concernés, les autorisations d’absence et les règles d’organisation peuvent varier.", en: "No. The principles can be close, but the practical application, the holidays concerned, leave authorizations and organization rules can vary." },
    },
    {
      question: { fr: "Comment calculer rapidement mes ponts personnels ?", en: "How can I quickly calculate my own bridge opportunities?" },
      answer: { fr: "Le plus simple est d’utiliser le simulateur : choisissez un mois, un budget, et comparez les options qui remontent en tête.", en: "The easiest way is to use the planner: choose a month, a budget, and compare the top-ranked options." },
    },
  ],
  rulesQuestions: [
    {
      question: { fr: "Qu’est-ce qui dépend de mon employeur ou de ma convention ?", en: "What depends on my employer or collective agreement?" },
      answer: {
        fr: "Le caractère imposé ou accordé d’un pont, l’organisation d’une fermeture collective, certaines modalités de rémunération ou de récupération, et plus largement les règles concrètes de pose peuvent dépendre de votre cadre de travail.",
        en: "Whether a bridge day is imposed or granted, whether a collective closure exists, some pay or recovery rules, and more generally the practical booking rules can depend on your work framework.",
      },
      sourceLabel: { fr: "Voir Service-Public.fr", en: "See Service-Public.fr" },
      sourceUrl: "https://www.service-public.fr/particuliers/actualites/A15602",
    },
    {
      question: { fr: "Que dit vraiment le calendrier scolaire officiel ?", en: "What does the official school calendar actually decide?" },
      answer: {
        fr: "Les zones A, B, C, les dates de vacances et certains ponts scolaires officiels comme ceux autour de l’Ascension viennent du calendrier publié par l’Éducation nationale. Le simulateur les résume, mais la source officielle reste la référence.",
        en: "Zones A, B, C, school-break dates and some official school bridge days such as those around Ascension come from the calendar published by the Ministry of Education. The planner summarizes them, but the official source remains the reference.",
      },
      sourceLabel: { fr: "Voir education.gouv.fr", en: "See education.gouv.fr" },
      sourceUrl: "https://www.education.gouv.fr/calendrier-scolaire-100148",
    },
    {
      question: { fr: "Comment utiliser Ponts Malins sans se tromper ?", en: "How should I use Ponts Malins without making mistakes?" },
      answer: {
        fr: "Utilisez Ponts Malins pour repérer les meilleures périodes, puis vérifiez les règles qui relèvent de votre statut ou de votre employeur quand une décision concrète est en jeu. L’outil aide à arbitrer, pas à remplacer les textes applicables.",
        en: "Use Ponts Malins to spot the best periods, then check the rules tied to your status or employer when a real decision is at stake. The tool helps you decide, not replace the applicable texts.",
      },
    },
  ],
  relatedLinks: [
    { href: routes.home, label: { fr: "Aller au simulateur", en: "Go to the planner" } },
    { href: routes.leaveGuide2026, label: { fr: "Guide congés 2026", en: "Leave guide 2026" } },
  ],
};
