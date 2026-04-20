import { Duration, type DurationObjectUnits } from 'luxon'
import { HALF_OF_TIME_UNITS } from '../constants'
import { computeTopUnit, computeUseUnits, type TimeUnit } from '../units'

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
  opts?: PartialRoundingOptions
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

const collectRoundedUnits = (
  useUnits: TimeUnit[],
  base: DurationObjectUnits
): {
  rounded: DurationObjectUnits
  remain: DurationObjectUnits
} => {
  const roundedUnits = new Set<TimeUnit>(useUnits.slice(0, -1))
  const entries = Object.entries(base) as [TimeUnit, number][]
  const isRoundedEntry = ([unit, value]: [TimeUnit, number]): boolean =>
    roundedUnits.has(unit) && value !== 0
  return {
    rounded: Object.fromEntries(
      entries.filter(isRoundedEntry)
    ) as DurationObjectUnits,
    remain: Object.fromEntries(
      entries.filter((entry) => !isRoundedEntry(entry))
    ) as DurationObjectUnits,
  }
}

const shouldCarryRoundedUnit = (
  roundingMethod: RoundingMethod,
  remainMillis: number,
  roundingHigherUnit: TimeUnit
): boolean => {
  if (roundingMethod === 'ceil') {
    return remainMillis > 0
  }
  if (roundingMethod === 'round') {
    return remainMillis >= HALF_OF_TIME_UNITS[roundingHigherUnit]
  }
  return false
}

const resolveCarryUnit = (
  roundingMethod: RoundingMethod,
  remainMillis: number,
  roundingHigherUnit: TimeUnit | undefined,
  roundingLowerUnit: TimeUnit | undefined
): TimeUnit | null => {
  if (!roundingHigherUnit || !roundingLowerUnit) return null
  return shouldCarryRoundedUnit(
    roundingMethod,
    remainMillis,
    roundingHigherUnit
  )
    ? roundingHigherUnit
    : null
}

const withCarryRoundedUnit = (
  rounded: DurationObjectUnits,
  roundingMethod: RoundingMethod,
  remainMillis: number,
  roundingHigherUnit: TimeUnit | undefined,
  roundingLowerUnit: TimeUnit | undefined
): DurationObjectUnits => {
  const carryUnit = resolveCarryUnit(
    roundingMethod,
    remainMillis,
    roundingHigherUnit,
    roundingLowerUnit
  )
  if (!carryUnit) return rounded
  return {
    ...rounded,
    [carryUnit]: (rounded[carryUnit] ?? 0) + 1,
  }
}

const withRoundedMinUnit = (
  rounded: DurationObjectUnits,
  minUnit: TimeUnit
): DurationObjectUnits =>
  Object.keys(rounded).length === 0 ? { [minUnit]: 0 } : rounded

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
  opts?: PartialRoundingOptions
): Duration => {
  const { numOfUnits, minUnit, roundingMethod } = roundingOptionsFromPartial(
    opts ?? {}
  )
  const base = duration.shiftToAll().toObject()
  const topUnit = computeTopUnit(duration)
  const useUnits = computeUseUnits({
    top: topUnit,
    nums: numOfUnits,
    min: minUnit,
  })
  const roundingHigherUnit = useUnits[useUnits.length - 2]
  const roundingLowerUnit = useUnits[useUnits.length - 1]
  const { rounded, remain } = collectRoundedUnits(useUnits, base)

  const remainMillis = Duration.fromObject(remain).toMillis()
  const roundedWithCarry = withCarryRoundedUnit(
    rounded,
    roundingMethod,
    remainMillis,
    roundingHigherUnit,
    roundingLowerUnit
  )

  return Duration.fromObject(withRoundedMinUnit(roundedWithCarry, minUnit))
}
