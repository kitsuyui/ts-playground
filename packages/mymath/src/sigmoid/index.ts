/**
 * Sigmoid function
 * @example
 * ```ts
 * import { sigmoid } from '@kitsuyui/mymath'
 * sigmoid(0) // => 0.5
 * ```
 * @param x input value to the function
 * @returns the output of the sigmoid function
 */
export const sigmoid = (x: number): number => {
  return 1 / (1 + Math.exp(-x))
}
