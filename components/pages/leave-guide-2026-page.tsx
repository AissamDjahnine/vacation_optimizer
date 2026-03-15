import { leaveGuide2026Content } from "@/content/guide-leave-2026";
import { GenericGuidePage } from "@/components/pages/generic-guide-page";
import { Reveal } from "@/components/motion/reveal";
import type { AppLanguage } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function LeaveGuide2026Page({ language }: { language: AppLanguage }) {
  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: "Guide", en: "Guide" }}
      content={leaveGuide2026Content}
      extraBlocks={
        <Reveal>
          <section className="editorial-panel">
            <div className="space-y-3">
              <p className="editorial-kicker">{language === "en" ? "Scenarios" : "Scénarios"}</p>
              <h2 className="text-3xl font-black tracking-tight text-ink">
                {language === "en"
                  ? "Examples based on your leave budget"
                  : "Exemples selon votre budget de congés"}
              </h2>
            </div>
            <div className="mt-6 editorial-grid">
            {leaveGuide2026Content.scenarios.map((scenario) => (
              <article
                key={t(scenario.budgetLabel, language)}
                className="rounded-4xl border border-line bg-paper p-6"
              >
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-coral">
                  {t(scenario.budgetLabel, language)}
                </p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-ink">
                  {t(scenario.periodLabel, language)}
                </h2>
                <p className="mt-4 text-base leading-7 text-ink/74">
                  {t(scenario.resultLabel, language)}
                </p>
                <p className="mt-4 editorial-example">
                  {t(scenario.note, language)}
                </p>
              </article>
            ))}
            </div>
          </section>
        </Reveal>
      }
    />
  );
}
