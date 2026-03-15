import {
  AnnualPlanningStrategy,
  AnnualPlanResult,
  AnnualPlanSegment,
  BestVacationPeriod,
  Holiday,
  SchoolHolidayPeriod,
  SchoolHolidayPreference,
} from "@/lib/domain/types";
import { inclusiveDateRange, isWeekend, stripTime } from "@/lib/domain/date-utils";

type CandidateParams = {
  holidays: Holiday[];
  vacationDaysToUse: number;
  availableRttDays: number;
  year: number;
  month: number;
  requireExactVacationDays: boolean;
  schoolHolidayPeriods?: SchoolHolidayPeriod[];
  schoolHolidayPreference?: SchoolHolidayPreference;
  allowSchoolHolidayOverlap?: boolean;
};

type AnnualPlanningParams = {
  holidays: Holiday[];
  paidLeaveBudget: number;
  availableRttDays: number;
  year: number;
  strategy: AnnualPlanningStrategy;
  schoolHolidayPeriods?: SchoolHolidayPeriod[];
  schoolHolidayPreference?: SchoolHolidayPreference;
  allowSchoolHolidayOverlap?: boolean;
};

export const DateOptimizer = {
  findAllOptimizedPeriods({
    holidays,
    vacationDaysToUse,
    availableRttDays,
    year,
    month,
    schoolHolidayPeriods = [],
    schoolHolidayPreference = "neutral",
    allowSchoolHolidayOverlap = false,
  }: Omit<CandidateParams, "requireExactVacationDays">): BestVacationPeriod[] {
    return findCandidatePeriods({
      holidays,
      vacationDaysToUse,
      availableRttDays,
      year,
      month,
      requireExactVacationDays: true,
      schoolHolidayPeriods,
      schoolHolidayPreference,
      allowSchoolHolidayOverlap,
    });
  },

  findBestDistributedPeriods({
    holidays,
    vacationDaysToUse,
    availableRttDays,
    year,
    month,
    schoolHolidayPeriods = [],
    schoolHolidayPreference = "neutral",
    allowSchoolHolidayOverlap = false,
  }: Omit<CandidateParams, "requireExactVacationDays">): BestVacationPeriod[] {
    const candidates = findCandidatePeriods({
      holidays,
      vacationDaysToUse,
      availableRttDays,
      year,
      month,
      requireExactVacationDays: false,
      schoolHolidayPeriods,
      schoolHolidayPreference,
      allowSchoolHolidayOverlap,
    }).filter((period) => period.vacationDaysUsed > 0);

    if (candidates.length === 0) {
      return [];
    }

    candidates.sort((left, right) => {
      const endCompare = left.endDate.getTime() - right.endDate.getTime();
      if (endCompare !== 0) {
        return endCompare;
      }
      return left.startDate.getTime() - right.startDate.getTime();
    });

    const previousNonOverlapping = new Array<number>(candidates.length).fill(-1);
    for (let i = 0; i < candidates.length; i += 1) {
      for (let j = i - 1; j >= 0; j -= 1) {
        if (candidates[j].endDate.getTime() <= candidates[i].startDate.getTime()) {
          previousNonOverlapping[i] = j;
          break;
        }
      }
    }

    const dp: Array<Array<BundleScore | null>> = Array.from(
      { length: candidates.length + 1 },
      () => Array.from({ length: vacationDaysToUse + 1 }, () => null),
    );
    const take: boolean[][] = Array.from({ length: candidates.length + 1 }, () =>
      Array.from({ length: vacationDaysToUse + 1 }, () => false),
    );

    for (let budget = 0; budget <= vacationDaysToUse; budget += 1) {
      dp[0][budget] = BundleScore.empty();
    }

    for (let i = 1; i <= candidates.length; i += 1) {
      const candidate = candidates[i - 1];
      for (let budget = 0; budget <= vacationDaysToUse; budget += 1) {
        let best = dp[i - 1][budget]!;

        if (candidate.vacationDaysUsed <= budget) {
          const previousIndex = previousNonOverlapping[i - 1] + 1;
          const previousScore = dp[previousIndex][budget - candidate.vacationDaysUsed];
          if (previousScore) {
            const withCandidate = previousScore.add(candidate);
            if (withCandidate.isBetterThan(best)) {
              best = withCandidate;
              take[i][budget] = true;
            }
          }
        }

        dp[i][budget] = best;
      }
    }

    const selected: BestVacationPeriod[] = [];
    let i = candidates.length;
    let budget = vacationDaysToUse;

    while (i > 0 && budget >= 0) {
      if (take[i][budget]) {
        const candidate = candidates[i - 1];
        selected.push(candidate);
        budget -= candidate.vacationDaysUsed;
        i = previousNonOverlapping[i - 1] + 1;
      } else {
        i -= 1;
      }
    }

    return selected.sort((left, right) => left.startDate.getTime() - right.startDate.getTime());
  },

  findFlexiblePeriods({
    holidays,
    vacationDaysToUse,
    availableRttDays,
    year,
    month,
    schoolHolidayPeriods = [],
    schoolHolidayPreference = "neutral",
    allowSchoolHolidayOverlap = false,
  }: Omit<CandidateParams, "requireExactVacationDays">): BestVacationPeriod[] {
    return findCandidatePeriods({
      holidays,
      vacationDaysToUse,
      availableRttDays,
      year,
      month,
      requireExactVacationDays: false,
      schoolHolidayPeriods,
      schoolHolidayPreference,
      allowSchoolHolidayOverlap,
    });
  },

  buildAnnualPlan({
    holidays,
    paidLeaveBudget,
    availableRttDays,
    year,
    strategy,
    schoolHolidayPeriods = [],
    schoolHolidayPreference = "neutral",
    allowSchoolHolidayOverlap = false,
  }: AnnualPlanningParams): AnnualPlanResult {
    if (paidLeaveBudget <= 0) {
      return {
        strategy,
        scope: "yearly",
        segments: [],
        totalPaidLeaveUsed: 0,
        totalRttUsed: 0,
        totalDaysOff: 0,
        remainingBudget: 0,
      };
    }

    const bySignature = new Map<string, AnnualPlanSegment>();

    for (let month = 1; month <= 12; month += 1) {
      const monthCandidates = findCandidatePeriods({
        holidays,
        vacationDaysToUse: paidLeaveBudget,
        availableRttDays,
        year,
        month,
        requireExactVacationDays: false,
        schoolHolidayPeriods,
        schoolHolidayPreference,
        allowSchoolHolidayOverlap,
      }).slice(0, 12);

      for (const period of monthCandidates) {
        const signature = [
          period.startDate.toISOString(),
          period.endDate.toISOString(),
          period.paidLeaveDaysUsed,
          period.rttDaysUsed,
        ].join("_");

        if (!bySignature.has(signature)) {
          bySignature.set(signature, {
            month,
            strategy,
            period,
          });
        }
      }
    }

    const candidates = [...bySignature.values()].sort((left, right) => {
      const scoreCompare =
        scoreAnnualCandidate(right.period, strategy) - scoreAnnualCandidate(left.period, strategy);
      if (scoreCompare !== 0) {
        return scoreCompare;
      }

      const paidLeaveCompare = left.period.paidLeaveDaysUsed - right.period.paidLeaveDaysUsed;
      if (paidLeaveCompare !== 0) {
        return paidLeaveCompare;
      }

      return left.period.startDate.getTime() - right.period.startDate.getTime();
    });

    const selected: AnnualPlanSegment[] = [];
    let remainingBudget = paidLeaveBudget;

    for (const candidate of candidates) {
      if (candidate.period.paidLeaveDaysUsed > remainingBudget) {
        continue;
      }

      if (
        selected.some((segment) => periodsOverlap(segment.period, candidate.period))
      ) {
        continue;
      }

      if (
        strategy === "balanced" &&
        selected.some((segment) => segment.month === candidate.month)
      ) {
        continue;
      }

      selected.push(candidate);
      remainingBudget -= candidate.period.paidLeaveDaysUsed;
    }

    selected.sort(
      (left, right) => left.period.startDate.getTime() - right.period.startDate.getTime(),
    );

    return {
      strategy,
      scope: "yearly",
      segments: selected,
      totalPaidLeaveUsed: selected.reduce(
        (sum, segment) => sum + segment.period.paidLeaveDaysUsed,
        0,
      ),
      totalRttUsed: selected.reduce((sum, segment) => sum + segment.period.rttDaysUsed, 0),
      totalDaysOff: selected.reduce((sum, segment) => sum + segment.period.totalDaysOff, 0),
      remainingBudget,
    };
  },
};

function findCandidatePeriods({
  holidays,
  vacationDaysToUse,
  availableRttDays,
  year,
  month,
  requireExactVacationDays,
  schoolHolidayPeriods = [],
  schoolHolidayPreference = "neutral",
  allowSchoolHolidayOverlap = false,
}: CandidateParams): BestVacationPeriod[] {
  const results: BestVacationPeriod[] = [];
  const seenRanges = new Set<string>();

  if (vacationDaysToUse <= 0) {
    return results;
  }

  const validHolidays = holidays
    .filter((holiday) => {
      const date = holiday.date;
      return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        !isWeekend(date)
      );
    })
    .sort((left, right) => left.date.getTime() - right.date.getTime());

  if (validHolidays.length === 0) {
    return results;
  }

  const monthStart = new Date(year, month - 1, 1);
  const monthEnd = new Date(year, month, 0);
  const holidayLookup = new Map<number, Holiday>(
    validHolidays.map((holiday) => [stripTime(holiday.date).getTime(), holiday]),
  );

  for (let start = new Date(monthStart); start <= monthEnd; start.setDate(start.getDate() + 1)) {
    for (let end = new Date(start); end <= monthEnd; end.setDate(end.getDate() + 1)) {
      const fullRange = inclusiveDateRange(new Date(start), new Date(end));
      const includedHolidays = fullRange
        .map((date) => holidayLookup.get(stripTime(date).getTime()))
        .filter(Boolean) as Holiday[];

      if (includedHolidays.length === 0) {
        continue;
      }

      const vacationDates = fullRange.filter((date) => {
        const normalizedDate = stripTime(date);
        const weekday = normalizedDate.getDay();
        const isWeekday = weekday >= 1 && weekday <= 5;
        return isWeekday && !holidayLookup.has(normalizedDate.getTime());
      });

      const matchesBudget = requireExactVacationDays
        ? vacationDates.length === vacationDaysToUse
        : vacationDates.length <= vacationDaysToUse;

      if (!matchesBudget) {
        continue;
      }

      const rttDaysUsed = Math.min(vacationDates.length, availableRttDays);
      const paidLeaveDaysUsed = vacationDates.length - rttDaysUsed;

      const weekendDates = fullRange.filter(isWeekend);
      const bridgeDates = vacationDates.filter((date) => {
        const previousDay = stripTime(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1));
        const nextDay = stripTime(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
        return holidayLookup.has(previousDay.getTime()) || holidayLookup.has(nextDay.getTime());
      });

      const schoolHolidayDates = fullRange.filter((date) =>
        schoolHolidayPeriods.some((period) => containsSchoolHoliday(period, date)),
      );

      if (!allowSchoolHolidayOverlap && schoolHolidayDates.length > 0) {
        continue;
      }

      const totalDaysOff = fullRange.length;
      const normalizedPaidLeaveDays = clamp(paidLeaveDaysUsed, 1, totalDaysOff);
      const worthScore = totalDaysOff / normalizedPaidLeaveDays;
      const rankingScore = computeRankingScore({
        worthScore,
        schoolHolidayOverlapDays: schoolHolidayDates.length,
        preference: schoolHolidayPreference,
      });

      const signature = [
        stripTime(start).toISOString(),
        stripTime(end).toISOString(),
        vacationDates.length,
        rttDaysUsed,
      ].join("_");

      if (totalDaysOff <= vacationDates.length || seenRanges.has(signature)) {
        continue;
      }

      const paidLeaveDates = vacationDates.slice(rttDaysUsed);
      const rttDates = vacationDates.slice(0, rttDaysUsed);

      seenRanges.add(signature);
      results.push({
        startDate: stripTime(new Date(start)),
        endDate: stripTime(new Date(end)),
        vacationDaysUsed: vacationDates.length,
        paidLeaveDaysUsed,
        rttDaysUsed,
        totalDaysOff,
        relatedHoliday: includedHolidays[0],
        includedHolidays,
        vacationDates,
        paidLeaveDates,
        rttDates,
        bridgeDates,
        weekendDates,
        schoolHolidayDates,
        holidayDate: includedHolidays[0].date,
        worthScore,
        rankingScore,
      });
    }
  }

  return results.sort((left, right) => {
    const rankingCompare = right.rankingScore - left.rankingScore;
    if (rankingCompare !== 0) {
      return rankingCompare;
    }
    const totalDaysCompare = right.totalDaysOff - left.totalDaysOff;
    if (totalDaysCompare !== 0) {
      return totalDaysCompare;
    }
    return left.startDate.getTime() - right.startDate.getTime();
  });
}

function containsSchoolHoliday(period: SchoolHolidayPeriod, date: Date): boolean {
  const normalizedDate = stripTime(date).getTime();
  return (
    normalizedDate >= stripTime(period.startDate).getTime() &&
    normalizedDate < stripTime(period.endDate).getTime()
  );
}

function periodsOverlap(left: BestVacationPeriod, right: BestVacationPeriod): boolean {
  return (
    stripTime(left.startDate).getTime() <= stripTime(right.endDate).getTime() &&
    stripTime(right.startDate).getTime() <= stripTime(left.endDate).getTime()
  );
}

function scoreAnnualCandidate(
  period: BestVacationPeriod,
  strategy: AnnualPlanningStrategy,
): number {
  switch (strategy) {
    case "family":
      return period.rankingScore + period.schoolHolidayDates.length * 0.45 + period.totalDaysOff * 0.04;
    case "balanced":
      return period.rankingScore + period.totalDaysOff * 0.05 - period.paidLeaveDaysUsed * 0.02;
    case "max-efficiency":
    default:
      return period.rankingScore + period.totalDaysOff * 0.03;
  }
}

function computeRankingScore({
  worthScore,
  schoolHolidayOverlapDays,
  preference,
}: {
  worthScore: number;
  schoolHolidayOverlapDays: number;
  preference: SchoolHolidayPreference;
}): number {
  switch (preference) {
    case "favor":
      return worthScore + schoolHolidayOverlapDays * 0.2;
    case "avoid":
      return worthScore - schoolHolidayOverlapDays * 0.2;
    case "neutral":
    default:
      return worthScore;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

class BundleScore {
  constructor(
    readonly totalDaysOff: number,
    readonly totalBookedDays: number,
    readonly periodCount: number,
    readonly schoolHolidayDays: number,
  ) {}

  static empty() {
    return new BundleScore(0, 0, 0, 0);
  }

  add(period: BestVacationPeriod) {
    return new BundleScore(
      this.totalDaysOff + period.totalDaysOff,
      this.totalBookedDays + period.vacationDaysUsed,
      this.periodCount + 1,
      this.schoolHolidayDays + period.schoolHolidayDates.length,
    );
  }

  isBetterThan(other: BundleScore) {
    if (this.totalDaysOff !== other.totalDaysOff) {
      return this.totalDaysOff > other.totalDaysOff;
    }
    if (this.totalBookedDays !== other.totalBookedDays) {
      return this.totalBookedDays < other.totalBookedDays;
    }
    return this.periodCount > other.periodCount;
  }
}
