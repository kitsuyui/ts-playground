import type { uint0toInf } from './types'

/**
 * Convert a given number to a gray code.
 * @param n
 * @returns
 */
export const uintToGrayCode = (n: uint0toInf): uint0toInf => {
  return n ^ (n >> 1)
}

/**
 * Convert a given gray code to a number.
 * @param g
 * @returns
 */
export const grayCodeToUint = (g: uint0toInf): uint0toInf => {
  let n = g
  let shift = 1
  while (g >> shift > 0) {
    n ^= g >> shift
    shift += 1
  }
  return n
}
