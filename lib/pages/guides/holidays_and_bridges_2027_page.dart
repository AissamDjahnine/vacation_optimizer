import 'package:flutter/material.dart';

import '../../app_language.dart';
import '../../app_routes.dart';
import '../../content/content_models.dart';
import '../../content/holidays_and_bridges_2027_content.dart';
import '../../models/holiday.dart';
import '../../planner_initial_config.dart';
import '../../services/holiday_service.dart';
import '../content/content_page_scaffold.dart';

class HolidaysAndBridges2027Page extends StatefulWidget {
  const HolidaysAndBridges2027Page({super.key});

  @override
  State<HolidaysAndBridges2027Page> createState() =>
      _HolidaysAndBridges2027PageState();
}

class _HolidaysAndBridges2027PageState
    extends State<HolidaysAndBridges2027Page> {
  List<Holiday> holidays = [];
  bool isLoading = true;
  String? errorMessage;

  bool get isEnglish => appLanguageNotifier.value == AppLanguage.en;
  String tr(String fr, String en) => isEnglish ? en : fr;

  @override
  void initState() {
    super.initState();
    _loadHolidays();
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<AppLanguage>(
      valueListenable: appLanguageNotifier,
      builder: (context, language, _) {
        final content = buildHolidaysAndBridges2027Content();

        return ContentPageScaffold(
          language: language,
          title: content.title,
          subtitle: content.subtitle,
          sections: content.sections,
          simulatorLabel: const LocalizedTextData(
            fr: 'Préparer 2027 dans le simulateur',
            en: 'Prepare 2027 in the planner',
          ),
          onOpenSimulator: () => Navigator.of(context).pushNamed(
            AppRoutePath.homePath(),
            arguments: const PlannerInitialConfig(
              year: 2027,
              scrollToPlanner: true,
            ),
          ),
          relatedLinks: [
            RelatedContentLinkData(
              label: const LocalizedTextData(
                fr: 'Voir les jours fériés 2027',
                en: 'See 2027 public holidays',
              ),
              route: AppRoutePath.contentPath(ContentPageType.holidays, 2027),
            ),
            RelatedContentLinkData(
              label: const LocalizedTextData(
                fr: 'Guide congés 2026',
                en: '2026 leave guide',
              ),
              route: AppRoutePath.guidePath(GuidePageType.guideLeave2026),
            ),
          ],
          beforeSections: Column(
            children: [
              _Holidays2027SummaryPanel(
                language: language,
                holidays: holidays,
                isLoading: isLoading,
                errorMessage: errorMessage,
              ),
              const SizedBox(height: 24),
              _PlanIdeasPanel(
                language: language,
                ideas: content.planIdeas,
              ),
            ],
          ),
        );
      },
    );
  }

  Future<void> _loadHolidays() async {
    setState(() {
      isLoading = true;
      errorMessage = null;
    });

    try {
      final fetched = await HolidayService.fetchHolidays('FR', 2027);
      if (!mounted) {
        return;
      }
      setState(() => holidays = fetched);
    } catch (_) {
      if (!mounted) {
        return;
      }
      setState(() {
        holidays = [];
        errorMessage = tr(
          'Impossible de récupérer les jours fériés 2027 pour le moment.',
          'Unable to retrieve 2027 public holidays right now.',
        );
      });
    } finally {
      if (mounted) {
        setState(() => isLoading = false);
      }
    }
  }
}

class _Holidays2027SummaryPanel extends StatelessWidget {
  const _Holidays2027SummaryPanel({
    required this.language,
    required this.holidays,
    required this.isLoading,
    required this.errorMessage,
  });

  final AppLanguage language;
  final List<Holiday> holidays;
  final bool isLoading;
  final String? errorMessage;

  bool get isEnglish => language == AppLanguage.en;

  @override
  Widget build(BuildContext context) {
    final sorted = [...holidays]..sort((a, b) => a.date.compareTo(b.date));
    final bySeason = <String, List<Holiday>>{
      'spring': [],
      'summer': [],
      'yearEnd': [],
    };
    for (final holiday in sorted) {
      final month = holiday.date.month;
      if (month >= 3 && month <= 6) {
        bySeason['spring']!.add(holiday);
      } else if (month >= 7 && month <= 8) {
        bySeason['summer']!.add(holiday);
      } else if (month >= 10 && month <= 12) {
        bySeason['yearEnd']!.add(holiday);
      }
    }

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: const Color(0xFFE2EAF3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Wrap(
            spacing: 10,
            runSpacing: 10,
            children: [
              _GuideChip(
                label: isEnglish ? 'Calendar 2027' : 'Calendrier 2027',
                color: const Color(0xFFEAF2FF),
                textColor: const Color(0xFF27568F),
              ),
              _GuideChip(
                label: isLoading
                    ? (isEnglish ? 'Loading' : 'Chargement')
                    : '${sorted.length} ${isEnglish ? 'dates to track' : 'dates à suivre'}',
                color: const Color(0xFFDDF1E9),
                textColor: const Color(0xFF287259),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            isEnglish
                ? 'Complete list of public holidays in 2027'
                : 'Liste complète des jours fériés 2027',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 14),
          if (isLoading)
            const Center(child: CircularProgressIndicator())
          else if (errorMessage != null)
            Text(
              errorMessage!,
              style: const TextStyle(color: Color(0xFFB24B2A), height: 1.55),
            )
          else ...[
            Wrap(
              spacing: 10,
              runSpacing: 10,
              children: [
                _GuideChip(
                  label: isEnglish
                      ? 'Spring: ${bySeason['spring']!.length}'
                      : 'Printemps : ${bySeason['spring']!.length}',
                  color: const Color(0xFFFFE6DB),
                  textColor: const Color(0xFFB55C33),
                ),
                _GuideChip(
                  label: isEnglish
                      ? 'Summer: ${bySeason['summer']!.length}'
                      : 'Été : ${bySeason['summer']!.length}',
                  color: const Color(0xFFEAF2FF),
                  textColor: const Color(0xFF27568F),
                ),
                _GuideChip(
                  label: isEnglish
                      ? 'Year end: ${bySeason['yearEnd']!.length}'
                      : 'Fin d’année : ${bySeason['yearEnd']!.length}',
                  color: const Color(0xFFF4E9FB),
                  textColor: const Color(0xFF7A3E96),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Table(
              columnWidths: const {
                0: FlexColumnWidth(1.1),
                1: FlexColumnWidth(1.2),
                2: FlexColumnWidth(1.8),
                3: FlexColumnWidth(1.2),
              },
              children: [
                TableRow(
                  children: [
                    _TableCell(text: isEnglish ? 'Date' : 'Date', isHeader: true),
                    _TableCell(text: isEnglish ? 'Day' : 'Jour', isHeader: true),
                    _TableCell(
                      text: isEnglish ? 'Holiday' : 'Jour férié',
                      isHeader: true,
                    ),
                    _TableCell(
                      text: isEnglish ? 'Week / weekend' : 'Semaine / week-end',
                      isHeader: true,
                    ),
                  ],
                ),
                for (final holiday in sorted)
                  TableRow(
                    children: [
                      _TableCell(text: _formatDate(holiday.date)),
                      _TableCell(text: _weekdayName(holiday.date)),
                      _TableCell(text: holiday.localName),
                      _TableCell(
                        text: holiday.date.weekday >= DateTime.saturday
                            ? (isEnglish ? 'Weekend' : 'Week-end')
                            : (isEnglish ? 'Week' : 'Semaine'),
                      ),
                    ],
                  ),
              ],
            ),
          ],
        ],
      ),
    );
  }

  String _formatDate(DateTime date) {
    final day = date.day.toString().padLeft(2, '0');
    final month = date.month.toString().padLeft(2, '0');
    return '$day/$month/${date.year}';
  }

  String _weekdayName(DateTime date) {
    const daysFr = [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche',
    ];
    const daysEn = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    return isEnglish ? daysEn[date.weekday - 1] : daysFr[date.weekday - 1];
  }
}

class _PlanIdeasPanel extends StatelessWidget {
  const _PlanIdeasPanel({
    required this.language,
    required this.ideas,
  });

  final AppLanguage language;
  final List<Holidays2027PlanData> ideas;

  String tr(LocalizedTextData text) => text.resolve(language);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFFF7FCFA),
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: const Color(0xFFD8EDE3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            language == AppLanguage.en
                ? 'Ideas for 2027 leave plans'
                : 'Idées de plans de congés 2027',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 16),
          for (var index = 0; index < ideas.length; index++) ...[
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(22),
                border: Border.all(color: const Color(0xFFD8EDE3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    tr(ideas[index].title),
                    style: const TextStyle(
                      color: Color(0xFF123458),
                      fontWeight: FontWeight.w800,
                      fontSize: 18,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    tr(ideas[index].summary),
                    style: const TextStyle(
                      color: Color(0xFF49627C),
                      height: 1.55,
                    ),
                  ),
                ],
              ),
            ),
            if (index < ideas.length - 1) const SizedBox(height: 12),
          ],
        ],
      ),
    );
  }
}

class _GuideChip extends StatelessWidget {
  const _GuideChip({
    required this.label,
    required this.color,
    required this.textColor,
  });

  final String label;
  final Color color;
  final Color textColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: textColor,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}

class _TableCell extends StatelessWidget {
  const _TableCell({
    required this.text,
    this.isHeader = false,
  });

  final String text;
  final bool isHeader;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 10),
      child: Text(
        text,
        style: TextStyle(
          color: isHeader ? const Color(0xFF123458) : const Color(0xFF49627C),
          fontWeight: isHeader ? FontWeight.w800 : FontWeight.w500,
        ),
      ),
    );
  }
}
