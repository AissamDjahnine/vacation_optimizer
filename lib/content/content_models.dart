import '../app_language.dart';

class ContentSectionData {
  const ContentSectionData({
    required this.title,
    this.body = const [],
    this.bullets = const [],
  });

  final LocalizedTextData title;
  final List<LocalizedTextData> body;
  final List<LocalizedTextData> bullets;
}

class RelatedContentLinkData {
  const RelatedContentLinkData({
    required this.label,
    required this.route,
  });

  final LocalizedTextData label;
  final String route;
}
