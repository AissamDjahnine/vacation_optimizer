import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import germanySitemap from "@/app/de/sitemap";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GermanyHomePage, GermanyStateBridgesPage, GermanyStateHolidaysPage, GermanyStateSchoolHolidaysPage } from "@/components/pages/germany-pages";
import { germanYears } from "@/lib/germany/constants";
import { buildGermanMetadata } from "@/lib/germany/seo";
import { getGermanBridgeOpportunities, getGermanHolidayCoverageSummary, getGermanHolidaysForState } from "@/lib/germany/holidays";
import { deRoutes, toGermanyExternalPath } from "@/lib/germany/routes";
import { getGermanSchoolHolidayCoverage, getGermanSchoolHolidaysForState } from "@/lib/germany/school-holidays";
import { germanStates } from "@/lib/germany/states";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

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

    expect(entries).toHaveLength(214);
    expect(entries.every((entry) => entry.url.startsWith("https://de.pontsmalins.com/"))).toBe(true);
    expect(entries.some((entry) => entry.url.includes("/de/"))).toBe(false);
    expect(entries).toContainEqual(
      expect.objectContaining({
        url: "https://de.pontsmalins.com/feiertage/bayern/2026",
      }),
    );
    expect(entries).toContainEqual(
      expect.objectContaining({
        url: "https://de.pontsmalins.com/en/feiertage/bayern/2026",
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
    expect(metadata.alternates?.languages?.["de-DE"]).toBe("https://de.pontsmalins.com/feiertage/bayern/2026");
    expect(metadata.alternates?.languages?.["en-US"]).toBe("https://de.pontsmalins.com/en/feiertage/bayern/2026");
    expect(metadata.openGraph?.url).toBe("https://de.pontsmalins.com/feiertage/bayern/2026");
  });

  test("keeps English Germany canonicals on the Germany host under /en", () => {
    const metadata = buildGermanMetadata({
      title: "Public holidays Bavaria 2026",
      description: "The public holidays in Bavaria in 2026.",
      externalPath: "/en/feiertage/bayern/2026",
    });

    expect(metadata.alternates?.canonical).toBe("https://de.pontsmalins.com/en/feiertage/bayern/2026");
    expect(metadata.alternates?.languages?.["de-DE"]).toBe("https://de.pontsmalins.com/feiertage/bayern/2026");
    expect(metadata.alternates?.languages?.["en-US"]).toBe("https://de.pontsmalins.com/en/feiertage/bayern/2026");
    expect(metadata.openGraph?.url).toBe("https://de.pontsmalins.com/en/feiertage/bayern/2026");
  });

  test("summarizes nationwide and state-specific holiday coverage for Germany year pages", () => {
    const coverage = getGermanHolidayCoverageSummary(2027);

    expect(coverage.find((holiday) => holiday.id === "new-year")?.stateCodes).toHaveLength(16);
    expect(coverage.find((holiday) => holiday.id === "all-saints-day")?.stateCodes).toHaveLength(5);
    expect(coverage.find((holiday) => holiday.id === "day-of-prayer-and-repentance")?.stateCodes).toEqual(["sn"]);
  });

  test("renders the Germany home page with country and state entries", () => {
    render(<GermanyHomePage />);

    expect(
      screen.getByRole("heading", { name: "Brückentage, Feiertage und Schulferien nach Bundesland" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Brückentage Deutschland 2026/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Brückentage Bayern 2026/ })).toBeInTheDocument();
  });

  test("renders the English Germany home page without French labels", () => {
    render(<GermanyHomePage locale="en" />);

    expect(
      screen.getByRole("heading", { name: "Bridge days, public holidays and school holidays by state" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Bridge days Germany 2026/ })).toBeInTheDocument();
    expect(screen.queryByText(/Vacances/)).not.toBeInTheDocument();
  });

  test("renders holidays, bridge opportunities and school holidays for one state", () => {
    const holidays = getGermanHolidaysForState(2026, "by");
    const opportunities = getGermanBridgeOpportunities(holidays);
    const schoolPeriods = getGermanSchoolHolidaysForState(2026, "by");

    const { rerender } = render(<GermanyStateHolidaysPage state="by" year={2026} holidays={holidays} />);
    expect(screen.getByRole("heading", { name: /Feiertage Bayern 2026/ })).toBeInTheDocument();
    expect(screen.getByText(/Heilige Drei Könige/)).toBeInTheDocument();

    rerender(<GermanyStateBridgesPage state="by" year={2026} opportunities={opportunities} />);
    expect(screen.getByRole("heading", { name: /Brückentage Bayern 2026/ })).toBeInTheDocument();
    expect(screen.getByText(/Die stärksten Brückentage zuerst/)).toBeInTheDocument();

    rerender(<GermanyStateSchoolHolidaysPage state="by" year={2026} periods={schoolPeriods} />);
    expect(screen.getByRole("heading", { name: /Schulferien Bayern 2026/ })).toBeInTheDocument();
    expect(screen.getByText(/Sommerferien/)).toBeInTheDocument();
  });

  test("renders English state pages for the Germany subdomain", () => {
    const holidays = getGermanHolidaysForState(2026, "by");
    const opportunities = getGermanBridgeOpportunities(holidays);
    const schoolPeriods = getGermanSchoolHolidaysForState(2026, "by");

    const { rerender } = render(
      <GermanyStateHolidaysPage state="by" year={2026} holidays={holidays} locale="en" />,
    );
    expect(screen.getByRole("heading", { name: /Public holidays Bavaria 2026/ })).toBeInTheDocument();

    rerender(
      <GermanyStateBridgesPage state="by" year={2026} opportunities={opportunities} locale="en" />,
    );
    expect(screen.getByRole("heading", { name: /Bridge days Bavaria 2026/ })).toBeInTheDocument();
    expect(screen.getByText(/Strongest bridge opportunities first/)).toBeInTheDocument();

    rerender(
      <GermanyStateSchoolHolidaysPage state="by" year={2026} periods={schoolPeriods} locale="en" />,
    );
    expect(screen.getByRole("heading", { name: /School holidays Bavaria 2026/ })).toBeInTheDocument();
  });

  test("renders Germany shell navigation without French on the Germany host", () => {
    const { rerender } = render(
      <SiteHeader language="de" host="de.pontsmalins.com" germanyHost germanyLocale="de" />,
    );

    expect(screen.getByText(/Brückentage, Feiertage und Schulferien in Deutschland/)).toBeInTheDocument();
    expect(screen.queryByText(/Simulateur de ponts et congés en France/)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "de" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "en" })).toBeInTheDocument();

    rerender(<SiteFooter language="de" germanyHost germanyLocale="en" />);
    expect(screen.getByText(/Ponts Malins Germany/)).toBeInTheDocument();
    expect(screen.queryByText(/Confiance et cadre/)).not.toBeInTheDocument();
    expect(screen.getByText(/Sources and legal/)).toBeInTheDocument();
  });

  test("keeps external Germany URLs clean while internal routes stay under /de", () => {
    expect(toGermanyExternalPath(deRoutes.stateHolidaysYear(2026, "by"))).toBe("/feiertage/bayern/2026");
    expect(toGermanyExternalPath(deRoutes.home)).toBe("/");
  });
});
