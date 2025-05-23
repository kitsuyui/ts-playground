import { sum } from '../array'
/**
 * Normalizes a radian value to the range [0, 2π).
 * @param rad - The radian value to normalize.
 * @returns The normalized radian value in the range [0, 2π).
 * @example
 * // Normalizing a radian value
 * const rad = -Math.PI;
 * const normalized = toUnsignedRad(rad);
 * console.log(normalized); // Output: 3.141592653589793
 */
export const toUnsignedRad = (rad: number): number => {
  if (Number.isNaN(rad)) {
    return Number.NaN
  }
  if (rad === Number.POSITIVE_INFINITY || rad === Number.NEGATIVE_INFINITY) {
    return Number.NaN
  }
  let normalized = rad
  while (normalized < 0) {
    normalized += 2 * Math.PI
  }
  while (normalized >= 2 * Math.PI) {
    normalized -= 2 * Math.PI
  }
  return normalized
}

/**
 * Normalizes a radian value to the range [-π, π).
 * @param rad
 * @returns The normalized radian value in the range [-π, π).
 * @example
 * // Normalizing a radian value
 * const rad = 2 * Math.PI;
 * const normalized = toSignedRad(rad);
 * console.log(normalized); // Output: 0
 */
export const toSignedRad = (rad: number): number => {
  if (Number.isNaN(rad)) {
    return Number.NaN
  }
  if (rad === Number.POSITIVE_INFINITY || rad === Number.NEGATIVE_INFINITY) {
    return Number.NaN
  }
  return toUnsignedRad(rad + Math.PI) - Math.PI
}

/**
 * Computes the average of an array of radian values.
 * The average means the average of the angles.
 * The average will be in the range [-π, π).
 * @param rads
 * @returns The average of the radian values in the range [-π, π).
 */
export const average = (rads: number[]): number => {
  if (rads.length === 0) {
    return Number.NaN
  }
  const sines = rads.map((rad) => Math.sin(rad))
  const cosines = rads.map((rad) => Math.cos(rad))
  const avgSin = sum(sines) / rads.length
  const avgCos = sum(cosines) / rads.length
  const avgRad = Math.atan2(avgSin, avgCos)
  return toSignedRad(avgRad)
}
