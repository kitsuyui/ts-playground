export const is128Bit = (value: bigint): boolean => {
  return (
    value >= BigInt(0) && value <= BigInt('0xffffffffffffffffffffffffffffffff')
  )
}

/**
 * Convert 128-bit value to an array of 64 two-bit values.
 */
export const from128bitTo2bitArray = (value: bigint): Uint8Array => {
  const mask = BigInt(0b11)
  const bytes = new Uint8Array(64)
  for (let i = 0; i < 64; i++) {
    const bit = BigInt(i) * BigInt(2)
    const valueAtBit = (value >> bit) & mask
    bytes[i] = Number(valueAtBit)
  }
  return bytes
}

/**
 * Convert an array of 64 two-bit values back to a 128-bit bigint.
 */
const to2bitBigInt = (bit: number): bigint => {
  if (bit > 3) {
    throw new Error(`Invalid bit value: ${bit}`)
  }
  return BigInt(bit)
}

export const from2bitArrayTo128bit = (array: Uint8Array): bigint => {
  if (array.length !== 64) {
    throw new Error('Array length must be 64')
  }
  let value = BigInt(0)
  for (let i = 0; i < array.length; i++) {
    value |= to2bitBigInt(array[i]) << BigInt(i * 2)
  }
  return value
}
