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
    final introChips = _buildIntroChips();

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
                          if (introChips.isNotEmpty) ...[
                            const SizedBox(height: 18),
                            Wrap(
                              spacing: 10,
                              runSpacing: 10,
                              children: introChips,
                            ),
                          ],
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
                        chips: [
                          for (final chip in section.chips) tr(chip),
                        ],
                        example: section.example == null
                            ? null
                            : tr(section.example!),
                        specialCase: section.specialCase == null
                            ? null
                            : tr(section.specialCase!),
                        accent: section.accent,
                        bulletIcon: Icons.keyboard_arrow_right_rounded,
                        exampleLabel: isEnglish ? 'Example' : 'Exemple',
                        specialCaseLabel:
                            isEnglish ? 'Special case' : 'Cas particulier',
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
                        color: Colors.white,
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

  List<Widget> _buildIntroChips() {
    final chips = <String>{};
    for (final section in sections) {
      for (final chip in section.chips) {
        chips.add(tr(chip));
      }
    }

    return chips.take(4).map((chip) {
      return Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: const Color(0xFFF8FBFD),
          borderRadius: BorderRadius.circular(999),
          border: Border.all(color: const Color(0xFFE2EAF3)),
        ),
        child: Text(
          chip,
          style: const TextStyle(
            color: Color(0xFF123458),
            fontWeight: FontWeight.w700,
          ),
        ),
      );
    }).toList();
  }
}

class _ContentSection extends StatelessWidget {
  const _ContentSection({
    required this.title,
    required this.paragraphs,
    required this.bullets,
    required this.chips,
    required this.accent,
    required this.bulletIcon,
    required this.exampleLabel,
    required this.specialCaseLabel,
    this.example,
    this.specialCase,
  });

  final String title;
  final List<String> paragraphs;
  final List<String> bullets;
  final List<String> chips;
  final String? example;
  final String? specialCase;
  final ContentSectionAccent accent;
  final IconData bulletIcon;
  final String exampleLabel;
  final String specialCaseLabel;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final palette = _paletteFor(accent);

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(24, 22, 24, 22),
      decoration: BoxDecoration(
        color: palette.background,
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: palette.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (chips.isNotEmpty) ...[
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final chip in chips)
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 8,
                    ),
                    decoration: BoxDecoration(
                      color: palette.chipBackground,
                      borderRadius: BorderRadius.circular(999),
                    ),
                    child: Text(
                      chip,
                      style: TextStyle(
                        color: palette.chipText,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 14),
          ],
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
                        color: palette.chipText,
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
          if (example != null) ...[
            const SizedBox(height: 12),
            _InlineNote(
              label: exampleLabel,
              content: example!,
              accent: palette.chipText,
            ),
          ],
          if (specialCase != null) ...[
            const SizedBox(height: 12),
            _InlineNote(
              label: specialCaseLabel,
              content: specialCase!,
              accent: palette.chipText,
            ),
          ],
        ],
      ),
    );
  }

  _SectionPalette _paletteFor(ContentSectionAccent accent) {
    switch (accent) {
      case ContentSectionAccent.orange:
        return const _SectionPalette(
          background: Color(0xFFFFFBF5),
          border: Color(0xFFFFD7C7),
          chipBackground: Color(0xFFFFE6DB),
          chipText: Color(0xFFB55C33),
        );
      case ContentSectionAccent.blue:
        return const _SectionPalette(
          background: Color(0xFFF8FBFD),
          border: Color(0xFFE2EAF3),
          chipBackground: Color(0xFFEAF2FF),
          chipText: Color(0xFF27568F),
        );
      case ContentSectionAccent.purple:
        return const _SectionPalette(
          background: Color(0xFFFCF8FF),
          border: Color(0xFFE7D6F5),
          chipBackground: Color(0xFFF4E9FB),
          chipText: Color(0xFF7A3E96),
        );
      case ContentSectionAccent.green:
        return const _SectionPalette(
          background: Color(0xFFF7FCFA),
          border: Color(0xFFD8EDE3),
          chipBackground: Color(0xFFDDF1E9),
          chipText: Color(0xFF287259),
        );
      case ContentSectionAccent.neutral:
        return const _SectionPalette(
          background: Colors.white,
          border: Color(0xFFE2EAF3),
          chipBackground: Color(0xFFF8FBFD),
          chipText: Color(0xFF123458),
        );
    }
  }
}

class _InlineNote extends StatelessWidget {
  const _InlineNote({
    required this.label,
    required this.content,
    required this.accent,
  });

  final String label;
  final String content;
  final Color accent;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.75),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: accent.withValues(alpha: 0.18)),
      ),
      child: RichText(
        text: TextSpan(
          style: Theme.of(context).textTheme.bodyLarge?.copyWith(height: 1.55),
          children: [
            TextSpan(
              text: '$label : ',
              style: TextStyle(
                color: accent,
                fontWeight: FontWeight.w800,
              ),
            ),
            TextSpan(
              text: content,
              style: const TextStyle(color: Color(0xFF49627C)),
            ),
          ],
        ),
      ),
    );
  }
}

class _SectionPalette {
  const _SectionPalette({
    required this.background,
    required this.border,
    required this.chipBackground,
    required this.chipText,
  });

  final Color background;
  final Color border;
  final Color chipBackground;
  final Color chipText;
}
