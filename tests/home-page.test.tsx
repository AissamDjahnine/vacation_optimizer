import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HomePage } from "@/components/pages/home-page";

vi.mock("next/dynamic", () => ({
  default: (_loader: unknown, options?: { loading?: () => React.ReactElement | null }) => {
    return function DynamicStub() {
      return options?.loading ? options.loading() : null;
    };
  },
}));

describe("HomePage", () => {
  test("renders the simplified landing sections", () => {
    render(<HomePage language="en" />);

    expect(screen.getByText("Quick links")).toBeInTheDocument();
    expect(screen.getByText("Travel smarter in 2026")).toBeInTheDocument();
    expect(screen.getByText("Before you go further")).toBeInTheDocument();
    expect(screen.getByText("Useful guides for planning faster")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Open the annual planner" }).length).toBeGreaterThan(0);
  });
});
