import { IcsExportButton } from "@/components/planner/ics-export-button";
import { GoogleCalendarButton } from "@/components/planner/google-calendar-button";
import { buildGoogleCalendarUrl, buildPeriodCalendarBundle } from "@/lib/calendar-export";
import { sameDay } from "@/lib/domain/date-utils";
import type { BestVacationPeriod } from "@/lib/domain/types";
import type { AppLanguage } from "@/lib/i18n";
import { t } from "@/lib/i18n";
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
  return (
    <article
      className={`rounded-[1.75rem] border p-5 shadow-sm transition duration-200 sm:p-6 ${
        highlighted
          ? "border-orange-200 bg-[#fffaf6]"
          : "border-line/90 bg-white"
      }`}
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-6">
        <div className="flex h-full flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {highlighted ? (
              <span className="rounded-full border border-orange-200 bg-peach px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-orange-800">
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
                className="inline-flex h-8 items-center justify-center rounded-full border border-mint-strong/20 bg-mint/70 px-3 text-xs font-bold text-mint-strong transition hover:border-mint-strong/35"
              >
                Score: {period.worthScore.toFixed(2)}
              </button>
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 w-64 -translate-x-1/2 rounded-2xl border border-line bg-white p-3 text-left text-xs font-medium leading-5 text-ink opacity-0 shadow-sm transition duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                {scoreTooltip}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-black tracking-tight text-ink sm:text-[1.9rem]">
              {language === "en"
                ? `${period.totalDaysOff} consecutive days off`
                : `${period.totalDaysOff} jours de repos d’affilée`}
            </h3>
            <p className="text-base font-semibold text-ink/72 sm:text-lg">
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
          </div>

          <div className="mt-auto border-t border-line/70 pt-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <IcsExportButton
                bundle={calendarBundle}
                label={language === "en" ? "Export .ics" : "Exporter au format .ics"}
                analyticsContext="planner_result"
                className="h-11 border-ink/10 bg-white px-4 text-sm shadow-sm hover:border-ink/20 hover:bg-paper"
              />
              <GoogleCalendarButton
                href={googleCalendarUrl}
                label={language === "en" ? "Google Calendar" : "Ajouter à Google Calendar"}
                analyticsContext="planner_result"
                className="h-11 border-ink/10 bg-ink px-4 text-sm text-white shadow-sm hover:border-ink hover:bg-ink/92 hover:text-white"
              />
            </div>
          </div>
        </div>

          <div className="rounded-[1.5rem] border border-line/80 bg-paper/70 p-4">
            <h4 className="text-base font-bold text-ink">
              {language === "en" ? "Day-by-day view" : "Vue jour par jour"}
            </h4>
            <div className="mt-3 grid grid-cols-2 gap-2.5 min-[540px]:grid-cols-3 xl:grid-cols-4">
              {buildTimelineDays(period).map((day) => (
                <div
                  key={day.date.toISOString()}
                  className={`min-h-[98px] min-w-0 rounded-[1.1rem] px-3 py-3 sm:px-3.5 sm:py-3.5 ${day.className}`}
                >
                  <p className="text-xs font-semibold sm:text-sm">
                    {weekdayShort(day.date, language)}
                  </p>
                  <p className="mt-1 text-3xl font-black leading-none sm:text-4xl">{day.date.getDate()}</p>
                  <p className="mt-1.5 min-h-8 overflow-hidden text-[11px] font-medium leading-4 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                    {t(day.label, language)}
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
