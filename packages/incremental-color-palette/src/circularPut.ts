import { bitReversalIndex } from './bitReversalPermutation'
import { uintToGrayCode } from './grayCode'
import type { uint0toInf } from './types'

/**
 * Convert a given number to a radian value.
 */
export const uintToRadians = (n: uint0toInf): number => {
  return 2 * Math.PI * n
}

/**
 * Find group number and index within group.
 * @param n
 * @returns
 */
export const findGroupNumberAndIndex = (
  n: uint0toInf
): [uint0toInf, uint0toInf] => {
  const groupNumber = Math.floor(Math.log2(n + 1))
  const indexWithinGroup = n - (2 ** groupNumber - 1)
  return [groupNumber, indexWithinGroup]
}

export const a_n = (n: uint0toInf): number => {
  if (n === 0) {
    return 0
  }
  const [m, j] = findGroupNumberAndIndex(n - 1)
  const numerator = 2 * bitReversalIndex(m, uintToGrayCode(j)) + 1
  const denominator = 2 ** (m + 1)
  const val = numerator / denominator
  return val
}
