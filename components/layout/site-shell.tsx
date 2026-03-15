"use client";

import { usePathname } from "next/navigation";
import { HashRouteRedirect } from "@/components/layout/hash-route-redirect";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AppLanguage, isEnglishPath } from "@/lib/i18n";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const language: AppLanguage = isEnglishPath(pathname) ? "en" : "fr";

  return (
    <>
      <HashRouteRedirect />
      <SiteHeader language={language} />
      <main>{children}</main>
      <SiteFooter language={language} />
    </>
  );
}
