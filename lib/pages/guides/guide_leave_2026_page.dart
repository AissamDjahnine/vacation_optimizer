import 'package:flutter/material.dart';

import '../../app_language.dart';
import '../../app_routes.dart';
import '../../content/content_models.dart';
import '../../content/guide_leave_2026_content.dart';
import '../../models/holiday.dart';
import '../../services/holiday_service.dart';
import '../content/content_page_scaffold.dart';

class GuideLeave2026Page extends StatefulWidget {
  const GuideLeave2026Page({super.key});

  @override
  State<GuideLeave2026Page> createState() => _GuideLeave2026PageState();
}

class _GuideLeave2026PageState extends State<GuideLeave2026Page> {
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
        final content = buildLeaveGuide2026Content();

        return ContentPageScaffold(
          language: language,
          title: content.title,
          subtitle: content.subtitle,
          sections: content.sections,
          simulatorLabel: const LocalizedTextData(
            fr: 'Utiliser le simulateur 2026',
            en: 'Use the 2026 planner',
          ),
          onOpenSimulator: () => Navigator.of(context).pushNamed(
            AppRoutePath.homePath(),
          ),
          relatedLinks: [
            RelatedContentLinkData(
              label: const LocalizedTextData(
                fr: 'Voir les jours fériés 2026',
                en: 'See 2026 public holidays',
              ),
              route: AppRoutePath.contentPath(ContentPageType.holidays, 2026),
            ),
            RelatedContentLinkData(
              label: const LocalizedTextData(
                fr: 'Voir les ponts 2026',
                en: 'See 2026 bridge ideas',
              ),
              route: AppRoutePath.contentPath(ContentPageType.bridges, 2026),
            ),
            RelatedContentLinkData(
              label: const LocalizedTextData(
                fr: 'Vacances scolaires 2026',
                en: 'School holidays 2026',
              ),
              route: AppRoutePath.guidePath(GuidePageType.schoolHolidays2026),
            ),
          ],
          beforeSections: Column(
            children: [
              _HolidaySummaryPanel(
                holidays: holidays,
                isLoading: isLoading,
                errorMessage: errorMessage,
                language: language,
              ),
              const SizedBox(height: 24),
              _ScenarioPanel(
                scenarios: content.scenarios,
                language: language,
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
      final fetched = await HolidayService.fetchHolidays('FR', 2026);
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
          'Impossible de récupérer les jours fériés pour le moment.',
          'Unable to retrieve public holidays right now.',
        );
      });
    } finally {
      if (mounted) {
        setState(() => isLoading = false);
      }
    }
  }
}

class _HolidaySummaryPanel extends StatelessWidget {
  const _HolidaySummaryPanel({
    required this.holidays,
    required this.isLoading,
    required this.errorMessage,
    required this.language,
  });

  final List<Holiday> holidays;
  final bool isLoading;
  final String? errorMessage;
  final AppLanguage language;

  bool get isEnglish => language == AppLanguage.en;

  @override
  Widget build(BuildContext context) {
    final sorted = [...holidays]..sort((a, b) => a.date.compareTo(b.date));
    final highlights = sorted.where((holiday) {
      final weekday = holiday.date.weekday;
      return weekday == DateTime.tuesday ||
          weekday == DateTime.thursday ||
          weekday == DateTime.friday ||
          weekday == DateTime.monday;
    }).take(6).toList();

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
              _InfoChip(
                label: isLoading
                    ? (isEnglish ? 'Loading 2026' : 'Année 2026')
                    : '${sorted.length} ${isEnglish ? 'public holidays' : 'jours fériés'}',
                color: const Color(0xFFEAF2FF),
                textColor: const Color(0xFF27568F),
              ),
              _InfoChip(
                label: isEnglish ? 'Bridge-ready dates' : 'Dates utiles pour les ponts',
                color: const Color(0xFFFFE6DB),
                textColor: const Color(0xFFB55C33),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            isEnglish
                ? 'Quick reminder of public holidays in 2026'
                : 'Rappel rapide des jours fériés 2026',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 10),
          if (isLoading)
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 18),
              child: Center(child: CircularProgressIndicator()),
            )
          else if (errorMessage != null)
            Text(
              errorMessage!,
              style: const TextStyle(color: Color(0xFFB24B2A), height: 1.55),
            )
          else ...[
            Text(
              isEnglish
                  ? 'Here are the dates worth checking first before you run a simulation.'
                  : 'Voici les dates à regarder en priorité avant de lancer une simulation.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 14),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final holiday in highlights)
                  _InfoChip(
                    label:
                        '${_formatDate(holiday.date)} • ${holiday.localName}',
                    color: const Color(0xFFF8FBFD),
                    textColor: const Color(0xFF123458),
                  ),
              ],
            ),
          ],
        ],
      ),
    );
  }

  String _formatDate(DateTime date) {
    final monthsFr = [
      '',
      'janv.',
      'févr.',
      'mars',
      'avr.',
      'mai',
      'juin',
      'juil.',
      'août',
      'sept.',
      'oct.',
      'nov.',
      'déc.',
    ];
    final monthsEn = [
      '',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    final months = isEnglish ? monthsEn : monthsFr;
    return '${date.day} ${months[date.month]}';
  }
}

class _ScenarioPanel extends StatelessWidget {
  const _ScenarioPanel({
    required this.scenarios,
    required this.language,
  });

  final List<LeaveGuideScenarioData> scenarios;
  final AppLanguage language;

  String tr(LocalizedTextData text) => text.resolve(language);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFFFFFBF5),
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: const Color(0xFFFFD7C7)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            language == AppLanguage.en
                ? 'Concrete scenarios by leave budget'
                : 'Scénarios concrets selon votre budget',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 16),
          LayoutBuilder(
            builder: (context, constraints) {
              final stacked = constraints.maxWidth < 900;
              final cards = [
                for (final scenario in scenarios)
                  _ScenarioCard(language: language, scenario: scenario),
              ];
              if (stacked) {
                return Column(
                  children: [
                    for (var index = 0; index < cards.length; index++) ...[
                      cards[index],
                      if (index < cards.length - 1) const SizedBox(height: 12),
                    ],
                  ],
                );
              }

              return Row(
                children: [
                  for (var index = 0; index < cards.length; index++) ...[
                    Expanded(child: cards[index]),
                    if (index < cards.length - 1) const SizedBox(width: 12),
                  ],
                ],
              );
            },
          ),
        ],
      ),
    );
  }
}

class _ScenarioCard extends StatelessWidget {
  const _ScenarioCard({
    required this.language,
    required this.scenario,
  });

  final AppLanguage language;
  final LeaveGuideScenarioData scenario;

  String tr(LocalizedTextData text) => text.resolve(language);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: const Color(0xFFFFD7C7)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _InfoChip(
            label: tr(scenario.budgetLabel),
            color: const Color(0xFFFFE6DB),
            textColor: const Color(0xFFB55C33),
          ),
          const SizedBox(height: 12),
          Text(
            tr(scenario.periodLabel),
            style: const TextStyle(
              color: Color(0xFF123458),
              fontWeight: FontWeight.w800,
              fontSize: 18,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            tr(scenario.resultLabel),
            style: const TextStyle(
              color: Color(0xFF123458),
              fontWeight: FontWeight.w700,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            tr(scenario.note),
            style: const TextStyle(
              color: Color(0xFF49627C),
              height: 1.55,
            ),
          ),
        ],
      ),
    );
  }
}

class _InfoChip extends StatelessWidget {
  const _InfoChip({
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
