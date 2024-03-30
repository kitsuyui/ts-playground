// This is a workaround for the issue #1134
// c.f. https://github.com/moment/luxon/issues/1134

import type { DateTime, Duration, ToHumanDurationOptions } from 'luxon'
import { cleanDuration, roundDuration, type PartialRoundingOptions } from './rounding'

interface ExtendedToHumanDurationOptions {
  rounding?: PartialRoundingOptions
  human?: ToHumanDurationOptions
}

interface TemporalToHumanDurationOptions extends ExtendedToHumanDurationOptions {
  formatter: Formatter
}

type Temporal = 'past' | 'future'

type Formatter = (baseText: string, temporal: Temporal) => string

export const toHumanDurationExtended = (
  duration: Duration,
  opts?: ExtendedToHumanDurationOptions,
): string => {
  const locale = duration.locale ?? undefined
  const cleaned = cleanDuration(duration)
  return roundDuration(
    cleaned,
    opts?.rounding,
  ).reconfigure({ locale }).toHuman(opts?.human)
}

export const toHumanDurationWithTemporal = (
  duration: Duration,
  temporal: Temporal,
  opts?: TemporalToHumanDurationOptions,
): string => {
  const formatter = opts?.formatter ?? defaultFormatter
  const human = toHumanDurationExtended(duration, opts)
  return formatter(human, temporal)
}

/**
 * Convert the duration between two DateTimes to a human readable format
 * @param start 
 * @param end 
 * @param opts 
 * @returns 
 */
export const toHumanDurationWithDiff = (
  begin: DateTime,
  end: DateTime,
  opts?: TemporalToHumanDurationOptions,
): string => {
  const temporal = end > begin ? 'future' : 'past'
  const locale = end.locale ?? undefined
  const duration = begin.diff(end).reconfigure({ locale })
  return toHumanDurationWithTemporal(duration, temporal, opts)
}

/**
 * Default formatter
 * @param baseText 
 * @param temporal 
 * @returns
 */
const defaultFormatter: Formatter = (baseText: string, temporal: Temporal): string => {
  if (temporal === 'future') {
    return `in ${baseText}`
  }
  return `${baseText} ago`
}
