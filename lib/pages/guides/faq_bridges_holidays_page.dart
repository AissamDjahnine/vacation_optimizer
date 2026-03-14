import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../app_language.dart';
import '../../app_routes.dart';
import '../../content/content_models.dart';
import '../../content/faq_bridges_holidays_content.dart';
import '../content/content_page_scaffold.dart';

class FaqBridgesHolidaysPage extends StatelessWidget {
  const FaqBridgesHolidaysPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<AppLanguage>(
      valueListenable: appLanguageNotifier,
      builder: (context, language, _) {
        final content = buildFaqBridgesHolidaysContent();

        return ContentPageScaffold(
          language: language,
          title: content.title,
          subtitle: content.subtitle,
          sections: content.sections,
          simulatorLabel: const LocalizedTextData(
            fr: 'Calculer mes ponts avec le simulateur',
            en: 'Calculate my bridges with the planner',
          ),
          onOpenSimulator: () => Navigator.of(context).pushNamed(
            AppRoutePath.homePath(),
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
                fr: 'Jours fériés 2027',
                en: 'Public holidays 2027',
              ),
              route: AppRoutePath.guidePath(GuidePageType.holidays2027),
            ),
          ],
          beforeSections: Column(
            children: [
              _FaqGroup(
                title: language == AppLanguage.en
                    ? 'General questions'
                    : 'Les questions générales',
                entries: content.generalQuestions,
                language: language,
              ),
              const SizedBox(height: 24),
              _FaqGroup(
                title: language == AppLanguage.en
                    ? 'Private sector vs public sector'
                    : 'Secteur privé vs fonction publique',
                entries: content.privateVsPublicQuestions,
                language: language,
              ),
            ],
          ),
        );
      },
    );
  }
}

class _FaqGroup extends StatelessWidget {
  const _FaqGroup({
    required this.title,
    required this.entries,
    required this.language,
  });

  final String title;
  final List<FaqEntryData> entries;
  final AppLanguage language;

  String tr(LocalizedTextData text) => text.resolve(language);

  @override
  Widget build(BuildContext context) {
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
            title,
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 16),
          for (var index = 0; index < entries.length; index++) ...[
            _FaqEntryCard(
              entry: entries[index],
              language: language,
            ),
            if (index < entries.length - 1) const SizedBox(height: 12),
          ],
        ],
      ),
    );
  }
}

class _FaqEntryCard extends StatelessWidget {
  const _FaqEntryCard({
    required this.entry,
    required this.language,
  });

  final FaqEntryData entry;
  final AppLanguage language;

  String tr(LocalizedTextData text) => text.resolve(language);

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
            tr(entry.question),
            style: const TextStyle(
              color: Color(0xFF123458),
              fontWeight: FontWeight.w800,
              fontSize: 18,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            tr(entry.answer),
            style: const TextStyle(
              color: Color(0xFF49627C),
              height: 1.55,
            ),
          ),
          if (entry.sourceLabel != null && entry.sourceUrl != null) ...[
            const SizedBox(height: 10),
            InkWell(
              onTap: () => _openExternal(entry.sourceUrl!),
              child: Text(
                tr(entry.sourceLabel!),
                style: const TextStyle(
                  color: Color(0xFF27568F),
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
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
}
