import { describe, expect, it } from 'vitest'

import { clamp, clampMinAndMax, clampMinAndMaxInt, errorToNaN } from './clamp'

describe('clamp', () => {
  it('should return min for value < min', () => {
    expect(clamp(5, [10, 20])).toBe(10)
  })

  it('should return value for min <= value <= max', () => {
    expect(clamp(15, [10, 20])).toBe(15)
  })

  it('should return max for value > max', () => {
    expect(clamp(25, [10, 20])).toBe(20)
  })
})

describe('clampMinAndMax', () => {
  it('should clamp value to Number.MIN_VALUE and Number.MAX_VALUE', () => {
    expect(clampMinAndMax(1e-10)).toBe(1e-10)
    expect(clampMinAndMax(Number.MAX_VALUE + 1)).toBe(Number.MAX_VALUE)
    expect(clampMinAndMax(Number.MIN_VALUE - 1)).toBe(Number.MIN_VALUE)
    expect(clampMinAndMax(Number.POSITIVE_INFINITY)).toBe(Number.MAX_VALUE)
    expect(clampMinAndMax(Number.NEGATIVE_INFINITY)).toBe(Number.MIN_VALUE)
  })
})

describe('clampMinAndMaxInt', () => {
  it('should clamp value to Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER', () => {
    expect(clampMinAndMaxInt(1e-10)).toBe(1e-10)
    expect(clampMinAndMaxInt(Number.MAX_SAFE_INTEGER + 1)).toBe(
      Number.MAX_SAFE_INTEGER
    )
    expect(clampMinAndMaxInt(Number.MIN_SAFE_INTEGER - 1)).toBe(
      Number.MIN_SAFE_INTEGER
    )
    expect(clampMinAndMaxInt(Number.POSITIVE_INFINITY)).toBe(
      Number.MAX_SAFE_INTEGER
    )
    expect(clampMinAndMaxInt(Number.NEGATIVE_INFINITY)).toBe(
      Number.MIN_SAFE_INTEGER
    )
  })
})

describe('errorToNaN', () => {
  it('should return NaN if the function throws an error', () => {
    const faultyFunction = (value: number) => {
      throw new Error('Test error')
    }
    const wrappedFunction = errorToNaN(faultyFunction)
    expect(wrappedFunction(10)).toBe(Number.NaN)
  })

  it('should return the correct value if the function does not throw an error', () => {
    const validFunction = (value: number) => value * 2
    const wrappedFunction = errorToNaN(validFunction)
    expect(wrappedFunction(10)).toBe(20)
  })
})
