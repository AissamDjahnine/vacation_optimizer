import { describe, expect, test } from "vitest";
import { lookupSchoolZone } from "@/lib/zone-lookup";

describe("zone lookup", () => {
  test("matches a department by name", () => {
    const result = lookupSchoolZone("Paris", "fr");

    expect(result.matched).toBe(true);
    expect(result.zone).toBe("C");
    expect(result.matchLabel).toContain("Paris");
  });

  test("matches an academy", () => {
    const result = lookupSchoolZone("Académie de Versailles", "fr");

    expect(result.matched).toBe(true);
    expect(result.zone).toBe("C");
  });

  test("flags unsupported territories cleanly", () => {
    const result = lookupSchoolZone("Corse", "fr");

    expect(result.matched).toBe(false);
    expect(result.reason).toBe("out-of-scope");
  });
});
