import { describe, expect, it } from 'vitest'

import { convertCase } from '.'
import { ALL_CASES, type Case } from '../cases'

describe('convertCase', () => {
  it('should work some simple examples', () => {
    expect(convertCase('helloWorld', 'kebab-case')).toBe('hello-world')
    expect(convertCase('hello-world', 'camelCase')).toBe('helloWorld')
    expect(convertCase('hello-world', 'snake_case')).toBe('hello_world')
    expect(convertCase('hello-world', 'space separated')).toBe('hello world')
    expect(convertCase('hello-world', 'UpperCamelCase')).toBe('HelloWorld')
    expect(convertCase('hello-world', 'PascalCase')).toBe('HelloWorld')
    expect(convertCase('hello-world', 'lowerCamelCase')).toBe('helloWorld')
    expect(convertCase('hello-world', 'lowerPascalCase')).toBe('helloWorld')
    expect(convertCase('hello-world', 'SCREAMING_SNAKE_CASE')).toBe(
      'HELLO_WORLD'
    )
    expect(convertCase('hello-world', 'MACRO_CASE')).toBe('HELLO_WORLD')
    expect(convertCase('hello-world', 'Train-Case')).toBe('Hello-World')
    expect(convertCase('hello-world', 'dot.separated')).toBe('hello.world')
    expect(convertCase('hello-world', 'flatcase')).toBe('helloworld')
    expect(convertCase('hello-world', 'ALL CAPS')).toBe('HELLO WORLD')
  })

  it('should convert text to all cases', () => {
    const text = 'convert this text to all cases'
    for (const toCase of ALL_CASES) {
      const converted = convertCase(text, toCase)
      expect(converted).toBeTruthy()
    }
  })

  it('should throw an error for invalid case', () => {
    const text = 'convert this text to all cases'
    const toCase = 'invalid'
    expect(() => convertCase(text, 'invalid' as Case)).toThrowError(
      'Invalid Case: invalid'
    )
  })
})
