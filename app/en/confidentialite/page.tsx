import type { Metadata } from "next";
import { SimpleEditorialPage } from "@/components/pages/simple-editorial-page";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy page for Ponts Malins: lightweight usage, no account required and data scope for exports.",
  robots: {
    index: false,
    follow: false,
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
            "The site may collect minimal technical data linked to hosting or traffic measurement. That information is used to keep the service healthy and improve the pages that help users most.",
            "Planner settings are not stored as a personal workspace. Calendar exports are generated on demand so the user can retrieve them immediately.",
          ],
        },
        {
          title: "Before ads are added",
          body: [
            "If advertising slots or extra analytics tools are added later, this page will need to be updated to explain clearly which services are involved, why they are used and what choices are available to the visitor.",
          ],
        },
      ]}
    />
  );
}
