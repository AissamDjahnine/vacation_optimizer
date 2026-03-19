import { format } from "date-fns";
import { de, enUS, fr } from "date-fns/locale";
import type { AppLanguage } from "@/lib/i18n";
import { monthLabels, weekdayShortLabels } from "@/lib/constants";

export function formatFullDate(date: Date, language: AppLanguage) {
  return format(date, "EEEE d MMMM yyyy", {
    locale: language === "en" ? enUS : language === "de" ? de : fr,
  });
}

export function formatShortRange(startDate: Date, endDate: Date, language: AppLanguage) {
  const locale = language === "en" ? enUS : language === "de" ? de : fr;
  const joiner = language === "en" ? "to" : language === "de" ? "bis" : "au";
  return `${format(startDate, "EEE d MMM yyyy", { locale })} ${joiner} ${format(endDate, "EEE d MMM yyyy", { locale })}`;
}

export function formatMonthYear(month: number, year: number, language: AppLanguage) {
  return `${monthLabels[language][month - 1]} ${year}`;
}

export function weekdayShort(date: Date, language: AppLanguage) {
  return weekdayShortLabels[language][date.getDay()];
}
