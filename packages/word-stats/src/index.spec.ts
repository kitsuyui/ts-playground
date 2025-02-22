import { describe, expect, it } from 'vitest'

import {
  computeInverseDocumentFrequency,
  computeTermFrequencies,
  extractUniqueWords,
  wordCount,
} from './index'

describe('wordCount', () => {
  it('should count words', () => {
    const documents = [
      ['a', 'b', 'c'],
      ['a', 'b', 'd'],
    ]
    const result = wordCount(documents)
    expect(result).toEqual({ a: 2, b: 2, c: 1, d: 1 })
  })
})

describe('computeTermFrequencies', () => {
  it('should calculate tf', () => {
    const documents = [
      ['a', 'b', 'c', 'c'],
      ['a', 'b', 'd'],
    ]
    const result = computeTermFrequencies(documents)
    expect(result).toEqual([
      { a: 0.25, b: 0.25, c: 0.5 },
      { a: 0.3333333333333333, b: 0.3333333333333333, d: 0.3333333333333333 },
    ])
  })
})

describe('computeInverseDocumentFrequency', () => {
  it('should calculate idf', () => {
    const documents = [
      ['a', 'b', 'c'],
      ['a', 'b', 'd'],
      ['a', 'b', 'e'],
      ['a', 'b', 'f'],
      ['a', 'b', 'g'],
      ['a', 'b', 'h'],
      ['a', 'b', 'i'],
      ['a', 'b', 'j'],
      ['a', 'b', 'k'],
      ['a', 'b', 'l'],
    ]
    const result = computeInverseDocumentFrequency(documents)
    const tobe = Math.LN10 // 2.302585092994046

    expect(result).toEqual({
      a: 0.0,
      b: 0.0,
      c: tobe,
      d: tobe,
      e: tobe,
      f: tobe,
      g: tobe,
      h: tobe,
      i: tobe,
      j: tobe,
      k: tobe,
      l: tobe,
    })
  })
})

describe('extractUniqueWords', () => {
  it('should return unique words', () => {
    const document = ['a', 'b', 'c', 'a', 'c']
    const result = extractUniqueWords(document)
    expect(result).toEqual(new Set(['a', 'b', 'c']))
  })
  it('should return empty set for empty document', () => {
    const document: string[] = []
    const result = extractUniqueWords(document)
    expect(result).toEqual(new Set())
  })
})
