import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import type { AppLanguage } from "@/lib/i18n";

type PrimaryActionPanelProps = {
  language: AppLanguage;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  source: string;
  eventName?: "annual_plan_click" | "guide_click";
  destination?: string;
  trustItems?: string[];
};

function defaultTrustItems(language: AppLanguage) {
  if (language === "en") {
    return ["Official dates", "Free", "No account", "Exportable"];
  }
  if (language === "de") {
    return ["Offizielle Quellen", "Kostenlos", "Ohne Konto", "Direkte Einstiege"];
  }
  return ["Dates officielles", "Gratuit", "Sans compte", "Exportable"];
}

export function PrimaryActionPanel({
  language,
  title,
  description,
  primaryHref,
  primaryLabel,
  source,
  eventName = "guide_click",
  destination,
  trustItems,
}: PrimaryActionPanelProps) {
  const chips = trustItems ?? defaultTrustItems(language);

  return (
    <section className="site-card p-6 sm:p-8">
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-3">
          <p className="editorial-kicker">
            {language === "en"
              ? "Primary action"
              : language === "de"
                ? "Nächster sinnvoller Schritt"
                : "Action principale"}
          </p>
          <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h2>
          <p className="max-w-3xl text-base leading-7 text-ink/72 sm:text-lg">{description}</p>
        </div>
        <div className="rounded-[1.8rem] border border-line bg-slate-50/70 p-5">
          <Link
            href={primaryHref}
            onClick={() =>
              trackEvent(eventName, {
                language,
                source,
                destination: destination ?? primaryHref,
              })
            }
            className="inline-flex w-full items-center justify-center rounded-full bg-coral px-6 py-3 text-center text-lg font-bold text-white transition hover:-translate-y-0.5 hover:bg-coral/90"
          >
            {primaryLabel}
          </Link>
          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((item) => (
              <span key={item} className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink/68">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
