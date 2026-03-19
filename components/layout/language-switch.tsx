"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/cn";
import { AppLanguage, isEnglishPath, isGermanPath, prefixForLanguage } from "@/lib/i18n";

export function LanguageSwitch() {
  const pathname = usePathname() || "/";
  if (isGermanPath(pathname)) {
    return null;
  }

  const currentLanguage: AppLanguage = isEnglishPath(pathname) ? "en" : "fr";

  return (
    <div className="inline-flex rounded-full border border-line bg-white/80 p-1 shadow-sm backdrop-blur">
      {(["fr", "en"] as const).map((language) => {
        const active = currentLanguage === language;
        const href = prefixForLanguage(pathname, language);
        return (
          <Link
            key={language}
            href={href}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors",
              active ? "bg-ink text-white" : "text-ink/60 hover:text-ink",
            )}
          >
            {language}
          </Link>
        );
      })}
    </div>
  );
}
