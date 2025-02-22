import { describe, expect, it } from 'vitest'

import type { Case } from '../cases'
import {
  intoAllCaps,
  intoDotSeparated,
  intoFlatCase,
  intoKebabCase,
  intoLowerCamelCase,
  intoScreamingSnakeCase,
  intoSnakeCase,
  intoSpaceSeparated,
  intoTrainCase,
  joinWords,
} from './index'

describe('joinWords', () => {
  it('should join words into the specified case', () => {
    const words = ['join', 'words']
    const kebab = joinWords(words, 'kebab-case')
    expect(kebab).toBe('join-words')
  })

  it('should throw an error for invalid case', () => {
    const words = ['join', 'words']
    expect(() => joinWords(words, 'invalid' as Case)).toThrowError(
      'Invalid Case: invalid'
    )
    expect(() => joinWords(words, undefined as unknown as Case)).toThrowError(
      'Case is required'
    )
  })
})

describe('intoKebabCase', () => {
  it('should join words into kebab case', () => {
    const words = ['kebab', 'case']
    const kebab = intoKebabCase(words)
    expect(kebab).toBe('kebab-case')
  })
})

describe('intoSnakeCase', () => {
  it('should join words into snake case', () => {
    const words = ['snake', 'case']
    const snake = intoSnakeCase(words)
    expect(snake).toBe('snake_case')
  })
})

describe('intoSpaceSeparated', () => {
  it('should join words into space separated', () => {
    const words = ['space', 'separated']
    const space = intoSpaceSeparated(words)
    expect(space).toBe('space separated')
  })
})

describe('intoAllCaps', () => {
  it('should join words into all caps', () => {
    const words = ['all', 'caps']
    const caps = intoAllCaps(words)
    expect(caps).toBe('ALL CAPS')
  })
})

describe('intoScreamingSnakeCase', () => {
  it('should join words into screaming snake case', () => {
    const words = ['screaming', 'snake', 'case']
    const snake = intoScreamingSnakeCase(words)
    expect(snake).toBe('SCREAMING_SNAKE_CASE')
  })
})

describe('intoTrainCase', () => {
  it('should join words into train case', () => {
    const words = ['train', 'case']
    const train = intoTrainCase(words)
    expect(train).toBe('Train-Case')
  })
})

describe('intoFlatCase', () => {
  it('should join words into flat case', () => {
    const words = ['flat', 'case']
    const flat = intoFlatCase(words)
    expect(flat).toBe('flatcase')
  })
})

describe('intoDotSeparated', () => {
  it('should join words into dot separated', () => {
    const words = ['dot', 'separated']
    const dot = intoDotSeparated(words)
    expect(dot).toBe('dot.separated')
  })
})

describe('intoLowerCamelCase', () => {
  it('should join words into lower camel case', () => {
    const words = ['lower', 'camel', 'case']
    const camel = intoLowerCamelCase(words)
    expect(camel).toBe('lowerCamelCase')
  })
})
