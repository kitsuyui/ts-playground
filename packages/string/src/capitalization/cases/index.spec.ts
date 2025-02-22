import { describe, expect, it } from 'vitest'

import { isValidCaseName } from '.'

describe('isValidCaseName', () => {
  it('should return true for valid case names', () => {
    expect(isValidCaseName('kebab-case')).toBe(true)
    expect(isValidCaseName('snake_case')).toBe(true)
    expect(isValidCaseName('space separated')).toBe(true)
    expect(isValidCaseName('camelCase')).toBe(true)
    expect(isValidCaseName('UpperCamelCase')).toBe(true)
    expect(isValidCaseName('lowerCamelCase')).toBe(true)
    expect(isValidCaseName('PascalCase')).toBe(true)
    expect(isValidCaseName('lowerPascalCase')).toBe(true)
    expect(isValidCaseName('SCREAMING_SNAKE_CASE')).toBe(true)
    expect(isValidCaseName('MACRO_CASE')).toBe(true)
    expect(isValidCaseName('Train-Case')).toBe(true)
    expect(isValidCaseName('dot.separated')).toBe(true)
    expect(isValidCaseName('flatcase')).toBe(true)
    expect(isValidCaseName('ALL CAPS')).toBe(true)
  })

  it('should return false for invalid case names', () => {
    expect(isValidCaseName('invalid')).toBe(false)
  })
})
