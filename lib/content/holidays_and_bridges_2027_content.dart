import '../app_language.dart';
import 'content_models.dart';

class Holidays2027PlanData {
  const Holidays2027PlanData({
    required this.title,
    required this.summary,
  });

  final LocalizedTextData title;
  final LocalizedTextData summary;
}

class HolidaysAndBridges2027Content {
  const HolidaysAndBridges2027Content({
    required this.title,
    required this.subtitle,
    required this.sections,
    required this.planIdeas,
  });

  final LocalizedTextData title;
  final LocalizedTextData subtitle;
  final List<ContentSectionData> sections;
  final List<Holidays2027PlanData> planIdeas;
}

HolidaysAndBridges2027Content buildHolidaysAndBridges2027Content() {
  return HolidaysAndBridges2027Content(
    title: const LocalizedTextData(
      fr: 'Jours fériés 2027 en France et meilleurs ponts à prévoir',
      en: 'French public holidays in 2027 and best bridges to plan ahead',
    ),
    subtitle: const LocalizedTextData(
      fr:
          'Préparez 2027 tôt : repérez les dates qui tombent bien, les saisons les plus riches, puis validez vos idées dans le simulateur.',
      en:
          'Prepare 2027 early: spot well-placed dates, the richest seasons, then validate your ideas in the planner.',
    ),
    sections: [
      ContentSectionData(
        title: const LocalizedTextData(
          fr: 'Pourquoi regarder 2027 dès maintenant',
          en: 'Why look at 2027 right now',
        ),
        accent: ContentSectionAccent.green,
        chips: const [
          LocalizedTextData(fr: 'Anticipation', en: 'Planning ahead'),
          LocalizedTextData(fr: 'Calendrier annuel', en: 'Yearly calendar'),
          LocalizedTextData(fr: 'Ponts futurs', en: 'Future bridges'),
        ],
        body: const [
          LocalizedTextData(
            fr:
                'Les meilleures stratégies de congés se préparent tôt. Un simple regard sur les jours fériés 2027 permet déjà d’identifier les saisons à fort potentiel.',
            en:
                'The best leave strategies are prepared early. A simple look at 2027 public holidays already helps identify the seasons with the highest potential.',
          ),
        ],
        bullets: const [
          LocalizedTextData(
            fr: 'Le printemps reste souvent la première zone à examiner.',
            en: 'Spring often remains the first area to examine.',
          ),
          LocalizedTextData(
            fr: 'L’été et la fin d’année servent ensuite à affiner votre répartition.',
            en: 'Summer and year end then help refine your split.',
          ),
        ],
      ),
      ContentSectionData(
        title: const LocalizedTextData(
          fr: 'Comment lire les ponts 2027',
          en: 'How to read 2027 bridge opportunities',
        ),
        accent: ContentSectionAccent.orange,
        chips: const [
          LocalizedTextData(fr: 'Printemps', en: 'Spring'),
          LocalizedTextData(fr: 'Été', en: 'Summer'),
          LocalizedTextData(fr: 'Fin d’année', en: 'Year end'),
        ],
        body: const [
          LocalizedTextData(
            fr:
                'Toutes les dates n’ont pas le même intérêt. Celles qui tombent près d’un week-end méritent un test prioritaire dans Ponts Malins.',
            en:
                'Not all dates have the same value. Those that land close to a weekend deserve a priority test in Ponts Malins.',
          ),
        ],
        example: const LocalizedTextData(
          fr: 'Exemple : un férié qui tombe un mardi peut devenir plus intéressant qu’un “gros mois” mal placé.',
          en: 'Example: a public holiday on Tuesday can become more interesting than a badly positioned “big month”.',
        ),
      ),
    ],
    planIdeas: const [
      Holidays2027PlanData(
        title: LocalizedTextData(
          fr: 'Ponts du printemps 2027',
          en: 'Spring bridge ideas for 2027',
        ),
        summary: LocalizedTextData(
          fr: 'C’est souvent la première zone à tester si vous voulez un maximum d’effet avec peu de jours posés.',
          en: 'This is often the first area to test if you want maximum impact with only a few booked days.',
        ),
      ),
      Holidays2027PlanData(
        title: LocalizedTextData(
          fr: 'Ponts d’été 2027',
          en: 'Summer bridge ideas for 2027',
        ),
        summary: LocalizedTextData(
          fr: 'Moins explosifs que mai, mais utiles pour rallonger une pause déjà prévue.',
          en: 'Less explosive than May, but useful for extending an already planned break.',
        ),
      ),
      Holidays2027PlanData(
        title: LocalizedTextData(
          fr: 'Fin d’année 2027',
          en: 'Year-end 2027',
        ),
        summary: LocalizedTextData(
          fr: 'Une bonne fin d’année peut équilibrer toute la stratégie si vous avez encore du budget.',
          en: 'A strong year end can rebalance the whole strategy if you still have budget left.',
        ),
      ),
    ],
  );
}
