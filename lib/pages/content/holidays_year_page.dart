import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../app_language.dart';
import '../../app_routes.dart';
import '../../content/content_models.dart';
import '../../content/holidays_content.dart';
import '../../models/holiday.dart';
import '../../services/holiday_service.dart';
import 'content_page_scaffold.dart';

class HolidaysYearPage extends StatefulWidget {
  const HolidaysYearPage({
    super.key,
    required this.availableYears,
    required this.initialYear,
    required this.language,
  });

  final List<int> availableYears;
  final int initialYear;
  final AppLanguage language;

  @override
  State<HolidaysYearPage> createState() => _HolidaysYearPageState();
}

class _HolidaysYearPageState extends State<HolidaysYearPage> {
  late int selectedYear = widget.initialYear;
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
      builder: (context, currentLanguage, _) {
        final content = buildHolidaysPageContent(selectedYear);

        return ContentPageScaffold(
          language: currentLanguage,
          title: content.title,
          subtitle: content.subtitle,
          sections: content.sections,
          simulatorLabel: const LocalizedTextData(
            fr: 'Utiliser le simulateur',
            en: 'Use the planner',
          ),
          onOpenSimulator: () =>
              Navigator.of(context).pushNamed(AppRoutePath.homePath()),
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
          ],
          beforeSections: _buildAnnualPanel(),
          afterSections: _buildOfficialSources(),
        );
      },
    );
  }

  Widget _buildAnnualPanel() {
    final holidaysByMonth = <int, List<Holiday>>{};
    for (final holiday in holidays) {
      holidaysByMonth.putIfAbsent(holiday.date.month, () => []).add(holiday);
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
          LayoutBuilder(
            builder: (context, constraints) {
              final compact = constraints.maxWidth < 720;
              final selector = SizedBox(
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
                      AppRoutePath.contentPath(ContentPageType.holidays, value),
                    );
                  },
                  decoration: InputDecoration(
                    labelText: tr('Année', 'Year'),
                  ),
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
                          '${holidays.length} jours fériés en $selectedYear',
                          '${holidays.length} public holidays in $selectedYear',
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
                    selector,
                    const SizedBox(height: 12),
                    summary,
                  ],
                );
              }

              return Row(
                children: [
                  selector,
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
          else if (holidays.isEmpty)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: const Color(0xFFF8FBFD),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFFE2EAF3)),
              ),
              child: Text(
                tr(
                  'Aucun jour férié disponible pour cette année.',
                  'No public holidays are available for this year.',
                ),
                style: const TextStyle(
                  color: Color(0xFF49627C),
                  height: 1.55,
                ),
              ),
            )
          else
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    for (final entry in holidaysByMonth.entries)
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 8,
                        ),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF8FBFD),
                          borderRadius: BorderRadius.circular(999),
                          border: Border.all(color: const Color(0xFFE2EAF3)),
                        ),
                        child: Text(
                          '${_monthName(entry.key)} (${entry.value.length})',
                          style: const TextStyle(
                            color: Color(0xFF123458),
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: 18),
                for (final entry in holidaysByMonth.entries) ...[
                  _MonthHolidayBlock(
                    monthLabel: _monthName(entry.key),
                    holidays: entry.value,
                    language: appLanguageNotifier.value,
                  ),
                  const SizedBox(height: 14),
                ],
              ],
            ),
        ],
      ),
    );
  }

  Widget _buildOfficialSources() {
    final links = [
      (
        title: 'Service-Public.fr',
        subtitle: tr(
          'Jours fériés pour les salariés du privé',
          'Public holiday guidance for employees',
        ),
        url: 'https://www.service-public.fr/particuliers/vosdroits/F2405',
      ),
      (
        title: 'Service-Public.fr',
        subtitle: tr(
          'Ponts et calendrier annuel',
          'Bridge days and yearly calendar',
        ),
        url: 'https://www.service-public.fr/particuliers/actualites/A15602',
      ),
      (
        title: 'Nager.Date',
        subtitle: tr(
          'Source des dates affichées sur cette page',
          'Source of the dates shown on this page',
        ),
        url: 'https://date.nager.at',
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
            tr('Sources officielles', 'Official references'),
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
                    const Icon(
                      Icons.open_in_new_rounded,
                      color: Color(0xFF123458),
                    ),
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
                            links[index].subtitle,
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

  Future<void> _loadHolidays() async {
    setState(() {
      isLoading = true;
      errorMessage = null;
    });

    try {
      final fetched = await HolidayService.fetchHolidays('FR', selectedYear);
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
          'Impossible de charger les jours fériés pour le moment.',
          'Unable to load public holidays right now.',
        );
      });
    } finally {
      if (mounted) {
        setState(() => isLoading = false);
      }
    }
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

class _MonthHolidayBlock extends StatelessWidget {
  const _MonthHolidayBlock({
    required this.monthLabel,
    required this.holidays,
    required this.language,
  });

  final String monthLabel;
  final List<Holiday> holidays;
  final AppLanguage language;

  bool get isEnglish => language == AppLanguage.en;

  @override
  Widget build(BuildContext context) {
    final sorted = [...holidays]..sort((a, b) => a.date.compareTo(b.date));

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FBFD),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFE2EAF3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            monthLabel,
            style: const TextStyle(
              color: Color(0xFF123458),
              fontWeight: FontWeight.w800,
              fontSize: 20,
            ),
          ),
          const SizedBox(height: 14),
          Table(
            columnWidths: const {
              0: FlexColumnWidth(1.1),
              1: FlexColumnWidth(1.1),
              2: FlexColumnWidth(2.2),
            },
            children: [
              TableRow(
                children: [
                  _tableCell(isEnglish ? 'Date' : 'Date', isHeader: true),
                  _tableCell(isEnglish ? 'Day' : 'Jour', isHeader: true),
                  _tableCell(
                    isEnglish ? 'Holiday' : 'Jour férié',
                    isHeader: true,
                  ),
                ],
              ),
              for (final holiday in sorted)
                TableRow(
                  children: [
                    _tableCell(_formatDate(holiday.date)),
                    _tableCell(_weekdayName(holiday.date)),
                    _tableCell(holiday.localName),
                  ],
                ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _tableCell(String text, {bool isHeader = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 8),
      child: Text(
        text,
        style: TextStyle(
          color: isHeader ? const Color(0xFF123458) : const Color(0xFF49627C),
          fontWeight: isHeader ? FontWeight.w800 : FontWeight.w500,
        ),
      ),
    );
  }

  String _formatDate(DateTime date) {
    final day = date.day.toString().padLeft(2, '0');
    final month = date.month.toString().padLeft(2, '0');
    final year = date.year.toString();
    return '$day/$month/$year';
  }

  String _weekdayName(DateTime date) {
    const weekdaysFr = [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche',
    ];
    const weekdaysEn = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    return isEnglish
        ? weekdaysEn[date.weekday - 1]
        : weekdaysFr[date.weekday - 1];
  }
}
