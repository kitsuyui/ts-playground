import { describe, expect, it } from 'vitest'

import { SymbolicPrototype } from '.'

describe('SymbolicPrototype', () => {
  it('NumberArray', () => {
    expect(SymbolicPrototype.NumberArray).toBeDefined()
    expect(SymbolicPrototype.NumberArray.scale).toBeDefined()
    const NA = SymbolicPrototype.NumberArray
    // example usage
    expect([1, 2, 3][NA.scale](2)).toStrictEqual([2, 4, 6])
    expect([1, 2, 3][NA.sum]()).toBe(6)
  })
})
