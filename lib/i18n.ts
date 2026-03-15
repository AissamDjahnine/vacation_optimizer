export type AppLanguage = "fr" | "en";

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

export function stripLanguagePrefix(pathname: string): string {
  if (pathname === "/en") {
    return "/";
  }
  const stripped = pathname.startsWith("/en/") ? pathname.slice(3) || "/" : pathname;
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
  return stripped;
}
