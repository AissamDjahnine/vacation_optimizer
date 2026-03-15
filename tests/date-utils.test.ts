import { describe, expect, test } from "vitest";
import { parseDateLike } from "@/lib/domain/date-utils";

describe("date utils", () => {
  test("parses date-only strings as local calendar dates", () => {
    const date = parseDateLike("2026-01-01");

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(0);
    expect(date.getDate()).toBe(1);
  });
});
