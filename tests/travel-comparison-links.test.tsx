import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { TravelComparisonLinks } from "@/components/planner/travel-comparison-links";

const trackEvent = vi.fn();

vi.mock("@/lib/analytics", () => ({
  trackEvent: (...args: unknown[]) => trackEvent(...args),
}));

describe("TravelComparisonLinks", () => {
  test("tracks CTA quality and outbound compare context", () => {
    render(
      <TravelComparisonLinks
        language="fr"
        startDate={new Date("2026-05-13T00:00:00.000Z")}
        endDate={new Date("2026-05-17T00:00:00.000Z")}
        source="guide_page"
        pageType="guide_page"
        rank={2}
        daysOff={5}
        leaveDaysUsed={2}
      />,
    );

    fireEvent.click(screen.getByRole("link", { name: "Google Flights" }));

    expect(trackEvent).toHaveBeenNthCalledWith(
      1,
      "result_cta_click",
      expect.objectContaining({
        language: "fr",
        source: "guide_page",
        page_type: "guide_page",
        provider: "google_flights",
        year: 2026,
        month: 5,
        rank: 2,
        days_off: 5,
        leave_days_used: 2,
      }),
    );
    expect(trackEvent).toHaveBeenNthCalledWith(
      2,
      "outbound_travel_compare",
      expect.objectContaining({
        source: "guide_page",
        provider: "google_flights",
      }),
    );
  });
});
