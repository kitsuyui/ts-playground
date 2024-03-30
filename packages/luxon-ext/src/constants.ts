const MILLIS = 1
const SECONDS = MILLIS * 1000
const MINUTES = SECONDS * 60
const HOURS = MINUTES * 60
const DAYS = HOURS * 24
const WEEKS = DAYS * 7
const YEARS = DAYS * 365.25
const MONTHS = YEARS / 12

export const HALF_OF_TIME_UNITS = {
  years: 0.5 * YEARS,
  months: 0.5 * MONTHS,
  weeks: 0.5 * WEEKS,
  days: 0.5 * DAYS,
  hours: 0.5 * HOURS,
  minutes: 0.5 * MINUTES,
  seconds: 0.5 * SECONDS,
  milliseconds: 0.5 * MILLIS,
} as const
