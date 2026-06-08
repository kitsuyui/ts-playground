import { describe, expect, it } from 'vitest'

import { type NumberArray, Symbols } from './index'

describe('NumberArray', () => {
  it('scale', () => {
    const array = [1, 2, 3] as unknown as NumberArray
    const result = array[Symbols.scale](2)
    expect(result).toEqual([2, 4, 6])
  })
})
