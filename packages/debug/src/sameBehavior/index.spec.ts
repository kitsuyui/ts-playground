import { describe, expect, it, vi } from 'vitest'
import { assertiveFunctionMerger, assertSameBehavior } from '.'

describe('sameBehavior', () => {
  it('should export assertSameBehavior', () => {
    expect(assertSameBehavior).toBeDefined()
  })

  it('should export assertiveFunctionMerger', () => {
    expect(assertiveFunctionMerger).toBeDefined()
  })
})

describe('assertSameBehavior', () => {
  it('should assert same behavior for identical functions', () => {
    const fnA = (x: number) => x + 1
    const fnB = (x: number) => x + 1

    const result = assertSameBehavior(fnA, fnB, {}, 2)
    expect(result).toBe(3)
  })

  it('should call error function for different behaviors', () => {
    const fnA = (x: number) => x + 1
    const fnB = (x: number) => x + 2
    const mockErrorFn = vi.fn()

    expect(() => {
      assertSameBehavior(fnA, fnB, { errorFn: mockErrorFn }, 2)
    }).not.toThrow()

    expect(mockErrorFn).toHaveBeenCalled()
  })

  it('should use default error function (console.error) when none is provided', () => {
    const fnA = (x: number) => x + 1
    const fnB = (x: number) => x + 2
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    expect(() => {
      assertSameBehavior(fnA, fnB, {}, 2)
    }).not.toThrow()

    expect(consoleErrorSpy).toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })

  it('should handle functions with no arguments', () => {
    const fnA = () => 42
    const fnB = () => 42

    const result = assertSameBehavior(fnA, fnB)
    expect(result).toBe(42)
  })
})

describe('assertiveFunctionMerger', () => {
  it('should merge two functions with same behavior', () => {
    const fnA = (x: number) => x * 2
    const fnB = (x: number) => x * 2
    const mergedFn = assertiveFunctionMerger(fnA, fnB)
    const result = mergedFn(3)
    expect(result).toBe(6)
  })

  it('should throw error when merging functions with different behaviors', () => {
    const fnA = (x: number) => x * 2
    const fnB = (x: number) => x * 3
    const mockErrorFn = vi.fn()
    const newFn = assertiveFunctionMerger(fnA, fnB, { errorFn: mockErrorFn })
    expect(() => {
      newFn(3)
    }).not.toThrow()
    expect(mockErrorFn).toHaveBeenCalled()
  })
})
