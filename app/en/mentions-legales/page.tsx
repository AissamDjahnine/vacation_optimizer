import type { Metadata } from "next";
import { SimpleEditorialPage } from "@/components/pages/simple-editorial-page";

export const metadata: Metadata = {
  title: "Legal notice",
  description:
    "Legal notice for Ponts Malins: editor, hosting and product information scope.",
};

export default function LegalPage() {
  return (
    <SimpleEditorialPage
      language="en"
      kicker="Site framework"
      title="Legal notice"
      subtitle="The key details that identify the site, explain its scope and show how to get in touch."
      sections={[
        {
          title: "Publisher",
          body: [
            "Ponts Malins is an editorial website and planning tool focused on French public holidays, bridges and school holidays. The reference contact for the project is contact@pontsmalins.com.",
            "The site is built to help users compare leave scenarios. It does not replace official information, employer rules, collective agreements or public administration guidance.",
          ],
        },
        {
          title: "Hosting",
          body: [
            "The website is hosted on Vercel infrastructure. Public pages, static content and exports are served there as part of the normal service operation.",
          ],
        },
        {
          title: "Information scope",
          body: [
            "Ponts Malins summarizes public data on holidays and school calendars, then turns them into planning suggestions. Users should still validate the final decision against their own employer, contract, public service context or school zone.",
          ],
        },
      ]}
    />
  );
}
