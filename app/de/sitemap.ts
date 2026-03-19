import type { MetadataRoute } from "next";
import { germanGuidePages } from "@/lib/germany/content";
import { germanYears } from "@/lib/germany/constants";
import { deRoutes, toGermanyExternalPath } from "@/lib/germany/routes";
import { buildGermanSitemapEntry } from "@/lib/germany/seo";
import { germanStates } from "@/lib/germany/states";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    buildGermanSitemapEntry("/", 1, "weekly"),
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

  return entries;
}
