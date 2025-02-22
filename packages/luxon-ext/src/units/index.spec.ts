import { describe, expect, it } from 'vitest'

import { Duration } from 'luxon'
import { computeTopUnit, computeUseUnits } from '.'

describe('computeTopUnit', () => {
  it('should return the most significant unit', () => {
    expect(computeTopUnit(Duration.fromObject({ hours: 1 }))).toBe('hours')
    expect(computeTopUnit(Duration.fromObject({ hours: 1, minutes: 1 }))).toBe(
      'hours'
    )
    expect(
      computeTopUnit(Duration.fromObject({ hours: 1, minutes: 1, seconds: 1 }))
    ).toBe('hours')
  })
})

describe('computeUseUnits', () => {
  it('should return the units to use', () => {
    expect(computeUseUnits({ top: 'hours', nums: 1, min: 'minutes' })).toEqual([
      'hours',
      'minutes',
    ])
    expect(computeUseUnits({ top: 'hours', nums: 2, min: 'minutes' })).toEqual([
      'hours',
      'minutes',
      'seconds',
    ])
    expect(computeUseUnits({ top: 'hours', nums: 3, min: 'minutes' })).toEqual([
      'hours',
      'minutes',
      'seconds',
    ])
    expect(computeUseUnits({ top: 'hours', nums: 1, min: 'hours' })).toEqual([
      'hours',
      'minutes',
    ])
    expect(computeUseUnits({ top: 'hours', nums: 2, min: 'seconds' })).toEqual([
      'hours',
      'minutes',
      'seconds',
    ])
    expect(computeUseUnits({ top: 'hours', nums: 3, min: 'seconds' })).toEqual([
      'hours',
      'minutes',
      'seconds',
      'milliseconds',
    ])
  })
})
