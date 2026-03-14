import '../app_language.dart';
import 'content_models.dart';

class FamilyPlanningExampleData {
  const FamilyPlanningExampleData({
    required this.title,
    required this.summary,
    required this.note,
  });

  final LocalizedTextData title;
  final LocalizedTextData summary;
  final LocalizedTextData note;
}

class SchoolHolidaysFamily2026Content {
  const SchoolHolidaysFamily2026Content({
    required this.title,
    required this.subtitle,
    required this.sections,
    required this.examples,
  });

  final LocalizedTextData title;
  final LocalizedTextData subtitle;
  final List<ContentSectionData> sections;
  final List<FamilyPlanningExampleData> examples;
}

SchoolHolidaysFamily2026Content buildSchoolHolidaysFamily2026Content() {
  return SchoolHolidaysFamily2026Content(
    title: const LocalizedTextData(
      fr: 'Vacances scolaires 2026 et ponts',
      en: 'School holidays 2026 and bridge ideas',
    ),
    subtitle: const LocalizedTextData(
      fr:
          'Une vue pensée pour les familles : repérez la bonne zone, les périodes déjà chargées, puis utilisez le simulateur pour voir où un pont ajoute un vrai gain.',
      en:
          'A family-oriented view: find the right zone, spot the busy periods, then use the planner to see where a bridge actually adds value.',
    ),
    sections: [
      ContentSectionData(
        title: const LocalizedTextData(
          fr: 'Comment raisonner par zone',
          en: 'How to think by zone',
        ),
        accent: ContentSectionAccent.purple,
        chips: const [
          LocalizedTextData(fr: 'Zone A', en: 'Zone A'),
          LocalizedTextData(fr: 'Zone B', en: 'Zone B'),
          LocalizedTextData(fr: 'Zone C', en: 'Zone C'),
        ],
        body: const [
          LocalizedTextData(
            fr:
                'Pour une famille, un pont n’a pas la même valeur selon qu’il tombe pendant les vacances scolaires ou juste à côté. C’est pour ça que la zone doit être votre premier filtre.',
            en:
                'For a family, a bridge does not have the same value depending on whether it falls during school holidays or right next to them. That is why zone should be your first filter.',
          ),
        ],
        bullets: const [
          LocalizedTextData(
            fr: 'Commencez par choisir votre zone avant de regarder les ponts.',
            en: 'Start by choosing your zone before looking at bridge ideas.',
          ),
          LocalizedTextData(
            fr: 'Regardez ensuite les périodes proches du printemps et de l’Ascension.',
            en: 'Then check the periods close to spring and Ascension.',
          ),
        ],
        example: const LocalizedTextData(
          fr: 'Exemple : une semaine de printemps peut être parfaite pour une zone et beaucoup moins stratégique pour une autre.',
          en: 'Example: a spring week can be perfect for one zone and much less strategic for another.',
        ),
      ),
      ContentSectionData(
        title: const LocalizedTextData(
          fr: 'Quand le simulateur devient vraiment utile',
          en: 'When the planner becomes really useful',
        ),
        accent: ContentSectionAccent.blue,
        chips: const [
          LocalizedTextData(fr: 'Neutre', en: 'Neutral'),
          LocalizedTextData(fr: 'Favoriser', en: 'Favor'),
          LocalizedTextData(fr: 'Éviter', en: 'Avoid'),
          LocalizedTextData(fr: 'Chevauchement', en: 'Overlap'),
        ],
        body: const [
          LocalizedTextData(
            fr:
                'La page calendrier vous aide à voir les périodes scolaires. Le simulateur sert ensuite à décider si vous voulez prolonger ces périodes, les éviter, ou comparer les deux logiques.',
            en:
                'The calendar page helps you see school holiday periods. The planner then helps you decide whether you want to extend those periods, avoid them, or compare both strategies.',
          ),
        ],
        bullets: const [
          LocalizedTextData(
            fr: 'Utilisez “Favoriser” si vous cherchez à rallonger une période déjà familiale.',
            en: 'Use “Favor” if you want to extend a period that is already family-friendly.',
          ),
          LocalizedTextData(
            fr: 'Utilisez “Éviter” si vous voulez réserver vos congés à des moments plus calmes.',
            en: 'Use “Avoid” if you want to reserve your leave for quieter periods.',
          ),
          LocalizedTextData(
            fr: 'Utilisez “Neutre” pour comparer les deux familles d’options sur un même mois.',
            en: 'Use “Neutral” to compare both families of options within the same month.',
          ),
        ],
        specialCase: const LocalizedTextData(
          fr: 'Cas pratique : un pont peut être excellent pour les enfants, mais très chargé sur la route. Le simulateur aide à arbitrer entre confort et rendement.',
          en: 'Practical case: a bridge can be excellent for the children, but very busy on the road. The planner helps you arbitrate between comfort and efficiency.',
        ),
      ),
    ],
    examples: const [
      FamilyPlanningExampleData(
        title: LocalizedTextData(
          fr: 'Rallonger les vacances de printemps',
          en: 'Extend the spring break',
        ),
        summary: LocalizedTextData(
          fr: 'Quelques jours posés avant ou après la période scolaire peuvent transformer une semaine standard en vraie respiration familiale.',
          en: 'A few booked days before or after the school period can turn a standard week into a real family break.',
        ),
        note: LocalizedTextData(
          fr: 'À tester dans le simulateur avec votre zone, surtout si un férié tombe à proximité.',
          en: 'Worth testing in the planner with your zone, especially if a public holiday lands nearby.',
        ),
      ),
      FamilyPlanningExampleData(
        title: LocalizedTextData(
          fr: 'Profiter de l’Ascension avec les enfants',
          en: 'Use Ascension with the children',
        ),
        summary: LocalizedTextData(
          fr: 'L’Ascension reste souvent le moment le plus lisible pour obtenir un long week-end sans trop toucher au budget annuel.',
          en: 'Ascension often remains the clearest moment to get a long weekend without using too much of the yearly budget.',
        ),
        note: LocalizedTextData(
          fr: 'Le simulateur vous dira rapidement si le mode “Favoriser” ou “Neutre” est le plus malin.',
          en: 'The planner quickly tells you whether “Favor” or “Neutral” is the smarter mode.',
        ),
      ),
      FamilyPlanningExampleData(
        title: LocalizedTextData(
          fr: 'Éviter les périodes les plus chargées',
          en: 'Avoid the busiest periods',
        ),
        summary: LocalizedTextData(
          fr: 'Certaines familles préfèrent garder leurs jours pour un mois plus calme, même si le pont paraît séduisant sur le papier.',
          en: 'Some families prefer to keep their days for a quieter month, even if the bridge looks attractive on paper.',
        ),
        note: LocalizedTextData(
          fr: 'Le mode “Éviter” sert précisément à faire ressortir ces alternatives.',
          en: 'The “Avoid” mode is precisely there to surface those alternatives.',
        ),
      ),
    ],
  );
}
