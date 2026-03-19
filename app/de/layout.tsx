import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Brückentage, Feiertage und Schulferien in Deutschland",
    template: "%s | Ponts Malins Deutschland",
  },
  description:
    "Brückentage, Feiertage und Schulferien nach Bundesland mit Fokus auf offizielle Quellen.",
};

export default function GermanyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
