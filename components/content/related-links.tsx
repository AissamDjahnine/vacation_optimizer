import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import type { RelatedLink } from "@/lib/domain/types";
import type { AppLanguage } from "@/lib/i18n";
import { prefixForLanguage, t } from "@/lib/i18n";

export function RelatedLinks({
  title,
  links,
  language,
}: {
  title: string;
  links: RelatedLink[];
  language: AppLanguage;
}) {
  return (
    <Reveal>
      <section className="editorial-panel">
        <p className="editorial-kicker">{language === "en" ? "Next step" : "Étape suivante"}</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-ink">{title}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={prefixForLanguage(link.href, language)}
              className="rounded-3xl border border-line bg-paper px-5 py-4 text-base font-semibold text-ink transition hover:-translate-y-0.5 hover:border-coral hover:bg-white hover:text-coral"
            >
              {t(link.label, language)}
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
