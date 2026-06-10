import { describe, expect, it } from 'vitest'

import { type NumberArray, SymbolicPrototype } from '.'

describe('SymbolicPrototype', () => {
  it('NumberArray', () => {
    expect(SymbolicPrototype.NumberArray).toBeDefined()
    expect(SymbolicPrototype.NumberArray.scale).toBeDefined()
    const NA = SymbolicPrototype.NumberArray
    // example usage — cast required since Array.prototype is augmented at runtime
    expect(([1, 2, 3] as unknown as NumberArray)[NA.scale](2)).toStrictEqual([
      2, 4, 6,
    ])
    expect(([1, 2, 3] as unknown as NumberArray)[NA.sum]()).toBe(6)
  })
})
