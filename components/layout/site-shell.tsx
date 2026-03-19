"use client";

import { usePathname } from "next/navigation";
import { HashRouteRedirect } from "@/components/layout/hash-route-redirect";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AppLanguage, resolveLanguage } from "@/lib/i18n";

export function SiteShell({
  children,
  initialHost = "",
  initialLanguage,
}: {
  children: React.ReactNode;
  initialHost?: string;
  initialLanguage?: AppLanguage;
}) {
  const pathname = usePathname() || "/";
  const language: AppLanguage = initialLanguage ?? resolveLanguage(pathname, initialHost);

  return (
    <>
      <HashRouteRedirect />
      <SiteHeader language={language} host={initialHost} />
      <main>{children}</main>
      <SiteFooter language={language} />
    </>
  );
}
