import 'holiday.dart';

class BestVacationPeriod {
  final DateTime startDate;
  final DateTime endDate;
  final int vacationDaysUsed;
  final int paidLeaveDaysUsed;
  final int rttDaysUsed;
  final int totalDaysOff;
  final double worthScore;
  final Holiday relatedHoliday;
  final List<Holiday> includedHolidays;
  final List<DateTime> vacationDates;
  final List<DateTime> paidLeaveDates;
  final List<DateTime> rttDates;
  final List<DateTime> bridgeDates;
  final List<DateTime> weekendDates;
  final List<DateTime> schoolHolidayDates;
  final DateTime holidayDate;
  final double rankingScore;

  BestVacationPeriod({
    required this.startDate,
    required this.endDate,
    required this.vacationDaysUsed,
    required this.paidLeaveDaysUsed,
    required this.rttDaysUsed,
    required this.totalDaysOff,
    required this.relatedHoliday,
    required this.includedHolidays,
    required this.vacationDates,
    required this.paidLeaveDates,
    required this.rttDates,
    required this.bridgeDates,
    required this.weekendDates,
    required this.schoolHolidayDates,
    required this.holidayDate,
    required this.worthScore,
    required this.rankingScore,
  });

  int get holidayDaysUsed => includedHolidays.length;

  int get freeDaysUsed => weekendDates.length + holidayDaysUsed;

  String formatDate(DateTime date) {
    return '${_weekdayName(date.weekday)} ${date.day.toString().padLeft(2, '0')} ${_monthName(date.month)} ${date.year}';
  }

  String _weekdayName(int weekday) {
    const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return names[weekday - 1];
  }

  String _monthName(int month) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months[month - 1];
  }

  String getSummary() {
    final bridgeStr = bridgeDates.map(formatDate).join(', ');
    final vacationStr = vacationDates.map(formatDate).join(', ');
    final paidLeaveStr = paidLeaveDates.map(formatDate).join(', ');
    final rttStr = rttDates.map(formatDate).join(', ');
    final weekendStr = weekendDates.map(formatDate).join(', ');
    final holidayStr = includedHolidays
        .map((holiday) => '${formatDate(holiday.date)} – ${holiday.localName}')
        .join(', ');

    return '''
🗓 ${formatDate(startDate)} → ${formatDate(endDate)}
🎉 Focused holiday: ${formatDate(holidayDate)} – ${relatedHoliday.localName}
🎊 Included holidays: $holidayStr
🏖️ Vacation used: $vacationDaysUsed days
💼 Paid leave used: $paidLeaveDaysUsed days
⚡ RTT used: $rttDaysUsed days
🎉 Total off: $totalDaysOff days
⭐ Worth score: ${worthScore.toStringAsFixed(2)}

🧩 Bridge days: ${bridgeStr.isEmpty ? 'None' : bridgeStr}
➕ Vacation dates: ${vacationStr.isEmpty ? 'None' : vacationStr}
💼 Paid leave dates: ${paidLeaveStr.isEmpty ? 'None' : paidLeaveStr}
⚡ RTT dates: ${rttStr.isEmpty ? 'None' : rttStr}
😴 Weekend: ${weekendStr.isEmpty ? 'None' : weekendStr}
''';
  }
}
