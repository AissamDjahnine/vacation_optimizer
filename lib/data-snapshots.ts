import holidays2026 from "@/data/holidays/fr-2026.json";
import holidays2027 from "@/data/holidays/fr-2027.json";
import holidays2028 from "@/data/holidays/fr-2028.json";
import holidays2029 from "@/data/holidays/fr-2029.json";
import zoneA from "@/data/school-holidays/zone-a.json";
import zoneB from "@/data/school-holidays/zone-b.json";
import zoneC from "@/data/school-holidays/zone-c.json";
import { parseDateLike } from "@/lib/domain/date-utils";
import type { Holiday, SchoolHolidayPeriod } from "@/lib/domain/types";

const holidaySnapshots: Record<number, Holiday[]> = {
  2026: holidays2026.map((holiday) => ({
    localName: holiday.localName,
    date: parseDateLike(holiday.date),
  })),
  2027: holidays2027.map((holiday) => ({
    localName: holiday.localName,
    date: parseDateLike(holiday.date),
  })),
  2028: holidays2028.map((holiday) => ({
    localName: holiday.localName,
    date: parseDateLike(holiday.date),
  })),
  2029: holidays2029.map((holiday) => ({
    localName: holiday.localName,
    date: parseDateLike(holiday.date),
  })),
};

const schoolHolidaySnapshots: Record<"A" | "B" | "C", SchoolHolidayPeriod[]> = {
  A: zoneA.map(mapSchoolHoliday),
  B: zoneB.map(mapSchoolHoliday),
  C: zoneC.map(mapSchoolHoliday),
};

function mapSchoolHoliday(period: {
  description: string;
  startDate: string;
  endDate: string;
  zone: string;
  schoolYear: string;
}): SchoolHolidayPeriod {
  return {
    description: period.description,
    startDate: parseDateLike(period.startDate),
    endDate: parseDateLike(period.endDate),
    zone: period.zone,
    schoolYear: period.schoolYear,
  };
}

export function getHolidaySnapshot(year: number): Holiday[] | null {
  const snapshot = holidaySnapshots[year];
  return snapshot ? snapshot.map((holiday) => ({ ...holiday, date: new Date(holiday.date) })) : null;
}

export function getSchoolHolidaySnapshot(zone: "A" | "B" | "C"): SchoolHolidayPeriod[] {
  return schoolHolidaySnapshots[zone].map((period) => ({
    ...period,
    startDate: new Date(period.startDate),
    endDate: new Date(period.endDate),
  }));
}
