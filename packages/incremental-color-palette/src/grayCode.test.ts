import { describe, expect, it, jest } from '@jest/globals'

import { grayCodeToUint, uintToGrayCode } from './grayCode'

describe('uintToGrayCode', () => {
  it('should convert a given number to a gray code', () => {
    expect(uintToGrayCode(0)).toBe(0)
    expect(uintToGrayCode(1)).toBe(1)
    expect(uintToGrayCode(2)).toBe(3)
    expect(uintToGrayCode(3)).toBe(2)
    expect(uintToGrayCode(4)).toBe(6)
    expect(uintToGrayCode(5)).toBe(7)
    expect(uintToGrayCode(6)).toBe(5)
    expect(uintToGrayCode(7)).toBe(4)
    expect(uintToGrayCode(8)).toBe(12)
    expect(uintToGrayCode(9)).toBe(13)
    expect(uintToGrayCode(10)).toBe(15)
    expect(uintToGrayCode(11)).toBe(14)
    expect(uintToGrayCode(12)).toBe(10)
    expect(uintToGrayCode(13)).toBe(11)
    expect(uintToGrayCode(14)).toBe(9)
    expect(uintToGrayCode(15)).toBe(8)
  })
})

describe('grayCodeToUint', () => {
  it('should convert a given gray code to a number', () => {
    expect(grayCodeToUint(0)).toBe(0)
    expect(grayCodeToUint(1)).toBe(1)
    expect(grayCodeToUint(3)).toBe(2)
    expect(grayCodeToUint(2)).toBe(3)
    expect(grayCodeToUint(6)).toBe(4)
    expect(grayCodeToUint(7)).toBe(5)
    expect(grayCodeToUint(5)).toBe(6)
    expect(grayCodeToUint(4)).toBe(7)
    expect(grayCodeToUint(12)).toBe(8)
    expect(grayCodeToUint(13)).toBe(9)
    expect(grayCodeToUint(15)).toBe(10)
    expect(grayCodeToUint(14)).toBe(11)
    expect(grayCodeToUint(10)).toBe(12)
    expect(grayCodeToUint(11)).toBe(13)
    expect(grayCodeToUint(9)).toBe(14)
    expect(grayCodeToUint(8)).toBe(15)
  })
})

describe('uintToGrayCode and grayCodeToUint', () => {
  it('should convert a given number to a gray code and back to a number', () => {
    for (let i = 0; i < 16; i++) {
      expect(grayCodeToUint(uintToGrayCode(i))).toBe(i)
    }
  })
})
