import { describe, expect, it } from '@jest/globals'

import { hello } from '.'

describe('index', () => {
  it('should pass', () => {
    expect(hello()).toBe('Hello, world!')
  })
})
