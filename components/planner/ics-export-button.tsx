"use client";

import { useState } from "react";
import { cn } from "@/components/cn";
import { downloadCalendarBundle } from "@/lib/calendar-export";
import { trackEvent } from "@/lib/analytics";
import type { CalendarExportBundle } from "@/lib/domain/types";

export function IcsExportButton({
  bundle,
  label,
  className,
  analyticsContext,
}: {
  bundle: CalendarExportBundle;
  label: string;
  className?: string;
  analyticsContext?: string;
}) {
  const [done, setDone] = useState(false);

  const handleClick = () => {
    trackEvent("outbound_calendar_export", {
      export_type: "ics",
      context: analyticsContext ?? "planner_result",
    });
    downloadCalendarBundle(bundle);
    setDone(true);
    window.setTimeout(() => setDone(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line bg-white px-5 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-coral hover:text-coral",
        done ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "bg-white",
        className,
      )}
    >
      <CalendarButtonIcon />
      {done ? "OK" : label}
    </button>
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
