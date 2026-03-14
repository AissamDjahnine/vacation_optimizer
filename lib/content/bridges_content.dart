import '../app_language.dart';
import 'content_models.dart';

class BridgeScenarioData {
  const BridgeScenarioData({
    required this.title,
    required this.summary,
    required this.payoff,
  });

  final LocalizedTextData title;
  final LocalizedTextData summary;
  final LocalizedTextData payoff;
}

class BridgesPageContent {
  const BridgesPageContent({
    required this.title,
    required this.subtitle,
    required this.sections,
    required this.scenarios,
  });

  final LocalizedTextData title;
  final LocalizedTextData subtitle;
  final List<ContentSectionData> sections;
  final List<BridgeScenarioData> scenarios;
}

BridgesPageContent buildBridgesPageContent(int year) {
  return BridgesPageContent(
    title: LocalizedTextData(
      fr: 'Ponts $year en France',
      en: 'Bridge ideas in France for $year',
    ),
    subtitle: LocalizedTextData(
      fr:
          'Vue d’ensemble des meilleurs moments pour transformer quelques jours posés en vraie coupure.',
      en:
          'A practical overview of the best moments to turn a few booked days into a real break.',
    ),
    sections: [
      ContentSectionData(
        title: LocalizedTextData(
          fr: 'Ce qu’il faut regarder',
          en: 'What to look for',
        ),
        body: [
          LocalizedTextData(
            fr:
                'Les meilleurs ponts arrivent quand un jour férié tombe près d’un week-end, ou quand deux jours fériés se regroupent dans le même mois.',
            en:
                'The best bridge opportunities happen when a public holiday sits next to a weekend, or when two public holidays cluster in the same month.',
          ),
        ],
        bullets: [
          LocalizedTextData(
            fr: 'Priorité aux jours fériés qui tombent un jeudi, vendredi ou mardi.',
            en: 'Focus first on public holidays that fall on Thursday, Friday, or Tuesday.',
          ),
          LocalizedTextData(
            fr: 'Regarder mai, novembre et les semaines avec deux respirations possibles.',
            en: 'Check May, November, and weeks that can create two breathing spaces.',
          ),
          LocalizedTextData(
            fr: 'Comparer un gros pont continu et plusieurs petits ponts dans le même mois.',
            en: 'Compare one long continuous break with several shorter bridges in the same month.',
          ),
        ],
      ),
      ContentSectionData(
        title: LocalizedTextData(
          fr: 'Comment utiliser le simulateur',
          en: 'How to use the planner',
        ),
        body: [
          LocalizedTextData(
            fr:
                'Le simulateur classe les options du mois selon le nombre de jours de repos obtenus pour chaque jour de congé payé utilisé.',
            en:
                'The planner ranks monthly options by the amount of days off you get for each paid leave day you use.',
          ),
        ],
        bullets: [
          LocalizedTextData(
            fr: 'Choisir le mois visé puis le budget de congés.',
            en: 'Choose the target month, then your leave budget.',
          ),
          LocalizedTextData(
            fr: 'Activer ou non les RTT mensuels.',
            en: 'Enable or disable monthly RTT days.',
          ),
          LocalizedTextData(
            fr: 'Basculer entre “Gros pont” et “Plusieurs ponts” pour comparer deux stratégies.',
            en: 'Switch between “Single break” and “Multiple breaks” to compare two strategies.',
          ),
        ],
      ),
      ContentSectionData(
        title: LocalizedTextData(
          fr: 'Lecture rapide des résultats',
          en: 'How to read the results',
        ),
        body: [
          LocalizedTextData(
            fr:
                'Chaque carte donne les jours fériés inclus, les jours posés, les RTT utilisés et une vue jour par jour.',
            en:
                'Each card shows included public holidays, booked days, RTT used, and a day-by-day view.',
          ),
        ],
        bullets: [
          LocalizedTextData(
            fr: 'Score élevé = plus de repos pour moins de congés payés.',
            en: 'A higher score means more days off for fewer paid leave days.',
          ),
          LocalizedTextData(
            fr: 'Les cartes du haut sont les options les plus rentables du mois.',
            en: 'Top cards are the most efficient options for that month.',
          ),
        ],
      ),
    ],
    scenarios: [
      BridgeScenarioData(
        title: LocalizedTextData(
          fr: 'Pont autour d’un vendredi férié',
          en: 'Bridge around a Friday public holiday',
        ),
        summary: LocalizedTextData(
          fr:
              'Quand un jour férié tombe un vendredi, un seul jour posé peut suffire à obtenir une vraie coupure.',
          en:
              'When a public holiday lands on Friday, one booked day can be enough to create a proper break.',
        ),
        payoff: LocalizedTextData(
          fr: 'Objectif : allonger un week-end sans disperser ses congés.',
          en: 'Goal: stretch a weekend without scattering leave days.',
        ),
      ),
      BridgeScenarioData(
        title: LocalizedTextData(
          fr: 'Deux petits ponts dans le même mois',
          en: 'Two shorter bridges in the same month',
        ),
        summary: LocalizedTextData(
          fr:
              'Certains mois sont meilleurs en mode “Plusieurs ponts” qu’en bloc unique, surtout quand deux fériés sont espacés de quelques jours.',
          en:
              'Some months work better in “Multiple breaks” mode than as one block, especially when two public holidays are separated by a few days.',
        ),
        payoff: LocalizedTextData(
          fr: 'Objectif : maximiser la souplesse avec le même budget.',
          en: 'Goal: maximize flexibility with the same leave budget.',
        ),
      ),
      BridgeScenarioData(
        title: LocalizedTextData(
          fr: 'Pont avec RTT',
          en: 'Bridge with RTT days',
        ),
        summary: LocalizedTextData(
          fr:
              'Si des RTT sont disponibles, l’outil les consomme avant les congés payés pour améliorer le rendement.',
          en:
              'If RTT days are available, the tool uses them before paid leave to improve the final efficiency.',
        ),
        payoff: LocalizedTextData(
          fr: 'Objectif : préserver les congés payés pour d’autres périodes.',
          en: 'Goal: preserve paid leave for other periods.',
        ),
      ),
    ],
  );
}
