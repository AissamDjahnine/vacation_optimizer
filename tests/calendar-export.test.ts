import { describe, expect, test } from "vitest";
import {
  buildGoogleCalendarUrl,
  buildIcsContent,
  buildPeriodCalendarBundle,
} from "@/lib/calendar-export";
import type { BestVacationPeriod } from "@/lib/domain/types";

const samplePeriod: BestVacationPeriod = {
  startDate: new Date("2026-05-08"),
  endDate: new Date("2026-05-11"),
  vacationDaysUsed: 1,
  paidLeaveDaysUsed: 1,
  rttDaysUsed: 0,
  totalDaysOff: 4,
  worthScore: 4,
  rankingScore: 4,
  relatedHoliday: { localName: "Victoire 1945", date: new Date("2026-05-08") },
  includedHolidays: [{ localName: "Victoire 1945", date: new Date("2026-05-08") }],
  vacationDates: [new Date("2026-05-11")],
  paidLeaveDates: [new Date("2026-05-11")],
  rttDates: [],
  bridgeDates: [new Date("2026-05-11")],
  weekendDates: [new Date("2026-05-09"), new Date("2026-05-10")],
  schoolHolidayDates: [],
  holidayDate: new Date("2026-05-08"),
};

describe("calendar export", () => {
  test("builds an ICS payload for a monthly result", () => {
    const bundle = buildPeriodCalendarBundle({
      period: samplePeriod,
      language: "fr",
      year: 2026,
    });

    const content = buildIcsContent(bundle);

    expect(bundle.filename).toContain("ponts-malins-2026");
    expect(content).toContain("BEGIN:VCALENDAR");
    expect(content).toContain("SUMMARY:Ponts Malins - 4 jours de repos");
    expect(content).toContain("DTSTART;VALUE=DATE:20260508");
    expect(content).toContain("DTEND;VALUE=DATE:20260512");
  });

  test("builds a Google Calendar URL for a monthly result", () => {
    const bundle = buildPeriodCalendarBundle({
      period: samplePeriod,
      language: "fr",
      year: 2026,
    });

    const url = buildGoogleCalendarUrl(bundle.events[0]);

    expect(url).toContain("calendar.google.com");
    expect(url).toContain("action=TEMPLATE");
    expect(url).toContain("dates=20260508%2F20260512");
  });
});
