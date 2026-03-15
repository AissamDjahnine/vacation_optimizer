import type { Metadata } from "next";
import Script from "next/script";
import { FaqPage } from "@/components/pages/faq-page";
import { faqBridgesHolidaysContent } from "@/content/faq-bridges-holidays";
import { buildMetadata } from "@/lib/seo";
import { t } from "@/lib/i18n";

export const metadata: Metadata = buildMetadata({
  title: "FAQ ponts et jours fériés",
  description: "Questions fréquentes sur les ponts, jours fériés, employeur, secteur privé/public et règles à vérifier avant de poser ses congés.",
  path: "/faq-ponts-jours-feries",
  enPath: "/en/faq-ponts-jours-feries",
});

export default function Page() {
  const questions = [
    ...faqBridgesHolidaysContent.generalQuestions,
    ...faqBridgesHolidaysContent.privateVsPublicQuestions,
    ...faqBridgesHolidaysContent.rulesQuestions,
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((entry) => ({
      "@type": "Question",
      name: t(entry.question, "fr"),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(entry.answer, "fr"),
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema-fr"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FaqPage language="fr" />
    </>
  );
}
