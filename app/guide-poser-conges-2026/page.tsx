import type { Metadata } from "next";
import { LeaveGuide2026Page } from "@/components/pages/leave-guide-2026-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Comment bien poser ses congés en 2026",
  description: "Le guide pratique pour poser ses congés en 2026, repérer les meilleurs mois et tester les bons ponts dans Ponts Malins.",
  path: "/guide-poser-conges-2026",
  enPath: "/en/guide-poser-conges-2026",
});

export default function Page() {
  return <LeaveGuide2026Page language="fr" />;
}
