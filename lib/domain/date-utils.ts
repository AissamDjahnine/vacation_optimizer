export function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function parseDateLike(value: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  return new Date(value);
}

export function sameDay(a: Date, b: Date): boolean {
  return stripTime(a).getTime() === stripTime(b).getTime();
}

export function isWeekend(date: Date): boolean {
  const weekday = date.getDay();
  return weekday === 0 || weekday === 6;
}

export function inclusiveDateRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const current = stripTime(startDate);
  const end = stripTime(endDate);

  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}
