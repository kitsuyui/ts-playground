import { ALL_CASES, type Case } from '../cases'
import { joinWords } from '../join'
import { splitToWords } from '../split'

const isValidCase = (caseText: string): caseText is Case => {
  return ALL_CASES.includes(caseText as Case)
}

/**
 * Convert the text to the specified case
 * @example
 * ```ts
 * import { convertCase } from '@kitsuyui/string'
 * convertCase('hello world', 'kebab-case') // => 'hello-world'
 * convertCase('hello world', 'snake_case') // => 'hello_world'
 * convertCase('hello world', 'space separated') // => 'hello world'
 * convertCase('hello world', 'camelCase') // => 'helloWorld'
 * convertCase('hello world', 'UpperCamelCase') // => 'HelloWorld'
 * convertCase('hello world', 'lowerCamelCase') // => 'helloWorld'
 * convertCase('hello world', 'PascalCase') // => 'HelloWorld'
 * ```
 * @param text
 * @param toCase
 * @returns
 */
export const convertCase = (text: string, toCase: Case): string => {
  if (!isValidCase(toCase)) {
    throw new Error(`Invalid Case: ${toCase}`)
  }
  const words = splitToWords(text)
  const converted = joinWords(words, toCase)
  return converted
}
