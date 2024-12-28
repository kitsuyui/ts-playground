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
