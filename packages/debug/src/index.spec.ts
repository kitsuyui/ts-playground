import { describe, expect, it } from 'vitest'

import * as module from '.'

describe('debug', () => {
  it('should export sameBehavior module', () => {
    expect(module.sameBehavior).toBeDefined()
  })
})
