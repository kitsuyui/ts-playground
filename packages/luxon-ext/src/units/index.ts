import type { Duration } from 'luxon'

const TIME_UNITS = [
  'years',
  'months',
  'weeks',
  'days',
  'hours',
  'minutes',
  'seconds',
  'milliseconds',
] as const

// type TimeUnit != keyof DurationObjectUnits, quarters are not supported
export type TimeUnit = (typeof TIME_UNITS)[number]

/**
 * Compute the most significant unit
 * @param duration duration must be clean
 * @returns the most significant unit
 */
export const computeTopUnit = (duration: Duration): TimeUnit => {
  const cleaned = duration.shiftToAll().toObject()
  for (const unit of TIME_UNITS) {
    if (cleaned[unit] !== 0) {
      return unit
    }
  }
  return 'milliseconds'
}

/**
 * Compute the units to use (include +1 unit for rounding)
 * @param args
 * @param args.top the most significant unit
 * @param args.nums the number of units to use
 * @param args.min the minimum unit to use
 * @returns
 */
export const computeUseUnits = (args: {
  top: TimeUnit
  nums: number
  min: TimeUnit
}) => {
  const { top, min, nums } = args
  const indexOfTopUnit = TIME_UNITS.indexOf(top)
  const baseUnits = TIME_UNITS.slice(indexOfTopUnit, indexOfTopUnit + nums + 1)
  if (baseUnits.includes(min)) {
    const indexOfMinUnit = baseUnits.indexOf(min)
    return baseUnits.slice(0, indexOfMinUnit + 2).slice(0, nums + 1)
  }
  return baseUnits
}
