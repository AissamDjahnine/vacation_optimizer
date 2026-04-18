import { leaveGuide2026Content } from "@/content/guide-leave-2026";
import { FaqListSection } from "@/components/content/faq-list-section";
import { GenericGuidePage } from "@/components/pages/generic-guide-page";
import { Reveal } from "@/components/motion/reveal";
import type { AppLanguage } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { prefixForLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";

export function LeaveGuide2026Page({ language }: { language: AppLanguage }) {
  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: "Guide", en: "Guide" }}
      content={leaveGuide2026Content}
      path={prefixForLanguage(routes.leaveGuide2026, language)}
      extraBlocks={
        <>
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
          <Reveal>
            <FaqListSection
              kicker={language === "en" ? "FAQ" : "FAQ"}
              schemaId={`faq-leave-guide-2026-${language}`}
              title={
                language === "en"
                  ? "Questions before booking leave in 2026"
                  : "Questions fréquentes avant de poser ses congés en 2026"
              }
              items={
                language === "en"
                  ? [
                      {
                        question: "How should I choose the first month to test in 2026?",
                        answer:
                          "Start with the strongest scenario for your leave budget, then reopen that month in the planner to confirm the exact dates and total days off.",
                      },
                      {
                        question: "Should I plan from the guide alone?",
                        answer:
                          "No. The guide narrows down the useful cases, but the planner is where your exact leave budget, RTT and month choices become reliable.",
                      },
                    ]
                  : [
                      {
                        question: "Comment choisir le premier mois à tester en 2026 ?",
                        answer:
                          "Commencez par le scénario le plus fort pour votre budget, puis rouvrez ce mois dans le simulateur pour confirmer les dates exactes et le total de jours gagnés.",
                      },
                      {
                        question: "Peut-on planifier uniquement avec ce guide ?",
                        answer:
                          "Non. Le guide sert à réduire les cas utiles, mais la validation fiable se fait dans le simulateur avec votre budget exact, vos RTT et votre mois cible.",
                      },
                    ]
              }
            />
          </Reveal>
        </>
      }
    />
  );
}
