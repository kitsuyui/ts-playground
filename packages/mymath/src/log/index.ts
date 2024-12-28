/**
 * Returns the logarithm of a number with a specified base
 * @example
 * ```ts
 * import { logOfBase } from '@kitsuyui/mymath'
 * logOfBase(2, 8) // => 3
 * ```
 * @param base base of the logarithm
 * @param x value to the function
 * @returns the logarithm of x with the specified base
 */
export const logOfBase = (base: number, x: number) => {
  return Math.log(x) / Math.log(base)
}

type NumberToNumberFunction = (x: number) => number

/**
 * Returns a function that computes the logarithm of a number with a specified base
 * @example
 * ```ts
 * import { logFnOfBase } from '@kitsuyui/mymath'
 * const log2 = logFnOfBase(2)
 * log2(8) // => 3
 * ```
 * @param base base of the logarithm
 * @returns a function that computes the logarithm of a number with the specified base
 */
export const logFnOfBase: (base: number) => NumberToNumberFunction =
  (base: number) => (x: number) => {
    return Math.log(x) / Math.log(base)
  }
