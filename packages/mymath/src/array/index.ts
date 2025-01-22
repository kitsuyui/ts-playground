/**
 * Sum of all values in the array
 * If the array is empty, it returns 0 (0 is identity element for addition)
 * @example
 * ```ts
 * import { sum } from '@kitsuyui/mymath'
 * sum([1, 2, 3, 4]) // => 10
 * ```
 * @param values
 * @returns sum of all values
 */
export const sum = (values: number[]): number => {
  let sum = 0
  for (const value of values) {
    sum += value
  }
  return sum
}

/**
 * Product of all values in the array
 * If the array is empty, it returns 1 (1 is identity element for multiplication)
 * @example
 * ```ts
 * import { product } from '@kitsuyui/mymath'
 * product([1, 2, 3, 4]) // => 24
 * ```
 * @param values
 * @returns product of all values
 */
export const product = (values: number[]): number => {
  let product = 1
  for (const value of values) {
    product *= value
  }
  return product
}

/**
 * Arithmetic mean (average) of all values in the array
 * If the array is empty, it returns 0 or the defaultValue
 * @example
 * ```ts
 * import { average } from '@kitsuyui/mymath'
 * average([1, 2, 3, 4]) // => 2.5
 * ```
 * @param values
 * @param defaultValue
 * @returns average of all values
 */
export const arithmeticMean = (
  values: number[],
  defaultValue?: number
): number => {
  if (values.length === 0) {
    return defaultValue || 0
  }
  return sum(values) / values.length
}

/**
 * Average of all values in the array (alias of arithmeticMean)
 * If the array is empty, it returns 0 or the defaultValue
 * @example
 * ```ts
 * import { average } from '@kitsuyui/mymath'
 * average([1, 2, 3, 4]) // => 2.5
 * ```
 * @param values
 * @param defaultValue
 * @returns average of all values
 */
export const average = arithmeticMean

/**
 * Geometric mean of all values in the array
 * If the array is empty, it returns 1 (1 is identity element for multiplication)
 *
 * @example
 * ```ts
 * import { geometricMean } from '@kitsuyui/mymath'
 * geometricMean([1, 2, 3, 4]) // => 2.213363839400643
 * ```
 * @param values
 * @returns
 */
export const geometricMean = (values: number[]): number => {
  const n = values.length
  if (n === 0) return 1 // geometric mean of empty set is 1
  return product(values) ** (1 / n)
}

/**
 * Harmonic mean of all values in the array
 * If the array is empty, it throws an error
 *
 * @example
 * ```ts
 * import { harmonicMean } from '@kitsuyui/mymath'
 * harmonicMean([1, 2, 3, 4]) // => 1.9200000000000004
 * ```
 * @param values
 * @returns
 */
export const harmonicMean = (values: number[]): number => {
  const n = values.length
  if (n === 0) throw new Error('Cannot calculate harmonic mean of empty set')
  return n / sum(values.map((value) => 1 / value))
}

/**
 * root mean square of all values in the array
 * If the array is empty, it returns 0
 * @example
 * ```ts
 * import { rootMeanSquare } from '@kitsuyui/mymath'
 * rootMeanSquare([1, 2, 3, 4]) // => 2.7386127875258306
 * ```
 * @param values
 * @returns
 */
export const rootMeanSquare = (values: number[]): number => {
  return Math.sqrt(arithmeticMean(values.map((value) => value ** 2)))
}

/**
 * Quadratic mean (root mean square) of all values in the array
 * If the array is empty, it returns 0
 * @example
 * ```ts
 * import { quadraticMean } from '@kitsuyui/mymath'
 * quadraticMean([1, 2, 3, 4]) // => 2.7386127875258306
 * ```
 * @param values
 * @returns
 */
export const cubicMean = (values: number[]): number => {
  return Math.cbrt(arithmeticMean(values.map((value) => value ** 3)))
}

/**
 * Aware implementation of generalized mean (Hölder mean) of all values in the array
 * @param values
 * @param p
 * @returns
 */
const awareGeneralizedMean = (values: number[], p: number): number => {
  if (p === Number.NEGATIVE_INFINITY) return Math.min(...values) // p -> -∞ means min
  if (p === 0) return geometricMean(values)
  if (p === 1) return arithmeticMean(values)
  if (p === Number.POSITIVE_INFINITY) return Math.max(...values) // p -> +∞ means max
  const n = values.length
  if (p > 1 && n === 0) return 0
  if (n === 0) throw new Error('Cannot calculate generalized mean of empty set')
  return naiveGeneralizedMean(values, p)
}

/**
 * Naive implementation of generalized mean (Hölder mean) of all values in the array
 * This function may cause overflow or underflow (zero division)
 * @param values
 * @param p
 * @returns
 */
export const naiveGeneralizedMean = (values: number[], p: number): number => {
  return arithmeticMean(values.map((value) => value ** p)) ** (1 / p)
}

/**
 * Generalized mean (Hölder mean) of all values in the array
 * If the array is empty, it returns 0 or the defaultValue
 * @example
 * ```ts
 * import { generalizedMean } from '@kitsuyui/mymath'
 * generalizedMean([1, 2, 3, 4], 1) // => 2.5
 * generalizedMean([1, 2, 3, 4], 0) // => 2.213363839400643
 * ```
 */
export const generalizedMean = awareGeneralizedMean
