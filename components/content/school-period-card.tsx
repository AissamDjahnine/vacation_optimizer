import type { SchoolHolidayPeriod } from "@/lib/domain/types";
import type { AppLanguage } from "@/lib/i18n";
import { formatShortRange } from "@/lib/formatting";

export function SchoolPeriodCard({
  period,
  language,
}: {
  period: SchoolHolidayPeriod;
  language: AppLanguage;
}) {
  return (
    <article className="rounded-4xl border border-line bg-white p-6 shadow-card">
      <div className="space-y-3">
        <p className="editorial-kicker">
          {language === "en" ? "School break" : "Période scolaire"}
        </p>
        <p className="text-2xl font-black tracking-tight text-ink">{period.description}</p>
        <p className="text-lg font-semibold text-ink/72">
          {formatShortRange(period.startDate, period.endDate, language)}
        </p>
        <p className="text-base text-ink/66">
          {language === "en" ? "Zone" : "Zone"} : {period.zone} •{" "}
          {language === "en" ? "School year" : "Année scolaire"} : {period.schoolYear}
        </p>
      </div>
    </article>
  );
}
