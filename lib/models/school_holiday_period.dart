class SchoolHolidayPeriod {
  SchoolHolidayPeriod({
    required this.description,
    required this.startDate,
    required this.endDate,
    required this.zone,
    required this.schoolYear,
  });

  final String description;
  final DateTime startDate;
  final DateTime endDate;
  final String zone;
  final String schoolYear;

  bool contains(DateTime date) {
    final normalized = DateTime(date.year, date.month, date.day);
    return !normalized.isBefore(startDate) && normalized.isBefore(endDate);
  }
}
