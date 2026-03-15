import { Reveal } from "@/components/motion/reveal";
import type { LocalizedText } from "@/lib/domain/types";
import type { AppLanguage } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function ContentHero({
  badge,
  title,
  subtitle,
  language,
}: {
  badge: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  language: AppLanguage;
}) {
  return (
    <Reveal>
      <section className="glass-panel rounded-[2.25rem] px-6 py-10 sm:px-10 sm:py-14">
        <span className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink/75">
          {t(badge, language)}
        </span>
        <div className="mt-6 space-y-5">
          <h1 className="text-4xl font-black tracking-tight text-ink sm:text-6xl">
            {t(title, language)}
          </h1>
          <p className="max-w-4xl text-lg leading-8 text-ink/72 sm:text-[1.35rem]">
            {t(subtitle, language)}
          </p>
        </div>
      </section>
    </Reveal>
  );
}
