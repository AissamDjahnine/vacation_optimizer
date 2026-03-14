import 'package:flutter/material.dart';

import 'app_language.dart';
import 'app_routes.dart';
import 'models/best_vacation_period.dart';
import 'models/holiday.dart';
import 'models/school_holiday_period.dart';
import 'pages/content/bridges_year_page.dart';
import 'pages/content/holidays_year_page.dart';
import 'pages/content/school_holidays_bridges_year_page.dart';
import 'planner_initial_config.dart';
import 'services/holiday_service.dart';
import 'services/school_holiday_service.dart';
import 'utils/date_optimizer.dart';

enum PlanningMode { singleBridge, multipleBridges }

void main() {
  runApp(const VacationOptimizerApp());
}

class VacationOptimizerApp extends StatelessWidget {
  const VacationOptimizerApp({super.key});

  Route<dynamic> _buildRoute(
    RouteSettings settings,
    AppLanguage language,
  ) {
    final routePath = AppRoutePath.parse(settings.name);
    final plannerConfig = settings.arguments is PlannerInitialConfig
        ? settings.arguments! as PlannerInitialConfig
        : null;
    Widget page;
    if (routePath.isHome) {
      page = VacationSitePage(
        language: language,
        initialConfig: plannerConfig,
      );
    } else if (routePath.contentPageType == ContentPageType.bridges &&
        routePath.year != null) {
      page = BridgesYearPage(year: routePath.year!, language: language);
    } else if (routePath.contentPageType == ContentPageType.holidays &&
        routePath.year != null) {
      page = HolidaysYearPage(
        availableYears: VacationSitePage.availableYears,
        initialYear: routePath.year!,
        language: language,
      );
    } else if (routePath.contentPageType ==
            ContentPageType.schoolHolidaysBridges &&
        routePath.year != null) {
      page = SchoolHolidaysBridgesYearPage(
        availableYears: VacationSitePage.availableYears,
        initialYear: routePath.year!,
        language: language,
      );
    } else {
      page = VacationSitePage(
        language: language,
        initialConfig: plannerConfig,
      );
    }

    return MaterialPageRoute<void>(
      settings: RouteSettings(
        name: routePath.isHome
            ? AppRoutePath.homePath()
            : AppRoutePath.contentPath(
                routePath.contentPageType!,
                routePath.year!,
              ),
      ),
      builder: (_) => page,
    );
  }

  @override
  Widget build(BuildContext context) {
    const primaryInk = Color(0xFF123458);
    const accent = Color(0xFFFF7A59);
    const sand = Color(0xFFF7F2EA);
    const mist = Color(0xFFE7EEF6);

    return ValueListenableBuilder<AppLanguage>(
      valueListenable: appLanguageNotifier,
      builder: (context, language, _) {
        return MaterialApp(
          title: 'Ponts Malins',
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
            useMaterial3: true,
            scaffoldBackgroundColor: sand,
            colorScheme: const ColorScheme.light(
              primary: primaryInk,
              secondary: accent,
              surface: Colors.white,
            ),
            textTheme: const TextTheme(
              displayLarge: TextStyle(
                fontSize: 68,
                fontWeight: FontWeight.w800,
                letterSpacing: -2.8,
                height: 0.92,
                color: primaryInk,
              ),
              displayMedium: TextStyle(
                fontSize: 48,
                fontWeight: FontWeight.w800,
                letterSpacing: -1.8,
                height: 0.96,
                color: primaryInk,
              ),
              headlineMedium: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.w700,
                letterSpacing: -1,
                color: primaryInk,
              ),
              headlineSmall: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w700,
                color: primaryInk,
              ),
              titleMedium: TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w700,
                color: primaryInk,
              ),
              bodyLarge: TextStyle(
                fontSize: 16,
                height: 1.6,
                color: Color(0xFF49627C),
              ),
              bodyMedium: TextStyle(
                fontSize: 14,
                height: 1.6,
                color: Color(0xFF6B7C8F),
              ),
            ),
            inputDecorationTheme: InputDecorationTheme(
              filled: true,
              fillColor: Colors.white,
              hintStyle: const TextStyle(color: Color(0xFF7B8FA5)),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(18),
                borderSide: const BorderSide(color: mist),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(18),
                borderSide: const BorderSide(color: mist),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(18),
                borderSide: const BorderSide(color: accent, width: 1.4),
              ),
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 18,
                vertical: 18,
              ),
            ),
            elevatedButtonTheme: ElevatedButtonThemeData(
              style: ElevatedButton.styleFrom(
                backgroundColor: accent,
                foregroundColor: Colors.white,
                minimumSize: const Size(0, 56),
                padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 18),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(18),
                ),
                textStyle: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
            outlinedButtonTheme: OutlinedButtonThemeData(
              style: OutlinedButton.styleFrom(
                side: const BorderSide(color: primaryInk),
                foregroundColor: primaryInk,
                minimumSize: const Size(0, 56),
                padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 18),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(18),
                ),
                textStyle: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ),
          initialRoute: AppRoutePath.homePath(),
          onGenerateRoute: (settings) => _buildRoute(settings, language),
        );
      },
    );
  }
}

class VacationSitePage extends StatefulWidget {
  const VacationSitePage({
    super.key,
    required this.language,
    this.initialConfig,
  });

  final AppLanguage language;
  final PlannerInitialConfig? initialConfig;
  static final List<int> availableYears = List.generate(
    4,
    (index) => DateTime.now().year + index,
  );

  @override
  State<VacationSitePage> createState() => _VacationSitePageState();
}

class _VacationSitePageState extends State<VacationSitePage> {
  final ScrollController _scrollController = ScrollController();
  final GlobalKey _homeKey = GlobalKey();
  final GlobalKey _plannerKey = GlobalKey();

  int selectedYear = DateTime.now().year;
  int selectedMonth = DateTime.now().month;
  int vacationDays = 3;
  int selectedRttDays = 0;
  PlanningMode selectedPlanningMode = PlanningMode.singleBridge;
  String selectedSchoolZone = 'A';
  SchoolHolidayPreference selectedSchoolHolidayPreference =
      SchoolHolidayPreference.neutral;
  bool allowSchoolHolidayOverlap = false;
  String outputMessage = '';
  String loadingMessage = '';
  String? errorMessage;
  List<BestVacationPeriod> optimizedPeriods = [];
  List<SchoolHolidayPeriod> schoolHolidayPeriods = [];
  bool isLoading = false;
  bool showBackToTopButton = false;
  bool hasSearchedOnce = false;

  late final List<int> availableYears = VacationSitePage.availableYears;
  final List<int> availableMonths = List.generate(12, (index) => index + 1);
  final List<int> availableRttOptions = [0, 1, 2, 3];
  final List<String> availableSchoolZones = ['A', 'B', 'C'];

  bool get isEnglish => widget.language == AppLanguage.en;
  String tr(String fr, String en) => isEnglish ? en : fr;
  String get currentLocaleCode => isEnglish ? 'en' : 'fr';
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

  String _monthShortName(int month) {
    const monthsFr = [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Juin',
      'Juil',
      'Aoû',
      'Sep',
      'Oct',
      'Nov',
      'Déc',
    ];
    const monthsEn = [
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
    return isEnglish ? monthsEn[month - 1] : monthsFr[month - 1];
  }

  String _weekdayShort(DateTime date) {
    const weekdaysFr = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const weekdaysEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return isEnglish
        ? weekdaysEn[date.weekday - 1]
        : weekdaysFr[date.weekday - 1];
  }

  String _shortDay(DateTime date) {
    return '${_weekdayShort(date)} ${date.day}';
  }

  @override
  void initState() {
    super.initState();
    _applyInitialConfig();
    _refreshComputedCopy();
    _scrollController.addListener(_handleScroll);
  }

  @override
  void didUpdateWidget(covariant VacationSitePage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.language != widget.language) {
      _refreshComputedCopy();
    }
  }

  @override
  void dispose() {
    _scrollController.removeListener(_handleScroll);
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      floatingActionButton: showBackToTopButton
          ? FloatingActionButton.extended(
              onPressed: _scrollToTop,
              backgroundColor: const Color(0xFF123458),
              foregroundColor: Colors.white,
              icon: const Icon(Icons.arrow_upward_rounded),
              label: Text(tr('Aller en haut', 'Back to top')),
            )
          : null,
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFFFFF8EF), Color(0xFFF4E7D7), Color(0xFFE6EEF8)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            controller: _scrollController,
            child: Column(
              children: [
                _buildTopNavigation(theme),
                _buildPlannerSection(theme),
                _buildResourcesSection(theme),
                _buildFooter(theme),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTopNavigation(ThemeData theme) {
    return Padding(
      key: _homeKey,
      padding: const EdgeInsets.fromLTRB(0, 0, 0, 12),
      child: Center(
        child: Container(
          width: double.infinity,
          decoration: const BoxDecoration(
            color: Colors.white,
            border: Border(bottom: BorderSide(color: Color(0xFFE5E7EB))),
          ),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 1180),
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 20,
                  vertical: 14,
                ),
                child: LayoutBuilder(
                  builder: (context, constraints) {
                    final compact = constraints.maxWidth < 860;

                    if (compact) {
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildBrand(theme),
                          const SizedBox(height: 12),
                          Wrap(
                            spacing: 6,
                            runSpacing: 6,
                            children: [
                              _NavButton(
                                label: tr(
                                  'Ponts $selectedYear',
                                  'Bridge ideas $selectedYear',
                                ),
                                onTap: () => Navigator.of(context).pushNamed(
                                  AppRoutePath.contentPath(
                                    ContentPageType.bridges,
                                    selectedYear,
                                  ),
                                ),
                              ),
                              _NavButton(
                                label: tr('Jours fériés', 'Holidays'),
                                onTap: _openHolidayPage,
                              ),
                              _NavButton(
                                label: tr(
                                  'Vacances scolaires',
                                  'School holidays',
                                ),
                                onTap: () => Navigator.of(context).pushNamed(
                                  AppRoutePath.contentPath(
                                    ContentPageType.schoolHolidaysBridges,
                                    selectedYear,
                                  ),
                                ),
                              ),
                              _NavButton(
                                label: tr('Simulateur', 'Planner'),
                                onTap: () => _scrollTo(_homeKey),
                              ),
                              _LanguageSwitch(language: widget.language),
                            ],
                          ),
                        ],
                      );
                    }

                    return Row(
                      children: [
                        _buildBrand(theme),
                        const Spacer(),
                        _NavButton(
                          label: tr(
                            'Ponts $selectedYear',
                            'Bridge ideas $selectedYear',
                          ),
                          onTap: () => Navigator.of(context).pushNamed(
                            AppRoutePath.contentPath(
                              ContentPageType.bridges,
                              selectedYear,
                            ),
                          ),
                        ),
                        _NavButton(
                          label: tr('Jours fériés', 'Holidays'),
                          onTap: _openHolidayPage,
                        ),
                        _NavButton(
                          label: tr('Vacances scolaires', 'School holidays'),
                          onTap: () => Navigator.of(context).pushNamed(
                            AppRoutePath.contentPath(
                              ContentPageType.schoolHolidaysBridges,
                              selectedYear,
                            ),
                          ),
                        ),
                        _NavButton(
                          label: tr('Simulateur', 'Planner'),
                          onTap: () => _scrollTo(_plannerKey),
                        ),
                        const SizedBox(width: 10),
                        _LanguageSwitch(language: widget.language),
                      ],
                    );
                  },
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildBrand(ThemeData theme) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 44,
          height: 44,
          decoration: BoxDecoration(
            color: const Color(0xFF123458),
            borderRadius: BorderRadius.circular(14),
          ),
          alignment: Alignment.center,
          child: const Text(
            'BD',
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.w800,
              letterSpacing: 0.4,
            ),
          ),
        ),
        const SizedBox(width: 12),
        Flexible(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('Ponts Malins', style: theme.textTheme.titleMedium),
              Text(
                tr(
                  'Le planificateur qui aime les jours fériés plus que les réunions',
                  'The planner that likes public holidays more than meetings',
                ),
                style: theme.textTheme.bodyMedium,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildPlannerSection(ThemeData theme) {
    return Padding(
      key: _plannerKey,
      padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1180),
          child: Column(
            children: [
              _EntranceReveal(
                delay: const Duration(milliseconds: 120),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(28),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.95),
                    borderRadius: BorderRadius.circular(32),
                    border: Border.all(color: const Color(0xFFE2EAF3)),
                    boxShadow: const [
                      BoxShadow(
                        color: Color(0x180F2A43),
                        blurRadius: 36,
                        offset: Offset(0, 16),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      _buildPlannerIntro(theme),
                      const SizedBox(height: 20),
                      _buildPlannerForm(theme),
                      const SizedBox(height: 16),
                      _buildPlannerHelper(),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),
              _EntranceReveal(
                delay: const Duration(milliseconds: 200),
                child: _buildResultsShowcase(theme),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPlannerHelper() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final compact = constraints.maxWidth < 760;

        return ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 900),
          child: Align(
            alignment: compact ? Alignment.center : Alignment.centerRight,
            child: Padding(
              padding: const EdgeInsets.only(top: 2),
              child: Wrap(
                spacing: 8,
                runSpacing: 8,
                crossAxisAlignment: WrapCrossAlignment.center,
                alignment: compact ? WrapAlignment.center : WrapAlignment.end,
                children: [
                  _LegendChip(
                    label: tr('Férié', 'Holiday'),
                    color: const Color(0xFFFBD38D),
                  ),
                  _LegendChip(
                    label: tr('Week-end', 'Weekend'),
                    color: const Color(0xFF9CD4C2),
                  ),
                  _LegendChip(label: 'RTT', color: const Color(0xFFB7C6FF)),
                  _LegendChip(
                    label: tr('Congé payé', 'Paid leave'),
                    color: const Color(0xFFFFB69A),
                  ),
                  _LegendChip(
                    label: tr('Vacances scolaires', 'School holidays'),
                    color: const Color(0xFFB26AD8),
                  ),
                  Text(
                    tr(
                      'Score = jours de repos / congés payés posés.',
                      'Score = days off / paid leave used.',
                    ),
                    style: const TextStyle(
                      color: Color(0xFF60768D),
                      height: 1.2,
                      fontSize: 11.5,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildPlannerIntro(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Center(
          child: Text(
            tr('Simulateur', 'Planner'),
            style: theme.textTheme.headlineMedium,
          ),
        ),
        const SizedBox(height: 8),
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 680),
          child: Text(
            tr(
              'Sélectionnez le mois et votre budget de congés. Le site classe ensuite les meilleurs ponts pour ce mois.',
              'Choose a month and your leave budget. The site then ranks the best bridge ideas for that month.',
            ),
            textAlign: TextAlign.center,
            style: theme.textTheme.bodyLarge,
          ),
        ),
        const SizedBox(height: 18),
        SegmentedButton<PlanningMode>(
          segments: [
            ButtonSegment(
              value: PlanningMode.singleBridge,
              label: Text(tr('Gros pont', 'Single break')),
            ),
            ButtonSegment(
              value: PlanningMode.multipleBridges,
              label: Text(tr('Plusieurs ponts', 'Multiple breaks')),
            ),
          ],
          selected: {selectedPlanningMode},
          showSelectedIcon: false,
          onSelectionChanged: (selection) {
            setState(() => selectedPlanningMode = selection.first);
          },
        ),
        const SizedBox(height: 20),
        _buildMonthStrip(),
        const SizedBox(height: 18),
        _buildSchoolHolidayControls(),
      ],
    );
  }

  Widget _buildSchoolHolidayControls() {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 900),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFFF8FBFD),
          borderRadius: BorderRadius.circular(22),
          border: Border.all(color: const Color(0xFFE2EAF3)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Wrap(
              spacing: 18,
              runSpacing: 14,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      tr('Zone scolaire', 'School zone'),
                      style: const TextStyle(
                        color: Color(0xFF6B7C8F),
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 8),
                    SegmentedButton<String>(
                      segments: const [
                        ButtonSegment(value: 'A', label: Text('A')),
                        ButtonSegment(value: 'B', label: Text('B')),
                        ButtonSegment(value: 'C', label: Text('C')),
                      ],
                      selected: {selectedSchoolZone},
                      showSelectedIcon: false,
                      onSelectionChanged: (selection) {
                        setState(() => selectedSchoolZone = selection.first);
                      },
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      tr('Vacances scolaires', 'School holidays'),
                      style: const TextStyle(
                        color: Color(0xFF6B7C8F),
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        _SmartChoiceChip(
                          label: tr('Neutre', 'Neutral'),
                          selected: selectedSchoolHolidayPreference ==
                              SchoolHolidayPreference.neutral,
                          onTap: () => _setSchoolHolidayPreference(
                            SchoolHolidayPreference.neutral,
                          ),
                        ),
                        _SmartChoiceChip(
                          label: tr('Favoriser', 'Favor'),
                          selected: selectedSchoolHolidayPreference ==
                              SchoolHolidayPreference.favor,
                          onTap: () => _setSchoolHolidayPreference(
                            SchoolHolidayPreference.favor,
                          ),
                        ),
                        _SmartChoiceChip(
                          label: tr('Éviter', 'Avoid'),
                          selected: selectedSchoolHolidayPreference ==
                              SchoolHolidayPreference.avoid,
                          onTap: () => _setSchoolHolidayPreference(
                            SchoolHolidayPreference.avoid,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 14),
            _SmartChoiceChip(
              label: tr(
                'Autoriser le chevauchement avec les vacances scolaires',
                'Allow overlap with school holidays',
              ),
              selected: allowSchoolHolidayOverlap,
              enabled: selectedSchoolHolidayPreference !=
                  SchoolHolidayPreference.avoid,
              onTap: selectedSchoolHolidayPreference == SchoolHolidayPreference.avoid
                  ? () {}
                  : () => setState(
                        () => allowSchoolHolidayOverlap = !allowSchoolHolidayOverlap,
                      ),
              leadingIcon: allowSchoolHolidayOverlap
                  ? Icons.check_rounded
                  : Icons.add_rounded,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPlannerForm(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 900),
          child: LayoutBuilder(
            builder: (context, constraints) {
              final stacked = constraints.maxWidth < 860;

              final fields = [
                _buildDropdown<int>(
                  label: tr('Année', 'Year'),
                  value: selectedYear,
                  options: availableYears,
                  itemLabel: (value) => '$value',
                  embedded: !stacked,
                  onChanged: (value) =>
                      setState(() => selectedYear = value ?? selectedYear),
                ),
                _buildDropdown<int>(
                  label: tr('Mois', 'Month'),
                  value: selectedMonth,
                  options: availableMonths,
                  itemLabel: _monthName,
                  embedded: !stacked,
                  onChanged: (value) =>
                      setState(() => selectedMonth = value ?? selectedMonth),
                ),
                _buildDropdown<int>(
                  label: tr('RTT mensuel', 'Monthly RTT'),
                  value: selectedRttDays,
                  options: availableRttOptions,
                  itemLabel: _rttLabel,
                  embedded: !stacked,
                  onChanged: (value) =>
                      setState(() => selectedRttDays = value ?? selectedRttDays),
                ),
              ];

              if (stacked) {
                return Column(
                  children: [
                    for (final field in fields) ...[
                      field,
                      if (field != fields.last) const SizedBox(height: 14),
                    ],
                  ],
                );
              }

              return Container(
                decoration: BoxDecoration(
                  color: const Color(0xFFF8FBFD),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: const Color(0xFFE2EAF3)),
                ),
                child: IntrinsicHeight(
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      for (var index = 0; index < fields.length; index++) ...[
                        Expanded(child: fields[index]),
                        if (index < fields.length - 1)
                          const VerticalDivider(
                            width: 1,
                            thickness: 1,
                            color: Color(0xFFE2EAF3),
                          ),
                      ],
                    ],
                  ),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 18),
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 900),
          child: _buildSliderCard(
            title: tr('Budget de congés payés', 'Paid leave budget'),
            headline: tr(
              '$vacationDays jour${vacationDays == 1 ? '' : 's'} disponible${vacationDays == 1 ? '' : 's'}',
              '$vacationDays day${vacationDays == 1 ? '' : 's'} available',
            ),
            caption: tr(
              'Maximum de jours ouvrés à poser. Les RTT, si activés, sont utilisés avant.',
              'Maximum number of workdays to book. RTT days, if enabled, are used first.',
            ),
            slider: SliderTheme(
              data: SliderTheme.of(context).copyWith(
                activeTrackColor: const Color(0xFFFF7A59),
                inactiveTrackColor: const Color(0xFFE6EDF5),
                thumbColor: const Color(0xFFFF7A59),
                overlayColor: const Color(0x22FF7A59),
              ),
              child: Slider(
                value: vacationDays.toDouble(),
                min: 1,
                max: 10,
                divisions: 9,
                onChanged: (value) =>
                    setState(() => vacationDays = value.round()),
              ),
            ),
          ),
        ),
        const SizedBox(height: 20),
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 320),
          child: SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: isLoading ? null : _optimizeVacation,
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 180),
                child: isLoading
                    ? const SizedBox(
                        key: ValueKey('loading'),
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Colors.white,
                        ),
                      )
                    : Text(
                        tr(
                          'Calculer mes meilleurs ponts',
                          'Find my best bridges',
                        ),
                        key: const ValueKey('ready'),
                      ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSliderCard({
    required String title,
    required String headline,
    required String caption,
    required Widget slider,
  }) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FBFD),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFE2EAF3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.w700,
              color: Color(0xFF123458),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            headline,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w800,
              color: Color(0xFF123458),
            ),
          ),
          const SizedBox(height: 6),
          Text(
            caption,
            style: const TextStyle(color: Color(0xFF6B7C8F), height: 1.55),
          ),
          const SizedBox(height: 12),
          Align(
            alignment: Alignment.centerRight,
            child: Text(
              '$vacationDays jour${vacationDays == 1 ? '' : 's'}',
              style: const TextStyle(
                color: Color(0xFF123458),
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          slider,
        ],
      ),
    );
  }

  Widget _buildMonthStrip() {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 900),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
        decoration: BoxDecoration(
          color: const Color(0xFFF8FBFD),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: const Color(0xFFE2EAF3)),
        ),
        child: Row(
          children: [
            _MonthArrowButton(
              icon: Icons.chevron_left_rounded,
              onTap: isLoading ? null : _goToPreviousMonth,
            ),
            const SizedBox(width: 10),
            Expanded(
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: List.generate(12, (index) {
                    final month = index + 1;
                    final selected = month == selectedMonth;
                    return Padding(
                      padding: EdgeInsets.only(right: index == 11 ? 0 : 6),
                      child: InkWell(
                        borderRadius: BorderRadius.circular(999),
                        onTap: isLoading ? null : () => _selectMonth(month),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 160),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 14,
                            vertical: 10,
                          ),
                          decoration: BoxDecoration(
                            color: selected
                                ? const Color(0xFF123458)
                                : Colors.white,
                            borderRadius: BorderRadius.circular(999),
                            border: Border.all(
                              color: selected
                                  ? const Color(0xFF123458)
                                  : const Color(0xFFE2EAF3),
                            ),
                            boxShadow: selected
                                ? const [
                                    BoxShadow(
                                      color: Color(0x180F2A43),
                                      blurRadius: 16,
                                      offset: Offset(0, 6),
                                    ),
                                  ]
                                : null,
                          ),
                          child: Text(
                            _monthShortName(month),
                            style: TextStyle(
                              color: selected
                                  ? Colors.white
                                  : const Color(0xFF60768D),
                              fontWeight:
                                  selected ? FontWeight.w700 : FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                    );
                  }),
                ),
              ),
            ),
            const SizedBox(width: 10),
            _MonthArrowButton(
              icon: Icons.chevron_right_rounded,
              onTap: isLoading ? null : _goToNextMonth,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildResultsShowcase(ThemeData theme) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(28),
      decoration: BoxDecoration(
        color: const Color(0xFFFCFEFF),
        borderRadius: BorderRadius.circular(32),
        border: Border.all(color: const Color(0xFFE2EAF3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          LayoutBuilder(
            builder: (context, constraints) {
              final compact = constraints.maxWidth < 760;

              final titleBlock = Wrap(
                spacing: 14,
                runSpacing: 14,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  Text(
                    tr('Ponts recommandés', 'Recommended bridges'),
                    style: theme.textTheme.headlineMedium,
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 14,
                      vertical: 8,
                    ),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF1F5F9),
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(color: const Color(0xFFE2EAF3)),
                    ),
                    child: Text(
                      '${_monthName(selectedMonth)} $selectedYear',
                      style: const TextStyle(
                        color: Color(0xFF123458),
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                  if (!isLoading && optimizedPeriods.isNotEmpty)
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 14,
                        vertical: 8,
                      ),
                      decoration: BoxDecoration(
                        color: const Color(0xFFE7F6EE),
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: Text(
                        tr(
                          '${optimizedPeriods.length} options classées',
                          '${optimizedPeriods.length} ranked options',
                        ),
                        style: const TextStyle(
                          color: Color(0xFF1D7A4A),
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                ],
              );

              final nav = _buildMonthNavigation();

              if (compact) {
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [titleBlock, const SizedBox(height: 14), nav],
                );
              }

              return Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: titleBlock),
                  const SizedBox(width: 16),
                  nav,
                ],
              );
            },
          ),
          const SizedBox(height: 12),
          Container(
            width: 96,
            height: 1,
            color: const Color(0xFFE3EAF2),
          ),
          const SizedBox(height: 14),
          Text(
            outputMessage,
            textAlign: TextAlign.center,
            style: theme.textTheme.bodyLarge,
          ),
          const SizedBox(height: 10),
          Text(
            tr(
              'Le score compare le nombre total de jours de repos aux jours de congé payé posés.',
              'The score compares total days off with paid leave used.',
            ),
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: Color(0xFF60768D),
              fontWeight: FontWeight.w600,
            ),
          ),
          if (errorMessage != null) ...[
            const SizedBox(height: 18),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFFFFF0EB),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFFFFD2C2)),
              ),
              child: Text(
                errorMessage!,
                style: const TextStyle(color: Color(0xFFB24B2A), height: 1.55),
              ),
            ),
          ],
          const SizedBox(height: 22),
          if (isLoading)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 32),
              child: Column(
                children: [
                  const Center(child: CircularProgressIndicator()),
                  const SizedBox(height: 14),
                  Text(
                    loadingMessage,
                    style: const TextStyle(
                      color: Color(0xFF60768D),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            )
          else if (optimizedPeriods.isEmpty)
            _buildEmptyResultsState()
          else
            Column(
              children: [
                for (
                  var index = 0;
                  index < optimizedPeriods.length;
                  index++
                ) ...[
                  _buildResultCard(optimizedPeriods[index], index + 1),
                  if (index < optimizedPeriods.length - 1)
                    const SizedBox(height: 18),
                ],
              ],
            ),
        ],
      ),
    );
  }

  Widget _buildMonthNavigation() {
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          decoration: BoxDecoration(
            color: const Color(0xFFF8FBFD),
            borderRadius: BorderRadius.circular(999),
            border: Border.all(color: const Color(0xFFE2EAF3)),
          ),
          child: Text(
            '${_monthName(selectedMonth)} $selectedYear',
            style: const TextStyle(
              color: Color(0xFF123458),
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
        OutlinedButton(
          onPressed: isLoading ? null : _goToPreviousMonth,
          child: Text(tr('Mois précédent', 'Previous month')),
        ),
        OutlinedButton(
          onPressed: isLoading ? null : _goToNextMonth,
          child: Text(tr('Mois suivant', 'Next month')),
        ),
      ],
    );
  }

  Widget _buildEmptyResultsState() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFFF5F8FB),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFE1E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            tr('Aucun pont trouvé', 'No bridge found'),
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w800,
              color: Color(0xFF123458),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            tr(
              'Essayez un autre mois ou augmentez le budget de congés. Certaines combinaisons sont simplement trop courtes pour former un bon pont.',
              'Try another month or increase the leave budget. Some combinations are simply too short to create a good bridge.',
            ),
            textAlign: TextAlign.center,
            style: const TextStyle(color: Color(0xFF60768D), height: 1.6),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: [
              OutlinedButton(
                onPressed: _goToNextMonth,
                child: Text(tr('Mois suivant', 'Next month')),
              ),
              ElevatedButton(
                onPressed: _increaseVacationDays,
                child: Text(tr('+1 jour de congé', '+1 leave day')),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildResultCard(BestVacationPeriod period, int rank) {
    final isTopPick =
        rank == 1 && selectedPlanningMode == PlanningMode.singleBridge;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(
        color: isTopPick ? const Color(0xFFFFFCF6) : Colors.white,
        borderRadius: BorderRadius.circular(28),
        border: Border.all(
          color: isTopPick ? const Color(0xFFFFD3BC) : const Color(0xFFE4EAF1),
          width: isTopPick ? 1.4 : 1,
        ),
        boxShadow: [
          BoxShadow(
            color: isTopPick
                ? const Color(0x18FF7A59)
                : const Color(0x120D2A46),
            blurRadius: isTopPick ? 30 : 24,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final stacked = constraints.maxWidth < 920;

          final summary = _buildResultSummary(
            period,
            rank,
            isTopPick: isTopPick,
          );
          final timeline = _buildTimeline(period);

          if (stacked) {
            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [summary, const SizedBox(height: 20), timeline],
            );
          }

          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(flex: 4, child: summary),
              const SizedBox(width: 22),
              Expanded(flex: 5, child: timeline),
            ],
          );
        },
      ),
    );
  }

  Widget _buildResultSummary(
    BestVacationPeriod period,
    int rank, {
    required bool isTopPick,
  }) {
    final title = tr(
      '${period.totalDaysOff} jours de repos pour ${period.paidLeaveDaysUsed} jour${period.paidLeaveDaysUsed == 1 ? '' : 's'} de congé payé',
      '${period.totalDaysOff} days off for ${period.paidLeaveDaysUsed} paid leave day${period.paidLeaveDaysUsed == 1 ? '' : 's'}',
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (isTopPick) ...[
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: const Color(0xFFFFE6DB),
              borderRadius: BorderRadius.circular(999),
            ),
            child: Text(
              tr(
                'Meilleur rendement pour ce mois',
                'Best value this month',
              ),
              style: TextStyle(
                color: Color(0xFF9D5437),
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
          const SizedBox(height: 12),
        ],
        Wrap(
          spacing: 10,
          runSpacing: 10,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: BoxDecoration(
                color: isTopPick
                    ? const Color(0xFFE98C6D)
                    : const Color(0xFF123458),
                borderRadius: BorderRadius.circular(999),
              ),
              child: Text(
                '#$rank',
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
            _MetricPill(
              label: tr('Score', 'Score'),
              value: period.worthScore.toStringAsFixed(2),
              tooltip: tr(
                'Score = nombre total de jours de repos / nombre de jours de congé payé utilisés. Plus le score est élevé, plus le pont est rentable.',
                'Score = total days off / paid leave used. The higher the score, the more efficient the bridge.',
              ),
              emphasis: true,
            ),
            _MetricPill(
              label: tr('Fériés', 'Holidays'),
              value: '${period.includedHolidays.length}',
            ),
            _MetricPill(label: 'RTT', value: '${period.rttDaysUsed}'),
            if (period.schoolHolidayDates.isNotEmpty)
              _MetricPill(
                label: tr('Scolaire', 'School'),
                value: '${period.schoolHolidayDates.length}',
              ),
          ],
        ),
        const SizedBox(height: 16),
        Text(
          title,
          style: const TextStyle(
            fontSize: 26,
            fontWeight: FontWeight.w800,
            color: Color(0xFF123458),
            height: 1.04,
          ),
        ),
        const SizedBox(height: 10),
        Text(
          '${period.formatDate(period.startDate)} au ${period.formatDate(period.endDate)}',
          style: const TextStyle(
            color: Color(0xFF60768D),
            fontWeight: FontWeight.w600,
          ),
        ),
        if (period.schoolHolidayDates.isNotEmpty) ...[
          const SizedBox(height: 10),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: const Color(0xFFF4E9FB),
              borderRadius: BorderRadius.circular(999),
            ),
            child: Text(
              tr(
                '${period.schoolHolidayDates.length} jour${period.schoolHolidayDates.length == 1 ? '' : 's'} pendant les vacances scolaires',
                '${period.schoolHolidayDates.length} day${period.schoolHolidayDates.length == 1 ? '' : 's'} during school holidays',
              ),
              style: const TextStyle(
                color: Color(0xFF7A3E96),
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
        ],
        const SizedBox(height: 14),
        Text(
          tr(
            'Jours fériés inclus : ${period.includedHolidays.map((holiday) => holiday.localName).join(', ')}',
            'Included public holidays: ${period.includedHolidays.map((holiday) => holiday.localName).join(', ')}',
          ),
          style: const TextStyle(color: Color(0xFF60768D), height: 1.55),
        ),
        const SizedBox(height: 18),
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: [
            _BookingChip(
              label: tr('Congé payé', 'Paid leave'),
              value: period.paidLeaveDates.isEmpty
                  ? tr('Aucun', 'None')
                  : period.paidLeaveDates.map(_shortDay).join(', '),
              background: const Color(0xFFFFEEE7),
              foreground: const Color(0xFFB44A28),
            ),
            _BookingChip(
              label: 'RTT',
              value: period.rttDates.isEmpty
                  ? tr('Aucun', 'None')
                  : period.rttDates.map(_shortDay).join(', '),
              background: const Color(0xFFEEF1FF),
              foreground: const Color(0xFF4456B0),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildTimeline(BestVacationPeriod period) {
    final days = List<DateTime>.generate(
      period.endDate.difference(period.startDate).inDays + 1,
      (index) => period.startDate.add(Duration(days: index)),
    );

    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FBFD),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFE2EAF3)),
      ),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final tileWidth = constraints.maxWidth < 430 ? 74.0 : 86.0;

          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                tr('Vue jour par jour', 'Day by day'),
                style: TextStyle(
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF123458),
                ),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 10,
                runSpacing: 10,
                children: days.map((date) {
                  final style = _styleForDate(period, date);
                  final isSchoolHoliday = period.schoolHolidayDates.contains(
                    DateTime(date.year, date.month, date.day),
                  );
                  return Container(
                    width: tileWidth,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 12,
                    ),
                    decoration: BoxDecoration(
                      color: style.background,
                      borderRadius: BorderRadius.circular(18),
                      border: isSchoolHoliday
                          ? Border.all(
                              color: const Color(0xFFB26AD8),
                              width: 2,
                            )
                          : null,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          _weekdayShort(date),
                          style: TextStyle(
                            color: style.foreground,
                            fontWeight: FontWeight.w700,
                            fontSize: 12,
                          ),
                        ),
                        const SizedBox(height: 3),
                        Text(
                          '${date.day}',
                          style: TextStyle(
                            color: style.foreground,
                            fontWeight: FontWeight.w800,
                            fontSize: 22,
                            height: 1,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          isSchoolHoliday
                              ? '${style.label} • ${tr('Scolaire', 'School')}'
                              : style.label,
                          style: TextStyle(
                            color: isSchoolHoliday
                                ? const Color(0xFF7A3E96)
                                : style.foreground,
                            fontWeight: FontWeight.w600,
                            fontSize: 11,
                            height: 1.25,
                          ),
                        ),
                      ],
                    ),
                  );
                }).toList(),
              ),
            ],
          );
        },
      ),
    );
  }

  _DayVisualStyle _styleForDate(BestVacationPeriod period, DateTime date) {
    final normalized = DateTime(date.year, date.month, date.day);

    final isHoliday = period.includedHolidays.any(
      (holiday) => holiday.date == normalized,
    );
    if (isHoliday) {
      return _DayVisualStyle(
        label: tr('Férié', 'Holiday'),
        background: Color(0xFFFDE4A8),
        foreground: Color(0xFF835A00),
      );
    }

    if (period.rttDates.contains(normalized)) {
      return const _DayVisualStyle(
        label: 'RTT',
        background: Color(0xFFDDE5FF),
        foreground: Color(0xFF344AAB),
      );
    }

    if (period.paidLeaveDates.contains(normalized)) {
      return _DayVisualStyle(
        label: tr('Congé payé', 'Paid leave'),
        background: Color(0xFFFFD9C9),
        foreground: Color(0xFFAF4826),
      );
    }

    if (period.weekendDates.contains(normalized)) {
      return _DayVisualStyle(
        label: tr('Week-end', 'Weekend'),
        background: Color(0xFFD8EFE6),
        foreground: Color(0xFF216550),
      );
    }

    return _DayVisualStyle(
      label: tr('Libre', 'Free'),
      background: Color(0xFFF1F5F9),
      foreground: Color(0xFF4B6076),
    );
  }

  Widget _buildFooter(ThemeData theme) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 24, 20, 28),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1180),
          child: LayoutBuilder(
            builder: (context, constraints) {
              final compact = constraints.maxWidth < 760;

              final columns = [
                _FooterColumn(
                  title: tr('PRODUIT', 'PRODUCT'),
                  items: [
                    tr('Ponts par mois', 'Bridges by month'),
                    tr('Pages de contenu', 'Content pages'),
                  ],
                ),
                _FooterColumn(
                  title: tr('CONFIDENTIALITÉ', 'PRIVACY'),
                  items: [
                    tr(
                      'Pas de compte ni base de données',
                      'No account or database',
                    ),
                  ],
                ),
                _FooterColumn(
                  title: tr('CONTACT', 'CONTACT'),
                  items: const ['contact@pontsmalins.com'],
                ),
              ];

              if (compact) {
                return Container(
                  width: double.infinity,
                  color: const Color(0xFF1F2230),
                  padding: const EdgeInsets.fromLTRB(20, 28, 20, 24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      for (var index = 0; index < columns.length; index++) ...[
                        columns[index],
                        if (index < columns.length - 1)
                          const SizedBox(height: 20),
                      ],
                      const SizedBox(height: 20),
                      const Divider(color: Color(0x55FFFFFF), height: 1),
                      const SizedBox(height: 16),
                      const Text(
                        'Ponts Malins',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                );
              }

              return Container(
                width: double.infinity,
                color: const Color(0xFF1F2230),
                padding: const EdgeInsets.fromLTRB(20, 32, 20, 28),
                child: Column(
                  children: [
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        for (
                          var index = 0;
                          index < columns.length;
                          index++
                        ) ...[
                          Expanded(child: columns[index]),
                          if (index < columns.length - 1)
                            const SizedBox(width: 24),
                        ],
                      ],
                    ),
                    const SizedBox(height: 28),
                    const Divider(color: Color(0x55FFFFFF), height: 1),
                    const SizedBox(height: 16),
                    Row(
                      children: const [
                        Text(
                          'Ponts Malins',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  Widget _buildDropdown<T>({
    required String label,
    required T value,
    required List<T> options,
    required String Function(T value) itemLabel,
    required bool embedded,
    required ValueChanged<T?> onChanged,
  }) {
    return Container(
      padding: embedded
          ? const EdgeInsets.fromLTRB(18, 14, 18, 12)
          : EdgeInsets.zero,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            label,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontSize: 13,
              color: embedded
                  ? const Color(0xFF6B7C8F)
                  : const Color(0xFF123458),
              fontWeight: FontWeight.w700,
            ),
          ),
          SizedBox(height: embedded ? 4 : 6),
          DropdownButtonFormField<T>(
            initialValue: value,
            isExpanded: true,
            isDense: true,
            style: const TextStyle(
              fontSize: 16,
              height: 1.2,
              color: Color(0xFF123458),
              fontWeight: FontWeight.w700,
            ),
            items: options
                .map(
                  (option) => DropdownMenuItem<T>(
                    value: option,
                    child: Text(itemLabel(option)),
                  ),
                )
                .toList(),
            onChanged: onChanged,
            icon: const Icon(Icons.keyboard_arrow_down_rounded),
            dropdownColor: Colors.white,
            decoration: InputDecoration(
              isCollapsed: embedded,
              isDense: true,
              filled: !embedded,
              fillColor: embedded ? null : Colors.white,
              contentPadding: embedded
                  ? const EdgeInsets.only(top: 2, bottom: 2)
                  : const EdgeInsets.symmetric(
                      horizontal: 20,
                      vertical: 16,
                    ),
              border: embedded ? InputBorder.none : null,
              enabledBorder: embedded ? InputBorder.none : null,
              focusedBorder: embedded ? InputBorder.none : null,
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _optimizeVacation() async {
    setState(() {
      hasSearchedOnce = true;
      isLoading = true;
      errorMessage = null;
      loadingMessage = 'Recherche des jours fériés...';
      outputMessage =
          tr(
            'On vérifie les jours fériés et on calcule les meilleurs ponts du mois.',
            'Checking public holidays and computing the best bridges for this month.',
          );
    });

    try {
      final holidays = await HolidayService.fetchHolidays('FR', selectedYear);
      final fetchedSchoolHolidays =
          await SchoolHolidayService.fetchSchoolHolidaysForZone(
            selectedSchoolZone,
          );
      if (mounted) {
        setState(() => loadingMessage = tr('Calcul des ponts...', 'Computing bridges...'));
      }
      final singleResults = _buildResultsForCurrentMode(
        holidays: holidays,
        schoolHolidays: fetchedSchoolHolidays,
        mode: PlanningMode.singleBridge,
      );
      final multipleResults = _buildResultsForCurrentMode(
        holidays: holidays,
        schoolHolidays: fetchedSchoolHolidays,
        mode: PlanningMode.multipleBridges,
      );

      if (!mounted) {
        return;
      }

      setState(() {
        schoolHolidayPeriods = fetchedSchoolHolidays;
        final selectedResults = selectedPlanningMode == PlanningMode.singleBridge
            ? singleResults
            : multipleResults;

        if (selectedResults.isEmpty) {
          optimizedPeriods.clear();
          outputMessage = tr(
            'Aucun pont pertinent trouvé pour ${_monthName(selectedMonth)} $selectedYear avec ces réglages.',
            'No relevant bridge found for ${_monthName(selectedMonth)} $selectedYear with these settings.',
          );
        } else {
          optimizedPeriods = selectedResults.take(6).toList();
          outputMessage = selectedPlanningMode == PlanningMode.singleBridge
              ? tr(
                  'Meilleures idées de ponts pour ${_monthName(selectedMonth)} $selectedYear.',
                  'Best bridge ideas for ${_monthName(selectedMonth)} $selectedYear.',
                )
              : tr(
                  '${optimizedPeriods.length} pont${optimizedPeriods.length == 1 ? '' : 's'} retenu${optimizedPeriods.length == 1 ? '' : 's'} pour ${_monthName(selectedMonth)} $selectedYear.',
                  '${optimizedPeriods.length} bridge${optimizedPeriods.length == 1 ? '' : 's'} selected for ${_monthName(selectedMonth)} $selectedYear.',
                );
        }
      });
    } catch (_) {
      if (!mounted) {
        return;
      }

      setState(() {
        optimizedPeriods.clear();
        errorMessage = tr(
          'Impossible de charger les jours fériés pour le moment. Vérifiez la connexion et recommencez.',
          'Unable to load public holidays right now. Check the connection and try again.',
        );
        outputMessage = tr(
          'Le simulateur a besoin des jours fériés en direct avant de sortir des recommandations.',
          'The planner needs live public holidays before it can return recommendations.',
        );
      });
    } finally {
      if (mounted) {
        setState(() => isLoading = false);
      }
    }
  }

  Future<void> _goToPreviousMonth() async {
    setState(() {
      if (selectedMonth == 1) {
        selectedMonth = 12;
        selectedYear = selectedYear - 1;
      } else {
        selectedMonth = selectedMonth - 1;
      }
      _normalizeSelectedYear();
    });
    if (hasSearchedOnce) {
      await _optimizeVacation();
    }
  }

  Future<void> _goToNextMonth() async {
    setState(() {
      if (selectedMonth == 12) {
        selectedMonth = 1;
        selectedYear = selectedYear + 1;
      } else {
        selectedMonth = selectedMonth + 1;
      }
      _normalizeSelectedYear();
    });
    if (hasSearchedOnce) {
      await _optimizeVacation();
    }
  }

  void _increaseVacationDays() {
    setState(() {
      if (vacationDays < 10) {
        vacationDays = vacationDays + 1;
      }
    });
  }

  void _applyInitialConfig() {
    final config = widget.initialConfig;
    if (config == null) {
      return;
    }

    if (config.year != null && availableYears.contains(config.year)) {
      selectedYear = config.year!;
    }
    if (config.schoolZone != null &&
        availableSchoolZones.contains(config.schoolZone)) {
      selectedSchoolZone = config.schoolZone!;
    }

    if (config.scrollToPlanner) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) {
          _scrollTo(_plannerKey);
        }
      });
    }
  }

  void _refreshComputedCopy() {
    loadingMessage = tr('Recherche en cours...', 'Loading...');

    if (!hasSearchedOnce) {
      outputMessage = tr(
        'Choisissez un mois et lancez la recherche pour voir les meilleurs ponts.',
        'Choose a month and launch a search to see the best bridge ideas.',
      );
      return;
    }

    if (isLoading) {
      outputMessage = tr(
        'On vérifie les jours fériés et on calcule les meilleurs ponts du mois.',
        'Checking public holidays and computing the best bridges for this month.',
      );
      return;
    }

    if (errorMessage != null) {
      errorMessage = tr(
        'Impossible de charger les jours fériés pour le moment. Vérifiez la connexion et recommencez.',
        'Unable to load public holidays right now. Check the connection and try again.',
      );
      outputMessage = tr(
        'Le simulateur a besoin des jours fériés en direct avant de sortir des recommandations.',
        'The planner needs live public holidays before it can return recommendations.',
      );
      return;
    }

    if (optimizedPeriods.isEmpty) {
      outputMessage = tr(
        'Aucun pont pertinent trouvé pour ${_monthName(selectedMonth)} $selectedYear avec ces réglages.',
        'No relevant bridge found for ${_monthName(selectedMonth)} $selectedYear with these settings.',
      );
      return;
    }

    outputMessage = selectedPlanningMode == PlanningMode.singleBridge
        ? tr(
            'Meilleures idées de ponts pour ${_monthName(selectedMonth)} $selectedYear.',
            'Best bridge ideas for ${_monthName(selectedMonth)} $selectedYear.',
          )
        : tr(
            '${optimizedPeriods.length} pont${optimizedPeriods.length == 1 ? '' : 's'} retenu${optimizedPeriods.length == 1 ? '' : 's'} pour ${_monthName(selectedMonth)} $selectedYear.',
            '${optimizedPeriods.length} bridge${optimizedPeriods.length == 1 ? '' : 's'} selected for ${_monthName(selectedMonth)} $selectedYear.',
          );
  }

  void _setSchoolHolidayPreference(SchoolHolidayPreference preference) {
    setState(() {
      selectedSchoolHolidayPreference = preference;
      switch (preference) {
        case SchoolHolidayPreference.favor:
          allowSchoolHolidayOverlap = true;
        case SchoolHolidayPreference.avoid:
          allowSchoolHolidayOverlap = false;
        case SchoolHolidayPreference.neutral:
          allowSchoolHolidayOverlap = true;
      }
    });
  }

  List<BestVacationPeriod> _buildResultsForCurrentMode({
    required List<Holiday> holidays,
    required List<SchoolHolidayPeriod> schoolHolidays,
    required PlanningMode mode,
  }) {
    final builder = mode == PlanningMode.singleBridge
        ? DateOptimizer.findAllOptimizedPeriods
        : DateOptimizer.findBestDistributedPeriods;

    if (selectedSchoolHolidayPreference == SchoolHolidayPreference.neutral) {
      final withoutOverlap = builder(
        holidays: holidays,
        vacationDaysToUse: vacationDays,
        availableRttDays: selectedRttDays,
        year: selectedYear,
        month: selectedMonth,
        schoolHolidayPeriods: schoolHolidays,
        schoolHolidayPreference: SchoolHolidayPreference.neutral,
        allowSchoolHolidayOverlap: false,
      );
      final withOverlap = builder(
        holidays: holidays,
        vacationDaysToUse: vacationDays,
        availableRttDays: selectedRttDays,
        year: selectedYear,
        month: selectedMonth,
        schoolHolidayPeriods: schoolHolidays,
        schoolHolidayPreference: SchoolHolidayPreference.neutral,
        allowSchoolHolidayOverlap: true,
      );
      return _mergeUniquePeriods([...withoutOverlap, ...withOverlap]);
    }

    return builder(
      holidays: holidays,
      vacationDaysToUse: vacationDays,
      availableRttDays: selectedRttDays,
      year: selectedYear,
      month: selectedMonth,
      schoolHolidayPeriods: schoolHolidays,
      schoolHolidayPreference: selectedSchoolHolidayPreference,
      allowSchoolHolidayOverlap: allowSchoolHolidayOverlap,
    );
  }

  List<BestVacationPeriod> _mergeUniquePeriods(List<BestVacationPeriod> periods) {
    final seen = <String>{};
    final unique = <BestVacationPeriod>[];
    for (final period in periods) {
      final signature =
          '${period.startDate.toIso8601String()}_${period.endDate.toIso8601String()}_${period.vacationDaysUsed}_${period.rttDaysUsed}';
      if (seen.add(signature)) {
        unique.add(period);
      }
    }
    unique.sort((a, b) {
      final scoreCompare = b.rankingScore.compareTo(a.rankingScore);
      if (scoreCompare != 0) {
        return scoreCompare;
      }
      return a.startDate.compareTo(b.startDate);
    });
    return unique;
  }

  Future<void> _selectMonth(int month) async {
    if (month == selectedMonth) {
      return;
    }

    setState(() => selectedMonth = month);
    if (hasSearchedOnce) {
      await _optimizeVacation();
    }
  }

  void _normalizeSelectedYear() {
    final minYear = availableYears.first;
    final maxYear = availableYears.last;
    if (selectedYear < minYear) {
      selectedYear = minYear;
      selectedMonth = 1;
    } else if (selectedYear > maxYear) {
      selectedYear = maxYear;
      selectedMonth = 12;
    }
  }

  Future<void> _scrollTo(GlobalKey key) async {
    final context = key.currentContext;
    if (context == null) {
      return;
    }

    await Scrollable.ensureVisible(
      context,
      duration: const Duration(milliseconds: 500),
      curve: Curves.easeInOut,
      alignment: 0.08,
    );
  }

  void _handleScroll() {
    final shouldShow = _scrollController.offset > 720;
    if (shouldShow != showBackToTopButton) {
      setState(() => showBackToTopButton = shouldShow);
    }
  }

  Future<void> _scrollToTop() async {
    await _scrollController.animateTo(
      0,
      duration: const Duration(milliseconds: 450),
      curve: Curves.easeOutCubic,
    );
  }

  String _rttLabel(int days) {
    if (days == 0) {
      return tr('Sans RTT', 'No RTT');
    }

    return tr('$days RTT par mois', '$days RTT per month');
  }

  void _openHolidayPage() {
    Navigator.of(
      context,
    ).pushNamed(
      AppRoutePath.contentPath(ContentPageType.holidays, selectedYear),
    );
  }

  Widget _buildResourcesSection(ThemeData theme) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 24, 20, 0),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1180),
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.all(28),
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.95),
              borderRadius: BorderRadius.circular(32),
              border: Border.all(color: const Color(0xFFE2EAF3)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  tr('Ressources utiles', 'Useful resources'),
                  style: theme.textTheme.headlineSmall,
                ),
                const SizedBox(height: 8),
                Text(
                  tr(
                    'Trois pages pour préparer vos congés avant de lancer une simulation.',
                    'Three pages to prepare your leave before launching a simulation.',
                  ),
                  style: theme.textTheme.bodyLarge,
                ),
                const SizedBox(height: 20),
                LayoutBuilder(
                  builder: (context, constraints) {
                    final stacked = constraints.maxWidth < 860;
                    final cards = [
                      _ResourceCard(
                        title: tr(
                          'Voir tous les ponts $selectedYear',
                          'See all bridge ideas for $selectedYear',
                        ),
                        description: tr(
                          'Résumé des scénarios et des logiques de pont.',
                          'A compact summary of bridge scenarios and patterns.',
                        ),
                        openLabel: tr('Ouvrir', 'Open'),
                        onTap: () => Navigator.of(context).pushNamed(
                          AppRoutePath.contentPath(
                            ContentPageType.bridges,
                            selectedYear,
                          ),
                        ),
                      ),
                      _ResourceCard(
                        title: tr(
                          'Jours fériés $selectedYear',
                          'Public holidays in $selectedYear',
                        ),
                        description: tr(
                          'Liste annuelle, mois par mois, avec sources officielles.',
                          'Yearly list, month by month, with official references.',
                        ),
                        openLabel: tr('Ouvrir', 'Open'),
                        onTap: _openHolidayPage,
                      ),
                      _ResourceCard(
                        title: tr(
                          'Vacances scolaires et ponts',
                          'School holidays and bridges',
                        ),
                        description: tr(
                          'Calendrier par zone A, B, C et impact sur les ponts.',
                          'Zone A, B, C calendar and impact on bridge planning.',
                        ),
                        openLabel: tr('Ouvrir', 'Open'),
                        onTap: () => Navigator.of(context).pushNamed(
                          AppRoutePath.contentPath(
                            ContentPageType.schoolHolidaysBridges,
                            selectedYear,
                          ),
                        ),
                      ),
                    ];

                    if (stacked) {
                      return Column(
                        children: [
                          for (var index = 0; index < cards.length; index++) ...[
                            cards[index],
                            if (index < cards.length - 1)
                              const SizedBox(height: 12),
                          ],
                        ],
                      );
                    }

                    return Row(
                      children: [
                        for (var index = 0; index < cards.length; index++) ...[
                          Expanded(child: cards[index]),
                          if (index < cards.length - 1)
                            const SizedBox(width: 14),
                        ],
                      ],
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _NavButton extends StatelessWidget {
  const _NavButton({required this.label, required this.onTap});

  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: onTap,
      child: Text(
        label,
        style: const TextStyle(
          color: Color(0xFF123458),
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}

class _FooterColumn extends StatelessWidget {
  const _FooterColumn({required this.title, required this.items});

  final String title;
  final List<String> items;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w800,
            fontSize: 14,
          ),
        ),
        const SizedBox(height: 14),
        for (var index = 0; index < items.length; index++) ...[
          Text(
            items[index],
            style: const TextStyle(color: Color(0xFFCBD2DD), height: 1.65),
          ),
          if (index < items.length - 1) const SizedBox(height: 8),
        ],
      ],
    );
  }
}

class _LegendChip extends StatelessWidget {
  const _LegendChip({required this.label, required this.color});

  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 7,
          height: 7,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 6),
        Text(
          label,
          style: const TextStyle(
            fontWeight: FontWeight.w700,
            color: Color(0xFF123458),
            fontSize: 11.5,
          ),
        ),
      ],
    );
  }
}

class _SmartChoiceChip extends StatelessWidget {
  const _SmartChoiceChip({
    required this.label,
    required this.selected,
    required this.onTap,
    this.leadingIcon,
    this.enabled = true,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;
  final IconData? leadingIcon;
  final bool enabled;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(999),
      onTap: enabled ? onTap : null,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 160),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          color: !enabled
              ? const Color(0xFFF2F4F7)
              : selected
              ? const Color(0xFF123458)
              : Colors.white,
          borderRadius: BorderRadius.circular(999),
          border: Border.all(
            color: !enabled
                ? const Color(0xFFE2EAF3)
                : selected
                ? const Color(0xFF123458)
                : const Color(0xFFE2EAF3),
          ),
        ),
        child: Wrap(
          spacing: 6,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            if (leadingIcon != null)
              Icon(
                leadingIcon,
                size: 16,
                color: !enabled
                    ? const Color(0xFF9AA8B7)
                    : selected
                    ? Colors.white
                    : const Color(0xFF60768D),
              ),
            Text(
              label,
              style: TextStyle(
                color: !enabled
                    ? const Color(0xFF9AA8B7)
                    : selected
                    ? Colors.white
                    : const Color(0xFF123458),
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MonthArrowButton extends StatelessWidget {
  const _MonthArrowButton({required this.icon, required this.onTap});

  final IconData icon;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(999),
      onTap: onTap,
      child: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(999),
          border: Border.all(color: const Color(0xFFE2EAF3)),
        ),
        child: Icon(icon, color: const Color(0xFF123458)),
      ),
    );
  }
}

class _ResourceCard extends StatelessWidget {
  const _ResourceCard({
    required this.title,
    required this.description,
    required this.openLabel,
    required this.onTap,
  });

  final String title;
  final String description;
  final String openLabel;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(24),
      onTap: onTap,
      child: Container(
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
              title,
              style: const TextStyle(
                color: Color(0xFF123458),
                fontWeight: FontWeight.w800,
                fontSize: 18,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              description,
              style: const TextStyle(
                color: Color(0xFF49627C),
                height: 1.55,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              openLabel,
              style: const TextStyle(
                color: Color(0xFFFF7A59),
                fontWeight: FontWeight.w800,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MetricPill extends StatelessWidget {
  const _MetricPill({
    required this.label,
    required this.value,
    this.tooltip,
    this.emphasis = false,
  });

  final String label;
  final String value;
  final String? tooltip;
  final bool emphasis;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: emphasis
            ? const Color(0xFFF1F5F9)
            : const Color(0xFFF6F8FB),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            '$label: $value',
            style: TextStyle(
              color: emphasis
                  ? const Color(0xFF516B86)
                  : const Color(0xFF6F8093),
              fontWeight: emphasis ? FontWeight.w700 : FontWeight.w600,
            ),
          ),
          if (tooltip != null) ...[
            const SizedBox(width: 6),
            Tooltip(
              message: tooltip!,
              child: Icon(
                Icons.info_outline,
                size: 15,
                color: emphasis
                    ? const Color(0xFF516B86)
                    : const Color(0xFF6F8093),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _BookingChip extends StatelessWidget {
  const _BookingChip({
    required this.label,
    required this.value,
    required this.background,
    required this.foreground,
  });

  final String label;
  final String value;
  final Color background;
  final Color foreground;

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(minWidth: 190),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(18),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(color: foreground, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 6),
          Text(value, style: TextStyle(color: foreground, height: 1.45)),
        ],
      ),
    );
  }
}

class _DayVisualStyle {
  const _DayVisualStyle({
    required this.label,
    required this.background,
    required this.foreground,
  });

  final String label;
  final Color background;
  final Color foreground;
}

class _LanguageSwitch extends StatelessWidget {
  const _LanguageSwitch({required this.language});

  final AppLanguage language;

  @override
  Widget build(BuildContext context) {
    return SegmentedButton<AppLanguage>(
      segments: const [
        ButtonSegment(value: AppLanguage.fr, label: Text('FR')),
        ButtonSegment(value: AppLanguage.en, label: Text('EN')),
      ],
      selected: {language},
      onSelectionChanged: (selection) {
        appLanguageNotifier.value = selection.first;
      },
      showSelectedIcon: false,
      style: ButtonStyle(
        visualDensity: VisualDensity.compact,
        padding: WidgetStatePropertyAll(
          EdgeInsets.symmetric(horizontal: 10, vertical: 2),
        ),
      ),
    );
  }
}

class _EntranceReveal extends StatefulWidget {
  const _EntranceReveal({
    required this.child,
    this.delay = Duration.zero,
  });

  final Widget child;
  final Duration delay;

  @override
  State<_EntranceReveal> createState() => _EntranceRevealState();
}

class _EntranceRevealState extends State<_EntranceReveal> {
  bool visible = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        setState(() => visible = true);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedSlide(
      duration: const Duration(milliseconds: 420),
      curve: Curves.easeOutCubic,
      offset: visible ? Offset.zero : const Offset(0, 0.18),
      child: AnimatedOpacity(
        duration: const Duration(milliseconds: 360),
        curve: Curves.easeOut,
        opacity: visible ? 1 : 0,
        child: widget.child,
      ),
    );
  }
}
