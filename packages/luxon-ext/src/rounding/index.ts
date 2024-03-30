import { Duration, type DurationObjectUnits } from 'luxon'
import { HALF_OF_TIME_UNITS } from '../constants'
import { type TimeUnit, computeTopUnit, computeUseUnits } from '../units'

type RoundingMethod = 'floor' | 'ceil' | 'round'

interface RoundingOptions {
  numOfUnits: number
  minUnit: TimeUnit
  roundingMethod: RoundingMethod
}
export type PartialRoundingOptions = Partial<RoundingOptions>
/**
 * Convert partial rounding options to full rounding options
 * @param opts
 * @returns
 */
const roundingOptionsFromPartial = (
  opts?: PartialRoundingOptions,
): RoundingOptions => {
  const {
    numOfUnits = 2,
    minUnit = 'seconds',
    roundingMethod = 'round',
  } = opts ?? {}
  return { numOfUnits, minUnit, roundingMethod }
}

/**
 * Clean the duration (shift and remove the negative sign)
 * @param duration
 * @returns
 */
export const cleanDuration = (duration: Duration): Duration => {
  const cleaned = duration.shiftToAll().toMillis()
  const abs = Math.abs(cleaned)
  return Duration.fromMillis(abs)
}

/**
 * Round the duration
 * @param duration duration must be clean
 * @param opts
 * @param opts.numOfUnits the number of units to round
 * @param opts.minUnit the minimum unit to round
 * @param opts.roundingMethod the rounding type
 * @returns rounded duration
 */
export const roundDuration = (
  duration: Duration, // required to be clean
  opts?: PartialRoundingOptions,
): Duration => {
  const { numOfUnits, minUnit, roundingMethod } = roundingOptionsFromPartial(
    opts ?? {},
  )
  const base = duration.shiftToAll().toObject()
  const rounded: DurationObjectUnits = {}
  const remain: DurationObjectUnits = { ...base }
  const topUnit = computeTopUnit(duration)
  const useUnits = computeUseUnits({
    top: topUnit,
    nums: numOfUnits,
    min: minUnit,
  })
  const roundingHigherUnit = useUnits[useUnits.length - 2]
  const roundingLowerUnit = useUnits[useUnits.length - 1]

  for (const unit of useUnits.slice(0, -1)) {
    const value = remain[unit] ?? 0
    if (value === 0) continue
    rounded[unit] = value
    delete remain[unit]
  }

  const remainMillis = Duration.fromObject(remain).toMillis()
  if (roundingHigherUnit && roundingLowerUnit) {
    const shouldCarry =
      (roundingMethod === 'ceil' && remainMillis > 0) ||
      (roundingMethod === 'round' &&
        remainMillis >= HALF_OF_TIME_UNITS[roundingHigherUnit])
    if (shouldCarry) {
      rounded[roundingHigherUnit] = (rounded[roundingHigherUnit] ?? 0) + 1
    }
  }

  if (Object.keys(rounded).length === 0) {
    rounded[minUnit] = 0
  }

  return Duration.fromObject(rounded)
}
