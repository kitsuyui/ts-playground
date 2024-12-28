import { type Case, isValidCaseName } from '../cases'

/**
 * Join words into a single string with the specified case
 * @example
 * ```ts
 * import { joinWords } from 'string'
 * joinWords(['hello', 'world'], 'kebab-case') // => 'hello-world'
 * joinWords(['hello', 'world'], 'snake_case') // => 'hello_world'
 * ```
 */
export const joinWords = (words: string[], toCase: Case): string => {
  if (!toCase) {
    throw new Error('Case is required')
  }
  if (!isValidCaseName(toCase)) {
    throw new Error(`Invalid Case: ${toCase}`)
  }
  switch (toCase) {
    case 'kebab-case':
      return intoKebabCase(words)
    case 'snake_case':
      return intoSnakeCase(words)
    case 'space separated':
      return intoSpaceSeparated(words)
    case 'camelCase':
      return intoLowerCamelCase(words)
    case 'UpperCamelCase':
      return intoUpperCamelCase(words)
    case 'lowerCamelCase':
      return intoLowerCamelCase(words)
    case 'PascalCase':
      return intoUpperCamelCase(words)
    case 'lowerPascalCase':
      return intoLowerCamelCase(words)
    case 'SCREAMING_SNAKE_CASE':
      return intoScreamingSnakeCase(words)
    case 'MACRO_CASE':
      return intoScreamingSnakeCase(words)
    case 'Train-Case':
      return intoTrainCase(words)
    case 'dot.separated':
      return intoDotSeparated(words)
    case 'flatcase':
      return intoFlatCase(words)
    case 'ALL CAPS':
      return intoAllCaps(words)
  }
}

/**
 * Join words into a single string with kebab case
 * @example
 * ```ts
 * import { intoKebabCase } from 'string'
 * intoKebabCase(['hello', 'world']) // => 'hello-world'
 * ```
 * @param words
 * @returns
 */
export const intoKebabCase = (words: string[]): string => {
  const kebab = words.join('-')
  return kebab
}

/**
 * Join words into a single string with snake case
 * @example
 * ```ts
 * import { intoSnakeCase } from 'string'
 * intoSnakeCase(['hello', 'world']) // => 'hello_world'
 * ```
 * @param words
 * @returns
 */
export const intoSnakeCase = (words: string[]): string => {
  const snake = words.join('_')
  return snake
}

/**
 * Join words into a single string with space separator
 * @example
 * ```ts
 * import { intoSpaceSeparated } from 'string'
 * intoSpaceSeparated(['hello', 'world']) // => 'hello world'
 * ```
 */
export const intoSpaceSeparated = (words: string[]): string => {
  const space = words.join(' ')
  return space
}

/**
 * Join words into a single string with all caps
 * @example
 * ```ts
 * import { intoAllCaps } from 'string'
 * intoAllCaps(['hello', 'world']) // => 'HELLO WORLD'
 * ```
 */
export const intoAllCaps = (words: string[]): string => {
  const caps = words.map((word) => word.toUpperCase()).join(' ')
  return caps
}

/**
 * Join words into a single string with screaming snake case (MACRO_CASE)
 * @example
 * ```ts
 * import { intoScreamingSnakeCase } from 'string'
 * intoScreamingSnakeCase(['hello', 'world']) // => 'HELLO_WORLD'
 * ```
 */
export const intoScreamingSnakeCase = (words: string[]): string => {
  const snake = words.map((word) => word.toUpperCase()).join('_')
  return snake
}

/**
 * Join words into a single string with train case
 * @example
 * ```ts
 * import { intoTrainCase } from 'string'
 * intoTrainCase(['hello', 'world']) // => 'Hello-World'
 * ```
 */
export const intoTrainCase = (words: string[]): string => {
  const train = words.map(capitalize).join('-')
  return train
}

/**
 * Join words into a single string with flat case
 * @example
 * ```ts
 * import { intoFlatCase } from 'string'
 * intoFlatCase(['hello', 'world']) // => 'helloworld'
 * ```
 */
export const intoFlatCase = (words: string[]): string => {
  const flat = words.join('')
  return flat
}

/**
 * Join words into a single string with dot separator
 * @example
 * ```ts
 * import { intoDotSeparated } from 'string'
 * intoDotSeparated(['hello', 'world']) // => 'hello.world'
 * ```
 */
export const intoDotSeparated = (words: string[]): string => {
  const dot = words.join('.')
  return dot
}

/**
 * Join words into a single string with Upper Camel Case (Pascal Case)
 * @example
 * ```ts
 * import { intoUpperCamelCase } from 'string'
 * intoUpperCamelCase(['hello', 'world']) // => 'HelloWorld'
 * ```
 */
export const intoUpperCamelCase = (words: string[]): string => {
  const camel = words.map(capitalize).join('')
  return camel
}

/**
 * Join words into a single string with Lower Camel Case
 * @example
 * ```ts
 * import { intoLowerCamelCase } from 'string'
 * intoLowerCamelCase(['hello', 'world']) // => 'helloWorld'
 * ```
 */
export const intoLowerCamelCase = (words: string[]): string => {
  const camel = words
    .map((word, index) => (index === 0 ? word : capitalize(word)))
    .join('')
  return camel
}

/**
 * Capitalize a word
 * @example
 * ```ts
 * import { capitalize } from 'string'
 * capitalize('hello') // => 'Hello'
 * ```
 */
const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
