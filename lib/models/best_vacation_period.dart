// lib/models/best_vacation_period.dart
import 'holiday.dart';

class BestVacationPeriod {
  final DateTime startDate;
  final DateTime endDate;
  final int vacationDaysUsed;
  final int totalDaysOff;
  final double worthScore;
  final Holiday relatedHoliday;

  final List<DateTime> vacationDates;
  final List<DateTime> bridgeDates;
  final List<DateTime> weekendDates;
  final DateTime holidayDate;

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

  String formatDate(DateTime date) {
    return '${_weekdayName(date.weekday)} ${date.day.toString().padLeft(2, '0')} ${_monthName(date.month)} ${date.year}';
  }

  String _weekdayName(int weekday) {
    const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return names[weekday - 1];
  }

  String _monthName(int month) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[month - 1];
  }
}