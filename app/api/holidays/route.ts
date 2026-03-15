import { NextResponse } from "next/server";
import { fetchHolidays } from "@/lib/api/holiday-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = Number.parseInt(searchParams.get("year") ?? "", 10);
  const country = searchParams.get("country") ?? "FR";

  if (!Number.isFinite(year)) {
    return NextResponse.json({ error: "Missing or invalid year" }, { status: 400 });
  }

  try {
    const holidays = await fetchHolidays(country, year);
    return NextResponse.json({
      holidays: holidays.map((holiday) => ({
        ...holiday,
        date: holiday.date.toISOString(),
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
