import { fetchHolidays } from "@/lib/api/holiday-client";
import { fetchSchoolHolidays } from "@/lib/api/school-holiday-client";
import type { Holiday, SchoolHolidayPeriod } from "@/lib/domain/types";

export async function getHolidaysForYear(year: number): Promise<Holiday[]> {
  return fetchHolidays("FR", year);
}

export async function getSchoolHolidaysForZone(
  zone: "A" | "B" | "C",
): Promise<SchoolHolidayPeriod[]> {
  return fetchSchoolHolidays(zone);
}

export async function getSchoolHolidaysByZone(): Promise<
  Record<"A" | "B" | "C", SchoolHolidayPeriod[]>
> {
  const [A, B, C] = await Promise.all([
    fetchSchoolHolidays("A"),
    fetchSchoolHolidays("B"),
    fetchSchoolHolidays("C"),
  ]);

  return { A, B, C };
}
