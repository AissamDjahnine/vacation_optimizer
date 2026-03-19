import type { MetadataRoute } from "next";
import { germanGuidePages } from "@/lib/germany/content";
import { germanYears } from "@/lib/germany/constants";
import { deRoutes, toGermanyExternalPath } from "@/lib/germany/routes";
import { buildGermanSitemapEntry } from "@/lib/germany/seo";
import { germanStates } from "@/lib/germany/states";

function inEnglish(path: string) {
  return path === "/" ? "/en" : `/en${path}`;
}

function toEnglishUrl(url: string) {
  const base = "https://de.pontsmalins.com";
  const path = url.slice(base.length) || "/";
  return `${base}${inEnglish(path)}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const germanCoreEntries: MetadataRoute.Sitemap = [
    buildGermanSitemapEntry("/", 1, "weekly"),
    buildGermanSitemapEntry(toGermanyExternalPath(deRoutes.sources), 0.7, "yearly"),
    ...germanYears.flatMap((year) => [
      buildGermanSitemapEntry(toGermanyExternalPath(deRoutes.countryBridgesYear(year)), 0.95, "monthly"),
      buildGermanSitemapEntry(toGermanyExternalPath(deRoutes.countryHolidaysYear(year)), 0.95, "monthly"),
      buildGermanSitemapEntry(toGermanyExternalPath(deRoutes.countrySchoolHolidaysYear(year)), 0.95, "monthly"),
    ]),
    ...Object.keys(germanGuidePages).map((slug) =>
      buildGermanSitemapEntry(toGermanyExternalPath(deRoutes.guide(slug)), 0.8, "yearly"),
    ),
    ...germanStates.flatMap((state) =>
      germanYears.flatMap((year) => [
        buildGermanSitemapEntry(toGermanyExternalPath(deRoutes.stateBridgesYear(year, state.code)), 0.9, "monthly"),
        buildGermanSitemapEntry(toGermanyExternalPath(deRoutes.stateHolidaysYear(year, state.code)), 0.9, "monthly"),
        buildGermanSitemapEntry(toGermanyExternalPath(deRoutes.stateSchoolHolidaysYear(year, state.code)), 0.9, "monthly"),
      ]),
    ),
  ];

  const entries: MetadataRoute.Sitemap = [
    ...germanCoreEntries,
    ...germanCoreEntries.map((entry) => ({
      ...entry,
      url: toEnglishUrl(entry.url),
    })),
  ];

  return entries;
}
