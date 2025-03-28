import { describe, expect, it } from 'vitest'

import { Symbols } from './index'

describe('NumberArray', () => {
  it('scale', () => {
    const array: number[] = [1, 2, 3]
    const result = array[Symbols.scale](2)
    expect(result).toEqual([2, 4, 6])
  })
})
