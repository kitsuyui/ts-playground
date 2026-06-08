const MILLISECOND_MS = 1
const SECOND_MS = MILLISECOND_MS * 1000
const MINUTE_MS = SECOND_MS * 60
const HOUR_MS = MINUTE_MS * 60
const DAY_MS = HOUR_MS * 24
const WEEK_MS = DAY_MS * 7
const YEAR_MS = DAY_MS * 365.25
const MONTH_MS = YEAR_MS / 12

export const HALF_OF_TIME_UNITS_MS = {
  years: 0.5 * YEAR_MS,
  months: 0.5 * MONTH_MS,
  weeks: 0.5 * WEEK_MS,
  days: 0.5 * DAY_MS,
  hours: 0.5 * HOUR_MS,
  minutes: 0.5 * MINUTE_MS,
  seconds: 0.5 * SECOND_MS,
  milliseconds: 0.5 * MILLISECOND_MS,
} as const
