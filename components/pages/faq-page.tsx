import { AuthorityBlock } from "@/components/content/authority-block";
import { rulesAuthorityBlock } from "@/content/official-cases";
import { faqBridgesHolidaysContent } from "@/content/faq-bridges-holidays";
import { GenericGuidePage } from "@/components/pages/generic-guide-page";
import { Reveal } from "@/components/motion/reveal";
import type { AppLanguage } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function FaqPage({ language }: { language: AppLanguage }) {
  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: "FAQ", en: "FAQ" }}
      content={faqBridgesHolidaysContent}
      extraBlocks={
        <div className="grid gap-6">
          <AuthorityBlock block={rulesAuthorityBlock} language={language} />
          <QuestionList
            title={language === "en" ? "General questions" : "Questions générales"}
            questions={faqBridgesHolidaysContent.generalQuestions}
            language={language}
          />
          <QuestionList
            title={language === "en" ? "Private vs public" : "Privé vs fonction publique"}
            questions={faqBridgesHolidaysContent.privateVsPublicQuestions}
            language={language}
          />
          <QuestionList
            title={language === "en" ? "Rules and exceptions" : "Règles et exceptions"}
            questions={faqBridgesHolidaysContent.rulesQuestions}
            language={language}
          />
        </div>
      }
    />
  );
}

function QuestionList({
  title,
  questions,
  language,
}: {
  title: string;
  questions: typeof faqBridgesHolidaysContent.generalQuestions;
  language: AppLanguage;
}) {
  return (
    <Reveal>
      <section className="editorial-panel">
        <p className="editorial-kicker">{language === "en" ? "Short answers" : "Réponses courtes"}</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">{title}</h2>
        <div className="mt-6 space-y-4">
          {questions.map((entry) => (
            <article
              key={t(entry.question, language)}
              className="rounded-3xl border border-line bg-paper p-5"
            >
              <p className="text-xl font-black tracking-tight text-ink">
                {t(entry.question, language)}
              </p>
              <p className="mt-3 text-base leading-7 text-ink/74">{t(entry.answer, language)}</p>
              {entry.sourceUrl && entry.sourceLabel ? (
                <a
                  href={entry.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-sm font-bold text-coral"
                >
                  {t(entry.sourceLabel, language)}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
