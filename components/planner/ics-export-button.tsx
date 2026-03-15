"use client";

import { useState } from "react";
import { cn } from "@/components/cn";
import { downloadCalendarBundle } from "@/lib/calendar-export";
import type { CalendarExportBundle } from "@/lib/domain/types";

export function IcsExportButton({
  bundle,
  label,
  className,
}: {
  bundle: CalendarExportBundle;
  label: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);

  const handleClick = () => {
    downloadCalendarBundle(bundle);
    setDone(true);
    window.setTimeout(() => setDone(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-full border border-line bg-white px-5 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-coral hover:text-coral",
        done ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "bg-white",
        className,
      )}
    >
      {done ? "OK" : label}
    </button>
  );
}
