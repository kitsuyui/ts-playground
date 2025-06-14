/**
 * Clamps a value between a minimum and maximum value
 *
 * @example
 * ```ts
 * clamp(5, [10, 20]) // => 10
 * ```
 * @example
 * ```ts
 * clamp(15, [10, 20]) // => 15
 * ```
 * @example
 * ```ts
 * clamp(25, [10, 20]) // => 20
 * ```
 * @param value
 * @param range [min, max]
 * @returns The clamped value
 */
export const clamp = (value: number, range: [number, number]): number => {
  const [min, max] = range
  return Math.min(Math.max(value, min), max)
}

/**
 * Clamps a value between the minimum and maximum safe integer values
 * @param value
 * @returns The clamped value between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER
 */
export const clampMinAndMax = (value: number): number => {
  return clamp(value, [Number.MIN_VALUE, Number.MAX_VALUE])
}

/**
 * Clamps a value between the minimum and maximum safe integer values
 * @param value
 * @returns The clamped value between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER
 */
export const clampMinAndMaxInt = (value: number): number => {
  return clamp(value, [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])
}

type NumericFunction = (value: number) => number

/**
 * Wraps a function to return NaN if it throws an error
 * @param fn The function to wrap
 * @returns A new function that returns NaN if the original function throws an error
 */
export const errorToNaN = (fn: NumericFunction): NumericFunction => {
  return (value: number): number => {
    try {
      return fn(value)
    } catch (error) {
      return Number.NaN
    }
  }
}
