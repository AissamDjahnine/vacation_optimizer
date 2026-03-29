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
      <section className="site-card px-6 py-10 sm:px-10 sm:py-14">
        <span className="site-badge">
          {t(badge, language)}
        </span>
        <div className="mt-6 space-y-5">
          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {t(title, language)}
          </h1>
          <p className="max-w-4xl text-lg leading-8 text-ink/70 sm:text-[1.3rem]">
            {t(subtitle, language)}
          </p>
        </div>
      </section>
    </Reveal>
  );
}
