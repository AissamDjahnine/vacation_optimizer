import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import germanySitemap from "@/app/de/sitemap";
import { GermanyHomePage, GermanyStateBridgesPage, GermanyStateHolidaysPage, GermanyStateSchoolHolidaysPage } from "@/components/pages/germany-pages";
import { germanYears } from "@/lib/germany/constants";
import { buildGermanMetadata } from "@/lib/germany/seo";
import { getGermanBridgeOpportunities, getGermanHolidaysForState } from "@/lib/germany/holidays";
import { deRoutes, toGermanyExternalPath } from "@/lib/germany/routes";
import { getGermanSchoolHolidayCoverage, getGermanSchoolHolidaysForState } from "@/lib/germany/school-holidays";
import { germanStates } from "@/lib/germany/states";

describe("Germany product", () => {
  test("covers all 16 states for school holidays in 2026 and 2027", () => {
    expect(getGermanSchoolHolidayCoverage(2026).size).toBe(16);
    expect(getGermanSchoolHolidayCoverage(2027).size).toBe(16);
  });

  test("builds holiday data for every state and year with official sources", () => {
    for (const year of germanYears) {
      for (const state of germanStates) {
        const holidays = getGermanHolidaysForState(year, state.code);
        expect(holidays.length).toBeGreaterThan(8);
        expect(new Set(holidays.map((holiday) => `${holiday.id}-${holiday.date.toISOString()}`)).size).toBe(
          holidays.length,
        );
        expect(holidays.every((holiday) => holiday.source.url.startsWith("https://"))).toBe(true);
      }
    }
  });

  test("publishes a clean Germany sitemap without /de in indexed URLs", () => {
    const entries = germanySitemap();

    expect(entries).toHaveLength(106);
    expect(entries.every((entry) => entry.url.startsWith("https://de.pontsmalins.com/"))).toBe(true);
    expect(entries.some((entry) => entry.url.includes("/de/"))).toBe(false);
    expect(entries).toContainEqual(
      expect.objectContaining({
        url: "https://de.pontsmalins.com/feiertage/bayern/2026",
      }),
    );
  });

  test("keeps Germany canonicals on the Germany host", () => {
    const metadata = buildGermanMetadata({
      title: "Feiertage Bayern 2026",
      description: "Die Feiertage in Bayern 2026.",
      externalPath: "/feiertage/bayern/2026",
    });

    expect(metadata.alternates?.canonical).toBe("https://de.pontsmalins.com/feiertage/bayern/2026");
    expect(metadata.openGraph?.url).toBe("https://de.pontsmalins.com/feiertage/bayern/2026");
  });

  test("renders the Germany home page with country and state entries", () => {
    render(<GermanyHomePage />);

    expect(
      screen.getByRole("heading", { name: "Brückentage, Feiertage und Schulferien nach Bundesland" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Brückentage Deutschland 2026/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Brückentage Bayern 2026/ })).toBeInTheDocument();
  });

  test("renders holidays, bridge opportunities and school holidays for one state", () => {
    const holidays = getGermanHolidaysForState(2026, "by");
    const opportunities = getGermanBridgeOpportunities(holidays);
    const schoolPeriods = getGermanSchoolHolidaysForState(2026, "by");

    const { rerender } = render(<GermanyStateHolidaysPage state="by" year={2026} holidays={holidays} />);
    expect(screen.getByText(/Feiertage Bayern 2026/)).toBeInTheDocument();
    expect(screen.getByText(/Heilige Drei Könige/)).toBeInTheDocument();

    rerender(<GermanyStateBridgesPage state="by" year={2026} opportunities={opportunities} />);
    expect(screen.getByText(/Brückentage Bayern 2026/)).toBeInTheDocument();
    expect(screen.getByText(/Die stärksten Brückentage zuerst/)).toBeInTheDocument();

    rerender(<GermanyStateSchoolHolidaysPage state="by" year={2026} periods={schoolPeriods} />);
    expect(screen.getByText(/Schulferien Bayern 2026/)).toBeInTheDocument();
    expect(screen.getByText(/Sommerferien/)).toBeInTheDocument();
  });

  test("keeps external Germany URLs clean while internal routes stay under /de", () => {
    expect(toGermanyExternalPath(deRoutes.stateHolidaysYear(2026, "by"))).toBe("/feiertage/bayern/2026");
    expect(toGermanyExternalPath(deRoutes.home)).toBe("/");
  });
});
