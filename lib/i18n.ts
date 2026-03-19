export type AppLanguage = "fr" | "en" | "de";

export type LocalizedText = {
  fr: string;
  en: string;
};

export function t(value: LocalizedText, language: AppLanguage): string {
  return language === "en" ? value.en : value.fr;
}

export function isEnglishPath(pathname: string): boolean {
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function isGermanPath(pathname: string): boolean {
  return pathname === "/de" || pathname.startsWith("/de/");
}

export function isEnglishHost(hostname: string): boolean {
  return hostname === "en.pontsmalins.com" || hostname.startsWith("en.");
}

export function isGermanHost(hostname: string): boolean {
  return hostname === "de.pontsmalins.com" || hostname.startsWith("de.");
}

export function resolveLanguage(pathname: string, hostname = ""): AppLanguage {
  if (isGermanHost(hostname) || isGermanPath(pathname)) {
    return "de";
  }
  if (isEnglishHost(hostname) || isEnglishPath(pathname)) {
    return "en";
  }
  return "fr";
}

export function stripLanguagePrefix(pathname: string): string {
  if (pathname === "/en") {
    return "/";
  }
  if (pathname === "/de") {
    return "/";
  }
  const stripped = pathname.startsWith("/en/")
    ? pathname.slice(3) || "/"
    : pathname.startsWith("/de/")
      ? pathname.slice(3) || "/"
      : pathname;
  const annualPlannerMatch = stripped.match(/^\/plan-year\/(\d{4})$/);
  if (annualPlannerMatch) {
    return `/planifier-annee/${annualPlannerMatch[1]}`;
  }
  return stripped;
}

export function prefixForLanguage(pathname: string, language: AppLanguage): string {
  const stripped = stripLanguagePrefix(pathname);
  const annualPlannerMatch = stripped.match(/^\/planifier-annee\/(\d{4})$/);
  if (language === "en") {
    if (annualPlannerMatch) {
      return `/en/plan-year/${annualPlannerMatch[1]}`;
    }
    return stripped === "/" ? "/en" : `/en${stripped}`;
  }
  if (language === "de") {
    return stripped === "/" ? "/de" : `/de${stripped}`;
  }
  return stripped;
}
