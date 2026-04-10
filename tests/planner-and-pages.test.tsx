import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { Planner } from "@/components/planner/planner";
import { AnnualPlanner } from "@/components/planner/annual-planner";
import { ResultCard } from "@/components/planner/result-card";
import { FaqPage } from "@/components/pages/faq-page";
import { HolidaysYearPage } from "@/components/pages/holidays-year-page";
import { Rtt2027Page } from "@/components/pages/intent-pages";
import { SchoolHolidaysBridgesYearPage } from "@/components/pages/school-holidays-bridges-year-page";
import type { BestVacationPeriod, Holiday, SchoolHolidayPeriod } from "@/lib/domain/types";

const searchParamsState = {
  value: new URLSearchParams(""),
};

vi.mock("next/navigation", () => ({
  useSearchParams: () => searchParamsState.value,
  usePathname: () => "/",
}));

const fridayHolidayPeriod: BestVacationPeriod = {
  startDate: new Date("2026-05-01T12:00:00.000Z"),
  endDate: new Date("2026-05-03T12:00:00.000Z"),
  vacationDaysUsed: 0,
  paidLeaveDaysUsed: 0,
  rttDaysUsed: 0,
  totalDaysOff: 3,
  worthScore: 3,
  rankingScore: 3,
  relatedHoliday: { localName: "Fête du Travail", date: new Date("2026-05-01T00:00:00.000Z") },
  includedHolidays: [{ localName: "Fête du Travail", date: new Date("2026-05-01T00:00:00.000Z") }],
  vacationDates: [],
  paidLeaveDates: [],
  rttDates: [],
  bridgeDates: [],
  weekendDates: [new Date("2026-05-02T00:00:00.000Z"), new Date("2026-05-03T00:00:00.000Z")],
  schoolHolidayDates: [],
  holidayDate: new Date("2026-05-01T00:00:00.000Z"),
};

const pentecostHolidayPeriod: BestVacationPeriod = {
  startDate: new Date("2026-05-23T12:00:00.000Z"),
  endDate: new Date("2026-05-25T12:00:00.000Z"),
  vacationDaysUsed: 0,
  paidLeaveDaysUsed: 0,
  rttDaysUsed: 0,
  totalDaysOff: 3,
  worthScore: 3,
  rankingScore: 3,
  relatedHoliday: { localName: "Lundi de Pentecôte", date: new Date("2026-05-25T00:00:00.000Z") },
  includedHolidays: [{ localName: "Lundi de Pentecôte", date: new Date("2026-05-25T00:00:00.000Z") }],
  vacationDates: [],
  paidLeaveDates: [],
  rttDates: [],
  bridgeDates: [],
  weekendDates: [new Date("2026-05-23T00:00:00.000Z"), new Date("2026-05-24T00:00:00.000Z")],
  schoolHolidayDates: [],
  holidayDate: new Date("2026-05-25T00:00:00.000Z"),
};

describe("planner and content pages", () => {
  beforeEach(() => {
    searchParamsState.value = new URLSearchParams("");
  });

  test("renders the planner defaults without NaN and keeps Gros pont by default", () => {
    render(<Planner language="fr" />);

    expect(screen.queryByText(/NaN/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Gros pont" })).toHaveClass("bg-coral");
    expect(screen.getByDisplayValue("2026")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Janvier 2026" })).toBeInTheDocument();
  });

  test("reads valid query params without breaking the UI", async () => {
    searchParamsState.value = new URLSearchParams("zone=C&month=1&year=2026&budget=10");

    render(<Planner language="fr" />);

    await waitFor(() => {
      expect(screen.queryByText(/NaN/)).not.toBeInTheDocument();
    });

    expect(screen.getByDisplayValue("2026")).toBeInTheDocument();
    expect(screen.getByText(/10 jours disponibles/)).toBeInTheDocument();
  });

  test("changes the result month when next month is clicked after a search", async () => {
    render(<Planner language="fr" />);

    fireEvent.click(screen.getByRole("button", { name: "Calculer mes meilleurs ponts" }));

    await screen.findByRole("heading", { name: "Vos ponts recommandés" });

    expect(screen.getByText("Janvier 2026")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Mois suivant" }));

    await waitFor(() => {
      expect(screen.getByText("Février 2026")).toBeInTheDocument();
    });
  });

  test("locks school zone and overlap controls when school holidays are avoided", () => {
    render(<Planner language="fr" />);

    fireEvent.click(screen.getByRole("button", { name: "Afficher les options avancées" }));
    fireEvent.click(screen.getByRole("button", { name: "Éviter" }));

    expect(findButtonByExactText("A")).toBeDisabled();
    expect(findButtonByExactText("B")).toBeDisabled();
    expect(findButtonByExactText("C")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Trouver la zone" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Chevauchement" })).toBeDisabled();
  });

  test("annual planner also locks zone and overlap when school holidays are avoided", () => {
    render(<AnnualPlanner language="fr" year={2026} />);

    fireEvent.click(screen.getByRole("button", { name: "Afficher les options avancées" }));
    fireEvent.click(screen.getByRole("button", { name: "Éviter" }));

    expect(findButtonByExactText("A")).toBeDisabled();
    expect(findButtonByExactText("B")).toBeDisabled();
    expect(findButtonByExactText("C")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Chevauchement" })).toBeDisabled();
  });

  test("renders FAQ content in French and English", () => {
    const { rerender } = render(<FaqPage language="fr" />);

    expect(screen.getByText(/FAQ – Ponts, jours fériés et congés/)).toBeInTheDocument();
    expect(screen.getByText(/Questions générales/)).toBeInTheDocument();

    rerender(<FaqPage language="en" />);

    expect(screen.getByText(/FAQ – Bridges, public holidays, and leave/)).toBeInTheDocument();
    expect(screen.getByText(/General questions/)).toBeInTheDocument();
  });

  test("renders the holiday year page with the expected annual table", () => {
    const holidays: Holiday[] = [
      { localName: "Jour de l'an", date: new Date(2026, 0, 1) },
      { localName: "Fête du Travail", date: new Date(2026, 4, 1) },
    ];

    render(<HolidaysYearPage language="fr" year={2026} holidays={holidays} />);

    expect(screen.getByText("Jours fériés 2026 en France")).toBeInTheDocument();
    expect(screen.getByText("Toutes les dates officielles")).toBeInTheDocument();
    expect(screen.getAllByText("Jour de l'an").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Fête du Travail").length).toBeGreaterThan(0);
  });

  test("school holidays page deduplicates year periods and switches zone summaries", () => {
    const periodsByZone: Record<"A" | "B" | "C", SchoolHolidayPeriod[]> = {
      A: [
        {
          description: "Vacances d'Été",
          startDate: new Date("2025-07-04T22:00:00.000Z"),
          endDate: new Date("2025-08-31T22:00:00.000Z"),
          zone: "Zone A",
          schoolYear: "2024-2025",
        },
        {
          description: "Vacances d'Été",
          startDate: new Date("2026-07-03T22:00:00.000Z"),
          endDate: new Date("2026-08-31T22:00:00.000Z"),
          zone: "Zone A",
          schoolYear: "2025-2026",
        },
        {
          description: "Vacances d'Été",
          startDate: new Date("2026-07-03T22:00:00.000Z"),
          endDate: new Date("2026-08-31T22:00:00.000Z"),
          zone: "Zone A",
          schoolYear: "2025-2026",
        },
      ],
      B: [
        {
          description: "Vacances d'Hiver",
          startDate: new Date("2026-02-06T23:00:00.000Z"),
          endDate: new Date("2026-02-22T23:00:00.000Z"),
          zone: "Zone B",
          schoolYear: "2025-2026",
        },
      ],
      C: [],
    };

    render(
      <SchoolHolidaysBridgesYearPage
        language="fr"
        year={2026}
        initialZone="A"
        periodsByZone={periodsByZone}
      />,
    );

    expect(screen.getByText("Vue rapide pour la zone A en 2026")).toBeInTheDocument();
    expect(screen.getByText("1 période en 2026")).toBeInTheDocument();
    expect(screen.getAllByText(/Vacances d'Été/).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /Zone B/ }));

    expect(screen.getByText("Vue rapide pour la zone B en 2026")).toBeInTheDocument();
    expect(screen.getAllByText("Vacances d'Hiver").length).toBeGreaterThan(0);
  });

  test("result card keeps a holiday day labeled as holiday instead of weekend", () => {
    render(<ResultCard language="fr" period={fridayHolidayPeriod} rank={1} highlighted />);

    expect(screen.getByText("Fête du Travail")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Google Flights" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skyscanner" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Kayak" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ajouter à Google Calendar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Exporter au format .ics" })).toBeInTheDocument();
  });

  test("result card supports longer holiday names in the timeline", () => {
    render(<ResultCard language="fr" period={pentecostHolidayPeriod} rank={1} highlighted />);

    expect(screen.getByText("Lundi de Pentecôte")).toBeInTheDocument();
  });

  test("renders the RTT 2027 landing page with concrete examples", () => {
    const holidays: Holiday[] = [
      { localName: "Jour de l'an", date: new Date("2027-01-01T12:00:00.000Z") },
      { localName: "Lundi de Pâques", date: new Date("2027-03-29T12:00:00.000Z") },
      { localName: "Fête du Travail", date: new Date("2027-05-01T12:00:00.000Z") },
      { localName: "Victoire 1945", date: new Date("2027-05-08T12:00:00.000Z") },
      { localName: "Ascension", date: new Date("2027-05-06T12:00:00.000Z") },
      { localName: "Lundi de Pentecôte", date: new Date("2027-05-17T12:00:00.000Z") },
      { localName: "Fête nationale", date: new Date("2027-07-14T12:00:00.000Z") },
      { localName: "Assomption", date: new Date("2027-08-15T12:00:00.000Z") },
      { localName: "Toussaint", date: new Date("2027-11-01T12:00:00.000Z") },
      { localName: "Armistice", date: new Date("2027-11-11T12:00:00.000Z") },
      { localName: "Noël", date: new Date("2027-12-25T12:00:00.000Z") },
    ];

    render(<Rtt2027Page language="fr" holidays={holidays} />);

    expect(screen.getByText(/RTT 2027 : comment les utiliser avec les jours fériés/)).toBeInTheDocument();
    expect(screen.getByText(/Trois configurations 2027 où 1 RTT change vraiment le résultat/)).toBeInTheDocument();
    expect(screen.getByText(/Un plan 2027 équilibré avec RTT dans l’équation/)).toBeInTheDocument();
  });
});

function findButtonByExactText(label: string) {
  const match = screen
    .getAllByRole("button")
    .find((button) => button.textContent?.trim() === label);

  if (!match) {
    throw new Error(`Button with exact text "${label}" not found.`);
  }

  return match;
}
