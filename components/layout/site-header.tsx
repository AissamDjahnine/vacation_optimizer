"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/cn";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { trackEvent } from "@/lib/analytics";
import type { GermanyLocale } from "@/lib/domain/types";
import { withGermanyLocale } from "@/lib/germany/i18n";
import { deRoutes, toGermanyExternalPath } from "@/lib/germany/routes";
import { AppLanguage, prefixForLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";

type SiteHeaderProps = {
  language: AppLanguage;
  host?: string;
  germanyHost?: boolean;
  germanyLocale?: GermanyLocale;
};

const navItems = {
  fr: [
    { href: routes.home, label: "Simulateur" },
    { href: routes.annualPlannerYear(2026), label: "Plan annuel" },
    { href: routes.bridgesYear(2026), label: "Ponts" },
    { href: routes.holidaysYear(2026), label: "Jours fériés" },
    { href: routes.schoolHolidaysBridgesYear(2026), label: "Vacances scolaires" },
    { href: "https://de.pontsmalins.com/", label: "Allemagne" },
  ],
  en: [
    { href: routes.home, label: "Planner" },
    { href: routes.annualPlannerYear(2026), label: "Year plan" },
    { href: routes.bridgesYear(2026), label: "Bridges" },
    { href: routes.holidaysYear(2026), label: "Public holidays" },
    { href: routes.schoolHolidaysBridgesYear(2026), label: "School holidays" },
    { href: "https://de.pontsmalins.com/en", label: "Germany" },
  ],
  de: [
    { href: "/de", label: "Deutschland" },
    { href: "/de/brueckentage-deutschland/2026", label: "Brückentage" },
    { href: "/de/feiertage-deutschland/2026", label: "Feiertage" },
    { href: "/de/schulferien-deutschland/2026", label: "Schulferien" },
    { href: "/de/ratgeber/was-ist-ein-brueckentag", label: "Ratgeber" },
  ],
} as const;

export function SiteHeader({ language, host, germanyHost = false, germanyLocale = "de" }: SiteHeaderProps) {
  const pathname = usePathname() || "/";
  const localizedPath = (path: string) => prefixForLanguage(path, language);
  const localizedGermanyPath = (path: string) =>
    withGermanyLocale(toGermanyExternalPath(path), germanyLocale);
  const germanyNavItems =
    germanyLocale === "en"
      ? [
          { href: deRoutes.home, label: "Germany" },
          { href: deRoutes.countryBridgesYear(2026), label: "Bridge days" },
          { href: deRoutes.countryHolidaysYear(2026), label: "Public holidays" },
          { href: deRoutes.countrySchoolHolidaysYear(2026), label: "School holidays" },
          { href: deRoutes.guide("was-ist-ein-brueckentag"), label: "Guides" },
        ]
      : navItems.de;
  const displayedNavItems = germanyHost ? germanyNavItems : navItems[language];
  const displayedHomeHref = germanyHost ? localizedGermanyPath(deRoutes.home) : localizedPath(routes.home);
  const subtitle = germanyHost
    ? germanyLocale === "en"
      ? "Bridge days, public holidays and school holidays in Germany"
      : "Brückentage, Feiertage und Schulferien in Deutschland"
    : language === "en"
      ? "French leave planner and bridge ideas"
      : "Simulateur de ponts et congés en France";

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white">
      <div className="container-shell flex items-center justify-between gap-4 py-3">
        <Link href={displayedHomeHref} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f4471] text-base font-black text-white shadow-sm">
            PM
          </div>
          <div className="leading-tight">
            <p className="text-lg font-extrabold tracking-tight text-ink">Ponts Malins</p>
            <p className="text-xs font-medium text-ink/56">{subtitle}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {displayedNavItems.map((item) => {
            const external = item.href.startsWith("https://");
            const active =
              !external &&
              stripTrailingSlash(pathname) ===
              stripTrailingSlash(germanyHost ? localizedGermanyPath(item.href) : localizedPath(item.href));
            return (
              <Link
                key={item.href}
                href={
                  external
                    ? item.href
                    : germanyHost
                      ? localizedGermanyPath(item.href)
                      : localizedPath(item.href)
                }
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                onClick={() => {
                  if (item.href.includes("de.pontsmalins.com")) {
                    trackEvent("germany_entry_click", {
                      language,
                      source: "site_header",
                      destination: item.href,
                    });
                  }
                }}
              className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "bg-[#1f4471] text-white shadow-sm"
                    : "text-ink/68 hover:bg-slate-50 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <LanguageSwitch host={host} germanyLocale={germanyHost ? germanyLocale : undefined} />
      </div>
    </header>
  );
}

function stripTrailingSlash(path: string) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}
