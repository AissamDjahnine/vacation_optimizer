import type { GermanHoliday, GermanOfficialSource, GermanStateCode } from "@/lib/domain/types";
import { germanStateMap, germanStates } from "@/lib/germany/states";

type HolidayDefinition = {
  id: string;
  name: string;
  nationwide?: boolean;
  date: (year: number) => Date;
  states?: GermanStateCode[];
};

function utcDate(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day, 12));
}

function addDays(date: Date, days: number) {
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function easterSunday(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return utcDate(year, month, day);
}

function dayOfPrayerAndRepentance(year: number) {
  const november23 = utcDate(year, 11, 23);
  const day = november23.getUTCDay();
  return addDays(november23, -(day === 0 ? 4 : day + 3));
}

const holidayDefinitions: HolidayDefinition[] = [
  { id: "new-year", name: "Neujahr", nationwide: true, date: (year) => utcDate(year, 1, 1) },
  {
    id: "epiphany",
    name: "Heilige Drei Könige",
    date: (year) => utcDate(year, 1, 6),
    states: ["bw", "by", "st"],
  },
  {
    id: "international-womens-day",
    name: "Internationaler Frauentag",
    date: (year) => utcDate(year, 3, 8),
    states: ["be", "mv"],
  },
  { id: "good-friday", name: "Karfreitag", nationwide: true, date: (year) => addDays(easterSunday(year), -2) },
  { id: "easter-monday", name: "Ostermontag", nationwide: true, date: (year) => addDays(easterSunday(year), 1) },
  { id: "labour-day", name: "Tag der Arbeit", nationwide: true, date: (year) => utcDate(year, 5, 1) },
  { id: "ascension", name: "Christi Himmelfahrt", nationwide: true, date: (year) => addDays(easterSunday(year), 39) },
  { id: "whit-monday", name: "Pfingstmontag", nationwide: true, date: (year) => addDays(easterSunday(year), 50) },
  {
    id: "corpus-christi",
    name: "Fronleichnam",
    date: (year) => addDays(easterSunday(year), 60),
    states: ["bw", "by", "he", "nw", "rp", "sl"],
  },
  {
    id: "assumption-day",
    name: "Mariä Himmelfahrt",
    date: (year) => utcDate(year, 8, 15),
    states: ["by", "sl"],
  },
  {
    id: "german-unity",
    name: "Tag der Deutschen Einheit",
    nationwide: true,
    date: (year) => utcDate(year, 10, 3),
  },
  {
    id: "reformation-day",
    name: "Reformationstag",
    date: (year) => utcDate(year, 10, 31),
    states: ["bb", "hb", "hh", "mv", "ni", "sn", "st", "sh", "th"],
  },
  {
    id: "all-saints-day",
    name: "Allerheiligen",
    date: (year) => utcDate(year, 11, 1),
    states: ["bw", "by", "nw", "rp", "sl"],
  },
  {
    id: "day-of-prayer-and-repentance",
    name: "Buß- und Bettag",
    date: dayOfPrayerAndRepentance,
    states: ["sn"],
  },
  { id: "christmas-day", name: "1. Weihnachtstag", nationwide: true, date: (year) => utcDate(year, 12, 25) },
  { id: "boxing-day", name: "2. Weihnachtstag", nationwide: true, date: (year) => utcDate(year, 12, 26) },
];

function buildHolidaySource(state: GermanStateCode): GermanOfficialSource {
  return {
    title: `${germanStateMap[state].holidaySource.title} – Feiertage`,
    url: germanStateMap[state].holidaySource.url,
  };
}

export function getGermanHolidaysForState(year: number, state: GermanStateCode): GermanHoliday[] {
  return holidayDefinitions
    .filter((definition) => definition.nationwide || definition.states?.includes(state))
    .map((definition) => ({
      id: definition.id,
      name: definition.name,
      date: definition.date(year),
      state,
      nationwide: Boolean(definition.nationwide),
      source: buildHolidaySource(state),
    }))
    .sort((left, right) => left.date.getTime() - right.date.getTime());
}

export function getGermanNationwideHolidayCoverage(year: number) {
  return germanStates.map((state) => ({
    state,
    holidays: getGermanHolidaysForState(year, state.code),
  }));
}

export type GermanBridgeOpportunity = {
  holiday: GermanHoliday;
  vacationDaysNeeded: number;
  totalDaysOff: number;
  recommendedLeaveDates: Date[];
  label: string;
};

export function getGermanBridgeOpportunities(holidays: GermanHoliday[]): GermanBridgeOpportunity[] {
  const opportunities = holidays
    .map((holiday) => {
      const day = holiday.date.getUTCDay();

      if (day === 5) {
        return {
          holiday,
          vacationDaysNeeded: 0,
          totalDaysOff: 3,
          recommendedLeaveDates: [],
          label: "Langes Wochenende ohne Urlaubstag",
        } satisfies GermanBridgeOpportunity;
      }

      if (day === 1) {
        return {
          holiday,
          vacationDaysNeeded: 0,
          totalDaysOff: 3,
          recommendedLeaveDates: [],
          label: "Direktes langes Wochenende",
        } satisfies GermanBridgeOpportunity;
      }

      if (day === 4) {
        return {
          holiday,
          vacationDaysNeeded: 1,
          totalDaysOff: 4,
          recommendedLeaveDates: [addDays(holiday.date, 1)],
          label: "Klassischer Brückentag am Freitag",
        } satisfies GermanBridgeOpportunity;
      }

      if (day === 2) {
        return {
          holiday,
          vacationDaysNeeded: 1,
          totalDaysOff: 4,
          recommendedLeaveDates: [addDays(holiday.date, -1)],
          label: "Montag freinehmen und vier Tage am Stück sichern",
        } satisfies GermanBridgeOpportunity;
      }

      if (day === 3) {
        return {
          holiday,
          vacationDaysNeeded: 2,
          totalDaysOff: 5,
          recommendedLeaveDates: [addDays(holiday.date, -1), addDays(holiday.date, 1)],
          label: "Mittwochsfeiertag mit fünf Tagen am Stück",
        } satisfies GermanBridgeOpportunity;
      }

      return {
        holiday,
        vacationDaysNeeded: 0,
        totalDaysOff: 1,
        recommendedLeaveDates: [],
        label: "Kein starker Brückentag, eher ein Marker für die Jahresplanung",
      } satisfies GermanBridgeOpportunity;
    })
    .filter((entry) => entry.totalDaysOff > 1)
    .sort((left, right) => {
      if (right.totalDaysOff !== left.totalDaysOff) {
        return right.totalDaysOff - left.totalDaysOff;
      }
      return left.vacationDaysNeeded - right.vacationDaysNeeded;
    });

  const unique = new Map<string, GermanBridgeOpportunity>();
  for (const opportunity of opportunities) {
    unique.set(`${opportunity.holiday.id}-${opportunity.holiday.date.toISOString()}`, opportunity);
  }

  return [...unique.values()];
}
