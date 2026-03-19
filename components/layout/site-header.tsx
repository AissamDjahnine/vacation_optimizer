"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/cn";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { AppLanguage, prefixForLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";

type SiteHeaderProps = {
  language: AppLanguage;
};

const navItems = {
  fr: [
    { href: routes.home, label: "Simulateur" },
    { href: routes.annualPlannerYear(2026), label: "Plan annuel" },
    { href: routes.bridgesYear(2026), label: "Ponts" },
    { href: routes.holidaysYear(2026), label: "Jours fériés" },
    { href: routes.schoolHolidaysBridgesYear(2026), label: "Vacances scolaires" },
  ],
  en: [
    { href: routes.home, label: "Planner" },
    { href: routes.annualPlannerYear(2026), label: "Year plan" },
    { href: routes.bridgesYear(2026), label: "Bridges" },
    { href: routes.holidaysYear(2026), label: "Public holidays" },
    { href: routes.schoolHolidaysBridgesYear(2026), label: "School holidays" },
  ],
  de: [
    { href: "/de", label: "Deutschland" },
    { href: "/de/brueckentage-deutschland/2026", label: "Brückentage" },
    { href: "/de/feiertage-deutschland/2026", label: "Feiertage" },
    { href: "/de/schulferien-deutschland/2026", label: "Schulferien" },
    { href: "/de/ratgeber/was-ist-ein-brueckentag", label: "Ratgeber" },
  ],
} as const;

export function SiteHeader({ language }: SiteHeaderProps) {
  const pathname = usePathname() || "/";
  const localizedPath = (path: string) => prefixForLanguage(path, language);

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/80 py-3 backdrop-blur-md">
      <div className="container-shell flex items-center justify-between gap-4">
        <Link href={localizedPath(routes.home)} className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-lg font-black text-white shadow-card">
            PM
          </div>
          <div>
            <p className="text-xl font-extrabold tracking-tight text-ink">Ponts Malins</p>
            <p className="text-sm text-ink/62">
              {language === "de"
                ? "Brückentage, Feiertage und Schulferien in Deutschland"
                : language === "en"
                ? "French leave planner and bridge ideas"
                : "Simulateur de ponts et congés en France"}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems[language].map((item) => {
            const active =
              stripTrailingSlash(pathname) === stripTrailingSlash(localizedPath(item.href));
            return (
              <Link
                key={item.href}
                href={localizedPath(item.href)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "bg-ink text-white"
                    : "text-ink/70 hover:bg-white hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <LanguageSwitch />
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
