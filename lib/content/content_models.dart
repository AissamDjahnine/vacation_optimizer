import '../app_language.dart';

class ContentSectionData {
  const ContentSectionData({
    required this.title,
    this.body = const [],
    this.bullets = const [],
    this.accent = ContentSectionAccent.neutral,
    this.chips = const [],
    this.example,
    this.specialCase,
  });

  final LocalizedTextData title;
  final List<LocalizedTextData> body;
  final List<LocalizedTextData> bullets;
  final ContentSectionAccent accent;
  final List<LocalizedTextData> chips;
  final LocalizedTextData? example;
  final LocalizedTextData? specialCase;
}

class RelatedContentLinkData {
  const RelatedContentLinkData({
    required this.label,
    required this.route,
  });

  final LocalizedTextData label;
  final String route;
}

enum ContentSectionAccent {
  neutral,
  orange,
  blue,
  purple,
  green,
}
