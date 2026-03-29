import type { Metadata } from "next";
import Script from "next/script";
import { FaqPage } from "@/components/pages/faq-page";
import { faqBridgesHolidaysContent } from "@/content/faq-bridges-holidays";
import { buildMetadata } from "@/lib/seo";
import { t } from "@/lib/i18n";

export const metadata: Metadata = buildMetadata({
  title: "Bridge and public holiday FAQ: quick answers before booking leave",
  description: "Frequently asked questions about bridge days, public holidays, employer rules, public/private sector differences and what to verify before booking leave.",
  path: "/faq-ponts-jours-feries",
  enPath: "/en/faq-ponts-jours-feries",
  locale: "en",
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
      name: t(entry.question, "en"),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(entry.answer, "en"),
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FaqPage language="en" />
    </>
  );
}
