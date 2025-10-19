import { describe, expect, it, vi } from 'vitest'

import { errorLogger, errorThrower } from '.'

describe('error functions', () => {
  describe('errorLogger', () => {
    it('should log error message to console', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {})

      const args = [1, 2, 3]
      const resultA = 'resultA'
      const resultB = 'resultB'

      errorLogger(args, resultA, resultB)

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Functions exhibit different behavior!\n Args: %s\n Result A: %s\n Result B: %s',
        args,
        resultA,
        resultB
      )

      consoleErrorSpy.mockRestore()
    })
  })
  describe('errorThrower', () => {
    it('should throw an error with detailed message', () => {
      const args = [1, 2, 3]
      const resultA = { value: 'resultA' }
      const resultB = { value: 'resultB' }

      expect(() => errorThrower(args, resultA, resultB)).toThrowError(
        'Functions exhibit different behavior!\n' +
          `Arguments: ${JSON.stringify(args)}\n` +
          `Result A: ${JSON.stringify(resultA)}\n` +
          `Result B: ${JSON.stringify(resultB)}`
      )
    })
  })
})
