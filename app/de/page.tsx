import { GermanyHomePage } from "@/components/pages/germany-pages";
import { buildGermanMetadata } from "@/lib/germany/seo";

export const metadata = buildGermanMetadata({
  title: "Brückentage, Feiertage und Schulferien in Deutschland",
  description: "Der Deutschland-Einstieg für Brückentage, Feiertage und Schulferien nach Bundesland.",
  externalPath: "/",
});

export default function Page() {
  return <GermanyHomePage />;
}
