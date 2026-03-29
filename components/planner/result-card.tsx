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
  holiday: "bg-sand text-amber-900",
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
  const summaryTone = highlighted
    ? "border-[#1f4471] bg-[#1f4471] text-white"
    : "border-line/80 bg-[#eff5fb] text-ink";
  const summaryMuted = highlighted ? "text-white/70" : "text-ink/70";
  const summaryBody = highlighted ? "text-white/82" : "text-ink/82";

  return (
    <article
      className={`site-card overflow-hidden p-5 transition duration-200 sm:p-6 ${
        highlighted ? "border-[#1f4471]/18 bg-[#f7fbff]" : "border-line/80 bg-white"
      }`}
    >
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_18rem] xl:items-start">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            {highlighted ? (
              <span className="site-badge bg-coral px-3 py-1 text-[10px] tracking-[0.2em]">
                {language === "en" ? "Editor's choice" : "Choix principal"}
              </span>
            ) : null}
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-base font-black text-white">
              #{rank}
            </span>
            <span className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink/72">
              {language === "en" ? "Score" : "Score"} {period.worthScore.toFixed(1)}
            </span>
            <span className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink/72">
              {formatShortRange(period.startDate, period.endDate, language)}
            </span>
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
            <p className="max-w-2xl text-sm leading-7 text-ink/72">
              {language === "en"
                ? `Use ${period.paidLeaveDaysUsed} leave day${period.paidLeaveDaysUsed > 1 ? "s" : ""} and ${period.rttDaysUsed} RTT day${period.rttDaysUsed > 1 ? "s" : ""}.`
                : `Utilise ${period.paidLeaveDaysUsed} jour${period.paidLeaveDaysUsed > 1 ? "s" : ""} de congé payé et ${period.rttDaysUsed} RTT.`}
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

          <div className="rounded-[1.5rem] border border-line/80 bg-paper/70 p-4">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-base font-bold text-ink">
                {language === "en" ? "Day-by-day view" : "Vue jour par jour"}
              </h4>
              <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink/60">
                {language === "en" ? "Timeline" : "Chronologie"}
              </span>
            </div>
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

          <div className="flex flex-wrap gap-3">
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

        <aside className={`rounded-[1.5rem] border p-4 ${summaryTone}`}>
          <p className={`text-xs font-bold uppercase tracking-[0.18em] ${summaryMuted}`}>
            {language === "en" ? "Quick view" : "Aperçu rapide"}
          </p>
          <p className="mt-4 text-5xl font-black tracking-tight">
            {period.totalDaysOff}
            <span className="ml-2 text-lg font-bold">{language === "en" ? "days" : "jours"}</span>
          </p>
          <p className={`mt-2 text-base leading-7 ${summaryBody}`}>
            {language === "en"
              ? "Potential days off found in one window."
              : "Jours de repos potentiels trouvés sur une seule fenêtre."}
          </p>

          <div className="mt-6 space-y-3 text-sm leading-6">
            <SummaryRow
              label={language === "en" ? "Leave to book" : "Congé à poser"}
              value={`${period.paidLeaveDaysUsed}`}
              dark={highlighted}
            />
            <SummaryRow
              label={language === "en" ? "RTT used" : "RTT utilisés"}
              value={`${period.rttDaysUsed}`}
              dark={highlighted}
            />
            <SummaryRow
              label={language === "en" ? "Public holidays" : "Fériés"}
              value={`${period.includedHolidays.length}`}
              dark={highlighted}
            />
            <SummaryRow
              label={language === "en" ? "Score" : "Score"}
              value={period.worthScore.toFixed(1)}
              dark={highlighted}
            />
          </div>

          <div
            className={`mt-6 rounded-[1.2rem] border px-4 py-3 text-sm font-semibold ${
              highlighted
                ? "border-white/15 bg-white/10 text-white/86"
                : "border-line/80 bg-white text-ink/72"
            }`}
          >
            {language === "en"
              ? "Export or send this result once you are happy with the month."
              : "Exportez ou partagez ce résultat une fois le mois validé."}
          </div>

          <div className={`mt-6 rounded-[1.2rem] border border-white/10 bg-white/10 px-4 py-3 text-xs leading-5 ${summaryMuted}`}>
            {scoreTooltip}
          </div>
        </aside>
      </div>
    </article>
  );
}

function SummaryRow({
  label,
  value,
  dark,
}: {
  label: string;
  value: string;
  dark: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-current/10 pb-2 last:border-b-0 last:pb-0">
      <span className={dark ? "text-white/70" : "text-ink/70"}>{label}</span>
      <span className={`font-bold ${dark ? "text-white" : "text-ink"}`}>{value}</span>
    </div>
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
