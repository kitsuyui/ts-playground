import { describe, it, expect, jest } from '@jest/globals'
import { sigmoid } from './index'

describe('sigmoid', () => {
  it('should return 0.5 for 0', () => {
    expect(sigmoid(0)).toBe(0.5)
  })

  it('should return 0 for -Infinity', () => {
    expect(sigmoid(Number.NEGATIVE_INFINITY)).toBe(0)
  })

  it('should return 1 for Infinity', () => {
    expect(sigmoid(Number.POSITIVE_INFINITY)).toBe(1)
  })
})
