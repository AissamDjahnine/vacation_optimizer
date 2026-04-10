"use client";

import { cn } from "@/components/cn";
import { trackEvent } from "@/lib/analytics";
import type { AppLanguage } from "@/lib/i18n";

type Provider = {
  id: "google_flights" | "skyscanner" | "kayak";
  label: string;
  href: string;
};

const providers: Provider[] = [
  {
    id: "google_flights",
    label: "Google Flights",
    href: "https://www.google.com/travel/flights",
  },
  {
    id: "skyscanner",
    label: "Skyscanner",
    href: "https://www.skyscanner.com",
  },
  {
    id: "kayak",
    label: "Kayak",
    href: "https://www.kayak.com/flights",
  },
];

export function TravelComparisonLinks({
  language,
  startDate,
  endDate,
  className,
  compact = false,
}: {
  language: AppLanguage;
  startDate: Date;
  endDate: Date;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className={compact ? "space-y-2" : "space-y-1"}>
        <p className={cn("editorial-kicker", compact ? "text-white/68" : "")}>
          {language === "en" ? "Travel comparisons" : "Comparateurs voyage"}
        </p>
        <p className={cn("text-sm leading-6", compact ? "text-white/78" : "text-ink/68")}>
          {language === "en"
            ? "Compare flights for these dates before exporting the plan."
            : "Comparez les vols pour ces dates avant d’exporter le plan."}
        </p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {providers.map((provider) => (
          <a
            key={provider.id}
            href={provider.href}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackEvent("outbound_travel_compare", {
                provider: provider.id,
                context: "planner_result",
                start_date: startDate.toISOString().slice(0, 10),
                end_date: endDate.toISOString().slice(0, 10),
              })
            }
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-full border px-4 text-sm font-bold shadow-sm transition hover:-translate-y-0.5",
              compact
                ? "border-white/15 bg-white text-ink hover:bg-white/92"
                : "border-ink/10 bg-ink text-white hover:border-ink hover:bg-ink/92",
            )}
          >
            {provider.label}
          </a>
        ))}
      </div>
    </div>
  );
}
