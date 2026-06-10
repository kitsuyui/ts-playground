import { DateTime, Duration } from 'luxon'
import { describe, expect, it } from 'vitest'
import {
  toHumanDurationExtended,
  toHumanDurationWithDiff,
  toHumanDurationWithTemporal,
} from '.'

describe('toHumanDurationExtended', () => {
  it('should return the human duration', () => {
    expect(
      toHumanDurationExtended(
        Duration.fromObject({ hours: 1, minutes: 23, seconds: 45 }).reconfigure(
          { locale: 'en' }
        )
      )
    ).toBe('1 hour, 24 minutes')
    expect(
      toHumanDurationExtended(
        Duration.fromObject({ hours: 1, minutes: 23, seconds: 45 }).reconfigure(
          { locale: 'en' }
        ),
        {
          human: {
            unitDisplay: 'narrow',
            unit: 'short',
          },
          rounding: {
            numOfUnits: 2,
            minUnit: 'minutes',
            roundingMethod: 'round',
          },
        }
      )
    ).toBe('1h, 24m')

    expect(
      toHumanDurationExtended(
        Duration.fromObject({ hours: 1, minutes: 23, seconds: 45 }).reconfigure(
          { locale: 'ja' }
        )
      )
    ).toBe('1 時間、24 分')
  })
})

describe('toHumanDurationWithTemporal', () => {
  it('should return the human duration', () => {
    expect(
      toHumanDurationWithTemporal(
        Duration.fromObject({ hours: 1, minutes: 23, seconds: 45 }).reconfigure(
          { locale: 'en' }
        ),
        'past'
      )
    ).toBe('1 hour, 24 minutes ago')
    expect(
      toHumanDurationWithTemporal(
        Duration.fromObject({ hours: 1, minutes: 23, seconds: 45 }).reconfigure(
          { locale: 'en' }
        ),
        'future'
      )
    ).toBe('in 1 hour, 24 minutes')

    const formatter = (
      baseText: string,
      temporal: 'past' | 'future'
    ): string => {
      if (temporal === 'future') {
        return `あと ${baseText}`
      }
      return `${baseText} 前`
    }

    expect(
      toHumanDurationWithTemporal(
        Duration.fromObject({ hours: 1, minutes: 23, seconds: 45 }).reconfigure(
          { locale: 'ja' }
        ),
        'past',
        {
          formatter: formatter,
        }
      )
    ).toBe('1 時間、24 分 前')
    expect(
      toHumanDurationWithTemporal(
        Duration.fromObject({ hours: 1, minutes: 23, seconds: 45 }).reconfigure(
          { locale: 'ja' }
        ),
        'future',
        {
          formatter: formatter,
        }
      )
    ).toBe('あと 1 時間、24 分')
  })
})

describe('toHumanDurationWithDiff', () => {
  it('should return the human duration', () => {
    const begin = DateTime.fromISO('2022-01-01T00:00:00Z').reconfigure({
      locale: 'en',
    })
    const end = DateTime.fromISO('2022-01-01T01:23:00Z').reconfigure({
      locale: 'en',
    })
    expect(toHumanDurationWithDiff(begin, end)).toBe('in 1 hour, 23 minutes')
    expect(toHumanDurationWithDiff(end, begin)).toBe('1 hour, 23 minutes ago')
  })

  it('should use begin locale when end has no locale', () => {
    // begin.locale is 'ja'; end has no locale → locale should be 'ja'
    const begin = DateTime.fromISO('2022-01-01T00:00:00Z').reconfigure({
      locale: 'ja',
    })
    const end = DateTime.fromISO('2022-01-01T01:23:00Z')
    // defaultFormatter wraps with English "in"/"ago"; duration text uses begin locale
    expect(toHumanDurationWithDiff(begin, end)).toBe('in 1 時間、23 分')
  })

  it('should use calendar-aware diff for month-level durations', () => {
    // Jan 1 to Mar 1 2022: exactly 2 calendar months
    const begin = DateTime.fromISO('2022-01-01T00:00:00Z').reconfigure({
      locale: 'en',
    })
    const end = DateTime.fromISO('2022-03-01T00:00:00Z').reconfigure({
      locale: 'en',
    })
    // calendar-aware diff gives {months: 2, days: 0} → rounds to "2 months"
    expect(toHumanDurationWithDiff(begin, end)).toBe('in 2 months')
  })
})
