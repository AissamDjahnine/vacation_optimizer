import type { Metadata } from "next";
import { FaqPage } from "@/components/pages/faq-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Bridge and public holiday FAQ",
  description: "Frequently asked questions about bridge days, public holidays, employer rules, public/private sector differences and what to verify before booking leave.",
  path: "/faq-ponts-jours-feries",
  enPath: "/en/faq-ponts-jours-feries",
});

export default function Page() {
  return <FaqPage language="en" />;
}
