import { describe, expect, it, vi } from 'vitest'

import { hello, printHello } from '.'

describe('hello', () => {
  it('returns a string', () => {
    expect(hello()).toEqual(expect.any(String))
  })
})

describe('printHello', () => {
  it('prints a string', () => {
    expect(() => printHello()).not.toThrow()
  })

  it('prints "Hello, world!"', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation()
    printHello()
    expect(spy).toHaveBeenCalledWith('Hello, world!')
    spy.mockRestore()
  })
})
