import 'package:flutter_test/flutter_test.dart';
import 'package:vacation_optimizer/models/holiday.dart';
import 'package:vacation_optimizer/utils/date_optimizer.dart';

void main() {
  group('DateOptimizer', () {
    test('treats every holiday in the range as time off instead of leave', () {
      final holidays = [
        Holiday(localName: 'Labour Day', date: DateTime(2025, 5, 1)),
        Holiday(localName: 'Victory Day', date: DateTime(2025, 5, 8)),
      ];

      final results = DateOptimizer.findAllOptimizedPeriods(
        holidays: holidays,
        vacationDaysToUse: 5,
        availableRttDays: 0,
        year: 2025,
        month: 5,
      );

      expect(results, isNotEmpty);

      final longBreak = results.firstWhere(
        (period) =>
            period.startDate == DateTime(2025, 5, 1) &&
            period.endDate == DateTime(2025, 5, 11),
      );

      expect(longBreak.totalDaysOff, 11);
      expect(longBreak.vacationDaysUsed, 5);
      expect(longBreak.paidLeaveDaysUsed, 5);
      expect(longBreak.rttDaysUsed, 0);
      expect(longBreak.includedHolidays.map((holiday) => holiday.localName), [
        'Labour Day',
        'Victory Day',
      ]);
    });

    test('never suggests a public holiday as a vacation day to book', () {
      final holidays = [
        Holiday(localName: 'Christmas Day', date: DateTime(2025, 12, 25)),
        Holiday(localName: 'Boxing Day', date: DateTime(2025, 12, 26)),
      ];

      final results = DateOptimizer.findAllOptimizedPeriods(
        holidays: holidays,
        vacationDaysToUse: 1,
        availableRttDays: 0,
        year: 2025,
        month: 12,
      );

      expect(results, isNotEmpty);

      for (final result in results) {
        expect(result.vacationDates, isNot(contains(DateTime(2025, 12, 25))));
        expect(result.vacationDates, isNot(contains(DateTime(2025, 12, 26))));
      }
    });

    test('uses RTT allowance before consuming paid leave', () {
      final holidays = [
        Holiday(localName: 'Labour Day', date: DateTime(2025, 5, 1)),
      ];

      final results = DateOptimizer.findAllOptimizedPeriods(
        holidays: holidays,
        vacationDaysToUse: 1,
        availableRttDays: 1,
        year: 2025,
        month: 5,
      );

      final bridgePlan = results.firstWhere(
        (period) =>
            period.startDate == DateTime(2025, 5, 1) &&
            period.endDate == DateTime(2025, 5, 4),
      );

      expect(bridgePlan.vacationDaysUsed, 1);
      expect(bridgePlan.rttDaysUsed, 1);
      expect(bridgePlan.paidLeaveDaysUsed, 0);
      expect(bridgePlan.rttDates, [DateTime(2025, 5, 2)]);
      expect(bridgePlan.paidLeaveDates, isEmpty);
    });

    test('can recommend multiple separated bridges in the same month', () {
      final holidays = [
        Holiday(localName: 'Labour Day', date: DateTime(2025, 5, 1)),
        Holiday(localName: 'Victory Day', date: DateTime(2025, 5, 8)),
      ];

      final results = DateOptimizer.findBestDistributedPeriods(
        holidays: holidays,
        vacationDaysToUse: 2,
        availableRttDays: 0,
        year: 2025,
        month: 5,
      );

      expect(results.length, 2);
      expect(results[0].startDate, DateTime(2025, 5, 1));
      expect(results[0].endDate, DateTime(2025, 5, 4));
      expect(results[1].startDate, DateTime(2025, 5, 8));
      expect(results[1].endDate, DateTime(2025, 5, 11));
      expect(
        results.fold<int>(0, (sum, period) => sum + period.vacationDaysUsed),
        2,
      );
    });
  });
}
