enum ContentPageType {
  bridges,
  holidays,
  schoolHolidaysBridges;

  String get pathSegment {
    switch (this) {
      case ContentPageType.bridges:
        return 'ponts';
      case ContentPageType.holidays:
        return 'jours-feries';
      case ContentPageType.schoolHolidaysBridges:
        return 'vacances-scolaires-ponts';
    }
  }
}

enum GuidePageType {
  guideLeave2026,
  schoolHolidays2026,
  holidays2027,
  faq;

  String get pathSegment {
    switch (this) {
      case GuidePageType.guideLeave2026:
        return 'guide-poser-conges-2026';
      case GuidePageType.schoolHolidays2026:
        return 'vacances-scolaires-2026-ponts';
      case GuidePageType.holidays2027:
        return 'jours-feries-2027-ponts';
      case GuidePageType.faq:
        return 'faq-ponts-jours-feries';
    }
  }
}

class AppRoutePath {
  const AppRoutePath.home()
      : contentPageType = null,
        guidePageType = null,
        year = null;

  const AppRoutePath.content({
    required this.contentPageType,
    this.guidePageType,
    required this.year,
  }) : assert(contentPageType != null);

  const AppRoutePath.guide({
    required this.guidePageType,
  })  : contentPageType = null,
        year = null;

  final ContentPageType? contentPageType;
  final GuidePageType? guidePageType;
  final int? year;

  bool get isHome => contentPageType == null && guidePageType == null;
  bool get isGuide => guidePageType != null;

  static AppRoutePath parse(String? routeName) {
    final rawRoute = (routeName == null || routeName.isEmpty) ? '/' : routeName;
    final uri = Uri.parse(rawRoute);
    final segments = uri.pathSegments.where((segment) => segment.isNotEmpty).toList();

    if (segments.isEmpty) {
      return const AppRoutePath.home();
    }

    if (segments.length == 2) {
      final pageType = _pageTypeFromSegment(segments.first);
      final year = int.tryParse(segments[1]);
      if (pageType != null && year != null) {
        return AppRoutePath.content(
          contentPageType: pageType,
          year: year,
        );
      }
    }

    if (segments.length == 1) {
      final guideType = _guideTypeFromSegment(segments.first);
      if (guideType != null) {
        return AppRoutePath.guide(guidePageType: guideType);
      }
    }

    return const AppRoutePath.home();
  }

  static String homePath() => '/';

  static String contentPath(ContentPageType pageType, int year) =>
      '/${pageType.pathSegment}/$year';

  static String guidePath(GuidePageType pageType) => '/${pageType.pathSegment}';

  static ContentPageType? _pageTypeFromSegment(String segment) {
    for (final value in ContentPageType.values) {
      if (value.pathSegment == segment) {
        return value;
      }
    }
    return null;
  }

  static GuidePageType? _guideTypeFromSegment(String segment) {
    for (final value in GuidePageType.values) {
      if (value.pathSegment == segment) {
        return value;
      }
    }
    return null;
  }
}
