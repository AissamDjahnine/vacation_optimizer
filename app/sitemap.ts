import type { MetadataRoute } from "next";
import { routes } from "@/lib/routes";

const baseUrl = "https://pontsmalins.com";

const pages = [
  routes.home,
  routes.annualPlannerYear(2026),
  routes.annualPlannerYear(2027),
  routes.bridgesYear(2026),
  routes.bridgesYear(2027),
  routes.holidaysYear(2026),
  routes.holidaysYear(2027),
  routes.schoolHolidaysBridgesYear(2026),
  routes.schoolHolidaysBridgesYear(2027),
  routes.leaveGuide2026,
  routes.schoolHolidaysFamily2026,
  routes.holidaysAndBridges2027,
  routes.faq,
  routes.ascension2026,
  routes.mayBridges2026,
  routes.schoolHolidaysZone2026("A"),
  routes.schoolHolidaysZone2026("B"),
  routes.schoolHolidaysZone2026("C"),
  routes.weekdayHolidays2026,
  routes.leaveBudget5Guide2026,
  routes.leaveBudget10Guide2026,
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((path) => [
    {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en${path === "/" ? "" : path}`,
          fr: `${baseUrl}${path}`,
        },
      },
    },
  ]);
}
