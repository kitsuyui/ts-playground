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
})
