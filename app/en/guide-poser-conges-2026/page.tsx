import type { Metadata } from "next";
import { LeaveGuide2026Page } from "@/components/pages/leave-guide-2026-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How to plan your leave well in 2026",
  description: "How to plan leave in 2026, which months to test first, and which French bridge ideas to compare for your leave budget.",
  path: "/guide-poser-conges-2026",
  enPath: "/en/guide-poser-conges-2026",
  locale: "en",
});

export default function Page() {
  return <LeaveGuide2026Page language="en" />;
}
