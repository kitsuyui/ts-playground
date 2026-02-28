import { describe, expect, it } from 'vitest'

import { COLORS, is128Bit, isValidUUID } from './index'

describe('index', () => {
  it('re-exports the public API', () => {
    expect(COLORS).toHaveLength(4)
    expect(is128Bit(0n)).toBe(true)
    expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true)
  })
})
