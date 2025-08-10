import { describe, expect, it } from 'vitest'

import { xorShuffle } from './xorShuffle'

describe('XOR Shuffle Operation', () => {
  const input = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07])

  it('should apply XOR shuffle correctly', () => {
    const output = xorShuffle(input)
    expect(output).toEqual(
      new Uint8Array([0x06, 0x03, 0x00, 0x05, 0x02, 0x07, 0x04, 0x01])
    )
  })

  it('is idempotent after multiple iterations', () => {
    let output: Uint8Array = input
    const iterations = input.length
    for (let i = 0; i < iterations; i++) {
      output = xorShuffle(output)
    }
    expect(output.length).toBe(input.length)
    expect(output).toEqual(input)
  })

  it('is idempotent after multiple iterations with random input', () => {
    // Test with random input and random size
    const trials = 512
    const sizes = [1, 2, 4, 8, 16, 32, 64, 128, 256]
    for (let i = 0; i < trials; i++) {
      const size = sizes[Math.floor(Math.random() * sizes.length)]
      const iterations = size
      const randomInput = new Uint8Array(size).map(() =>
        Math.floor(Math.random() * 256)
      )
      let output: Uint8Array = randomInput
      for (let j = 0; j < iterations; j++) {
        output = xorShuffle(output)
      }
      expect(output.length).toBe(size)
      expect(output).toEqual(randomInput)
    }
  })

  it('should handle empty input', () => {
    const output = xorShuffle(new Uint8Array(0))
    expect(output).toEqual(new Uint8Array(0))
  })

  it('should handle single byte input', () => {
    const output = xorShuffle(new Uint8Array([0x01]))
    expect(output).toEqual(new Uint8Array([0x01]))
  })
})
