import { describe, expect, it } from 'vitest'

import { from2bitArrayTo128bit, from128bitTo2bitArray, is128Bit } from './bits'

describe('from128bitTo2bitArray', () => {
  it('converts a 128-bit bigint to a 64-item Uint8Array', () => {
    const input = BigInt('0xfedcba9876543210fedcba9876543210')
    expect(is128Bit(input)).toBe(true)

    const output = from128bitTo2bitArray(input)

    expect(output).toHaveLength(64)
    for (const value of output) {
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThanOrEqual(3)
    }
  })

  it('round-trips with from2bitArrayTo128bit', () => {
    const input = BigInt('0xfedcba9876543210fedcba9876543210')

    expect(from2bitArrayTo128bit(from128bitTo2bitArray(input))).toBe(input)
  })
})

describe('is128Bit', () => {
  it('returns true only for non-negative 128-bit values', () => {
    const input = BigInt('0xffffffffffffffffffffffffffffffff')

    expect(is128Bit(input)).toBe(true)
    expect(is128Bit(input + BigInt(1))).toBe(false)
    expect(is128Bit(BigInt(-1))).toBe(false)
  })
})
