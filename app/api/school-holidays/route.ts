import { NextResponse } from "next/server";
import { fetchSchoolHolidays } from "@/lib/api/school-holiday-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zone = (searchParams.get("zone") ?? "A").toUpperCase();

  if (!["A", "B", "C"].includes(zone)) {
    return NextResponse.json({ error: "Invalid zone" }, { status: 400 });
  }

  try {
    const periods = await fetchSchoolHolidays(zone);
    return NextResponse.json({
      periods: periods.map((period) => ({
        ...period,
        startDate: period.startDate.toISOString(),
        endDate: period.endDate.toISOString(),
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
