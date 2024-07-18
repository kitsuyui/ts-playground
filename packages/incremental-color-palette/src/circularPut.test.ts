import { describe, expect, it, jest } from '@jest/globals'

import { a_n, findGroupNumberAndIndex } from './circularPut'

describe('findGroupNumberAndIndex', () => {
  it('should return group number and index within group', () => {
    expect(findGroupNumberAndIndex(0)).toEqual([0, 0])
    expect(findGroupNumberAndIndex(1)).toEqual([1, 0])
    expect(findGroupNumberAndIndex(2)).toEqual([1, 1])
    expect(findGroupNumberAndIndex(3)).toEqual([2, 0])
    expect(findGroupNumberAndIndex(4)).toEqual([2, 1])
    expect(findGroupNumberAndIndex(5)).toEqual([2, 2])
    expect(findGroupNumberAndIndex(6)).toEqual([2, 3])
    expect(findGroupNumberAndIndex(7)).toEqual([3, 0])
    expect(findGroupNumberAndIndex(8)).toEqual([3, 1])
    expect(findGroupNumberAndIndex(9)).toEqual([3, 2])
    expect(findGroupNumberAndIndex(10)).toEqual([3, 3])
    expect(findGroupNumberAndIndex(11)).toEqual([3, 4])
    expect(findGroupNumberAndIndex(12)).toEqual([3, 5])
    expect(findGroupNumberAndIndex(13)).toEqual([3, 6])
    expect(findGroupNumberAndIndex(14)).toEqual([3, 7])
    expect(findGroupNumberAndIndex(15)).toEqual([4, 0])
  })
})

describe('a_n', () => {
  it('should return a_n', () => {
    expect(a_n(0)).toBe(0) // 0

    expect(a_n(1)).toBe(0.5) // 1/2

    expect(a_n(2)).toBe(0.25) // 1/4
    expect(a_n(3)).toBe(0.75) // 3/4

    expect(a_n(4)).toBe(0.125) // 1/8
    expect(a_n(5)).toBe(0.625) // 5/8
    expect(a_n(6)).toBe(0.875) // 7/8
    expect(a_n(7)).toBe(0.375) // 3/8

    expect(a_n(8)).toBe(0.0625) // 1/16
    expect(a_n(9)).toBe(0.5625) // 9/16
    expect(a_n(10)).toBe(0.8125) // 13/16
    expect(a_n(11)).toBe(0.3125) // 5/16
    expect(a_n(12)).toBe(0.4375) // 7/16
    expect(a_n(13)).toBe(0.9375) // 15/16
    expect(a_n(14)).toBe(0.6875) // 11/16
    expect(a_n(15)).toBe(0.1875) // 3/16
  })
})
