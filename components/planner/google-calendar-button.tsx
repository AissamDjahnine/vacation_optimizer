"use client";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/components/cn";

export function GoogleCalendarButton({
  href,
  label,
  className,
  analyticsContext,
}: {
  href: string;
  label: string;
  className?: string;
  analyticsContext?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() =>
        trackEvent("outbound_calendar_export", {
          export_type: "google_calendar",
          context: analyticsContext ?? "planner_result",
        })
      }
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line bg-white px-5 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-gcal hover:text-gcal",
        className,
      )}
    >
      <CalendarButtonIcon />
      {label}
    </a>
  );
}

function CalendarButtonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="4.5" width="13" height="12" rx="2.5" />
      <path d="M6.5 2.8v3.4M13.5 2.8v3.4M3.5 8h13" />
    </svg>
  );
}
