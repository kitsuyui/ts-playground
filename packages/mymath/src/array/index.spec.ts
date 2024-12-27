import { describe, expect, it, jest } from '@jest/globals'

import { average, product, sum } from './index'

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

describe('average', () => {
  it('should return average of all values', () => {
    expect(average([1, 2, 3, 4])).toBe(2.5)
  })

  it('should return 0 for []', () => {
    expect(average([])).toBe(0)
  })

  it('should return 5 for [] and 5', () => {
    expect(average([], 5)).toBe(5)
  })
})
