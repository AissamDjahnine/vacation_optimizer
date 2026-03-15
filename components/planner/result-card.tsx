import { IcsExportButton } from "@/components/planner/ics-export-button";
import { GoogleCalendarButton } from "@/components/planner/google-calendar-button";
import { buildGoogleCalendarUrl, buildPeriodCalendarBundle } from "@/lib/calendar-export";
import { sameDay } from "@/lib/domain/date-utils";
import type { BestVacationPeriod } from "@/lib/domain/types";
import type { AppLanguage } from "@/lib/i18n";
import { formatShortRange, weekdayShort } from "@/lib/formatting";

type ResultCardProps = {
  language: AppLanguage;
  period: BestVacationPeriod;
  rank: number;
  highlighted?: boolean;
};

const dayStyles = {
  holiday: "bg-sand text-amber-800",
  weekend: "bg-mint text-emerald-900",
  rtt: "bg-lavender text-indigo-700",
  paid: "bg-peach text-orange-800",
  school: "ring-2 ring-violet-400",
};

export function ResultCard({
  language,
  period,
  rank,
  highlighted = false,
}: ResultCardProps) {
  const calendarBundle = buildPeriodCalendarBundle({
    period,
    language,
    year: period.startDate.getFullYear(),
  });
  const googleCalendarUrl = buildGoogleCalendarUrl(calendarBundle.events[0]);
  const scoreTooltip =
    language === "en"
      ? "Score compares total days off to the paid leave days you actually need to book."
      : "Le score compare le total de jours de repos aux jours de congé payé réellement posés.";
  const detailLine = [
    language === "en"
      ? `${period.paidLeaveDaysUsed} leave day${period.paidLeaveDaysUsed > 1 ? "s" : ""} to book`
      : `${period.paidLeaveDaysUsed} jour${period.paidLeaveDaysUsed > 1 ? "s" : ""} à poser`,
    period.rttDaysUsed > 0 ? `${period.rttDaysUsed} RTT` : null,
    period.includedHolidays.length > 0
      ? language === "en"
        ? `${period.includedHolidays.length} public holiday${period.includedHolidays.length > 1 ? "s" : ""}`
        : `${period.includedHolidays.length} férié${period.includedHolidays.length > 1 ? "s" : ""}`
      : null,
  ]
    .filter(Boolean)
    .join(" • ");
  return (
    <article
      className={`rounded-[2rem] border p-5 shadow-card transition duration-200 hover:-translate-y-0.5 sm:p-6 ${
        highlighted
          ? "border-orange-200 bg-gradient-to-br from-white to-[#fff7f2] shadow-[0_18px_50px_rgba(255,122,89,0.12)]"
          : "border-line bg-white hover:shadow-soft"
      }`}
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch lg:gap-8">
        <div className="flex h-full flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            {highlighted ? (
              <span className="rounded-full bg-peach px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-orange-800">
                {language === "en" ? "Best fit for this month" : "Meilleur rendement pour ce mois"}
              </span>
            ) : null}
            <span
              className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-ink text-base font-black text-white"
              aria-label={`${language === "en" ? "Rank" : "Rang"} ${rank}`}
            >
              #{rank}
            </span>
            <div className="group relative inline-flex items-center">
              <button
                type="button"
                aria-label={language === "en" ? "Score explanation" : "Explication du score"}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-xs font-bold text-ink/80 transition hover:border-coral hover:text-coral"
              >
                i
              </button>
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 w-64 -translate-x-1/2 rounded-2xl border border-line bg-white p-3 text-left text-xs font-medium leading-5 text-ink opacity-0 shadow-card transition duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                {scoreTooltip}
                <div className="mt-1 font-semibold text-ink/74">
                  Score: {period.worthScore.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl font-black tracking-tight text-ink sm:text-[2rem]">
              {language === "en"
                ? `${period.totalDaysOff} consecutive days off`
                : `${period.totalDaysOff} jours de repos d’affilée`}
            </h3>
            <p className="text-lg font-semibold text-ink/72">
              {formatShortRange(period.startDate, period.endDate, language)}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm font-semibold text-ink/78">
                {language === "en" ? "To book" : "À poser"}: {period.paidLeaveDaysUsed}
              </span>
              {period.includedHolidays.length > 0 ? (
                <span className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm font-semibold text-ink/78">
                  {language === "en" ? "Public holidays" : "Fériés"}: {period.includedHolidays.length}
                </span>
              ) : null}
              {period.rttDaysUsed > 0 ? (
                <span className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm font-semibold text-ink/78">
                  RTT: {period.rttDaysUsed}
                </span>
              ) : null}
            </div>
            <p className="text-sm font-medium text-ink/68">{detailLine}</p>
          </div>

          <div className="mt-auto border-t border-line/70 pt-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <IcsExportButton
                bundle={calendarBundle}
                label={language === "en" ? "Export .ics" : "Exporter au format .ics"}
              />
              <GoogleCalendarButton
                href={googleCalendarUrl}
                label={language === "en" ? "Google Calendar" : "Ajouter à Google Calendar"}
              />
            </div>
          </div>
        </div>

          <div className="rounded-[1.75rem] border border-line bg-paper p-4 sm:p-5">
            <h4 className="text-lg font-bold text-ink">
              {language === "en" ? "Day-by-day view" : "Vue jour par jour"}
            </h4>
            <div className="mt-4 grid grid-cols-2 gap-3 min-[540px]:grid-cols-3 xl:grid-cols-4">
              {buildTimelineDays(period).map((day) => (
                <div
                  key={day.date.toISOString()}
                  className={`h-[112px] min-w-0 rounded-[1.35rem] px-3.5 py-3.5 sm:h-[116px] sm:px-4 sm:py-4 ${day.className}`}
                >
                  <p className="text-sm font-semibold">
                    {weekdayShort(day.date, language)}
                  </p>
                  <p className="text-4xl font-black leading-none">{day.date.getDate()}</p>
                  <p className="mt-2 min-h-8 overflow-hidden text-[11px] font-medium leading-4 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                    {day.label[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
      </div>
    </article>
  );
}

function buildTimelineDays(period: BestVacationPeriod) {
  const allDays = [
    ...period.weekendDates,
    ...period.includedHolidays.map((holiday) => holiday.date),
    ...period.paidLeaveDates,
    ...period.rttDates,
  ]
    .map((date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    .sort((left, right) => left.getTime() - right.getTime());

  const unique = new Map<number, Date>();
  for (const day of allDays) {
    unique.set(day.getTime(), day);
  }

  return [...unique.values()].map((date) => {
    const school = period.schoolHolidayDates.some((item) => sameDay(item, date));

    if (period.includedHolidays.some((holiday) => sameDay(holiday.date, date))) {
      const holiday = period.includedHolidays.find((item) => sameDay(item.date, date));
      return {
        date,
        label: {
          fr: holiday?.localName ?? "Férié",
          en: holiday?.localName ?? "Holiday",
        },
        className: `${dayStyles.holiday} ${school ? dayStyles.school : ""}`,
      };
    }
    if (period.rttDates.some((item) => sameDay(item, date))) {
      return {
        date,
        label: { fr: "RTT", en: "RTT" },
        className: `${dayStyles.rtt} ${school ? dayStyles.school : ""}`,
      };
    }
    if (period.paidLeaveDates.some((item) => sameDay(item, date))) {
      return {
        date,
        label: { fr: "Congé payé", en: "Paid leave" },
        className: `${dayStyles.paid} ${school ? dayStyles.school : ""}`,
      };
    }
    return {
      date,
      label: { fr: "Week-end", en: "Weekend" },
      className: `${dayStyles.weekend} ${school ? dayStyles.school : ""}`,
    };
  });
}
