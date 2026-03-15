import { describe, expect, test } from "vitest";
import { getSchoolHolidaySnapshot } from "@/lib/data-snapshots";

describe("school holiday snapshots", () => {
  test("zone snapshots include the main published periods", () => {
    const zoneA = getSchoolHolidaySnapshot("A");
    const zoneB = getSchoolHolidaySnapshot("B");
    const zoneC = getSchoolHolidaySnapshot("C");

    expect(zoneA.length).toBeGreaterThanOrEqual(10);
    expect(zoneB.length).toBeGreaterThanOrEqual(10);
    expect(zoneC.length).toBeGreaterThanOrEqual(10);

    expect(zoneA.map((period) => period.description)).toEqual(
      expect.arrayContaining([
        "Vacances de la Toussaint",
        "Vacances de Noël",
        "Vacances d'Hiver",
        "Vacances de Printemps",
        "Vacances d'Été",
      ]),
    );
  });
});
