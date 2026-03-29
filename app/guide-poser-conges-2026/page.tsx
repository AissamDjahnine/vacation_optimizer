import type { Metadata } from "next";
import { LeaveGuide2026Page } from "@/components/pages/leave-guide-2026-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Comment poser ses congés 2026 : meilleurs mois et ponts à tester",
  description: "Découvrez quels mois tester en premier en 2026, quels ponts comparer selon votre budget et quand revenir au simulateur.",
  path: "/guide-poser-conges-2026",
  enPath: "/en/guide-poser-conges-2026",
});

export default function Page() {
  return <LeaveGuide2026Page language="fr" />;
}
