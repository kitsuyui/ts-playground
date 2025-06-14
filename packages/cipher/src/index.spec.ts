import { describe, expect, it } from 'vitest'

import * as module from '.'

describe('exports', () => {
  it('should export', () => {
    expect(module).toHaveProperty('utils')
    expect(module.utils).toHaveProperty('bigint128bitToUint8Array')
    expect(module.utils).toHaveProperty('uint8ArrayToBigint128bit')
    expect(module).toHaveProperty('xorShuffle')
    expect(module.xorShuffle).toHaveProperty('xorShuffle')
    expect(module).toHaveProperty('RijndaelSBox')
    expect(module.RijndaelSBox).toHaveProperty('applySBox')
    expect(module.RijndaelSBox).toHaveProperty('applyInverseSBox')
  })
})
