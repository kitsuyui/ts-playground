import { describe, expect, it, vi } from 'vitest'

import { deepCopy, generateHash } from './utils'

describe('deepCopy', () => {
  it('should deep copy an object', () => {
    const obj = { a: 1, b: { c: 2 } }
    const copied = deepCopy(obj)
    expect(copied).toEqual(obj)
    expect(copied).not.toBe(obj)
    expect(copied.b).not.toBe(obj.b)
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
