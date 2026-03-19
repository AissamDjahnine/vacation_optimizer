import type { MetadataRoute } from "next";
import { prefixForLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";

const baseUrl = "https://pontsmalins.com";

const pages = [
  routes.home,
  routes.annualPlannerYear(2026),
  routes.annualPlannerYear(2027),
  routes.annualPlannerYear(2028),
  routes.annualPlannerYear(2029),
  routes.bridgesYear(2026),
  routes.bridgesYear(2027),
  routes.bridgesYear(2028),
  routes.bridgesYear(2029),
  routes.holidaysYear(2026),
  routes.holidaysYear(2027),
  routes.holidaysYear(2028),
  routes.holidaysYear(2029),
  routes.schoolHolidaysBridgesYear(2026),
  routes.schoolHolidaysBridgesYear(2027),
  routes.schoolHolidaysBridgesYear(2028),
  routes.schoolHolidaysBridgesYear(2029),
  routes.leaveGuide2026,
  routes.schoolHolidaysFamily2026,
  routes.holidaysAndBridges2027,
  routes.faq,
  routes.ascension2026,
  routes.mayBridges2026,
  routes.assumption2026,
  routes.allSaints2026,
  routes.armistice2026,
  routes.yearEnd2026,
  routes.schoolHolidaysZone2026("A"),
  routes.schoolHolidaysZone2026("B"),
  routes.schoolHolidaysZone2026("C"),
  routes.weekdayHolidays2026,
  routes.leaveBudget5Guide2026,
  routes.leaveBudget10Guide2026,
  routes.sources,
];

const lastModifiedByPath: Partial<Record<string, string>> = {
  [routes.home]: "2026-03-15T18:00:00.000Z",
  [routes.annualPlannerYear(2026)]: "2026-03-15T18:10:00.000Z",
  [routes.annualPlannerYear(2027)]: "2026-03-15T18:10:00.000Z",
  [routes.annualPlannerYear(2028)]: "2026-03-15T18:10:00.000Z",
  [routes.annualPlannerYear(2029)]: "2026-03-15T18:10:00.000Z",
  [routes.bridgesYear(2026)]: "2026-03-15T18:15:00.000Z",
  [routes.bridgesYear(2027)]: "2026-03-15T18:15:00.000Z",
  [routes.bridgesYear(2028)]: "2026-03-15T18:15:00.000Z",
  [routes.bridgesYear(2029)]: "2026-03-15T18:15:00.000Z",
  [routes.holidaysYear(2026)]: "2026-03-15T18:18:00.000Z",
  [routes.holidaysYear(2027)]: "2026-03-15T18:18:00.000Z",
  [routes.holidaysYear(2028)]: "2026-03-15T18:18:00.000Z",
  [routes.holidaysYear(2029)]: "2026-03-15T18:18:00.000Z",
  [routes.schoolHolidaysBridgesYear(2026)]: "2026-03-15T18:22:00.000Z",
  [routes.schoolHolidaysBridgesYear(2027)]: "2026-03-15T18:22:00.000Z",
  [routes.schoolHolidaysBridgesYear(2028)]: "2026-03-15T18:22:00.000Z",
  [routes.schoolHolidaysBridgesYear(2029)]: "2026-03-15T18:22:00.000Z",
  [routes.faq]: "2026-03-15T18:20:00.000Z",
  [routes.leaveGuide2026]: "2026-03-15T18:40:00.000Z",
  [routes.schoolHolidaysFamily2026]: "2026-03-15T18:30:00.000Z",
  [routes.weekdayHolidays2026]: "2026-03-15T18:35:00.000Z",
  [routes.schoolHolidaysZone2026("A")]: "2026-03-15T18:35:00.000Z",
  [routes.schoolHolidaysZone2026("B")]: "2026-03-15T18:35:00.000Z",
  [routes.schoolHolidaysZone2026("C")]: "2026-03-15T18:35:00.000Z",
  [routes.leaveBudget5Guide2026]: "2026-03-15T18:45:00.000Z",
  [routes.leaveBudget10Guide2026]: "2026-03-15T18:45:00.000Z",
  [routes.ascension2026]: "2026-03-15T18:50:00.000Z",
  [routes.mayBridges2026]: "2026-03-15T18:50:00.000Z",
  [routes.assumption2026]: "2026-03-15T18:50:00.000Z",
  [routes.allSaints2026]: "2026-03-15T18:50:00.000Z",
  [routes.armistice2026]: "2026-03-15T18:50:00.000Z",
  [routes.yearEnd2026]: "2026-03-15T18:50:00.000Z",
};

function getPriority(path: string): number {
  if (
    path === routes.home ||
    path.startsWith("/planifier-annee/") ||
    path.startsWith("/ponts/") ||
    path.startsWith("/jours-feries/") ||
    path.startsWith("/vacances-scolaires-ponts/")
  ) {
    return 0.9;
  }

  if (
    path === routes.leaveGuide2026 ||
    path === routes.schoolHolidaysFamily2026 ||
    path === routes.holidaysAndBridges2027 ||
    path === routes.faq
  ) {
    return 0.8;
  }

  return 0.7;
}

function getChangeFrequency(path: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path === routes.home) {
    return "weekly";
  }

  if (
    path.startsWith("/planifier-annee/") ||
    path.startsWith("/ponts/") ||
    path.startsWith("/jours-feries/") ||
    path.startsWith("/vacances-scolaires-ponts/")
  ) {
    return "monthly";
  }

  return "yearly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((path) => {
    const frUrl = `${baseUrl}${path}`;
    const enPath = prefixForLanguage(path, "en");
    const enUrl = `${baseUrl}${enPath}`;
    const lastModified = new Date(lastModifiedByPath[path] ?? "2026-03-15T17:20:14.401Z");
    const priority = getPriority(path);
    const changeFrequency = getChangeFrequency(path);

    return [
      {
        url: frUrl,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: enUrl,
            fr: frUrl,
          },
        },
      },
      {
        url: enUrl,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: enUrl,
            fr: frUrl,
          },
        },
      },
    ];
  });
}
