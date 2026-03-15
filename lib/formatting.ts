import { format } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import type { AppLanguage } from "@/lib/i18n";
import { monthLabels, weekdayShortLabels } from "@/lib/constants";

export function formatFullDate(date: Date, language: AppLanguage) {
  return format(date, "EEEE d MMMM yyyy", {
    locale: language === "en" ? enUS : fr,
  });
}

export function formatShortRange(startDate: Date, endDate: Date, language: AppLanguage) {
  const locale = language === "en" ? enUS : fr;
  return `${format(startDate, "EEE d MMM yyyy", { locale })} ${
    language === "en" ? "to" : "au"
  } ${format(endDate, "EEE d MMM yyyy", { locale })}`;
}

export function formatMonthYear(month: number, year: number, language: AppLanguage) {
  return `${monthLabels[language][month - 1]} ${year}`;
}

export function weekdayShort(date: Date, language: AppLanguage) {
  return weekdayShortLabels[language][date.getDay()];
}
