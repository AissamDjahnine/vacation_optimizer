import 'package:flutter/material.dart';

import '../../app_language.dart';
import '../../app_routes.dart';
import '../../content/content_models.dart';
import '../../content/school_holidays_family_2026_content.dart';
import '../../models/school_holiday_period.dart';
import '../../planner_initial_config.dart';
import '../../services/school_holiday_service.dart';
import '../content/content_page_scaffold.dart';

class SchoolHolidaysFamily2026Page extends StatefulWidget {
  const SchoolHolidaysFamily2026Page({super.key});

  @override
  State<SchoolHolidaysFamily2026Page> createState() =>
      _SchoolHolidaysFamily2026PageState();
}

class _SchoolHolidaysFamily2026PageState
    extends State<SchoolHolidaysFamily2026Page> {
  String selectedZone = 'A';
  bool isLoading = true;
  String? errorMessage;
  final Map<String, List<SchoolHolidayPeriod>> periodsByZone = {};

  bool get isEnglish => appLanguageNotifier.value == AppLanguage.en;
  String tr(String fr, String en) => isEnglish ? en : fr;

  @override
  void initState() {
    super.initState();
    _loadAllZones();
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<AppLanguage>(
      valueListenable: appLanguageNotifier,
      builder: (context, language, _) {
        final content = buildSchoolHolidaysFamily2026Content();

        return ContentPageScaffold(
          language: language,
          title: content.title,
          subtitle: content.subtitle,
          sections: content.sections,
          simulatorLabel: LocalizedTextData(
            fr: 'Tester la zone $selectedZone dans le simulateur',
            en: 'Test zone $selectedZone in the planner',
          ),
          onOpenSimulator: () => Navigator.of(context).pushNamed(
            AppRoutePath.homePath(),
            arguments: PlannerInitialConfig(
              year: 2026,
              schoolZone: selectedZone,
              scrollToPlanner: true,
            ),
          ),
          relatedLinks: [
            RelatedContentLinkData(
              label: const LocalizedTextData(
                fr: 'Guide congés 2026',
                en: '2026 leave guide',
              ),
              route: AppRoutePath.guidePath(GuidePageType.guideLeave2026),
            ),
            RelatedContentLinkData(
              label: const LocalizedTextData(
                fr: 'Ponts 2026',
                en: 'Bridge ideas 2026',
              ),
              route: AppRoutePath.contentPath(ContentPageType.bridges, 2026),
            ),
          ],
          beforeSections: Column(
            children: [
              _ZoneCalendarPanel(
                language: language,
                selectedZone: selectedZone,
                isLoading: isLoading,
                errorMessage: errorMessage,
                periodsByZone: periodsByZone,
                onZoneChanged: (zone) => setState(() => selectedZone = zone),
              ),
              const SizedBox(height: 24),
              _FamilyExamplesPanel(
                language: language,
                examples: content.examples,
              ),
            ],
          ),
        );
      },
    );
  }

  Future<void> _loadAllZones() async {
    setState(() {
      isLoading = true;
      errorMessage = null;
    });

    try {
      final zoneA = await SchoolHolidayService.fetchSchoolHolidaysForZone('A');
      final zoneB = await SchoolHolidayService.fetchSchoolHolidaysForZone('B');
      final zoneC = await SchoolHolidayService.fetchSchoolHolidaysForZone('C');
      if (!mounted) {
        return;
      }
      setState(() {
        periodsByZone
          ..clear()
          ..addAll({
            'A': _filterFor2026(zoneA),
            'B': _filterFor2026(zoneB),
            'C': _filterFor2026(zoneC),
          });
      });
    } catch (_) {
      if (!mounted) {
        return;
      }
      setState(() {
        errorMessage = tr(
          'Impossible de récupérer les vacances scolaires pour le moment.',
          'Unable to retrieve school holidays right now.',
        );
      });
    } finally {
      if (mounted) {
        setState(() => isLoading = false);
      }
    }
  }

  List<SchoolHolidayPeriod> _filterFor2026(List<SchoolHolidayPeriod> periods) {
    return periods
        .where((period) => period.startDate.year == 2026 || period.endDate.year == 2026)
        .toList()
      ..sort((a, b) => a.startDate.compareTo(b.startDate));
  }
}

class _ZoneCalendarPanel extends StatelessWidget {
  const _ZoneCalendarPanel({
    required this.language,
    required this.selectedZone,
    required this.isLoading,
    required this.errorMessage,
    required this.periodsByZone,
    required this.onZoneChanged,
  });

  final AppLanguage language;
  final String selectedZone;
  final bool isLoading;
  final String? errorMessage;
  final Map<String, List<SchoolHolidayPeriod>> periodsByZone;
  final ValueChanged<String> onZoneChanged;

  bool get isEnglish => language == AppLanguage.en;
  String tr(String fr, String en) => isEnglish ? en : fr;

  @override
  Widget build(BuildContext context) {
    final selectedPeriods = periodsByZone[selectedZone] ?? const [];

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
                label: tr('Calendrier 2025-2026', '2025-2026 calendar'),
                color: const Color(0xFFF4E9FB),
                textColor: const Color(0xFF7A3E96),
              ),
              _GuideChip(
                label: tr('Vue familles', 'Family view'),
                color: const Color(0xFFEAF2FF),
                textColor: const Color(0xFF27568F),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            tr(
              'Calendrier des vacances scolaires 2025-2026 par zone',
              '2025-2026 school holiday calendar by zone',
            ),
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 14),
          SegmentedButton<String>(
            segments: const [
              ButtonSegment(value: 'A', label: Text('Zone A')),
              ButtonSegment(value: 'B', label: Text('Zone B')),
              ButtonSegment(value: 'C', label: Text('Zone C')),
            ],
            selected: {selectedZone},
            showSelectedIcon: false,
            onSelectionChanged: (selection) => onZoneChanged(selection.first),
          ),
          const SizedBox(height: 18),
          if (isLoading)
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 24),
              child: Center(child: CircularProgressIndicator()),
            )
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
                for (final zone in const ['A', 'B', 'C'])
                  _GuideChip(
                    label: tr(
                      'Zone $zone : ${periodsByZone[zone]?.length ?? 0} périodes',
                      'Zone $zone: ${periodsByZone[zone]?.length ?? 0} periods',
                    ),
                    color: zone == selectedZone
                        ? const Color(0xFFF4E9FB)
                        : const Color(0xFFF8FBFD),
                    textColor: zone == selectedZone
                        ? const Color(0xFF7A3E96)
                        : const Color(0xFF123458),
                  ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              tr(
                'Utilisez le toggle pour comparer rapidement votre zone, puis vérifiez dans le simulateur si un pont ajoute vraiment des jours utiles autour de ces périodes.',
                'Use the toggle to compare your zone quickly, then check in the planner whether a bridge really adds useful days around those periods.',
              ),
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 16),
            for (var index = 0; index < selectedPeriods.length; index++) ...[
              _ZonePeriodCard(
                period: selectedPeriods[index],
                language: language,
              ),
              if (index < selectedPeriods.length - 1) const SizedBox(height: 12),
            ],
          ],
        ],
      ),
    );
  }
}

class _ZonePeriodCard extends StatelessWidget {
  const _ZonePeriodCard({
    required this.period,
    required this.language,
  });

  final SchoolHolidayPeriod period;
  final AppLanguage language;

  bool get isEnglish => language == AppLanguage.en;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: const Color(0xFFFCF8FF),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: const Color(0xFFE7D6F5)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            period.description,
            style: const TextStyle(
              color: Color(0xFF123458),
              fontWeight: FontWeight.w800,
              fontSize: 18,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            '${_formatDate(period.startDate)} → ${_formatDate(period.endDate)}',
            style: const TextStyle(
              color: Color(0xFF123458),
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            isEnglish
                ? 'Zone ${period.zone.replaceAll('Zone ', '')} • School year ${period.schoolYear}'
                : '${period.zone} • Année scolaire ${period.schoolYear}',
            style: const TextStyle(
              color: Color(0xFF60768D),
              height: 1.45,
            ),
          ),
        ],
      ),
    );
  }

  String _formatDate(DateTime date) {
    final day = date.day.toString().padLeft(2, '0');
    final month = date.month.toString().padLeft(2, '0');
    final year = date.year.toString();
    return '$day/$month/$year';
  }
}

class _FamilyExamplesPanel extends StatelessWidget {
  const _FamilyExamplesPanel({
    required this.language,
    required this.examples,
  });

  final AppLanguage language;
  final List<FamilyPlanningExampleData> examples;

  String tr(LocalizedTextData text) => text.resolve(language);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FBFD),
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: const Color(0xFFE2EAF3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            language == AppLanguage.en
                ? 'Three family planning examples'
                : '3 exemples de planning famille',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 16),
          LayoutBuilder(
            builder: (context, constraints) {
              final stacked = constraints.maxWidth < 900;
              final cards = [
                for (final example in examples)
                  _FamilyExampleCard(language: language, example: example),
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
                crossAxisAlignment: CrossAxisAlignment.start,
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

class _FamilyExampleCard extends StatelessWidget {
  const _FamilyExampleCard({
    required this.language,
    required this.example,
  });

  final AppLanguage language;
  final FamilyPlanningExampleData example;

  String tr(LocalizedTextData text) => text.resolve(language);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: const Color(0xFFE2EAF3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            tr(example.title),
            style: const TextStyle(
              color: Color(0xFF123458),
              fontWeight: FontWeight.w800,
              fontSize: 18,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            tr(example.summary),
            style: const TextStyle(
              color: Color(0xFF49627C),
              height: 1.55,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            tr(example.note),
            style: const TextStyle(
              color: Color(0xFF123458),
              fontWeight: FontWeight.w700,
              height: 1.5,
            ),
          ),
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
