/**
 * Clamps a value between a minimum and maximum value
 * Example: clamp(5, [10, 20]) returns 10
 * Example: clamp(15, [10, 20]) returns 15
 * Example: clamp(25, [10, 20]) returns 20
 * @param value
 * @param min
 * @param max
 * @returns The clamped value
 */
export const clamp = (value: number, [min, max]: [number, number]): number => {
  return Math.min(Math.max(value, min), max)
}
