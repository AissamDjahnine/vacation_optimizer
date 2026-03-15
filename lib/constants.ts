import type { AppLanguage } from "@/lib/i18n";

export const plannerYears = [2026, 2027, 2028, 2029];

export function isPlannerYear(value: number): value is (typeof plannerYears)[number] {
  return plannerYears.includes(value as (typeof plannerYears)[number]);
}

export const monthLabels: Record<AppLanguage, string[]> = {
  fr: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

export const weekdayShortLabels: Record<AppLanguage, string[]> = {
  fr: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
