import { describe, expect, it } from 'vitest'

import { applySBox128bitBigintTo128bitBigint } from './bitShuffle'

describe('applySBox128bitBigintTo128bitBigint', () => {
  it('applies the S-Box pipeline to a 128-bit bigint', () => {
    const input = BigInt('0x0123456789abcdef0123456789abcdef')

    expect(applySBox128bitBigintTo128bitBigint(input)).toBe(
      104690180703241483303067873224999727776n
    )
  })

  it('handles zero input', () => {
    expect(applySBox128bitBigintTo128bitBigint(0n)).toBe(
      284235859428078010657642319148888741333n
    )
  })
})
