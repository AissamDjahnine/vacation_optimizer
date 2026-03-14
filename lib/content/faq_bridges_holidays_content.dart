import '../app_language.dart';
import 'content_models.dart';

class FaqEntryData {
  const FaqEntryData({
    required this.question,
    required this.answer,
    this.sourceLabel,
    this.sourceUrl,
  });

  final LocalizedTextData question;
  final LocalizedTextData answer;
  final LocalizedTextData? sourceLabel;
  final String? sourceUrl;
}

class FaqBridgesHolidaysContent {
  const FaqBridgesHolidaysContent({
    required this.title,
    required this.subtitle,
    required this.sections,
    required this.generalQuestions,
    required this.privateVsPublicQuestions,
  });

  final LocalizedTextData title;
  final LocalizedTextData subtitle;
  final List<ContentSectionData> sections;
  final List<FaqEntryData> generalQuestions;
  final List<FaqEntryData> privateVsPublicQuestions;
}

FaqBridgesHolidaysContent buildFaqBridgesHolidaysContent() {
  return FaqBridgesHolidaysContent(
    title: const LocalizedTextData(
      fr: 'FAQ – Ponts, jours fériés et congés',
      en: 'FAQ – Bridges, public holidays, and leave',
    ),
    subtitle: const LocalizedTextData(
      fr:
          'Les réponses courtes à ce qu’on cherche le plus souvent avant de poser des jours. Puis, si besoin, le simulateur prend le relais.',
      en:
          'Short answers to the most common questions people ask before booking leave. Then, if needed, the planner takes over.',
    ),
    sections: [
      ContentSectionData(
        title: const LocalizedTextData(
          fr: 'À quoi sert cette FAQ',
          en: 'What this FAQ is for',
        ),
        accent: ContentSectionAccent.blue,
        chips: const [
          LocalizedTextData(fr: 'Questions fréquentes', en: 'Common questions'),
          LocalizedTextData(fr: 'Sources officielles', en: 'Official sources'),
          LocalizedTextData(fr: 'Simulateur', en: 'Planner'),
        ],
        body: const [
          LocalizedTextData(
            fr:
                'Cette page ne remplace pas les textes officiels. Elle sert à répondre vite, clairement, puis à vous renvoyer vers les bonnes sources et vers le simulateur si vous voulez passer à l’action.',
            en:
                'This page does not replace official texts. It is here to answer quickly and clearly, then point you to the right sources and to the planner if you want to take action.',
          ),
        ],
      ),
    ],
    generalQuestions: const [
      FaqEntryData(
        question: LocalizedTextData(
          fr: 'Un pont est-il obligatoire pour l’employeur ?',
          en: 'Is a bridge day mandatory for the employer?',
        ),
        answer: LocalizedTextData(
          fr: 'Non. Un pont peut être accordé selon l’entreprise, la convention ou l’organisation interne, mais il n’est pas automatique.',
          en: 'No. A bridge day may be granted depending on the company, agreement, or internal organization, but it is not automatic.',
        ),
        sourceLabel: LocalizedTextData(
          fr: 'Voir Service-Public.fr',
          en: 'See Service-Public.fr',
        ),
        sourceUrl: 'https://www.service-public.fr/particuliers/actualites/A15602',
      ),
      FaqEntryData(
        question: LocalizedTextData(
          fr: 'Que se passe-t-il si un jour férié tombe un dimanche ?',
          en: 'What happens if a public holiday falls on Sunday?',
        ),
        answer: LocalizedTextData(
          fr: 'Dans beaucoup de cas, cela ne crée pas de jour supplémentaire à récupérer. Il faut regarder les règles applicables à votre situation.',
          en: 'In many cases, it does not create an extra day to recover. You need to check the rules that apply to your situation.',
        ),
      ),
      FaqEntryData(
        question: LocalizedTextData(
          fr: 'Les jours fériés sont-ils toujours payés ?',
          en: 'Are public holidays always paid?',
        ),
        answer: LocalizedTextData(
          fr: 'Pas dans tous les cas ni dans tous les statuts. La règle dépend notamment du secteur et de la situation du salarié.',
          en: 'Not in every case and not for every status. The rule depends in particular on the sector and the employee situation.',
        ),
        sourceLabel: LocalizedTextData(
          fr: 'Voir Service-Public.fr',
          en: 'See Service-Public.fr',
        ),
        sourceUrl: 'https://www.service-public.fr/particuliers/vosdroits/F2405',
      ),
    ],
    privateVsPublicQuestions: const [
      FaqEntryData(
        question: LocalizedTextData(
          fr: 'Les règles sont-elles les mêmes dans le privé et dans le public ?',
          en: 'Are the rules the same in the private and public sectors?',
        ),
        answer: LocalizedTextData(
          fr: 'Non. Les principes peuvent être proches, mais l’application concrète, les jours concernés et les règles d’organisation peuvent varier.',
          en: 'No. The principles can be close, but the practical application, the holidays concerned, and the organization rules may vary.',
        ),
      ),
      FaqEntryData(
        question: LocalizedTextData(
          fr: 'Comment calculer rapidement mes ponts personnels ?',
          en: 'How can I quickly calculate my own bridge opportunities?',
        ),
        answer: LocalizedTextData(
          fr: 'Le plus simple est d’utiliser le simulateur : choisissez un mois, un budget, et comparez les options qui remontent en tête.',
          en: 'The easiest way is to use the planner: choose a month, a budget, and compare the top-ranked options.',
        ),
      ),
    ],
  );
}
