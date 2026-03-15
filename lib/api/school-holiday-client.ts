import { z } from "zod";
import { getSchoolHolidaySnapshot } from "@/lib/data-snapshots";
import { parseDateLike } from "@/lib/domain/date-utils";
import type { SchoolHolidayPeriod } from "@/lib/domain/types";

const schoolHolidayRecordSchema = z.object({
  description: z.string().optional(),
  start_date: z.string(),
  end_date: z.string(),
  zones: z.string().optional(),
  annee_scolaire: z.string().optional(),
});

const schoolHolidayPayloadSchema = z.object({
  results: z.array(schoolHolidayRecordSchema).default([]),
});

export async function fetchSchoolHolidays(zone: string): Promise<SchoolHolidayPeriod[]> {
  if (zone === "A" || zone === "B" || zone === "C") {
    return getSchoolHolidaySnapshot(zone);
  }

  const where = encodeURIComponent(`zones = "Zone ${zone}" and population = "Élèves"`);
  const response = await fetch(
    `https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records?select=description,start_date,end_date,zones,annee_scolaire&where=${where}&limit=100`,
    {
      next: { revalidate: 60 * 60 * 12 },
      headers: { accept: "application/json" },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch school holidays for zone ${zone}`);
  }

  const payload = schoolHolidayPayloadSchema.parse(await response.json());
  const uniquePeriods = new Map<string, SchoolHolidayPeriod>();

  for (const record of payload.results) {
    const period: SchoolHolidayPeriod = {
      description: record.description ?? "Vacances scolaires",
      startDate: parseDateLike(record.start_date),
      endDate: parseDateLike(record.end_date),
      zone: record.zones ?? `Zone ${zone}`,
      schoolYear: record.annee_scolaire ?? "",
    };

    const key = [
      period.description.trim(),
      period.startDate.toISOString(),
      period.endDate.toISOString(),
      period.zone.trim(),
      period.schoolYear.trim(),
    ].join("|");

    if (!uniquePeriods.has(key)) {
      uniquePeriods.set(key, period);
    }
  }

  return [...uniquePeriods.values()].sort(
    (left, right) => left.startDate.getTime() - right.startDate.getTime(),
  );
}
