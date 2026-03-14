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
