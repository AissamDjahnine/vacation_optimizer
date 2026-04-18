"use client";

import { cn } from "@/components/cn";
import { trackEvent } from "@/lib/analytics";
import type { AppLanguage } from "@/lib/i18n";

type Provider = {
  id: "google_flights" | "skyscanner" | "kayak";
  label: string;
  href: string;
  className: string;
};

const providers: Provider[] = [
  {
    id: "google_flights",
    label: "Google Flights",
    href: "https://www.google.com/travel/flights",
    className:
      "border-[#d6e8d8] bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_42%,#e8f5e9_100%)] text-[#1b5e20] hover:border-[#7cb342] hover:bg-[linear-gradient(135deg,#ffffff_0%,#f1f8e9_100%)]",
  },
  {
    id: "skyscanner",
    label: "Skyscanner",
    href: "https://www.skyscanner.com",
    className:
      "border-[#cfe3ff] bg-[linear-gradient(135deg,#ffffff_0%,#eef6ff_100%)] text-[#0f5fcd] hover:border-[#65a8ff] hover:bg-[linear-gradient(135deg,#ffffff_0%,#e5f0ff_100%)]",
  },
  {
    id: "kayak",
    label: "Kayak",
    href: "https://www.kayak.com/flights",
    className:
      "border-[#ffd6bd] bg-[linear-gradient(135deg,#ffffff_0%,#fff1e8_100%)] text-[#c45700] hover:border-[#ff9f61] hover:bg-[linear-gradient(135deg,#ffffff_0%,#ffe9d9_100%)]",
  },
];

export function TravelComparisonLinks({
  language,
  startDate,
  endDate,
  className,
  compact = false,
  title = true,
  source = "planner_result",
  pageType = "planner_result",
  rank,
  daysOff,
  leaveDaysUsed,
}: {
  language: AppLanguage;
  startDate: Date;
  endDate: Date;
  className?: string;
  compact?: boolean;
  title?: boolean;
  source?: "planner_result" | "annual_page" | "guide_page" | "home_banner";
  pageType?: string;
  rank?: number;
  daysOff?: number;
  leaveDaysUsed?: number;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {title ? (
        <div className={compact ? "space-y-2" : "space-y-1"}>
          <p className={cn("editorial-kicker", compact ? "text-white/68" : "")}>
            {language === "en" ? "Travel comparisons" : "Comparateurs voyage"}
          </p>
          <p className={cn("text-sm leading-6", compact ? "text-white/78" : "text-ink/68")}>
            {language === "en"
              ? "Compare flights for these dates."
              : "Comparez les vols pour ces dates."}
          </p>
        </div>
      ) : null}
      <div className={cn("grid gap-2.5", compact ? "grid-cols-1" : "sm:grid-cols-3")}>
        {providers.map((provider) => (
          <a
            key={provider.id}
            href={provider.href}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              const basePayload = {
                language,
                source,
                page_type: pageType,
                provider: provider.id,
                year: startDate.getFullYear(),
                month: startDate.getMonth() + 1,
                rank,
                days_off: daysOff,
                leave_days_used: leaveDaysUsed,
                start_date: startDate.toISOString().slice(0, 10),
                end_date: endDate.toISOString().slice(0, 10),
              };

              trackEvent("result_cta_click", basePayload);
              trackEvent("outbound_travel_compare", basePayload);
            }}
            className={cn(
              "inline-flex h-11 w-full items-center justify-center rounded-2xl border px-4 py-2 text-sm font-bold shadow-sm transition hover:-translate-y-0.5",
              provider.className,
            )}
          >
            {provider.label}
          </a>
        ))}
      </div>
    </div>
  );
}
