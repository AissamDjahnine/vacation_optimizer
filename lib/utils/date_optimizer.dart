import '../models/best_vacation_period.dart';
import '../models/holiday.dart';
import 'package:flutter/material.dart';

class DateOptimizer {
  static List<BestVacationPeriod> findAllOptimizedPeriods({
    required List<Holiday> holidays,
    required int vacationDaysToUse,
    required int year,
    required int month,
  }) {
    final holidayDates = {
      for (var h in holidays)
        if (h.date.year == year && h.date.month == month) h.date: h
    };

    final daysInMonth = DateUtils.getDaysInMonth(year, month);
    final allDates = [
      for (int i = 1; i <= daysInMonth; i++) DateTime(year, month, i)
    ];

    final validCombos = <BestVacationPeriod>[];

    // Try every possible date block in the month
    for (int start = 0; start < allDates.length; start++) {
      for (int end = start; end < allDates.length; end++) {
        final period = allDates.sublist(start, end + 1);
        final weekends = period.where(_isWeekend).toList();
        final holidaysInPeriod = period.where((d) => holidayDates.containsKey(d)).toList();
        final workdays = period.where((d) => _isWeekday(d) && !holidayDates.containsKey(d)).toList();

        if (workdays.length < vacationDaysToUse) continue; // Skip if not enough workdays to place vacation

        final vacationDays = workdays.take(vacationDaysToUse).toList();

        final bridges = workdays.skip(vacationDays.length).where((d) {
          // Bridge = a single weekday that is between a holiday/weekend and another off day
          return period.contains(d.subtract(const Duration(days: 1))) &&
              period.contains(d.add(const Duration(days: 1))) &&
              (_isWeekend(d.subtract(const Duration(days: 1))) ||
                  holidayDates.containsKey(d.subtract(const Duration(days: 1))) ||
                  _isWeekend(d.add(const Duration(days: 1))) ||
                  holidayDates.containsKey(d.add(const Duration(days: 1))));
        }).toList();

        final offBlock = {
          ...vacationDays,
          ...weekends,
          ...holidaysInPeriod,
        }.toList()
          ..sort();

        // Ensure block is consecutive and uses exactly the vacation days
        if (vacationDays.length != vacationDaysToUse) continue;

        if (!_isConsecutive(offBlock)) continue;

        final relatedHoliday = holidaysInPeriod.isNotEmpty
            ? holidayDates[holidaysInPeriod.first]!
            : Holiday(date: period.first, localName: "No Holiday");

        final totalOff = offBlock.length;
        final difference = totalOff - vacationDaysToUse;

        double score = 0;
        if (difference >= 3) score = 1; // 🟢 green
        else if (difference == 2) score = 0.5; // 🟠 orange
        else score = 0; // 🔴 red

        final result = BestVacationPeriod(
          startDate: period.first,
          endDate: period.last,
          vacationDates: vacationDays,
          weekendDates: weekends,
          bridgeDates: bridges,
          relatedHoliday: relatedHoliday,
          worthScore: score,
          vacationDaysUsed: vacationDays.length,
          totalDaysOff: offBlock.length,
        );

        validCombos.add(result);
      }
    }

    return validCombos..sort((a, b) => b.worthScore.compareTo(a.worthScore));
  }

  static bool _isWeekend(DateTime d) =>
      d.weekday == DateTime.saturday || d.weekday == DateTime.sunday;

  static bool _isWeekday(DateTime d) => !_isWeekend(d);

  static bool _isConsecutive(List<DateTime> dates) {
    if (dates.isEmpty) return false;
    dates.sort();
    for (int i = 1; i < dates.length; i++) {
      final prev = dates[i - 1];
      final curr = dates[i];
      if (curr.difference(prev).inDays != 1) return false;
    }
    return true;
  }
}