import { AuthorityBlock } from "@/components/content/authority-block";
import { schoolAuthority2026Block } from "@/content/official-cases";
import { schoolHolidaysFamily2026Content } from "@/content/school-holidays-family-2026";
import { GenericGuidePage } from "@/components/pages/generic-guide-page";
import { Reveal } from "@/components/motion/reveal";
import { ZoneLookupPanel } from "@/components/planner/zone-lookup-panel";
import type { AppLanguage } from "@/lib/i18n";
import { prefixForLanguage, t } from "@/lib/i18n";
import { routes } from "@/lib/routes";

export function SchoolHolidaysFamily2026Page({
  language,
}: {
  language: AppLanguage;
}) {
  return (
    <GenericGuidePage
      language={language}
      badge={{ fr: "Familles", en: "Families" }}
      content={schoolHolidaysFamily2026Content}
      path={prefixForLanguage(routes.schoolHolidaysFamily2026, language)}
      extraBlocks={
        <Reveal>
          <section className="grid gap-6">
            <ZoneLookupPanel
              language={language}
              title={
                language === "en"
                  ? "Find the right family zone first"
                  : "Trouvez d’abord la bonne zone famille"
              }
              subtitle={
                language === "en"
                  ? "If you do not know your zone, start here before comparing the examples below."
                  : "Si vous ne connaissez pas votre zone, commencez ici avant de comparer les exemples ci-dessous."
              }
              actionHrefTemplate={`${routes.home}?zone={zone}`}
              actionLabel={language === "en" ? "Open the planner with this zone" : "Ouvrir le simulateur avec cette zone"}
            />

            <AuthorityBlock block={schoolAuthority2026Block} language={language} />

            <section className="editorial-panel space-y-5">
            <div className="space-y-3">
              <p className="editorial-kicker">{language === "en" ? "Family presets" : "Réglages famille"}</p>
              <h2 className="text-3xl font-black tracking-tight text-ink">
                {language === "en"
                  ? "Pick a zone first, then compare family-friendly examples"
                  : "Choisissez d’abord une zone, puis comparez des exemples famille"}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {(["A", "B", "C"] as const).map((zone) => (
                <a key={zone} href={`${prefixForLanguage(routes.home, language)}?zone=${zone}`} className="chip">
                  {language === "en" ? "Zone" : "Zone"} {zone}
                </a>
              ))}
            </div>
            <div className="editorial-grid">
              {schoolHolidaysFamily2026Content.examples.map((example) => (
                <article
                  key={t(example.title, language)}
                  className="rounded-4xl border border-line bg-paper p-6"
                >
                  <p className="text-2xl font-black tracking-tight text-ink">
                    {t(example.title, language)}
                  </p>
                <p className="mt-4 text-base leading-7 text-ink/74">
                  {t(example.summary, language)}
                </p>
                <p className="mt-4 editorial-example bg-lavender text-indigo-800">
                  {t(example.note, language)}
                </p>
              </article>
            ))}
            </div>
          </section>
          </section>
        </Reveal>
      }
    />
  );
}
