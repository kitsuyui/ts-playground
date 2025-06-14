/**
 * Applies a XOR shift operation on the input data.
 * Each byte in the output is the XOR of the current byte, the previous byte, and the next byte.
 * This operation may be involutive, when the input size is a power of two (n = 2^m). (n-involutive)
 * @param data - The input data as a Uint8Array.
 * @returns Uint8Array - The output data after applying the XOR shift operation.
 */
export const xorShuffle = (data: Uint8Array): Uint8Array => {
  const output = new Uint8Array(data.length)
  for (let i = 0; i < data.length; i++) {
    const prevIndex = (i - 1 + data.length) % data.length // first byte wraps around to the last
    const prev = data[prevIndex]
    const nextIndex = (i + 1) % data.length // last byte wraps around to the first
    const next = data[nextIndex]
    output[i] = data[i] ^ prev ^ next
  }
  return output
}
