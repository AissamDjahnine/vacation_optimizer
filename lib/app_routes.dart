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

class AppRoutePath {
  const AppRoutePath.home()
      : contentPageType = null,
        year = null;

  const AppRoutePath.content({
    required this.contentPageType,
    required this.year,
  });

  final ContentPageType? contentPageType;
  final int? year;

  bool get isHome => contentPageType == null;

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
        return AppRoutePath.content(contentPageType: pageType, year: year);
      }
    }

    return const AppRoutePath.home();
  }

  static String homePath() => '/';

  static String contentPath(ContentPageType pageType, int year) =>
      '/${pageType.pathSegment}/$year';

  static ContentPageType? _pageTypeFromSegment(String segment) {
    for (final value in ContentPageType.values) {
      if (value.pathSegment == segment) {
        return value;
      }
    }
    return null;
  }
}
