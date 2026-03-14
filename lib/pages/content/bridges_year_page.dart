import 'package:flutter/material.dart';

import '../../app_language.dart';
import '../../app_routes.dart';
import '../../content/bridges_content.dart';
import '../../content/content_models.dart';
import 'content_page_scaffold.dart';

class BridgesYearPage extends StatelessWidget {
  const BridgesYearPage({
    super.key,
    required this.year,
    required this.language,
  });

  final int year;
  final AppLanguage language;

  String tr(LocalizedTextData text) => text.resolve(language);

  @override
  Widget build(BuildContext context) {
    final content = buildBridgesPageContent(year);

    return ContentPageScaffold(
      language: language,
      title: content.title,
      subtitle: content.subtitle,
      sections: content.sections,
      simulatorLabel: const LocalizedTextData(
        fr: 'Utiliser le simulateur',
        en: 'Use the planner',
      ),
      onOpenSimulator: () => Navigator.of(context).pushNamed(AppRoutePath.homePath()),
      relatedLinks: [
        RelatedContentLinkData(
          label: const LocalizedTextData(
            fr: 'Voir les jours fériés',
            en: 'See public holidays',
          ),
          route: AppRoutePath.contentPath(ContentPageType.holidays, year),
        ),
      ],
      beforeSections: _BridgesScenarioPanel(
        language: language,
        scenarios: content.scenarios,
      ),
    );
  }
}

class _BridgesScenarioPanel extends StatelessWidget {
  const _BridgesScenarioPanel({
    required this.language,
    required this.scenarios,
  });

  final AppLanguage language;
  final List<BridgeScenarioData> scenarios;

  bool get isEnglish => language == AppLanguage.en;
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
            isEnglish ? 'Typical bridge scenarios' : 'Scénarios typiques',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 16),
          LayoutBuilder(
            builder: (context, constraints) {
              final compact = constraints.maxWidth < 880;

              if (compact) {
                return Column(
                  children: [
                    for (var index = 0; index < scenarios.length; index++) ...[
                      _ScenarioCard(language: language, data: scenarios[index]),
                      if (index < scenarios.length - 1)
                        const SizedBox(height: 12),
                    ],
                  ],
                );
              }

              return Row(
                children: [
                  for (var index = 0; index < scenarios.length; index++) ...[
                    Expanded(
                      child: _ScenarioCard(
                        language: language,
                        data: scenarios[index],
                      ),
                    ),
                    if (index < scenarios.length - 1) const SizedBox(width: 12),
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
    required this.data,
  });

  final AppLanguage language;
  final BridgeScenarioData data;

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
            tr(data.title),
            style: const TextStyle(
              color: Color(0xFF123458),
              fontWeight: FontWeight.w800,
              fontSize: 18,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            tr(data.summary),
            style: const TextStyle(
              color: Color(0xFF49627C),
              height: 1.55,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            tr(data.payoff),
            style: const TextStyle(
              color: Color(0xFF123458),
              fontWeight: FontWeight.w700,
              height: 1.45,
            ),
          ),
        ],
      ),
    );
  }
}
