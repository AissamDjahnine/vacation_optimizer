import type { GermanyLocale } from "@/lib/domain/types";

export type GermanyText = {
  de: string;
  en: string;
};

export function tg(value: GermanyText, locale: GermanyLocale) {
  return locale === "en" ? value.en : value.de;
}

export function resolveGermanyLocale(pathname: string): GermanyLocale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
}

export function withGermanyLocale(pathname: string, locale: GermanyLocale) {
  if (locale === "de") {
    return pathname === "/en" ? "/" : pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  }

  if (pathname === "/") {
    return "/en";
  }

  return pathname.startsWith("/en/") || pathname === "/en" ? pathname : `/en${pathname}`;
}

export function germanyPath(pathname: string, locale: GermanyLocale) {
  return withGermanyLocale(pathname, locale);
}
