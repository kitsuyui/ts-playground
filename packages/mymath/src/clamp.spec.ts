import { describe, expect, it, jest } from '@jest/globals'

import { clamp } from './clamp'

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
