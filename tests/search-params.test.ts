import { describe, expect, test } from "vitest";
import {
  plannerConfigFromSearchParams,
  plannerConfigFromUrlSearchParams,
} from "@/lib/search-params";

describe("planner search params parsing", () => {
  test("returns undefined when there is no valid planner param", () => {
    expect(plannerConfigFromSearchParams({})).toBeUndefined();
    expect(plannerConfigFromUrlSearchParams(new URLSearchParams(""))).toBeUndefined();
  });

  test("keeps only valid values and never injects undefined keys", () => {
    const config = plannerConfigFromUrlSearchParams(
      new URLSearchParams("year=2026&month=5&budget=10&rtt=1&zone=B&mode=distributed"),
    );

    expect(config).toEqual({
      year: 2026,
      month: 5,
      paidLeaveBudget: 10,
      monthlyRtt: 1,
      schoolZone: "B",
      mode: "distributed",
      scrollToPlanner: true,
    });
  });

  test("ignores invalid numeric values instead of returning NaN-like state", () => {
    const config = plannerConfigFromUrlSearchParams(
      new URLSearchParams("year=abc&month=nope&budget=&rtt=100&zone=Z"),
    );

    expect(config).toBeUndefined();
  });
});
