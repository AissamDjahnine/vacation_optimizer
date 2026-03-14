import 'package:flutter/material.dart';

import '../../app_language.dart';
import '../../content/content_models.dart';

class ContentPageScaffold extends StatelessWidget {
  const ContentPageScaffold({
    super.key,
    required this.language,
    required this.title,
    required this.subtitle,
    required this.sections,
    required this.simulatorLabel,
    required this.onOpenSimulator,
    this.relatedLinks = const [],
    this.beforeSections,
    this.afterSections,
  });

  final AppLanguage language;
  final LocalizedTextData title;
  final LocalizedTextData subtitle;
  final List<ContentSectionData> sections;
  final LocalizedTextData simulatorLabel;
  final VoidCallback onOpenSimulator;
  final List<RelatedContentLinkData> relatedLinks;
  final Widget? beforeSections;
  final Widget? afterSections;

  bool get isEnglish => language == AppLanguage.en;
  String tr(LocalizedTextData text) => text.resolve(language);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        title: Text(
          tr(title),
          style: const TextStyle(
            color: Color(0xFF123458),
            fontWeight: FontWeight.w800,
          ),
        ),
        iconTheme: const IconThemeData(color: Color(0xFF123458)),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: AppLanguageSwitch(language: language),
          ),
        ],
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFFFFF8EF), Color(0xFFF4E7D7), Color(0xFFE6EEF8)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          top: false,
          child: SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(20, 24, 20, 28),
            child: Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 980),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.fromLTRB(24, 28, 24, 24),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.94),
                        borderRadius: BorderRadius.circular(28),
                        border: Border.all(color: const Color(0xFFE2EAF3)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 7,
                            ),
                            decoration: BoxDecoration(
                              color: const Color(0xFFF8FBFD),
                              borderRadius: BorderRadius.circular(999),
                              border: Border.all(
                                color: const Color(0xFFE2EAF3),
                              ),
                            ),
                            child: Text(
                              isEnglish ? 'Guide' : 'Guide',
                              style: const TextStyle(
                                color: Color(0xFF123458),
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ),
                          const SizedBox(height: 16),
                          Text(
                            tr(title),
                            style: theme.textTheme.displayMedium,
                          ),
                          const SizedBox(height: 12),
                          ConstrainedBox(
                            constraints: const BoxConstraints(maxWidth: 760),
                            child: Text(
                              tr(subtitle),
                              style: theme.textTheme.bodyLarge,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),
                    if (beforeSections != null) ...[
                      beforeSections!,
                      const SizedBox(height: 24),
                    ],
                    for (final section in sections) ...[
                      _ContentSection(
                        title: tr(section.title),
                        paragraphs: [
                          for (final paragraph in section.body) tr(paragraph),
                        ],
                        bullets: [
                          for (final bullet in section.bullets) tr(bullet),
                        ],
                        bulletIcon: isEnglish
                            ? Icons.keyboard_arrow_right_rounded
                            : Icons.keyboard_arrow_right_rounded,
                      ),
                      const SizedBox(height: 24),
                    ],
                    if (afterSections != null) ...[
                      afterSections!,
                      const SizedBox(height: 24),
                    ],
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: const Color(0xFFF8FBFD),
                        borderRadius: BorderRadius.circular(24),
                        border: Border.all(color: const Color(0xFFE2EAF3)),
                      ),
                      child: Wrap(
                        spacing: 12,
                        runSpacing: 12,
                        crossAxisAlignment: WrapCrossAlignment.center,
                        children: [
                          ElevatedButton(
                            onPressed: onOpenSimulator,
                            child: Text(tr(simulatorLabel)),
                          ),
                          for (final link in relatedLinks)
                            OutlinedButton(
                              onPressed: () =>
                                  Navigator.of(context).pushNamed(link.route),
                              child: Text(link.label.resolve(language)),
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _ContentSection extends StatelessWidget {
  const _ContentSection({
    required this.title,
    required this.paragraphs,
    required this.bullets,
    required this.bulletIcon,
  });

  final String title;
  final List<String> paragraphs;
  final List<String> bullets;
  final IconData bulletIcon;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(24, 22, 24, 22),
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
            style: theme.textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w800,
            ),
          ),
          for (final paragraph in paragraphs) ...[
            const SizedBox(height: 12),
            Text(
              paragraph,
              style: theme.textTheme.bodyLarge,
            ),
          ],
          if (bullets.isNotEmpty) ...[
            const SizedBox(height: 14),
            for (final bullet in bullets)
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(top: 2),
                      child: Icon(
                        bulletIcon,
                        size: 18,
                        color: const Color(0xFFFF7A59),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        bullet,
                        style: theme.textTheme.bodyLarge,
                      ),
                    ),
                  ],
                ),
              ),
          ],
        ],
      ),
    );
  }
}
