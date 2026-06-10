import { describe, expect, it } from 'vitest'

import { canonicalStringify, deepCopy, generateHash } from './utils'

describe('deepCopy', () => {
  it('should deep copy an object', () => {
    const obj = { a: 1, b: { c: 2 } }
    const copied = deepCopy(obj)
    expect(copied).toEqual(obj)
    expect(copied).not.toBe(obj)
    expect(copied.b).not.toBe(obj.b)
  })

  it('preserves Date objects', () => {
    const obj = { d: new Date('2024-01-01') }
    const copied = deepCopy(obj)
    expect(copied.d).toBeInstanceOf(Date)
    expect(copied.d.getTime()).toBe(obj.d.getTime())
    expect(copied.d).not.toBe(obj.d)
  })

  it('preserves Map objects', () => {
    const m = new Map([['key', 'value']])
    const copied = deepCopy(m)
    expect(copied).toBeInstanceOf(Map)
    expect(copied.get('key')).toBe('value')
    expect(copied).not.toBe(m)
  })

  it('preserves Set objects', () => {
    const s = new Set([1, 2, 3])
    const copied = deepCopy(s)
    expect(copied).toBeInstanceOf(Set)
    expect(copied.has(1)).toBe(true)
    expect(copied).not.toBe(s)
  })

  it('preserves BigInt values', () => {
    const obj = { n: 9007199254740993n }
    const copied = deepCopy(obj)
    expect(copied.n).toBe(obj.n)
  })
})

describe('generateHash', () => {
  it('should generate a hash', () => {
    const hash = generateHash('hello')
    expect(hash).toBe(
      '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
    )
  })
})

describe('canonicalStringify', () => {
  it('produces the same output regardless of object key insertion order', () => {
    const a = { a: 1, b: 2 }
    const b = { b: 2, a: 1 }
    expect(canonicalStringify(a)).toBe(canonicalStringify(b))
  })

  it('sorts nested object keys recursively', () => {
    const a = { z: { y: 1, x: 2 }, m: 3 }
    const b = { m: 3, z: { x: 2, y: 1 } }
    expect(canonicalStringify(a)).toBe(canonicalStringify(b))
  })

  it('preserves array element order', () => {
    const a = [1, 2, 3]
    const b = [3, 2, 1]
    expect(canonicalStringify(a)).not.toBe(canonicalStringify(b))
  })

  it('handles primitives and null', () => {
    expect(canonicalStringify(null)).toBe('null')
    expect(canonicalStringify(42)).toBe('42')
    expect(canonicalStringify('hello')).toBe('"hello"')
    expect(canonicalStringify(true)).toBe('true')
  })

  it('handles arrays of objects with different key orders', () => {
    const a = [{ b: 2, a: 1 }]
    const b = [{ a: 1, b: 2 }]
    expect(canonicalStringify(a)).toBe(canonicalStringify(b))
  })
})
