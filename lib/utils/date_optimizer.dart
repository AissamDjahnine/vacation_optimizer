import '../models/holiday.dart';
import '../models/best_vacation_period.dart';
import '../models/school_holiday_period.dart';

enum SchoolHolidayPreference { neutral, favor, avoid }

class DateOptimizer {
  static List<BestVacationPeriod> findAllOptimizedPeriods({
    required List<Holiday> holidays,
    required int vacationDaysToUse,
    required int availableRttDays,
    required int year,
    required int month,
    List<SchoolHolidayPeriod> schoolHolidayPeriods = const [],
    SchoolHolidayPreference schoolHolidayPreference =
        SchoolHolidayPreference.neutral,
    bool allowSchoolHolidayOverlap = false,
  }) {
    return _findCandidatePeriods(
      holidays: holidays,
      vacationDaysToUse: vacationDaysToUse,
      availableRttDays: availableRttDays,
      year: year,
      month: month,
      requireExactVacationDays: true,
      schoolHolidayPeriods: schoolHolidayPeriods,
      schoolHolidayPreference: schoolHolidayPreference,
      allowSchoolHolidayOverlap: allowSchoolHolidayOverlap,
    );
  }

  static List<BestVacationPeriod> findBestDistributedPeriods({
    required List<Holiday> holidays,
    required int vacationDaysToUse,
    required int availableRttDays,
    required int year,
    required int month,
    List<SchoolHolidayPeriod> schoolHolidayPeriods = const [],
    SchoolHolidayPreference schoolHolidayPreference =
        SchoolHolidayPreference.neutral,
    bool allowSchoolHolidayOverlap = false,
  }) {
    final candidates = _findCandidatePeriods(
      holidays: holidays,
      vacationDaysToUse: vacationDaysToUse,
      availableRttDays: availableRttDays,
      year: year,
      month: month,
      requireExactVacationDays: false,
      schoolHolidayPeriods: schoolHolidayPeriods,
      schoolHolidayPreference: schoolHolidayPreference,
      allowSchoolHolidayOverlap: allowSchoolHolidayOverlap,
    ).where((period) => period.vacationDaysUsed > 0).toList();

    if (candidates.isEmpty) {
      return [];
    }

    candidates.sort((a, b) {
      final endCompare = a.endDate.compareTo(b.endDate);
      if (endCompare != 0) {
        return endCompare;
      }
      return a.startDate.compareTo(b.startDate);
    });

    final previousNonOverlapping = List<int>.filled(candidates.length, -1);
    for (var i = 0; i < candidates.length; i++) {
      for (var j = i - 1; j >= 0; j--) {
        if (!candidates[j].endDate.isAfter(candidates[i].startDate)) {
          previousNonOverlapping[i] = j;
          break;
        }
      }
    }

    final dp = List.generate(
      candidates.length + 1,
      (_) => List<_BundleScore?>.filled(vacationDaysToUse + 1, null),
    );
    final take = List.generate(
      candidates.length + 1,
      (_) => List<bool>.filled(vacationDaysToUse + 1, false),
    );

    for (var budget = 0; budget <= vacationDaysToUse; budget++) {
      dp[0][budget] = const _BundleScore.empty();
    }

    for (var i = 1; i <= candidates.length; i++) {
      final candidate = candidates[i - 1];
      for (var budget = 0; budget <= vacationDaysToUse; budget++) {
        var best = dp[i - 1][budget]!;
          if (candidate.vacationDaysUsed <= budget) {
          final previousIndex = previousNonOverlapping[i - 1] + 1;
            final previousScore = dp[previousIndex][budget - candidate.vacationDaysUsed];
            if (previousScore != null) {
              final withCandidate = previousScore.add(candidate);
            if (withCandidate.isBetterThan(best)) {
              best = withCandidate;
              take[i][budget] = true;
            }
          }
        }
        dp[i][budget] = best;
      }
    }

    final selected = <BestVacationPeriod>[];
    var i = candidates.length;
    var budget = vacationDaysToUse;
    while (i > 0 && budget >= 0) {
      if (take[i][budget]) {
        final candidate = candidates[i - 1];
        selected.add(candidate);
        budget -= candidate.vacationDaysUsed;
        i = previousNonOverlapping[i - 1] + 1;
      } else {
        i -= 1;
      }
    }

    selected.sort((a, b) => a.startDate.compareTo(b.startDate));
    return selected;
  }

  static List<BestVacationPeriod> _findCandidatePeriods({
    required List<Holiday> holidays,
    required int vacationDaysToUse,
    required int availableRttDays,
    required int year,
    required int month,
    required bool requireExactVacationDays,
    required List<SchoolHolidayPeriod> schoolHolidayPeriods,
    required SchoolHolidayPreference schoolHolidayPreference,
    required bool allowSchoolHolidayOverlap,
  }) {
    final List<BestVacationPeriod> results = [];
    final Set<String> seenRanges = <String>{};

    if (vacationDaysToUse <= 0) {
      return results;
    }

    final validHolidays =
        holidays
            .where(
              (holiday) =>
                  holiday.date.year == year &&
                  holiday.date.month == month &&
                  holiday.date.weekday != DateTime.saturday &&
                  holiday.date.weekday != DateTime.sunday,
            )
            .toList()
          ..sort((a, b) => a.date.compareTo(b.date));

    if (validHolidays.isEmpty) {
      return results;
    }

    final monthStart = DateTime(year, month, 1);
    final monthEnd = DateTime(year, month + 1, 0);
    final holidayLookup = <DateTime, Holiday>{
      for (final holiday in validHolidays) _stripTime(holiday.date): holiday,
    };

    for (
      DateTime start = monthStart;
      !start.isAfter(monthEnd);
      start = start.add(const Duration(days: 1))
    ) {
      for (
        DateTime end = start;
        !end.isAfter(monthEnd);
        end = end.add(const Duration(days: 1))
      ) {
        final fullRange = List<DateTime>.generate(
          end.difference(start).inDays + 1,
          (index) => start.add(Duration(days: index)),
        );

        final includedHolidays = fullRange
            .map((date) => holidayLookup[_stripTime(date)])
            .whereType<Holiday>()
            .toList();

        if (includedHolidays.isEmpty) {
          continue;
        }

        final vacationDates = fullRange.where((date) {
          final normalizedDate = _stripTime(date);
          final isWeekday =
              date.weekday >= DateTime.monday &&
              date.weekday <= DateTime.friday;
          return isWeekday && !holidayLookup.containsKey(normalizedDate);
        }).toList();

        final matchesBudget = requireExactVacationDays
            ? vacationDates.length == vacationDaysToUse
            : vacationDates.length <= vacationDaysToUse;
        if (!matchesBudget) {
          continue;
        }

        final rttDaysUsed = vacationDates.length.clamp(0, availableRttDays);
        final paidLeaveDaysUsed = vacationDates.length - rttDaysUsed;

        final weekendDates = fullRange
            .where(
              (date) =>
                  date.weekday == DateTime.saturday ||
                  date.weekday == DateTime.sunday,
            )
            .toList();

        final bridgeDates = vacationDates.where((date) {
          final previousDay = _stripTime(
            date.subtract(const Duration(days: 1)),
          );
          final nextDay = _stripTime(date.add(const Duration(days: 1)));
          return holidayLookup.containsKey(previousDay) ||
              holidayLookup.containsKey(nextDay);
        }).toList();

        final totalDaysOff = fullRange.length;
        final normalizedPaidLeaveDays = paidLeaveDaysUsed.clamp(1, totalDaysOff);
        final worthScore = totalDaysOff / normalizedPaidLeaveDays;
        final schoolHolidayDates = fullRange.where((date) {
          return schoolHolidayPeriods.any((period) => period.contains(date));
        }).toList();
        if (!allowSchoolHolidayOverlap && schoolHolidayDates.isNotEmpty) {
          continue;
        }
        final rankingScore = _computeRankingScore(
          worthScore: worthScore,
          schoolHolidayOverlapDays: schoolHolidayDates.length,
          preference: schoolHolidayPreference,
        );
        final signature =
            '${start.toIso8601String()}_${end.toIso8601String()}_${vacationDates.length}_$rttDaysUsed';

        if (totalDaysOff <= vacationDates.length ||
            seenRanges.contains(signature)) {
          continue;
        }

        final paidLeaveDates = vacationDates.skip(rttDaysUsed).toList();
        final rttDates = vacationDates.take(rttDaysUsed).toList();

        seenRanges.add(signature);
        results.add(
          BestVacationPeriod(
            startDate: start,
            endDate: end,
            vacationDaysUsed: vacationDates.length,
            paidLeaveDaysUsed: paidLeaveDaysUsed,
            rttDaysUsed: rttDaysUsed,
            totalDaysOff: totalDaysOff,
            relatedHoliday: includedHolidays.first,
            includedHolidays: includedHolidays,
            vacationDates: vacationDates,
            paidLeaveDates: paidLeaveDates,
            rttDates: rttDates,
            bridgeDates: bridgeDates,
            weekendDates: weekendDates,
            schoolHolidayDates: schoolHolidayDates,
            holidayDate: includedHolidays.first.date,
            worthScore: worthScore,
            rankingScore: rankingScore,
          ),
        );
      }
    }

    results.sort((a, b) {
      final worthCompare = b.rankingScore.compareTo(a.rankingScore);
      if (worthCompare != 0) {
        return worthCompare;
      }

      final totalDaysCompare = b.totalDaysOff.compareTo(a.totalDaysOff);
      if (totalDaysCompare != 0) {
        return totalDaysCompare;
      }

      return a.startDate.compareTo(b.startDate);
    });
    return results;
  }

  static DateTime _stripTime(DateTime date) {
    return DateTime(date.year, date.month, date.day);
  }

  static double _computeRankingScore({
    required double worthScore,
    required int schoolHolidayOverlapDays,
    required SchoolHolidayPreference preference,
  }) {
    switch (preference) {
      case SchoolHolidayPreference.favor:
        return worthScore + (schoolHolidayOverlapDays * 0.2);
      case SchoolHolidayPreference.avoid:
        return worthScore - (schoolHolidayOverlapDays * 0.2);
      case SchoolHolidayPreference.neutral:
        return worthScore;
    }
  }
}

class _BundleScore {
  const _BundleScore({
    required this.totalDaysOff,
    required this.totalBookedDays,
    required this.periodCount,
    required this.schoolHolidayDays,
  });

  const _BundleScore.empty()
      : totalDaysOff = 0,
        totalBookedDays = 0,
        periodCount = 0,
        schoolHolidayDays = 0;

  final int totalDaysOff;
  final int totalBookedDays;
  final int periodCount;
  final int schoolHolidayDays;

  _BundleScore add(BestVacationPeriod period) {
    return _BundleScore(
      totalDaysOff: totalDaysOff + period.totalDaysOff,
      totalBookedDays: totalBookedDays + period.vacationDaysUsed,
      periodCount: periodCount + 1,
      schoolHolidayDays: schoolHolidayDays + period.schoolHolidayDates.length,
    );
  }

  bool isBetterThan(_BundleScore other) {
    if (totalDaysOff != other.totalDaysOff) {
      return totalDaysOff > other.totalDaysOff;
    }
    if (totalBookedDays != other.totalBookedDays) {
      return totalBookedDays < other.totalBookedDays;
    }
    return periodCount > other.periodCount;
  }
}
