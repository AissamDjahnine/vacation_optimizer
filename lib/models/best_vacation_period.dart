import 'holiday.dart';

class BestVacationPeriod {
  final DateTime startDate;
  final DateTime endDate;
  final int vacationDaysUsed;
  final int totalDaysOff;
  final double worthScore;
  final Holiday relatedHoliday;

  final List<DateTime> vacationDates; // ➕ Leave you take
  final List<DateTime> bridgeDates;   // 🧩 Adjacent to holiday
  final List<DateTime> weekendDates;  // 😴 Saturday/Sunday
  final DateTime holidayDate;         // 🎉 The holiday itself

  BestVacationPeriod({
    required this.startDate,
    required this.endDate,
    required this.vacationDaysUsed,
    required this.totalDaysOff,
    required this.relatedHoliday,
    required this.vacationDates,
    required this.bridgeDates,
    required this.weekendDates,
    required this.holidayDate,
    required this.worthScore,
  });

  static String formatDate(DateTime date) {
    return '${weekdayName(date.weekday)} ${date.day.toString().padLeft(2, '0')} ${monthName(date.month)} ${date.year}';
  }

  static String weekdayName(int weekday) {
    const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return names[weekday - 1];
  }

  static String monthName(int month) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[month - 1];
  }

  String getSummary() {
    final bridgeStr = bridgeDates.map(formatDate).join(', ');
    final vacationStr = vacationDates.map(formatDate).join(', ');
    final weekendStr = weekendDates.map(formatDate).join(', ');

    return '''
🗓 ${formatDate(startDate)} → ${formatDate(endDate)}
🎉 Focused holiday: ${formatDate(holidayDate)} – ${relatedHoliday.localName}
🏖️ Vacation used: $vacationDaysUsed days
🎉 Total off: $totalDaysOff days
⭐ Worth score: ${worthScore.toStringAsFixed(2)}

🧩 Bridge days: ${bridgeStr.isEmpty ? 'None' : bridgeStr}
➕ Extra vacation: ${vacationStr.isEmpty ? 'None' : vacationStr}
😴 Weekend: ${weekendStr.isEmpty ? 'None' : weekendStr}
''';
  }
}