import type { Metadata } from "next";
import { SimpleEditorialPage } from "@/components/pages/simple-editorial-page";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy page for Ponts Malins: lightweight usage, no account required and data scope for exports.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PrivacyPage() {
  return (
    <SimpleEditorialPage
      language="en"
      kicker="Privacy"
      title="Privacy"
      subtitle="The site is intentionally lightweight: no user account is required and first use stays simple."
      sections={[
        {
          title: "No account required",
          body: [
            "Ponts Malins can be used without creating an account. Core planning scenarios are computed client-side from the settings entered in the interface.",
          ],
        },
        {
          title: "Browsing data",
          body: [
            "The site may collect minimal technical data linked to traffic measurement and service health. That information is used to keep the service healthy and improve the pages that help users most.",
            "Planner settings are not stored as a personal workspace. Calendar exports are generated on demand so the user can retrieve them immediately.",
          ],
        },
        {
          title: "Service changes",
          body: [
            "If the service changes in a significant way, this page will be updated to explain clearly which data flows are involved and why.",
          ],
        },
      ]}
    />
  );
}
