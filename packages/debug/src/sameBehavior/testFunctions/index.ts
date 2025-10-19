/**
 * Simple equality check.
 * @param a
 * @param b
 * @returns Whether a and b are strictly equal. (===)
 */
export const isSameSimple = <T>(a: T, b: T): boolean => a === b

/**
 * Deep equality check using JSON.stringify.
 * @param a
 * @param b
 * @returns Whether a and b are deeply equal. (using JSON.stringify)
 */
export const isSameDeep = <T>(a: T, b: T): boolean =>
  JSON.stringify(a) === JSON.stringify(b)
