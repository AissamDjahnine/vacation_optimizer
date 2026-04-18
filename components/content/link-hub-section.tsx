import Link from "next/link";
import Script from "next/script";
import { Reveal } from "@/components/motion/reveal";
import { trackEvent } from "@/lib/analytics";
import type { AppLanguage } from "@/lib/i18n";
import { prefixForLanguage } from "@/lib/i18n";
import { buildItemListSchema } from "@/lib/seo";

type LinkHubItem = {
  href: string;
  title: string;
  body: string;
};

export function LinkHubSection({
  language,
  kicker,
  title,
  intro,
  items,
  source,
  pageType,
  schemaId,
}: {
  language: AppLanguage;
  kicker: string;
  title: string;
  intro: string;
  items: LinkHubItem[];
  source: string;
  pageType: string;
  schemaId?: string;
}) {
  const schema = schemaId
    ? buildItemListSchema({
        name: title,
        items: items.map((item) => ({
          name: item.title,
          url: prefixForLanguage(item.href, language),
          description: item.body,
        })),
      })
    : null;

  return (
    <Reveal>
      <section className="site-card p-6 sm:p-8">
        {schema ? (
          <Script
            id={schemaId}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ) : null}
        <p className="editorial-kicker">{kicker}</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">{title}</h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-ink/72 sm:text-lg">{intro}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={prefixForLanguage(item.href, language)}
              onClick={() =>
                trackEvent("guide_click", {
                  language,
                  source,
                  page_type: pageType,
                  destination: item.href,
                })
              }
              className="rounded-4xl border border-line bg-slate-50/70 p-5 transition hover:-translate-y-0.5 hover:border-[#1f4471] hover:bg-white"
            >
              <h3 className="text-xl font-black tracking-tight text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/72">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
