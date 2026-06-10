import { describe, expect, it } from 'vitest'
import { bitReversalIndex } from './bitReversalPermutation'

describe('bitReversalIndex', () => {
  it('should return bit-reversal index', () => {
    // [0, 1] => [0, 1]
    expect(bitReversalIndex(1, 0)).toBe(0)
    expect(bitReversalIndex(1, 1)).toBe(1)

    // [0, 1, 2, 3] => [0, 2, 1, 3]
    expect(bitReversalIndex(2, 0)).toBe(0)
    expect(bitReversalIndex(2, 1)).toBe(2)
    expect(bitReversalIndex(2, 2)).toBe(1)
    expect(bitReversalIndex(2, 3)).toBe(3)
  })

  it('should handle n=31 boundary without overflow', () => {
    // bit 0 in 31-bit space maps to bit 30
    expect(bitReversalIndex(31, 0)).toBe(0)
    expect(bitReversalIndex(31, 1)).toBe(2 ** 30)
    // all bits set maps to all bits set (palindrome)
    expect(bitReversalIndex(31, 2 ** 31 - 1)).toBe(2 ** 31 - 1)
  })

  it('should handle n=32 boundary without Int32 sign-bit overflow', () => {
    // bit 0 in 32-bit space maps to bit 31
    // original code: 1 << 31 = -2147483648 (Int32 sign bit); arithmetic: 2**31 = 2147483648
    expect(bitReversalIndex(32, 0)).toBe(0)
    expect(bitReversalIndex(32, 1)).toBe(2 ** 31)
    expect(bitReversalIndex(32, 2 ** 31)).toBe(1)
  })
})
