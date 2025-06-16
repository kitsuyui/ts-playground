import { describe, expect, it } from 'vitest'
import * as module from './index'

describe('module', () => {
  it('should export all functions', () => {
    expect(module).toHaveProperty('toText')
    expect(module.toText).toHaveProperty('zeroPad')
    expect(module.toText).toHaveProperty('zeroPad2')
    expect(module.toText).toHaveProperty('zeroPad3')
    expect(module.toText).toHaveProperty('toText')
  })
})
