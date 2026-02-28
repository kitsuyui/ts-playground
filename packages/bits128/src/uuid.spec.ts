import { describe, expect, it } from 'vitest'

import { isValidUUID, uuidToBigInt } from './uuid'

describe('isValidUUID', () => {
  it('accepts valid UUIDs', () => {
    expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true)
    expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true)
    expect(isValidUUID('550E8400-E29B-41D4-A716-446655440000')).toBe(true)
  })

  it('rejects invalid UUIDs', () => {
    expect(isValidUUID('123e4567-e89b-12d3-a456-42661417400')).toBe(false)
    expect(isValidUUID('123e4567-e89b-12d3-a456-42661417400g')).toBe(false)
  })
})

describe('uuidToBigInt', () => {
  it('converts UUID text to a bigint', () => {
    expect(uuidToBigInt('00000000-0000-0000-0000-000000000001')).toBe(1n)
  })
})
