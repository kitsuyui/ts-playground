import { describe, expect, it } from 'vitest'

import {
  applySBox128bitBigintTo128bitBigint,
  from2bitArrayTo128bit,
  is128Bit,
  isValidUUID,
  uuidToBigInt,
} from './index'

describe('index', () => {
  it('re-exports the public API', () => {
    expect(is128Bit(0n)).toBe(true)
    expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true)
    expect(uuidToBigInt('00000000-0000-0000-0000-000000000001')).toBe(1n)
    expect(from2bitArrayTo128bit(new Uint8Array(64))).toBe(0n)
    expect(applySBox128bitBigintTo128bitBigint(0n)).toBeTypeOf('bigint')
  })
})
