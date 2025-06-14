import { describe, expect, it } from 'vitest'

import { applyInverseSBox, applySBox } from './RijndaelSBox'

describe('S-Box Transformation', () => {
  const input = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07])

  it('should apply S-Box transformation correctly', () => {
    const output = applySBox(input)
    expect(output).toEqual(
      new Uint8Array([0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5])
    )
  })

  it('should apply inverse S-Box transformation correctly', () => {
    const output = applyInverseSBox(input)
    expect(output).toEqual(
      new Uint8Array([0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38])
    )
  })
})

describe('Inverse S-Box Transformation', () => {
  const input = new Uint8Array([0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5])

  it('should apply inverse S-Box transformation correctly', () => {
    const output = applyInverseSBox(input)
    expect(output).toEqual(
      new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07])
    )
  })
})

describe('S-Box and Inverse S-Box are inverses', () => {
  const input = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07])
  it('should convert back and forth correctly', () => {
    const sBoxOutput = applySBox(input)
    const inverseSBoxOutput = applyInverseSBox(sBoxOutput)
    expect(inverseSBoxOutput).toEqual(input)

    // Test with random input
    const trials = 512
    for (let i = 0; i < trials; i++) {
      const randomInput = new Uint8Array(8).map(() =>
        Math.floor(Math.random() * 256)
      )
      const sBoxOutput = applySBox(randomInput)
      const inverseSBoxOutput = applyInverseSBox(sBoxOutput)
      expect(inverseSBoxOutput).toEqual(randomInput)
    }
  })
})
