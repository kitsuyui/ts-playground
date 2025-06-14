/**
 * Converts a 128-bit bigint to a Uint8Array.
 * The bigint is expected to be in little-endian format.
 * Each byte is represented by 8 bits, and the total length is 16 bytes (128 bits).
 * @param value - The bigint value to convert.
 * @returns Uint8Array - The resulting Uint8Array containing the 128-bit value.
 */
export const bigint128bitToUint8Array = (value: bigint): Uint8Array => {
  let value_ = value
  const bytes = new Uint8Array(16)
  for (let i = 0; i < 16; i++) {
    const bit = Number(value_ & BigInt(0xff)) // 0-255
    value_ >>= BigInt(8)
    bytes[i] = bit
  }
  return bytes
}

/**
 * Converts a Uint8Array to a 128-bit bigint.
 * The Uint8Array is expected to be in little-endian format.
 * Each byte is represented by 8 bits, and the total length is 16 bytes (128 bits).
 * @param value - The Uint8Array value to convert.
 * @returns bigint - The resulting 128-bit bigint.
 */
export const uint8ArrayToBigint128bit = (value: Uint8Array): bigint => {
  let value_ = BigInt(0)
  for (let i = 0; i < 16; i++) {
    value_ |= BigInt(value[i]) << BigInt(i * 8)
  }
  return value_
}
