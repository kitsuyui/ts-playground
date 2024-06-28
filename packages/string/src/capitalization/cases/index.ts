export const ALL_CASES = [
  'kebab-case',
  'snake_case',
  'space separated',
  'camelCase',
  'UpperCamelCase',
  'lowerCamelCase',
  'PascalCase', // equivalent to UpperCamelCase
  'lowerPascalCase', // equivalent to lowerCamelCase
  'SCREAMING_SNAKE_CASE',
  'MACRO_CASE', // equivalent to SCREAMING_SNAKE_CASE
  'Train-Case',
  'dot.separated',
  'flatcase',
  'ALL CAPS',
] as const

export type Case = (typeof ALL_CASES)[number]

/**
 * Check if a string is a valid Case Name
 * @param caseText
 * @returns
 */
export const isValidCaseName = (caseText: string): caseText is Case => {
  return ALL_CASES.includes(caseText as Case)
}
