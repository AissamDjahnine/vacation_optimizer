export const germanYears = [2026, 2027] as const;

export function isGermanYear(value: number): value is (typeof germanYears)[number] {
  return germanYears.includes(value as (typeof germanYears)[number]);
}
