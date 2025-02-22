import { describe, expect, it } from 'vitest'

import {
  arithmeticMean,
  average,
  cubicMean,
  generalizedMean,
  geometricMean,
  harmonicMean,
  naiveGeneralizedMean,
  product,
  rootMeanSquare,
  sum,
} from './index'

describe('sum', () => {
  it('should return sum of all values', () => {
    expect(sum([1, 2, 3, 4])).toBe(10)
  })

  it('should return 0 for []', () => {
    expect(sum([])).toBe(0)
  })
})

describe('product', () => {
  it('should return product of all values', () => {
    expect(product([1, 2, 3, 4])).toBe(24)
  })

  it('should return 1 for []', () => {
    expect(product([])).toBe(1)
  })
})

describe('average (alias of arithmeticMean)', () => {
  it('should return average of all values', () => {
    expect(average([1, 2, 3, 4])).toBe(2.5)
  })

  it('should return 0 for []', () => {
    expect(average([])).toBe(0)
  })

  it('should return 5 for [] and 5', () => {
    expect(average([], 5)).toBe(5)
  })

  it('should return same value as arithmeticMean', () => {
    expect(average([1, 2, 3, 4])).toBe(arithmeticMean([1, 2, 3, 4]))
  })
})

describe('rootMeanSquare', () => {
  it('should return root mean square of all values', () => {
    expect(rootMeanSquare([1, 2, 3, 4])).toBeCloseTo(2.7386)
  })

  it('should return 0 for []', () => {
    expect(rootMeanSquare([])).toBe(0)
  })
})

describe('cubicMean', () => {
  it('should return cubic mean of all values', () => {
    expect(cubicMean([1, 2, 3, 4])).toBeCloseTo(2.924)
  })

  it('should return 0 for []', () => {
    expect(cubicMean([])).toBe(0)
  })
})

describe('geometricMean', () => {
  it('should return geometric mean of all values', () => {
    expect(geometricMean([1, 2, 3, 4])).toBeCloseTo(2.2134)
  })

  it('should return 1 for []', () => {
    expect(geometricMean([])).toBe(1)
  })
})

describe('harmonicMean', () => {
  it('should return harmonic mean of all values', () => {
    expect(harmonicMean([1, 2, 3, 4])).toBeCloseTo(1.92)
  })

  it('should return 0 for []', () => {
    expect(() => harmonicMean([])).toThrowError(
      'Cannot calculate harmonic mean of empty set'
    )
  })
})

describe('generalizedMean', () => {
  it('should return generalized mean of all values', () => {
    expect(generalizedMean([1, 2, 3, 4], Number.NEGATIVE_INFINITY)).toBe(
      Math.min(...[1, 2, 3, 4])
    )
    expect(generalizedMean([1, 2, 3, 4], 0)).toBe(geometricMean([1, 2, 3, 4]))
    expect(generalizedMean([1, 2, 3, 4], 1)).toBe(arithmeticMean([1, 2, 3, 4]))
    expect(generalizedMean([1, 2, 3, 4], 2)).toBe(rootMeanSquare([1, 2, 3, 4]))
    expect(generalizedMean([1, 2, 3, 4], 3)).toBe(cubicMean([1, 2, 3, 4]))
    expect(generalizedMean([1, 2, 3, 4], Number.POSITIVE_INFINITY)).toBe(
      Math.max(...[1, 2, 3, 4])
    )

    expect(generalizedMean([], Number.NEGATIVE_INFINITY)).toBe(
      Number.POSITIVE_INFINITY
    )
    expect(generalizedMean([], 0)).toBe(1)
    expect(generalizedMean([], 1)).toBe(0)
    expect(generalizedMean([], 2)).toBe(0)
    expect(generalizedMean([], 3)).toBe(0)
    expect(generalizedMean([], Number.POSITIVE_INFINITY)).toBe(
      Number.NEGATIVE_INFINITY
    )
  })

  it('should return same value as naiveGeneralizedMean', () => {
    const values = [1, 2, 3, 4]
    expect(naiveGeneralizedMean(values, 0.0001)).toBeCloseTo(
      geometricMean(values)
    )
  })
})
