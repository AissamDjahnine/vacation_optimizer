"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent } from "@/lib/analytics";

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

type TrackedLinkProps = Omit<ComponentProps<typeof Link>, "onClick"> & {
  analyticsEvent: string;
  analyticsParams?: AnalyticsParams;
};

export function TrackedLink({
  analyticsEvent,
  analyticsParams,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={() => {
        trackEvent(analyticsEvent, analyticsParams);
      }}
    />
  );
}
