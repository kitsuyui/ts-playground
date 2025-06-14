import { describe, expect, it } from 'vitest'

import { bigint128bitToUint8Array, uint8ArrayToBigint128bit } from './utils'

describe('bigint128bitToUint8Array', () => {
  it('should convert a 128-bit bigint to a Uint8Array', () => {
    const input = BigInt('0x0123456789abcdef0123456789abcdef')
    const expected = new Uint8Array([
      0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01, 0xef, 0xcd, 0xab, 0x89,
      0x67, 0x45, 0x23, 0x01,
    ])
    expect(bigint128bitToUint8Array(input)).toEqual(expected)
  })
})

describe('uint8ArrayToBigint128bit', () => {
  it('should convert a Uint8Array to a 128-bit bigint', () => {
    const input = new Uint8Array([
      0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01, 0xef, 0xcd, 0xab, 0x89,
      0x67, 0x45, 0x23, 0x01,
    ])
    const expected = BigInt('0x0123456789abcdef0123456789abcdef')
    expect(uint8ArrayToBigint128bit(input)).toEqual(expected)
  })
})

describe('bigint128bitToUint8Array and uint8ArrayToBigint128bit are inverses', () => {
  it('should convert back and forth correctly', () => {
    const input = BigInt('0x0123456789abcdef0123456789abcdef')
    const uint8Array = bigint128bitToUint8Array(input)
    const result = uint8ArrayToBigint128bit(uint8Array)
    expect(result).toEqual(input)

    // Test with random 128-bit bigints
    const trials = 512
    for (let i = 0; i < trials; i++) {
      const randomValue = Math.floor(Math.random() * Number.MAX_VALUE)
      const randomBigInt =
        BigInt(randomValue) & BigInt('0xffffffffffffffffffffffffffffffff') // Ensure it's 128 bits
      const uint8Array = bigint128bitToUint8Array(randomBigInt)
      const result = uint8ArrayToBigint128bit(uint8Array)
      expect(result).toEqual(randomBigInt)
    }
  })
})
