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
 * This function is not suitable for copying objects with function values or symbol-keyed properties
 * (throws DataCloneError). Handles `Date`, `Map`, `Set`, `BigInt`, circular references, and
 * `undefined` values correctly.
 * @param obj
 * @returns copied object
 */
export const deepCopy = <T>(obj: T): T => {
  return structuredClone(obj)
}

/**
 * Serialize a value to JSON with object keys sorted recursively.
 * Two values that are logically equal but have different key insertion order
 * produce the same output string, making this suitable for content-addressed hashing.
 * Arrays preserve their original element order.
 * @param value
 * @returns canonical JSON string
 */
export const canonicalStringify = (value: unknown): string => {
  if (Array.isArray(value)) {
    return `[${value.map(canonicalStringify).join(',')}]`
  }
  if (value !== null && typeof value === 'object') {
    const sorted = Object.keys(value as Record<string, unknown>)
      .sort()
      .map((k) => {
        const v = (value as Record<string, unknown>)[k]
        return `${JSON.stringify(k)}:${canonicalStringify(v)}`
      })
    return `{${sorted.join(',')}}`
  }
  return JSON.stringify(value)
}
