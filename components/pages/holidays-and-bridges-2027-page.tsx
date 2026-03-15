import { AuthorityBlock } from "@/components/content/authority-block";
import { holidaysAuthority2027Block } from "@/content/official-cases";
import { holidaysAndBridges2027Content } from "@/content/holidays-and-bridges-2027";
import { HolidayTable } from "@/components/content/holiday-table";
import { GenericGuidePage } from "@/components/pages/generic-guide-page";
import { Reveal } from "@/components/motion/reveal";
import type { Holiday } from "@/lib/domain/types";
import type { AppLanguage } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function HolidaysAndBridges2027Page({
  language,
  holidays,
}: {
  language: AppLanguage;
  holidays: Holiday[];
}) {
  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: "2027", en: "2027" }}
      content={holidaysAndBridges2027Content}
      extraBlocks={
        <>
          <AuthorityBlock block={holidaysAuthority2027Block} language={language} />
          <Reveal>
            <section className="editorial-panel space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="editorial-kicker">{language === "en" ? "Reference" : "Repère"}</p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">
                  {language === "en" ? "Full 2027 holiday list" : "Liste complète des jours fériés 2027"}
                  </h2>
                </div>
                <span className="chip">
                  {holidays.length} {language === "en" ? "public holidays" : "jours fériés"}
                </span>
              </div>
              <HolidayTable holidays={holidays} language={language} showWeekendColumn />
            </section>
          </Reveal>
          <Reveal>
            <section className="editorial-panel">
              <div className="space-y-3">
                <p className="editorial-kicker">{language === "en" ? "Planning ideas" : "Idées de planning"}</p>
                <h2 className="text-3xl font-black tracking-tight text-ink">
                  {language === "en" ? "Three ways to start planning 2027" : "Trois façons de commencer à préparer 2027"}
                </h2>
              </div>
              <div className="mt-6 editorial-grid">
              {holidaysAndBridges2027Content.planIdeas.map((idea) => (
                <article
                  key={t(idea.title, language)}
                  className="rounded-4xl border border-line bg-paper p-6"
                >
                  <p className="text-2xl font-black tracking-tight text-ink">
                    {t(idea.title, language)}
                  </p>
                  <p className="mt-4 text-base leading-7 text-ink/74">
                    {t(idea.summary, language)}
                  </p>
                </article>
              ))}
              </div>
            </section>
          </Reveal>
        </>
      }
    />
  );
}
