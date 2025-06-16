import { describe, expect, it } from 'vitest'

import { toText, zeroPad, zeroPad2, zeroPad3 } from './toText'

describe('zeroPadNumber', () => {
  it('should zero pad a number to a given length', () => {
    expect(zeroPad(1, 2)).toEqual('01')
    expect(zeroPad(1, 3)).toEqual('001')
    expect(zeroPad(1, 4)).toEqual('0001')
    expect(zeroPad(10, 2)).toEqual('10')
    expect(zeroPad(100, 3)).toEqual('100')
    expect(zeroPad(1000, 4)).toEqual('1000')
  })
})

describe('zeroPadNumber2', () => {
  it('should zero pad a number to 2 digits', () => {
    expect(zeroPad2(0)).toEqual('00')
    expect(zeroPad2(1)).toEqual('01')
    expect(zeroPad2(9)).toEqual('09')
    expect(zeroPad2(10)).toEqual('10')
  })
})

describe('zeroPadNumber3', () => {
  it('should zero pad a number to 3 digits', () => {
    expect(zeroPad3(1)).toEqual('001')
    expect(zeroPad3(10)).toEqual('010')
    expect(zeroPad3(100)).toEqual('100')
  })
})

describe('toLabel', () => {
  it('should format time value to mm:ss.mmm', () => {
    expect(toText(0)).toBe('00:00.000')
    expect(toText(1)).toBe('00:01.000')
    expect(toText(59)).toBe('00:59.000')
    expect(toText(60)).toBe('01:00.000')
    expect(toText(61)).toBe('01:01.000')
    expect(toText(3599)).toBe('59:59.000')
  })
})
