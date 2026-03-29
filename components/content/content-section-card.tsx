import { cn } from "@/components/cn";
import { ContentChip } from "@/components/content/content-chip";
import { Reveal } from "@/components/motion/reveal";
import type { ContentSection } from "@/lib/domain/types";
import type { AppLanguage } from "@/lib/i18n";
import { t } from "@/lib/i18n";

const accentMap = {
  neutral: "border-line bg-white",
  orange: "border-orange-200 bg-gradient-to-br from-white to-[#fff4ed]",
  blue: "border-sky-200 bg-gradient-to-br from-white to-[#eff6ff]",
  purple: "border-violet-200 bg-gradient-to-br from-white to-[#f5f1ff]",
  green: "border-emerald-200 bg-gradient-to-br from-white to-[#eefbf4]",
};

export function ContentSectionCard({
  section,
  language,
}: {
  section: ContentSection;
  language: AppLanguage;
}) {
  return (
    <Reveal>
      <section
        className={cn(
          "site-card p-7 sm:p-10",
          accentMap[section.accent ?? "neutral"],
        )}
      >
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="editorial-kicker">
              {language === "en" ? "Useful point" : "Point utile"}
            </p>
            <h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">
              {t(section.title, language)}
            </h2>
            {section.chips && section.chips.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {section.chips.map((chip) => (
                  <ContentChip key={t(chip, language)} value={chip} language={language} />
                ))}
              </div>
            ) : null}
          </div>

          {section.body?.length ? (
            <div className="content-copy space-y-4">
              {section.body.map((paragraph) => (
                <p key={t(paragraph, language)}>{t(paragraph, language)}</p>
              ))}
            </div>
          ) : null}

          {section.quote ? (
            <blockquote className="rounded-3xl border border-slate-200 bg-white px-5 py-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                {language === "en" ? "Quote" : "Citation"}
              </p>
              <p className="mt-3 text-lg leading-8 text-ink/82">“{t(section.quote, language)}”</p>
            </blockquote>
          ) : null}

          {section.bullets?.length ? (
            <ul className="space-y-3 pl-5 text-base leading-7 text-ink/78">
              {section.bullets.map((bullet) => (
                <li key={t(bullet, language)}>{t(bullet, language)}</li>
              ))}
            </ul>
          ) : null}

          {section.example ? (
            <div className="editorial-example">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700/80">
                {language === "en" ? "Example" : "Exemple"}
              </p>
              <p className="mt-2">{t(section.example, language)}</p>
            </div>
          ) : null}

          {section.specialCase ? (
            <div className="editorial-note">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1f4471]">
                {language === "en" ? "Avoid this trap" : "À éviter"}
              </p>
              <p className="mt-2">{t(section.specialCase, language)}</p>
            </div>
          ) : null}
        </div>
      </section>
    </Reveal>
  );
}
