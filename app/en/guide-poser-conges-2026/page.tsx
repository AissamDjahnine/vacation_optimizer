import type { Metadata } from "next";
import { LeaveGuide2026Page } from "@/components/pages/leave-guide-2026-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How to book leave in 2026: best months and bridge days to test",
  description: "See which months to test first in 2026, which French bridge ideas to compare, and when to switch back to the planner.",
  path: "/guide-poser-conges-2026",
  enPath: "/en/guide-poser-conges-2026",
  locale: "en",
});

export default function Page() {
  return <LeaveGuide2026Page language="en" />;
}
