import { describe, expect, it } from 'vitest'
import * as module from './index'

describe('map01to0InfTan', () => {
  it('should map values from [0, 1] to [0, +∞)', () => {
    expect(module.map01to0InfTan(0)).toBe(0)
    expect(module.map01to0InfTan(0.5)).toBeCloseTo(Math.tan(Math.PI / 4), 5)
    expect(module.map01to0InfTan(1)).toBe(Number.POSITIVE_INFINITY)
  })

  it('should throw an error for values outside [0, 1]', () => {
    expect(() => module.map01to0InfTan(-0.1)).toThrow(
      'Value must be in the range [0, 1]'
    )
    expect(() => module.map01to0InfTan(1.1)).toThrow(
      'Value must be in the range [0, 1]'
    )
  })
})

describe('map01To0InfWithQ', () => {
  it('should map values from [0, 1] to [0, +∞) with q = 1', () => {
    expect(module.map01To0InfWithQ(0, 1)).toBe(0)
    expect(module.map01To0InfWithQ(1, 1)).toBe(Number.POSITIVE_INFINITY)
  })

  it('should handle q = 0 as a limit approaching infinity', () => {
    expect(module.map01To0InfWithQ(0, 0)).toBeCloseTo(0, 5)
    expect(module.map01To0InfWithQ(1, 0)).toBe(Number.POSITIVE_INFINITY)
  })
})

describe('generateMap01To0InfWithQ', () => {
  it('should generate a function that maps values from [0, 1] to [0, +∞) with q = 1', () => {
    const mapFunc = module.generateMap01To0InfWithQ(1)
    expect(mapFunc(0)).toBe(0)
    expect(mapFunc(0.5)).toBeCloseTo(1, 5)
    expect(mapFunc(1)).toBe(Number.POSITIVE_INFINITY)
  })

  it('should throw an error for q <= 0', () => {
    expect(() => module.generateMap01To0InfWithQ(0)).toThrow(
      'q must be greater than 0'
    )
    expect(() => module.generateMap01To0InfWithQ(-1)).toThrow(
      'q must be greater than 0'
    )
  })

  it('should throw an error for values outside [0, 1]', () => {
    const mapFunc = module.generateMap01To0InfWithQ(1)
    expect(() => mapFunc(-0.1)).toThrow('Value must be in the range [0, 1]')
    expect(() => mapFunc(1.1)).toThrow('Value must be in the range [0, 1]')
  })
})

describe('map0InfTo10WithExp', () => {
  it('should map values from [0, +∞) to [0, 1] using exponential scaling', () => {
    expect(module.map0InfTo10WithExp(0)).toBeCloseTo(1, 5)
    expect(module.map0InfTo10WithExp(Number.POSITIVE_INFINITY)).toBeCloseTo(
      0,
      5
    )
  })
})

describe('map0InfTo01WithArctan', () => {
  it('should map values from [0, +∞) to [0, 1] using arctan scaling', () => {
    expect(module.map0InfTo01WithArctan(0)).toBeCloseTo(0, 5)
    expect(module.map0InfTo01WithArctan(Number.POSITIVE_INFINITY)).toBeCloseTo(
      1,
      5
    )
  })
})

describe('map0InfTo01WithExp', () => {
  it('should map values from [0, +∞) to [0, 1] using exponential scaling', () => {
    expect(module.map0InfTo01WithExp(0)).toBeCloseTo(0, 5)
    expect(module.map0InfTo01WithExp(Number.POSITIVE_INFINITY)).toBeCloseTo(
      1,
      5
    )
  })
})
