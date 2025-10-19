import { describe, expect, it } from 'vitest'

import { isSameDeep, isSameSimple } from '.'

describe('isSameSimple', () => {
  it('should return true for same primitive values', () => {
    expect(isSameSimple(1, 1)).toBe(true)
    expect(isSameSimple('test', 'test')).toBe(true)
    expect(isSameSimple(true, true)).toBe(true)
  })

  it('should return false for different primitive values', () => {
    expect(isSameSimple(1, 2)).toBe(false)
    expect(isSameSimple('test', 'Test')).toBe(false)
    expect(isSameSimple(true, false)).toBe(false)
  })

  it('should return false for different object references', () => {
    const objA = { a: 1 }
    const objB = { a: 1 }
    expect(isSameSimple(objA, objB)).toBe(false)
    expect(isSameSimple(objA, objA)).toBe(true)
  })
})

describe('isSameDeep', () => {
  it('should return true for deeply equal objects', () => {
    const objA = { a: 1, b: { c: 2 } }
    const objB = { a: 1, b: { c: 2 } }
    expect(isSameDeep(objA, objB)).toBe(true)
  })

  it('should return false for non-deeply equal objects', () => {
    const objA = { a: 1, b: { c: 2 } }
    const objB = { a: 1, b: { c: 3 } }
    expect(isSameDeep(objA, objB)).toBe(false)
  })

  it('should return true for same primitive values', () => {
    expect(isSameDeep(1, 1)).toBe(true)
    expect(isSameDeep('test', 'test')).toBe(true)
    expect(isSameDeep(true, true)).toBe(true)
  })

  it('should return false for different primitive values', () => {
    expect(isSameDeep(1, 2)).toBe(false)
    expect(isSameDeep('test', 'Test')).toBe(false)
    expect(isSameDeep(true, false)).toBe(false)
  })
})
