import '../app_language.dart';
import 'content_models.dart';

class SchoolHolidaysBridgesPageContent {
  const SchoolHolidaysBridgesPageContent({
    required this.title,
    required this.subtitle,
    required this.sections,
  });

  final LocalizedTextData title;
  final LocalizedTextData subtitle;
  final List<ContentSectionData> sections;
}

SchoolHolidaysBridgesPageContent buildSchoolHolidaysBridgesPageContent(int year) {
  return SchoolHolidaysBridgesPageContent(
    title: LocalizedTextData(
      fr: 'Vacances scolaires et ponts $year',
      en: 'School holidays and bridges in $year',
    ),
    subtitle: LocalizedTextData(
      fr:
          'Repérez les périodes scolaires par zone et voyez comment elles influencent les stratégies de ponts.',
      en:
          'Track school holiday periods by zone and see how they influence bridge planning strategies.',
    ),
    sections: [
      ContentSectionData(
        title: LocalizedTextData(
          fr: 'Pourquoi la zone compte',
          en: 'Why the school zone matters',
        ),
        accent: ContentSectionAccent.purple,
        chips: [
          LocalizedTextData(fr: 'Zone A', en: 'Zone A'),
          LocalizedTextData(fr: 'Zone B', en: 'Zone B'),
          LocalizedTextData(fr: 'Zone C', en: 'Zone C'),
        ],
        body: [
          LocalizedTextData(
            fr:
                'Les vacances d’hiver et de printemps ne tombent pas aux mêmes dates selon les zones A, B et C. Un pont intéressant dans une zone peut être moins utile dans une autre.',
            en:
                'Winter and spring breaks do not fall on the same dates across zones A, B, and C. A strong bridge opportunity in one zone can be less useful in another.',
          ),
        ],
        bullets: [
          LocalizedTextData(
            fr: 'Zone A, B ou C change les fenêtres de chevauchement possibles.',
            en: 'Zone A, B, or C changes possible overlap windows.',
          ),
          LocalizedTextData(
            fr: 'Le simulateur peut ensuite favoriser ou éviter ces périodes.',
            en: 'The planner can then favor or avoid those periods.',
          ),
        ],
        example: LocalizedTextData(
          fr: 'Exemple : un même week-end prolongé peut tomber en plein congé scolaire pour la zone B et hors vacances pour la zone C.',
          en: 'Example: the same long weekend can land inside school holidays for zone B and outside them for zone C.',
        ),
      ),
      ContentSectionData(
        title: LocalizedTextData(
          fr: 'Comment utiliser cette page',
          en: 'How to use this page',
        ),
        accent: ContentSectionAccent.blue,
        chips: [
          LocalizedTextData(fr: 'Neutre', en: 'Neutral'),
          LocalizedTextData(fr: 'Favoriser', en: 'Favor'),
          LocalizedTextData(fr: 'Éviter', en: 'Avoid'),
          LocalizedTextData(fr: 'Chevauchement', en: 'Overlap'),
        ],
        body: [
          LocalizedTextData(
            fr:
                'Commencez par choisir une année et une zone, puis utilisez le simulateur pour tester vos réglages avec ou sans chevauchement.',
            en:
                'Start by choosing a year and a zone, then use the planner to test your settings with or without overlap.',
          ),
        ],
        bullets: [
          LocalizedTextData(
            fr: 'Regardez les vacances qui tombent près des jours fériés du printemps.',
            en: 'Check holidays that land near spring public holidays.',
          ),
          LocalizedTextData(
            fr: 'Comparez les modes “Favoriser”, “Éviter” et “Neutre” dans le simulateur.',
            en: 'Compare “Favor”, “Avoid”, and “Neutral” modes in the planner.',
          ),
        ],
        specialCase: LocalizedTextData(
          fr: 'Cas pratique : “Favoriser” active le chevauchement, “Éviter” le coupe, et “Neutre” laisse voir les deux familles d’options.',
          en: 'Practical case: “Favor” enables overlap, “Avoid” disables it, and “Neutral” lets you compare both families of options.',
        ),
      ),
    ],
  );
}
