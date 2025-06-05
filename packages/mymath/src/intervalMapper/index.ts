/**
 * This module provides functions to map values between different intervals.
 * from/to [0,1], [0,+∞), (-∞,+∞)
 */

/**
 * TODO: Implement Mittag-Leffler function to create parameterized decay functions.
 * However, the precision of the Lanczos approximation of the gamma function may not be sufficient for this purpose.
 * Needs further research and testing.
 * https://en.wikipedia.org/wiki/Mittag-Leffler_function
 */

/**
 * Map a value from the interval [0, 1] to the interval [0, +∞).
 * @param x in the range [0, 1]
 * @returns number in the range [0, +∞)
 */
export const map01to0InfTan = (x: number): number => {
  if (x < 0 || x > 1) {
    throw new Error('Value must be in the range [0, 1]')
  }
  if (x === 1) {
    return Number.POSITIVE_INFINITY // tan(π/2) is undefined, but in this context we treat it as +∞
  }
  // [0, 1) => [0, π / 2)
  const basePi = (x * Math.PI) / 2
  // [0, π / 2) => [0, +∞)
  return Math.tan(basePi)
}

/**
 * Map a value from the interval [0, 1] to the interval [0, +∞) using a scaled logarithmic function.
 * @param x in the range [0, 1]
 * @param q A scaling factor. If q = 0, the function behaves like a limit approaching infinity.
 *          If q > 0, the function scales the output.
 * @returns number in the range [0, +∞)
 */
export const map01To0InfWithQ = (x: number, q: number) => {
  // [0, 1] => [0, +∞)
  if (q === 0) {
    // Mathematically, this is equivalent to the limit as q approaches 0
    return -Math.log(1 - x)
  }
  // [0, 1] => [0, +∞)
  const y = ((1 - x) ** -q - 1) / q
  // q = 1 means y = x / (1 - x)
  return y
}

/**
 * Generate a function that maps values from the interval [0, 1] to the interval [0, +∞) using a scaling factor q.
 * This function is equivalent to the map01To0InfWithQ function.
 * @param q - A scaling factor.
 * @returns A function that takes a value in the range [0, 1] and returns a value in the range [0, +∞).
 */
export const generateMap01To0InfWithQ = (
  q: number
): ((x: number) => number) => {
  if (q <= 0) {
    throw new Error('q must be greater than 0')
  }
  return (x: number): number => {
    if (x < 0 || x > 1) {
      throw new Error('Value must be in the range [0, 1]')
    }
    return map01To0InfWithQ(x, q)
  }
}

/**
 * Map a value from the interval [0, +∞) to the interval [1, 0].
 * @param x in the range [0, +∞)
 * @returns number in the range [0, 1] decaying from 1 to 0 as x increases.
 */
export const map0InfTo10WithExp = (x: number): number => {
  return Math.exp(-x)
}

/**
 * Map a value from the interval [0, +∞) to the interval [0, 1] using the arctangent function.
 * This maps [0, +∞) to [0, π/2) and then scales it to [0, 1].
 * @param x in the range [0, +∞)
 * @returns number in the range [0, 1]
 */
export const map0InfTo01WithArctan = (x: number): number => {
  if (x < 0) {
    throw new Error('Value must be in the range [0, +∞)')
  }
  // [0, +∞) => [0, π/2)
  const basePi = Math.PI / 2
  // [0, +∞) => [0, 1]
  return Math.atan(x) / basePi
}

/**
 * Map a value from the interval [0, +∞) to the interval [1, 0] using a fraction.
 * @param x in the range [0, +∞)
 * @returns number in the range [0, 1] decaying from 1 to 0 as x increases.
 */
export const map0InfTo10WithFraction = (x: number): number => {
  if (x < 0) {
    throw new Error('Value must be in the range [0, +∞)')
  }
  // [0, +∞) => [1, 0]
  return 1 / (1 + x)
}

/**
 * Map a value from the interval [0, +∞) to the interval [0, 1].
 * @param x in the range [0, +∞)
 * @returns number in the range [0, 1]
 */
export const map0InfTo01WithExp = (x: number): number => {
  if (x < 0) {
    throw new Error('Value must be in the range [0, +∞)')
  }
  // [0, +∞) => [0, 1]
  return 1 - map0InfTo10WithExp(x)
}
