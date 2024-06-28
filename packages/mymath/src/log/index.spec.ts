import { describe, expect, it, jest } from '@jest/globals'

import { logFnOfBase, logOfBase } from './index'

describe('logOfBase', () => {
  it('should return 1 for 10 and 10', () => {
    expect(logOfBase(10, 10)).toBe(1)
  })

  it('should return 2 for 2 and 4', () => {
    expect(logOfBase(2, 4)).toBe(2)
  })

  it('should return 3 for 2 and 8', () => {
    expect(logOfBase(2, 8)).toBe(3)
  })
})

describe('logFnOfBase', () => {
  const log4 = logFnOfBase(4)

  it('should return 1 for 4 and 4', () => {
    expect(log4(4)).toBe(1)
  })

  it('should return 2 for 4 and 16', () => {
    expect(log4(16)).toBe(2)
  })
})
