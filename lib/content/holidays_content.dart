import '../app_language.dart';
import 'content_models.dart';

class HolidaysPageContent {
  const HolidaysPageContent({
    required this.title,
    required this.subtitle,
    required this.sections,
  });

  final LocalizedTextData title;
  final LocalizedTextData subtitle;
  final List<ContentSectionData> sections;
}

HolidaysPageContent buildHolidaysPageContent(int year) {
  return HolidaysPageContent(
    title: LocalizedTextData(
      fr: 'Jours fériés $year en France',
      en: 'French public holidays in $year',
    ),
    subtitle: LocalizedTextData(
      fr:
          'La liste annuelle des jours fériés en France, regroupée mois par mois à partir des données publiques.',
      en:
          'The yearly list of French public holidays, grouped month by month from public data.',
    ),
    sections: [
      ContentSectionData(
        title: LocalizedTextData(
          fr: 'Comment lire cette page',
          en: 'How to use this page',
        ),
        body: [
          LocalizedTextData(
            fr:
                'Cette vue sert à repérer rapidement les mois avec au moins un jour férié utile pour créer un pont.',
            en:
                'This view helps you quickly spot months with at least one public holiday that can create a bridge opportunity.',
          ),
        ],
        bullets: [
          LocalizedTextData(
            fr: 'Changer d’année pour comparer les calendriers.',
            en: 'Change the year to compare calendars.',
          ),
          LocalizedTextData(
            fr: 'Utiliser ensuite la page Ponts ou le simulateur pour tester les meilleures options.',
            en: 'Then use the Bridges page or the planner to test the best options.',
          ),
        ],
      ),
      ContentSectionData(
        title: LocalizedTextData(
          fr: 'Ce qui compte pour les ponts',
          en: 'What matters for bridge planning',
        ),
        body: [
          LocalizedTextData(
            fr:
                'Un jour férié tombant près d’un week-end a plus de valeur pratique qu’un jour férié déjà absorbé par un samedi ou un dimanche.',
            en:
                'A public holiday near a weekend is more useful in practice than one already absorbed by Saturday or Sunday.',
          ),
        ],
        bullets: [
          LocalizedTextData(
            fr: 'Jeudi ou mardi : souvent de bons candidats à un pont.',
            en: 'Thursday or Tuesday: often good bridge candidates.',
          ),
          LocalizedTextData(
            fr: 'Vendredi ou lundi : très bons pour allonger un week-end.',
            en: 'Friday or Monday: very good for extending a weekend.',
          ),
        ],
      ),
    ],
  );
}
