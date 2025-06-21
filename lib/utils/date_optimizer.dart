import '../models/holiday.dart';
import '../models/best_vacation_period.dart';

class DateOptimizer {
  static List<BestVacationPeriod> findAllOptimizedPeriods({
    required List<Holiday> holidays,
    required int vacationDaysToUse,
    required int year,
    required int month,
  }) {
    final List<BestVacationPeriod> results = [];

    // Filter holidays in the selected month and not on weekends
    final validHolidays = holidays.where((h) =>
    h.date.month == month &&
        h.date.weekday != DateTime.saturday &&
        h.date.weekday != DateTime.sunday);

    for (final holiday in validHolidays) {
      for (int before = 0; before <= vacationDaysToUse; before++) {
        int after = vacationDaysToUse - before;
        final start = holiday.date.subtract(Duration(days: before));
        final end = holiday.date.add(Duration(days: after));

        if (start.month != month || end.month != month) continue;

        final fullRange = List<DateTime>.generate(
          end.difference(start).inDays + 1,
              (i) => start.add(Duration(days: i)),
        );

        final vacationDates = fullRange.where((d) =>
        d != holiday.date &&
            d.weekday >= DateTime.monday &&
            d.weekday <= DateTime.friday).toList();

        final weekendDates = fullRange.where((d) =>
        d.weekday == DateTime.saturday || d.weekday == DateTime.sunday).toList();

        final bridgeDates = fullRange.where((d) =>
        d.isBefore(holiday.date) || d.isAfter(holiday.date)).where((d) =>
        d.weekday >= DateTime.monday && d.weekday <= DateTime.friday).toList();

        // Only accept if all requested vacation days are used
        if (vacationDates.length != vacationDaysToUse) continue;

        final totalDaysOff = vacationDates.length + weekendDates.length + 1; // +1 for holiday
        final worthScore = totalDaysOff / vacationDates.length;

        if (totalDaysOff <= vacationDates.length) continue; // Skip if not worth

        results.add(BestVacationPeriod(
          startDate: start,
          endDate: end,
          vacationDaysUsed: vacationDates.length,
          totalDaysOff: totalDaysOff,
          relatedHoliday: holiday,
          vacationDates: vacationDates,
          bridgeDates: bridgeDates,
          weekendDates: weekendDates,
          holidayDate: holiday.date,
          worthScore: worthScore,
        ));
      }
    }

    results.sort((a, b) => b.worthScore.compareTo(a.worthScore));
    return results;
  }
}