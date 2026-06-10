import { describe, expect, it } from 'vitest'

import { sum } from './array'
import { softmax, softmaxWithTemperature } from './softmax'

describe('softmaxWithTemperature', () => {
  it('should return the correct result', () => {
    const weights = [1, 2, 3, 4, 5]
    const temperature = 1
    const result = softmaxWithTemperature(weights, temperature)
    expect(softmaxWithTemperature(weights, temperature)).toEqual([
      0.011656230956039605, 0.03168492079612427, 0.0861285444362687,
      0.23412165725273662, 0.6364086465588308,
    ])
    expect(sum(result)).toBeCloseTo(1)
    for (const probability of result) {
      expect(probability).toBeGreaterThanOrEqual(0)
      expect(probability).toBeLessThanOrEqual(1)
    }
  })

  it('should return an empty array when the input is an empty array', () => {
    const weights: number[] = []
    const temperature = 1
    expect(softmaxWithTemperature(weights, temperature)).toEqual([])
  })

  it('should throw RangeError for temperature=0', () => {
    expect(() => softmaxWithTemperature([1, 2, 3], 0)).toThrow(RangeError)
  })

  it('should throw RangeError for negative temperature', () => {
    expect(() => softmaxWithTemperature([1, 2, 3], -1)).toThrow(RangeError)
  })

  it('should throw RangeError for temperature=NaN', () => {
    expect(() => softmaxWithTemperature([1, 2, 3], Number.NaN)).toThrow(
      RangeError
    )
  })

  it('should throw RangeError for temperature=Infinity', () => {
    expect(() =>
      softmaxWithTemperature([1, 2, 3], Number.POSITIVE_INFINITY)
    ).toThrow(RangeError)
  })
})

describe('softmax', () => {
  it('should return the correct result', () => {
    const weights = [1, 2, 3, 4, 5]
    const result = softmax(weights)
    expect(result).toEqual([
      0.011656230956039605, 0.03168492079612427, 0.0861285444362687,
      0.23412165725273662, 0.6364086465588308,
    ])
    expect(sum(result)).toBeCloseTo(1)
    for (const probability of result) {
      expect(probability).toBeGreaterThanOrEqual(0)
      expect(probability).toBeLessThanOrEqual(1)
    }
  })

  it('should return an empty array when the input is an empty array', () => {
    const weights: number[] = []
    expect(softmax(weights)).toEqual([])
  })
})
