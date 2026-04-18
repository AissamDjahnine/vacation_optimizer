import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { trackEvent } from "@/lib/analytics";
import type { RelatedLink } from "@/lib/domain/types";
import type { AppLanguage } from "@/lib/i18n";
import { prefixForLanguage, t } from "@/lib/i18n";

export function RelatedLinks({
  title,
  links,
  language,
  source = "related_links",
  pageType = "related_links",
}: {
  title: string;
  links: RelatedLink[];
  language: AppLanguage;
  source?: string;
  pageType?: string;
}) {
  return (
    <Reveal>
      <section className="site-card p-6 sm:p-8">
        <p className="editorial-kicker">{language === "en" ? "Next step" : "Étape suivante"}</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-ink">{title}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={prefixForLanguage(link.href, language)}
              onClick={() =>
                trackEvent("guide_click", {
                  language,
                  source,
                  page_type: pageType,
                  destination: link.href,
                })
              }
              className="rounded-3xl border border-line bg-slate-50/70 px-5 py-4 text-base font-semibold text-ink transition hover:-translate-y-0.5 hover:border-[#1f4471] hover:bg-white hover:text-[#1f4471]"
            >
              {t(link.label, language)}
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
