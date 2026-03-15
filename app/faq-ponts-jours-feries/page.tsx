import type { Metadata } from "next";
import { FaqPage } from "@/components/pages/faq-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQ ponts et jours fériés",
  description: "Questions fréquentes sur les ponts, jours fériés, employeur, secteur privé/public et règles à vérifier avant de poser ses congés.",
  path: "/faq-ponts-jours-feries",
  enPath: "/en/faq-ponts-jours-feries",
});

export default function Page() {
  return <FaqPage language="fr" />;
}
