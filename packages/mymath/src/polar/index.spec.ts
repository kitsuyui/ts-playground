import { describe, expect, it } from 'vitest'
import {
  average,
  averageUnsigned,
  distance,
  kMeans,
  opposite,
  rotate,
  toSignedRad,
  toUnsignedRad,
} from './index'

describe('toUnsignedRad', () => {
  it('should normalize negative radian values to the range [0, 2π)', () => {
    expect(toUnsignedRad(-Math.PI)).toBeCloseTo(Math.PI)
    expect(toUnsignedRad(-3 * Math.PI)).toBeCloseTo(Math.PI)
  })

  it('should normalize positive radian values to the range [0, 2π)', () => {
    expect(toUnsignedRad(0)).toBeCloseTo(0)
    expect(toUnsignedRad(Math.PI)).toBeCloseTo(Math.PI)
    expect(toUnsignedRad(3 * Math.PI)).toBeCloseTo(Math.PI)
  })

  it('should handle values greater than 2π', () => {
    expect(toUnsignedRad(2 * Math.PI)).toBeCloseTo(0)
    expect(toUnsignedRad(5 * Math.PI)).toBeCloseTo(Math.PI)
  })

  it('should handle every value in the range [0, 2π)', () => {
    for (let i = 0; i < 100; i++) {
      const randomValue = Math.random() * 10 * Math.PI - 5 * Math.PI
      const normalizedValue = toUnsignedRad(randomValue)
      expect(normalizedValue).toBeGreaterThanOrEqual(0)
      expect(normalizedValue).toBeLessThan(2 * Math.PI)
    }
  })

  it('should return nan for nan and infinite values', () => {
    expect(toUnsignedRad(Number.NaN)).toBeNaN()
    expect(toUnsignedRad(Number.POSITIVE_INFINITY)).toBeNaN()
    expect(toUnsignedRad(Number.NEGATIVE_INFINITY)).toBeNaN()
  })
})

describe('toSignedRad', () => {
  const epsilon = 0.0001
  it('should normalize negative radian values to the range [-π, π)', () => {
    expect(toSignedRad(2 * Math.PI)).toBeCloseTo(0)
    expect(toSignedRad(-Math.PI)).toBeCloseTo(-Math.PI)
    expect(toSignedRad(-3 * Math.PI - epsilon)).toBeCloseTo(Math.PI)
    expect(toSignedRad(-3 * Math.PI + epsilon)).toBeCloseTo(-Math.PI)
  })

  it('should normalize positive radian values to the range [-π, π)', () => {
    expect(toSignedRad(0)).toBeCloseTo(0)
    expect(toSignedRad(Math.PI - epsilon)).toBeCloseTo(Math.PI)
    expect(toSignedRad(Math.PI + epsilon)).toBeCloseTo(-Math.PI)
    expect(toSignedRad(3 * Math.PI - epsilon)).toBeCloseTo(Math.PI)
    expect(toSignedRad(3 * Math.PI + epsilon)).toBeCloseTo(-Math.PI)
  })

  it('should handle values greater than π', () => {
    expect(toSignedRad(2 * Math.PI)).toBeCloseTo(0)
    expect(toSignedRad(5 * Math.PI - epsilon)).toBeCloseTo(Math.PI)
    expect(toSignedRad(5 * Math.PI + epsilon)).toBeCloseTo(-Math.PI)
  })

  it('should handle every value in the range [-π, π)', () => {
    for (let i = 0; i < 100; i++) {
      const randomValue = Math.random() * 10 * Math.PI - 5 * Math.PI
      const normalizedValue = toSignedRad(randomValue)
      expect(normalizedValue).toBeGreaterThanOrEqual(-Math.PI)
      expect(normalizedValue).toBeLessThan(Math.PI)
    }
  })

  it('should return nan for nan and infinite values', () => {
    expect(toSignedRad(Number.NaN)).toBeNaN()
    expect(toSignedRad(Number.POSITIVE_INFINITY)).toBeNaN()
    expect(toSignedRad(Number.NEGATIVE_INFINITY)).toBeNaN()
  })
})

describe('average', () => {
  it('should compute the average of an array of radian values', () => {
    const rads = [0, Math.PI / 2]
    expect(average(rads)).toBeCloseTo(Math.PI / 4)
  })

  it('should return NaN for an empty array', () => {
    expect(average([])).toBeNaN()
  })

  it('should handle NaN values in the array', () => {
    const rads = [0, Math.PI / 2, Number.NaN]
    expect(average(rads)).toBeNaN()
  })

  it('should handle infinite values in the array', () => {
    const rads = [0, Math.PI / 2, Number.POSITIVE_INFINITY]
    expect(average(rads)).toBeNaN()
  })

  it('should handle negative values in the array', () => {
    const rads = [-Math.PI / 2, -Math.PI]
    expect(average(rads)).toBeCloseTo((-Math.PI * 3) / 4)
  })
})

describe('averageUnsigned', () => {
  it('should compute the average in the range [0, 2π)', () => {
    const rads = [-Math.PI / 2, -Math.PI]
    expect(averageUnsigned(rads)).toBeCloseTo((Math.PI * 5) / 4)
  })

  it('should return NaN for an empty array', () => {
    expect(averageUnsigned([])).toBeNaN()
  })
})

describe('distance', () => {
  it('should compute the shortest circular distance', () => {
    expect(distance(0, Math.PI / 2)).toBeCloseTo(Math.PI / 2)
    expect(distance(0, Math.PI * 1.5)).toBeCloseTo(Math.PI / 2)
  })
})

describe('rotate', () => {
  it('should rotate and normalize to [0, 2π)', () => {
    expect(rotate(-Math.PI / 2, Math.PI)).toBeCloseTo(Math.PI / 2)
  })
})

describe('opposite', () => {
  it('should rotate by π', () => {
    expect(opposite(Math.PI / 2)).toBeCloseTo(Math.PI * 1.5)
  })
})

describe('kMeans', () => {
  it('should cluster circular values and keep label-center consistency', () => {
    const rads = [0, 0.2, Math.PI, Math.PI + 0.2]
    const [centers, labels] = kMeans(rads, 2)

    expect(centers).toHaveLength(2)
    expect(labels).toHaveLength(rads.length)
    expect(labels[0]).toBe(labels[1])
    expect(labels[2]).toBe(labels[3])
    expect(labels[0]).not.toBe(labels[2])
    expect(centers[labels[0]]).toBeCloseTo(0.1)
    expect(centers[labels[2]]).toBeCloseTo(Math.PI + 0.1)
  })

  it('should return empty arrays for invalid inputs', () => {
    expect(kMeans([], 2)).toEqual([[], []])
    expect(kMeans([0, 1], 0)).toEqual([[], []])
  })
})
