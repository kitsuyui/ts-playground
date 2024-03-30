import { describe, it, expect, jest } from '@jest/globals'

import { Duration } from 'luxon'

import { roundDuration, cleanDuration } from '.'

describe('cleanDuration', () => {
  it('should clean the duration', () => {
    expect(cleanDuration(Duration.fromObject({ hours: 1 })).toMillis()).toEqual(3600000)
    expect(cleanDuration(Duration.fromObject({ hours: -1 })).toMillis()).toEqual(3600000)
    expect(cleanDuration(Duration.fromObject({ hours: 1, minutes: 1 })).toMillis()).toEqual(3660000)
    expect(cleanDuration(Duration.fromObject({ hours: -1, minutes: -1 })).toMillis()).toEqual(3660000)
    expect(cleanDuration(Duration.fromObject({ hours: 1, minutes: 1, seconds: 1 })).toMillis()).toEqual(3661000)
    expect(cleanDuration(Duration.fromObject({ hours: -1, minutes: -1, seconds: -1 })).toMillis()).toEqual(3661000)
  })
})

describe('roundDuration', () => {
  it('should round the duration', () => {
    expect(roundDuration(Duration.fromObject({ hours: 1 }), { numOfUnits: 1, minUnit: 'minutes', roundingMethod: 'round' }).toObject()).toEqual({ hours: 1 })
    expect(roundDuration(Duration.fromObject({ hours: 1 }), { numOfUnits: 1, minUnit: 'minutes', roundingMethod: 'ceil' }).toObject()).toEqual({ hours: 1 })
    expect(roundDuration(Duration.fromObject({ hours: 1, minutes: 1 }), { numOfUnits: 1, minUnit: 'minutes', roundingMethod: 'round' }).toObject()).toEqual({ hours: 1 })
    expect(roundDuration(Duration.fromObject({ years: 1, months: 1, days: 1, hours: 1, minutes: 1, seconds: 1 }), { numOfUnits: 1, minUnit: 'minutes', roundingMethod: 'round' }).toObject()).toEqual({ years: 1 })
    expect(roundDuration(Duration.fromObject({ years: 1, months: 1, days: 1, hours: 1, minutes: 1, seconds: 1 }), { numOfUnits: 2, minUnit: 'minutes', roundingMethod: 'round' }).toObject()).toEqual({ years: 1, months: 1 })
    expect(roundDuration(Duration.fromObject({ years: 1, months: 0, days: 1, hours: 1, minutes: 1, seconds: 1 }), { numOfUnits: 2, minUnit: 'minutes', roundingMethod: 'round' }).toObject()).toEqual({ years: 1 })
    expect(roundDuration(Duration.fromObject({ years: 1, months: 7, days: 1, hours: 1, minutes: 1, seconds: 1 }), { numOfUnits: 2, minUnit: 'minutes', roundingMethod: 'round' }).toObject()).toEqual({ years: 1, months: 7 })
    expect(roundDuration(Duration.fromObject({ years: 1, months: 7, days: 1, hours: 1, minutes: 1, seconds: 1 }), { numOfUnits: 1, minUnit: 'minutes', roundingMethod: 'round' }).toObject()).toEqual({ years: 2 })
    expect(roundDuration(Duration.fromObject({ years: 1, seconds: 1 }), { numOfUnits: 1, roundingMethod: 'ceil' }).toObject()).toEqual({ years: 2 })
    expect(roundDuration(Duration.fromObject({  }), { numOfUnits: 1, roundingMethod: 'floor' }).toObject()).toEqual({ seconds: 0 })
  })
})
