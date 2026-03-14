import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../app_language.dart';
import '../../app_routes.dart';
import '../../content/content_models.dart';
import '../../content/school_holidays_bridges_content.dart';
import '../../models/school_holiday_period.dart';
import '../../planner_initial_config.dart';
import '../../services/school_holiday_service.dart';
import 'content_page_scaffold.dart';

class SchoolHolidaysBridgesYearPage extends StatefulWidget {
  const SchoolHolidaysBridgesYearPage({
    super.key,
    required this.availableYears,
    required this.initialYear,
    required this.language,
  });

  final List<int> availableYears;
  final int initialYear;
  final AppLanguage language;

  @override
  State<SchoolHolidaysBridgesYearPage> createState() =>
      _SchoolHolidaysBridgesYearPageState();
}

class _SchoolHolidaysBridgesYearPageState
    extends State<SchoolHolidaysBridgesYearPage> {
  late int selectedYear = widget.initialYear;
  String selectedZone = 'A';
  List<SchoolHolidayPeriod> periods = [];
  bool isLoading = true;
  String? errorMessage;

  bool get isEnglish => appLanguageNotifier.value == AppLanguage.en;
  String tr(String fr, String en) => isEnglish ? en : fr;

  @override
  void initState() {
    super.initState();
    _loadPeriods();
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<AppLanguage>(
      valueListenable: appLanguageNotifier,
      builder: (context, currentLanguage, _) {
        final content = buildSchoolHolidaysBridgesPageContent(selectedYear);

        return ContentPageScaffold(
          language: currentLanguage,
          title: content.title,
          subtitle: content.subtitle,
          sections: content.sections,
          simulatorLabel: LocalizedTextData(
            fr: 'Utiliser le simulateur en zone $selectedZone',
            en: 'Use the planner for zone $selectedZone',
          ),
          onOpenSimulator: () => Navigator.of(context).pushNamed(
            AppRoutePath.homePath(),
            arguments: PlannerInitialConfig(
              year: selectedYear,
              schoolZone: selectedZone,
              scrollToPlanner: true,
            ),
          ),
          relatedLinks: [
            RelatedContentLinkData(
              label: const LocalizedTextData(
                fr: 'Voir les ponts',
                en: 'See bridge ideas',
              ),
              route: AppRoutePath.contentPath(
                ContentPageType.bridges,
                selectedYear,
              ),
            ),
            RelatedContentLinkData(
              label: const LocalizedTextData(
                fr: 'Voir les jours fériés',
                en: 'See public holidays',
              ),
              route: AppRoutePath.contentPath(
                ContentPageType.holidays,
                selectedYear,
              ),
            ),
          ],
          beforeSections: _buildPeriodsPanel(),
          afterSections: _buildSources(),
        );
      },
    );
  }

  Widget _buildPeriodsPanel() {
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
          LayoutBuilder(
            builder: (context, constraints) {
              final compact = constraints.maxWidth < 760;
              final yearField = SizedBox(
                width: compact ? double.infinity : 220,
                child: DropdownButtonFormField<int>(
                  initialValue: selectedYear,
                  isExpanded: true,
                  items: widget.availableYears
                      .map(
                        (year) => DropdownMenuItem<int>(
                          value: year,
                          child: Text('$year'),
                        ),
                      )
                      .toList(),
                  onChanged: (value) {
                    if (value == null || value == selectedYear) {
                      return;
                    }
                    Navigator.of(context).pushReplacementNamed(
                      AppRoutePath.contentPath(
                        ContentPageType.schoolHolidaysBridges,
                        value,
                      ),
                    );
                  },
                  decoration: InputDecoration(labelText: tr('Année', 'Year')),
                ),
              );
              final zoneField = SizedBox(
                width: compact ? double.infinity : 220,
                child: DropdownButtonFormField<String>(
                  initialValue: selectedZone,
                  isExpanded: true,
                  items: const ['A', 'B', 'C']
                      .map(
                        (zone) => DropdownMenuItem<String>(
                          value: zone,
                          child: Text('Zone $zone'),
                        ),
                      )
                      .toList(),
                  onChanged: (value) {
                    if (value == null || value == selectedZone) {
                      return;
                    }
                    setState(() {
                      selectedZone = value;
                      isLoading = true;
                      errorMessage = null;
                    });
                    _loadPeriods();
                  },
                  decoration: InputDecoration(labelText: tr('Zone', 'Zone')),
                ),
              );
              final summary = Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                decoration: BoxDecoration(
                  color: const Color(0xFFF8FBFD),
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: const Color(0xFFE2EAF3)),
                ),
                child: Text(
                  isLoading
                      ? tr('Chargement…', 'Loading...')
                      : tr(
                          '${periods.length} périodes pour la zone $selectedZone',
                          '${periods.length} periods for zone $selectedZone',
                        ),
                  style: const TextStyle(
                    color: Color(0xFF123458),
                    fontWeight: FontWeight.w800,
                  ),
                ),
              );

              if (compact) {
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    yearField,
                    const SizedBox(height: 12),
                    zoneField,
                    const SizedBox(height: 12),
                    summary,
                  ],
                );
              }

              return Row(
                children: [
                  yearField,
                  const SizedBox(width: 12),
                  zoneField,
                  const Spacer(),
                  summary,
                ],
              );
            },
          ),
          const SizedBox(height: 22),
          if (isLoading)
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 32),
              child: Center(child: CircularProgressIndicator()),
            )
          else if (errorMessage != null)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: const Color(0xFFFFF0EB),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFFFFD2C2)),
              ),
              child: Text(
                errorMessage!,
                style: const TextStyle(
                  color: Color(0xFFB24B2A),
                  height: 1.55,
                ),
              ),
            )
          else if (periods.isEmpty)
            Text(
              tr(
                'Aucune période scolaire trouvée pour cette zone et cette année.',
                'No school holiday period found for this zone and year.',
              ),
              style: const TextStyle(color: Color(0xFF49627C), height: 1.55),
            )
          else
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    for (final period in periods)
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 8,
                        ),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF4E9FB),
                          borderRadius: BorderRadius.circular(999),
                        ),
                        child: Text(
                          _monthSpanLabel(period),
                          style: const TextStyle(
                            color: Color(0xFF7A3E96),
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: 16),
                for (var index = 0; index < periods.length; index++) ...[
                  _SchoolHolidayPeriodCard(
                    period: periods[index],
                    language: appLanguageNotifier.value,
                  ),
                  if (index < periods.length - 1) const SizedBox(height: 12),
                ],
              ],
            ),
        ],
      ),
    );
  }

  Widget _buildSources() {
    final links = [
      (
        title: 'education.gouv.fr',
        description: tr(
          'Calendrier scolaire officiel',
          'Official school holiday calendar',
        ),
        url: 'https://www.education.gouv.fr/calendrier-scolaire-100148',
      ),
      (
        title: 'data.gouv.fr',
        description: tr(
          'Source des périodes affichées sur cette page',
          'Source of the periods shown on this page',
        ),
        url: 'https://www.data.gouv.fr/fr/dataservices/api-calendrier-scolaire/',
      ),
    ];

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
          Text(
            tr('Références officielles', 'Official references'),
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 16),
          for (var index = 0; index < links.length; index++) ...[
            InkWell(
              borderRadius: BorderRadius.circular(18),
              onTap: () => _openExternal(links[index].url),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFFF8FBFD),
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: const Color(0xFFE2EAF3)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.open_in_new_rounded, color: Color(0xFF123458)),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            links[index].title,
                            style: const TextStyle(
                              color: Color(0xFF123458),
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            links[index].description,
                            style: const TextStyle(
                              color: Color(0xFF49627C),
                              height: 1.45,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            if (index < links.length - 1) const SizedBox(height: 10),
          ],
        ],
      ),
    );
  }

  Future<void> _openExternal(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }

  Future<void> _loadPeriods() async {
    setState(() {
      isLoading = true;
      errorMessage = null;
    });

    try {
      final fetched = await SchoolHolidayService.fetchSchoolHolidaysForZone(
        selectedZone,
      );
      final filtered = fetched
          .where(
            (period) =>
                period.startDate.year == selectedYear ||
                period.endDate.year == selectedYear,
          )
          .toList()
        ..sort((a, b) => a.startDate.compareTo(b.startDate));

      if (!mounted) {
        return;
      }

      setState(() => periods = filtered);
    } catch (_) {
      if (!mounted) {
        return;
      }

      setState(() {
        periods = [];
        errorMessage = tr(
          'Impossible de charger les vacances scolaires pour le moment.',
          'Unable to load school holidays right now.',
        );
      });
    } finally {
      if (mounted) {
        setState(() => isLoading = false);
      }
    }
  }

  String _monthSpanLabel(SchoolHolidayPeriod period) {
    return '${_monthName(period.startDate.month)} → ${_monthName(period.endDate.month)}';
  }

  String _monthName(int month) {
    const monthsFr = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ];
    const monthsEn = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return isEnglish ? monthsEn[month - 1] : monthsFr[month - 1];
  }
}

class _SchoolHolidayPeriodCard extends StatelessWidget {
  const _SchoolHolidayPeriodCard({
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
        color: const Color(0xFFF8FBFD),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: const Color(0xFFE2EAF3)),
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
              color: Color(0xFF49627C),
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            isEnglish
                ? 'Zone: ${period.zone} • School year: ${period.schoolYear}'
                : 'Zone : ${period.zone} • Année scolaire : ${period.schoolYear}',
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
