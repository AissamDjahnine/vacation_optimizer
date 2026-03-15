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
      className={`rounded-[2rem] border p-6 shadow-card transition duration-200 hover:-translate-y-0.5 ${
        highlighted
          ? "border-orange-200 bg-gradient-to-br from-white to-[#fff7f2] shadow-[0_18px_50px_rgba(255,122,89,0.12)]"
          : "border-line bg-white hover:shadow-soft"
      }`}
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <div className="flex h-full flex-col">
          <div className="flex flex-wrap items-center gap-2">
            {highlighted ? (
              <span className="rounded-full bg-peach px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-orange-800">
                {language === "en" ? "Best fit for this month" : "Meilleur rendement pour ce mois"}
              </span>
            ) : null}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-base font-black text-white">
              #{rank}
            </span>
            <span className="rounded-full border border-line/90 bg-paper px-3.5 py-1.5 text-xs font-semibold tracking-[0.04em] text-ink/58">
              Score: {period.worthScore.toFixed(2)}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            <h3 className="text-3xl font-black tracking-tight text-ink">
              {language === "en"
                ? `${period.totalDaysOff} consecutive days off`
                : `${period.totalDaysOff} jours de repos d’affilée`}
            </h3>
            <p className="text-lg font-semibold text-ink/72">
              {formatShortRange(period.startDate, period.endDate, language)}
            </p>
            <p className="text-sm font-medium text-ink/68">{detailLine}</p>
          </div>

          <div className="mt-auto border-t border-line/70 pt-5">
            <div className="flex flex-wrap items-center gap-3">
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

          <div className="rounded-[1.75rem] border border-line bg-paper p-5">
            <h4 className="text-lg font-bold text-ink">
              {language === "en" ? "Day-by-day view" : "Vue jour par jour"}
            </h4>
            <div className="mt-4 grid grid-cols-2 gap-3 min-[540px]:grid-cols-3 xl:grid-cols-4">
              {buildTimelineDays(period).map((day) => (
                <div
                  key={day.date.toISOString()}
                  className={`h-[116px] min-w-0 rounded-[1.4rem] px-4 py-4 ${day.className}`}
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
