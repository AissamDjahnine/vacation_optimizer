import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { ZoneLookupPanel } from "@/components/planner/zone-lookup-panel";

const trackEvent = vi.fn();

vi.mock("@/lib/analytics", () => ({
  trackEvent: (...args: unknown[]) => trackEvent(...args),
}));

describe("ZoneLookupPanel", () => {
  test("tracks lookup submit and zone action click", () => {
    render(
      <ZoneLookupPanel
        language="fr"
        actionHrefTemplate="/?zone={zone}"
        actionLabel="Utiliser cette zone"
        source="family_guide_zone_lookup"
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Exemple : Paris, 75, Lyon, Versailles"), {
      target: { value: "Paris" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Trouver la zone" }));

    expect(trackEvent).toHaveBeenCalledWith(
      "guide_click",
      expect.objectContaining({
        language: "fr",
        source: "family_guide_zone_lookup",
        page_type: "zone_lookup",
        destination: "zone_lookup_submit",
        lookup_query: "Paris",
      }),
    );

    const actionLink = screen.getByRole("link", { name: "Utiliser cette zone" });
    actionLink.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(actionLink);

    expect(trackEvent).toHaveBeenCalledWith(
      "guide_click",
      expect.objectContaining({
        language: "fr",
        source: "family_guide_zone_lookup",
        page_type: "zone_lookup",
        zone: "C",
      }),
    );
  });
});
