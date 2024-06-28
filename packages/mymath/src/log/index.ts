/**
 * Returns the logarithm of a number with a specified base
 * @param base base of the logarithm
 * @param input value to the function
 * @returns the logarithm of x with the specified base
 */
export const logOfBase = (base: number, x: number) => {
  return Math.log(x) / Math.log(base)
}

type NumberToNumberFunction = (x: number) => number

/**
 * Returns a function that computes the logarithm of a number with a specified base
 * @param base base of the logarithm
 * @returns a function that computes the logarithm of a number with the specified base
 */
export const logFnOfBase: (base: number) => NumberToNumberFunction =
  (base: number) => (x: number) => {
    return Math.log(x) / Math.log(base)
  }
