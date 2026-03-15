import type { Metadata } from "next";
import { LeaveGuide2026Page } from "@/components/pages/leave-guide-2026-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How to plan your leave well in 2026",
  description: "A practical guide to plan leave in 2026, spot the strongest months and validate the best bridge ideas in Ponts Malins.",
  path: "/guide-poser-conges-2026",
  enPath: "/en/guide-poser-conges-2026",
});

export default function Page() {
  return <LeaveGuide2026Page language="en" />;
}
