import { describe, expect, test } from "vitest";
import { DateOptimizer } from "@/lib/domain/date-optimizer";
import type { Holiday } from "@/lib/domain/types";

describe("DateOptimizer", () => {
  test("treats every holiday in the range as time off instead of leave", () => {
    const holidays: Holiday[] = [
      { localName: "Labour Day", date: new Date(2025, 4, 1) },
      { localName: "Victory Day", date: new Date(2025, 4, 8) },
    ];

    const results = DateOptimizer.findAllOptimizedPeriods({
      holidays,
      vacationDaysToUse: 5,
      availableRttDays: 0,
      year: 2025,
      month: 5,
    });

    expect(results.length).toBeGreaterThan(0);

    const longBreak = results.find(
      (period) =>
        period.startDate.getTime() === new Date(2025, 4, 1).getTime() &&
        period.endDate.getTime() === new Date(2025, 4, 11).getTime(),
    );

    expect(longBreak).toBeTruthy();
    expect(longBreak?.totalDaysOff).toBe(11);
    expect(longBreak?.vacationDaysUsed).toBe(5);
    expect(longBreak?.paidLeaveDaysUsed).toBe(5);
    expect(longBreak?.rttDaysUsed).toBe(0);
    expect(longBreak?.includedHolidays.map((holiday) => holiday.localName)).toEqual([
      "Labour Day",
      "Victory Day",
    ]);
  });

  test("never suggests a public holiday as a vacation day to book", () => {
    const holidays: Holiday[] = [
      { localName: "Christmas Day", date: new Date(2025, 11, 25) },
      { localName: "Boxing Day", date: new Date(2025, 11, 26) },
    ];

    const results = DateOptimizer.findAllOptimizedPeriods({
      holidays,
      vacationDaysToUse: 1,
      availableRttDays: 0,
      year: 2025,
      month: 12,
    });

    expect(results.length).toBeGreaterThan(0);

    for (const result of results) {
      expect(
        result.vacationDates.some((date) => date.getTime() === new Date(2025, 11, 25).getTime()),
      ).toBe(false);
      expect(
        result.vacationDates.some((date) => date.getTime() === new Date(2025, 11, 26).getTime()),
      ).toBe(false);
    }
  });

  test("uses RTT allowance before consuming paid leave", () => {
    const holidays: Holiday[] = [{ localName: "Labour Day", date: new Date(2025, 4, 1) }];

    const results = DateOptimizer.findAllOptimizedPeriods({
      holidays,
      vacationDaysToUse: 1,
      availableRttDays: 1,
      year: 2025,
      month: 5,
    });

    const bridgePlan = results.find(
      (period) =>
        period.startDate.getTime() === new Date(2025, 4, 1).getTime() &&
        period.endDate.getTime() === new Date(2025, 4, 4).getTime(),
    );

    expect(bridgePlan?.vacationDaysUsed).toBe(1);
    expect(bridgePlan?.rttDaysUsed).toBe(1);
    expect(bridgePlan?.paidLeaveDaysUsed).toBe(0);
    expect(bridgePlan?.rttDates.map((date) => date.getTime())).toEqual([
      new Date(2025, 4, 2).getTime(),
    ]);
    expect(bridgePlan?.paidLeaveDates).toEqual([]);
  });

  test("can recommend multiple separated bridges in the same month", () => {
    const holidays: Holiday[] = [
      { localName: "Labour Day", date: new Date(2025, 4, 1) },
      { localName: "Victory Day", date: new Date(2025, 4, 8) },
    ];

    const results = DateOptimizer.findBestDistributedPeriods({
      holidays,
      vacationDaysToUse: 2,
      availableRttDays: 0,
      year: 2025,
      month: 5,
    });

    expect(results).toHaveLength(2);
    expect(results[0].startDate.getTime()).toBe(new Date(2025, 4, 1).getTime());
    expect(results[0].endDate.getTime()).toBe(new Date(2025, 4, 4).getTime());
    expect(results[1].startDate.getTime()).toBe(new Date(2025, 4, 8).getTime());
    expect(results[1].endDate.getTime()).toBe(new Date(2025, 4, 11).getTime());
    expect(results.reduce((sum, period) => sum + period.vacationDaysUsed, 0)).toBe(2);
  });

  test("can build a greedy annual plan without overlapping periods", () => {
    const holidays: Holiday[] = [
      { localName: "Labour Day", date: new Date(2025, 4, 1) },
      { localName: "Victory Day", date: new Date(2025, 4, 8) },
    ];

    const plan = DateOptimizer.buildAnnualPlan({
      holidays,
      paidLeaveBudget: 2,
      availableRttDays: 0,
      year: 2025,
      strategy: "max-efficiency",
    });

    expect(plan.segments).toHaveLength(2);
    expect(plan.totalPaidLeaveUsed).toBe(2);
    expect(plan.totalDaysOff).toBe(8);
    expect(plan.remainingBudget).toBe(0);
    expect(plan.segments[0].period.startDate.getTime()).toBe(new Date(2025, 4, 1).getTime());
    expect(plan.segments[1].period.startDate.getTime()).toBe(new Date(2025, 4, 8).getTime());
  });
});
