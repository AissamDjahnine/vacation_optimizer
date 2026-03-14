import '../app_language.dart';
import 'content_models.dart';

class LeaveGuideScenarioData {
  const LeaveGuideScenarioData({
    required this.budgetLabel,
    required this.periodLabel,
    required this.resultLabel,
    required this.note,
  });

  final LocalizedTextData budgetLabel;
  final LocalizedTextData periodLabel;
  final LocalizedTextData resultLabel;
  final LocalizedTextData note;
}

class LeaveGuide2026Content {
  const LeaveGuide2026Content({
    required this.title,
    required this.subtitle,
    required this.sections,
    required this.scenarios,
  });

  final LocalizedTextData title;
  final LocalizedTextData subtitle;
  final List<ContentSectionData> sections;
  final List<LeaveGuideScenarioData> scenarios;
}

LeaveGuide2026Content buildLeaveGuide2026Content() {
  return LeaveGuide2026Content(
    title: const LocalizedTextData(
      fr: 'Comment bien poser ses congés en 2026',
      en: 'How to plan your leave well in 2026',
    ),
    subtitle: const LocalizedTextData(
      fr:
          'Les meilleurs mois, les ponts qui valent le coup, et quelques scénarios concrets pour transformer un budget limité en vraie coupure.',
      en:
          'The best months, the bridge opportunities that matter, and a few practical scenarios to turn a limited leave budget into a real break.',
    ),
    sections: [
      ContentSectionData(
        title: const LocalizedTextData(
          fr: 'Les meilleurs mois à surveiller',
          en: 'The best months to watch',
        ),
        accent: ContentSectionAccent.orange,
        chips: const [
          LocalizedTextData(fr: 'Mai', en: 'May'),
          LocalizedTextData(fr: 'Été', en: 'Summer'),
          LocalizedTextData(fr: 'Fin d’année', en: 'Year end'),
        ],
        body: const [
          LocalizedTextData(
            fr:
                'Mai reste le mois le plus dense pour les ponts, mais l’été et la fin d’année méritent aussi un test rapide selon vos objectifs.',
            en:
                'May stays the richest month for bridge opportunities, but summer and year end also deserve a quick check depending on your goals.',
          ),
        ],
        bullets: const [
          LocalizedTextData(
            fr: 'Mai 2026 concentre plusieurs dates utiles autour du 1er mai, du 8 mai et de l’Ascension.',
            en: 'May 2026 concentrates several useful dates around May 1st, May 8th and Ascension.',
          ),
          LocalizedTextData(
            fr: 'Juillet et août servent surtout à rallonger un repos déjà prévu.',
            en: 'July and August are better for extending an already planned break.',
          ),
          LocalizedTextData(
            fr: 'Novembre et décembre peuvent devenir intéressants avec peu de jours posés.',
            en: 'November and December can become interesting with only a few booked days.',
          ),
        ],
        example: const LocalizedTextData(
          fr: 'Exemple : si vous ne voulez poser que quelques jours, commencez presque toujours par tester mai avant le reste de l’année.',
          en: 'Example: if you only want to book a few days, start by testing May before the rest of the year.',
        ),
      ),
      ContentSectionData(
        title: const LocalizedTextData(
          fr: 'Comment lire vos scénarios',
          en: 'How to read the scenarios',
        ),
        accent: ContentSectionAccent.blue,
        chips: const [
          LocalizedTextData(fr: 'Budget congés', en: 'Leave budget'),
          LocalizedTextData(fr: 'Jours de repos', en: 'Days off'),
          LocalizedTextData(fr: 'Mode', en: 'Mode'),
        ],
        body: const [
          LocalizedTextData(
            fr:
                'Un bon scénario ne cherche pas seulement un long repos. Il cherche aussi à préserver des jours pour plus tard.',
            en:
                'A good scenario does not only chase a long break. It also tries to preserve days for later.',
          ),
        ],
        bullets: const [
          LocalizedTextData(
            fr: 'Regardez toujours le rapport entre jours posés et jours de repos obtenus.',
            en: 'Always look at the ratio between leave days booked and days off earned.',
          ),
          LocalizedTextData(
            fr: 'Testez le mode “Plusieurs ponts” quand deux fériés sont séparés de quelques jours.',
            en: 'Test the “Multiple breaks” mode when two public holidays are separated by a few days.',
          ),
          LocalizedTextData(
            fr: 'Activez les RTT si vous voulez préserver vos congés payés.',
            en: 'Enable RTT if you want to preserve paid leave.',
          ),
        ],
        specialCase: const LocalizedTextData(
          fr: 'Cas particulier : avec peu de jours, un mois moyen peut devenir meilleur qu’un “gros mois” si vos contraintes sont très serrées.',
          en: 'Special case: with very few days, an average month can outperform a “strong month” if your constraints are tight.',
        ),
      ),
    ],
    scenarios: const [
      LeaveGuideScenarioData(
        budgetLabel: LocalizedTextData(fr: '5 jours de congé', en: '5 leave days'),
        periodLabel: LocalizedTextData(
          fr: 'Priorité à mai 2026',
          en: 'Focus on May 2026',
        ),
        resultLabel: LocalizedTextData(
          fr: 'Vous posez quelques jours ciblés et vous gardez encore du budget pour l’été.',
          en: 'You book a few targeted days and still keep budget for summer.',
        ),
        note: LocalizedTextData(
          fr: 'Idéal pour chercher un ou deux ponts très propres sans vider votre compteur.',
          en: 'Ideal if you want one or two clean bridge breaks without using all your allowance.',
        ),
      ),
      LeaveGuideScenarioData(
        budgetLabel: LocalizedTextData(fr: '10 jours de congé', en: '10 leave days'),
        periodLabel: LocalizedTextData(
          fr: 'Mai + un second temps fort',
          en: 'May + a second strong period',
        ),
        resultLabel: LocalizedTextData(
          fr: 'Vous pouvez mixer un gros pont et une seconde coupure plus courte plus tard.',
          en: 'You can mix one long bridge and a second shorter break later on.',
        ),
        note: LocalizedTextData(
          fr: 'C’est souvent le meilleur compromis entre rendement et confort.',
          en: 'This is often the best compromise between efficiency and comfort.',
        ),
      ),
      LeaveGuideScenarioData(
        budgetLabel: LocalizedTextData(
          fr: '15 jours ou plus',
          en: '15 days or more',
        ),
        periodLabel: LocalizedTextData(
          fr: 'Structurer l’année entière',
          en: 'Structure the whole year',
        ),
        resultLabel: LocalizedTextData(
          fr: 'Vous pouvez répartir plusieurs ponts rentables au lieu de tout concentrer sur l’été.',
          en: 'You can spread several efficient bridge breaks instead of focusing everything on summer.',
        ),
        note: LocalizedTextData(
          fr: 'Le simulateur devient utile pour arbitrer entre un grand bloc et plusieurs respirations.',
          en: 'The planner becomes useful to arbitrate between one large block and several breathing spaces.',
        ),
      ),
    ],
  );
}
