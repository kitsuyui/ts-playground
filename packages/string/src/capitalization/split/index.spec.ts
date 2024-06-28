import { describe, expect, it, jest } from '@jest/globals'

import { splitBySeparator, splitCamelCase, splitToWords } from './index'

describe('splitToWords', () => {
  it('should split text into words', () => {
    const text = 'kebab-case snake_case camelCase PascalCase'
    const tokens = splitToWords(text)
    expect(tokens).toEqual([
      'kebab',
      'case',
      'snake',
      'case',
      'camel',
      'case',
      'pascal',
      'case',
    ])
  })
})

describe('splitCamelCase', () => {
  it('should split camel case text into words', () => {
    const text = 'camelCase'
    const words = splitCamelCase(text)
    expect(words).toEqual(['camel', 'Case'])
  })
})

describe('splitBySeparator', () => {
  it('should split text into words by separator', () => {
    const text = 'kebab-case snake_case camelCase PascalCase'
    const words = splitBySeparator(text, /[-_ ]/)
    expect(words).toEqual([
      'kebab',
      'case',
      'snake',
      'case',
      'camelCase',
      'PascalCase',
    ])
  })
})
