/**
 * Split Text into Words
 * 
 * - kebab-case -> kebab case
 * - snake_case -> snake case
 * - camelCase -> camel case
 * - PascalCase -> pascal case
 * - etc.
 * 
 * @param str 
 * @returns 
 */
export const splitToWords = (text: string): string[] => {
  // first, split by separators
  const pre = splitBySeparator(text, /[-_., ]/)
  // then split by camel case
  const pre2 = pre.flatMap(splitCamelCase).filter(Boolean)
  // finally, convert to lower case
  const split = pre2.map((word) => word.toLowerCase())
  return split
}

/**
 * Split Camel Case Text into Words
 * @param text 
 * @returns Text split into words
 */
export const splitCamelCase = (text: string): string[] => {
  const split = text.split(/(?=[A-Z])/)
  return split
}

/**
 * Split Text into Words by Separator
 * @param text 
 * @param separator
 * @returns  Text split into words
 */
export const splitBySeparator = (text: string, separator: string | RegExp): string[] => {
  const split = text.split(separator)
  return split
}