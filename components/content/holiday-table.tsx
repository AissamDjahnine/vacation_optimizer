import type { Holiday } from "@/lib/domain/types";
import type { AppLanguage } from "@/lib/i18n";
import { formatFullDate } from "@/lib/formatting";

export function HolidayTable({
  holidays,
  language,
  showWeekendColumn = false,
}: {
  holidays: Holiday[];
  language: AppLanguage;
  showWeekendColumn?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[1.8rem] border border-line/80 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-line/70">
        <thead className="bg-slate-50/80">
          <tr className="text-left text-xs font-bold uppercase tracking-[0.2em] text-ink/54">
            <th className="px-5 py-4">{language === "en" ? "Date" : "Date"}</th>
            <th className="px-5 py-4">{language === "en" ? "Holiday" : "Jour férié"}</th>
            {showWeekendColumn ? (
              <th className="px-5 py-4">{language === "en" ? "Weekday" : "Semaine / week-end"}</th>
            ) : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-line/70 text-sm text-ink/74">
          {holidays.map((holiday) => {
            const weekday = holiday.date.getDay();
            const workingPlacement =
              weekday === 0 || weekday === 6
                ? language === "en"
                  ? "Weekend"
                  : "Week-end"
                : language === "en"
                  ? "Weekday"
                  : "Semaine";

            return (
              <tr key={`${holiday.localName}-${holiday.date.toISOString()}`} className="transition hover:bg-slate-50/60">
                <td className="px-5 py-4 font-semibold text-ink">
                  {formatFullDate(holiday.date, language)}
                </td>
                <td className="px-5 py-4">{holiday.localName}</td>
                {showWeekendColumn ? <td className="px-5 py-4">{workingPlacement}</td> : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
