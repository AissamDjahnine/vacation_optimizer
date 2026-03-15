import { z } from "zod";
import { getHolidaySnapshot } from "@/lib/data-snapshots";
import { parseDateLike } from "@/lib/domain/date-utils";
import type { Holiday } from "@/lib/domain/types";

const holidaySchema = z.object({
  localName: z.string(),
  date: z.string(),
});

const holidayPayloadSchema = z.array(holidaySchema);

export async function fetchHolidays(country: string, year: number): Promise<Holiday[]> {
  if (country === "FR") {
    const snapshot = getHolidaySnapshot(year);
    if (snapshot) {
      return snapshot;
    }
  }

  const response = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`,
    {
      next: { revalidate: 60 * 60 * 12 },
      headers: { accept: "application/json" },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch holidays for ${country} in ${year}`);
  }

  const payload = holidayPayloadSchema.parse(await response.json());

  return payload.map((holiday) => ({
    localName: holiday.localName,
    date: parseDateLike(holiday.date),
  }));
}
