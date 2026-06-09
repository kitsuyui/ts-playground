import { describe, expect, it } from 'vitest'

import { deepCopy, generateHash } from './utils'

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
