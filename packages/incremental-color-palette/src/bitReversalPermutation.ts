import type { uint0toInf } from './types'

/**
 * @param n number of bits
 * @param index
 * @returns
 */
export const bitReversalIndex = (
  n: uint0toInf,
  index: uint0toInf
): uint0toInf => {
  const bits = n
  let reversedIndex = 0

  for (let i = 0; i < bits; i++) {
    if (index & (1 << i)) {
      reversedIndex |= 1 << (bits - 1 - i)
    }
  }

  return reversedIndex
}
