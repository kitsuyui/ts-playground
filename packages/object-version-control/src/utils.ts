import { sha256 } from 'js-sha256'
/**
 * Generate a hash for a given text
 * @param text
 * @returns The hash value
 */
export const generateHash = (text: string): string => {
  return sha256(text)
}

/**
 * Deep copy an object
 * @remarks
 * This function is not suitable for copying objects with functions, symbols, or circular references.
 * @param obj
 * @returns copied object
 */
export const deepCopy = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}
