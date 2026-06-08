/**
 * IntendedRollback as an error
 * Error is needed for jumping to the catch block
 */
export class IntendedRollback extends Error {
  constructor(public readonly content: unknown) {
    super('Intended Rollback')
  }
}

/**
 * Unreachable error
 */
export class Unreachable extends Error {
  constructor(val: string) {
    super(`Unreachable: ${val}`)
  }
}
