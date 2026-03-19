export type Holiday = {
  localName: string;
  date: Date;
};

export type SchoolHolidayPeriod = {
  description: string;
  startDate: Date;
  endDate: Date;
  zone: string;
  schoolYear: string;
};

export type GermanStateCode =
  | "bw"
  | "by"
  | "be"
  | "bb"
  | "hb"
  | "hh"
  | "he"
  | "mv"
  | "ni"
  | "nw"
  | "rp"
  | "sl"
  | "sn"
  | "st"
  | "sh"
  | "th";

export type GermanOfficialSource = {
  title: string;
  url: string;
  label?: string;
};

export type GermanHoliday = {
  id: string;
  name: string;
  date: Date;
  state: GermanStateCode;
  nationwide: boolean;
  source: GermanOfficialSource;
};

export type GermanSchoolHolidayPeriod = {
  label: string;
  startDate: Date;
  endDate: Date;
  state: GermanStateCode;
  schoolYear: string;
  source: GermanOfficialSource;
};

export type GermanEditorialPage = {
  title: string;
  description: string;
  intro: string;
  highlights: string[];
};

export type SchoolHolidayPreference = "neutral" | "favor" | "avoid";
export type PlanningMode = "single" | "distributed";
export type PlannerScope = "monthly" | "yearly";
export type AnnualPlanningStrategy = "max-efficiency" | "balanced" | "family";

export type BestVacationPeriod = {
  startDate: Date;
  endDate: Date;
  vacationDaysUsed: number;
  paidLeaveDaysUsed: number;
  rttDaysUsed: number;
  totalDaysOff: number;
  worthScore: number;
  rankingScore: number;
  relatedHoliday: Holiday;
  includedHolidays: Holiday[];
  vacationDates: Date[];
  paidLeaveDates: Date[];
  rttDates: Date[];
  bridgeDates: Date[];
  weekendDates: Date[];
  schoolHolidayDates: Date[];
  holidayDate: Date;
};

export type AnnualPlanSegment = {
  month: number;
  strategy: AnnualPlanningStrategy;
  period: BestVacationPeriod;
};

export type AnnualPlanResult = {
  strategy: AnnualPlanningStrategy;
  scope: PlannerScope;
  segments: AnnualPlanSegment[];
  totalPaidLeaveUsed: number;
  totalRttUsed: number;
  totalDaysOff: number;
  remainingBudget: number;
};

export type PlannerState = {
  year: number;
  month: number;
  paidLeaveBudget: number;
  monthlyRtt: number;
  mode: PlanningMode;
  schoolZone: "A" | "B" | "C";
  schoolHolidayPreference: SchoolHolidayPreference;
  allowSchoolHolidayOverlap: boolean;
};

export type LocalizedText = {
  fr: string;
  en: string;
};

export type ContentSectionAccent =
  | "neutral"
  | "orange"
  | "blue"
  | "purple"
  | "green";

export type ContentSection = {
  title: LocalizedText;
  body?: LocalizedText[];
  bullets?: LocalizedText[];
  accent?: ContentSectionAccent;
  chips?: LocalizedText[];
  quote?: LocalizedText;
  example?: LocalizedText;
  specialCase?: LocalizedText;
};

export type RelatedLink = {
  label: LocalizedText;
  href: string;
};

export type OfficialSourceLink = {
  label: LocalizedText;
  href: string;
};

export type OfficialCaseNote = {
  badge: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  source: OfficialSourceLink;
  href?: string;
};

export type PageAuthorityBlock = {
  title: LocalizedText;
  intro: LocalizedText;
  notes: OfficialCaseNote[];
};

export type DepartmentZoneEntry = {
  code: string;
  name: string;
  zone: "A" | "B" | "C";
};

export type AcademyZoneEntry = {
  name: string;
  zone: "A" | "B" | "C";
};

export type ZoneLookupResult = {
  matched: boolean;
  zone?: "A" | "B" | "C";
  inputLabel: string;
  matchLabel?: string;
  reason?: "supported" | "out-of-scope" | "not-found";
  message: LocalizedText;
};

export type CalendarExportEvent = {
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
};

export type CalendarExportBundle = {
  filename: string;
  events: CalendarExportEvent[];
};
