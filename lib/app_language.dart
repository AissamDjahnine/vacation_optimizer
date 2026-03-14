import 'package:flutter/material.dart';

enum AppLanguage { fr, en }

final ValueNotifier<AppLanguage> appLanguageNotifier = ValueNotifier(
  AppLanguage.fr,
);

class LocalizedTextData {
  const LocalizedTextData({
    required this.fr,
    required this.en,
  });

  final String fr;
  final String en;

  String resolve(AppLanguage language) {
    return language == AppLanguage.en ? en : fr;
  }
}

class AppLanguageSwitch extends StatelessWidget {
  const AppLanguageSwitch({super.key, required this.language});

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
      style: const ButtonStyle(
        visualDensity: VisualDensity.compact,
        padding: WidgetStatePropertyAll(
          EdgeInsets.symmetric(horizontal: 10, vertical: 2),
        ),
      ),
    );
  }
}
