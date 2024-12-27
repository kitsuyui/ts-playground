import { describe, expect, it, jest } from '@jest/globals'

import { softmax, softmaxWithTemperature } from './index'

describe('softmaxWithTemperature', () => {
  it('should return the correct result', () => {
    const weights = [1, 2, 3, 4, 5]
    const temperature = 1
    expect(softmaxWithTemperature(weights, temperature)).toEqual([
      0.011656230956039605, 0.03168492079612427, 0.0861285444362687,
      0.23412165725273662, 0.6364086465588308,
    ])
  })

  it('should return an empty array when the input is an empty array', () => {
    const weights: number[] = []
    const temperature = 1
    expect(softmaxWithTemperature(weights, temperature)).toEqual([])
  })
})

describe('softmax', () => {
  it('should return the correct result', () => {
    const weights = [1, 2, 3, 4, 5]
    expect(softmax(weights)).toEqual([
      0.011656230956039605, 0.03168492079612427, 0.0861285444362687,
      0.23412165725273662, 0.6364086465588308,
    ])
  })

  it('should return an empty array when the input is an empty array', () => {
    const weights: number[] = []
    expect(softmax(weights)).toEqual([])
  })
})
