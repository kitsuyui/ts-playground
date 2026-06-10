import { IntendedRollback, Unreachable } from './errors'
import type {
  Result,
  TranInnerFn,
  TranOuterFn,
  WrappedTransactionalFn,
} from './types'

/**
 * Perform intended rollback (used when you want to rollback without actually changing data, such as in tests)
 * @param outer Function that executes the transaction in provided callback
 * @returns {WrappedTransactionalFn<TClient, TClientTran, TContent>} Function that wrapped the transaction with rollback handling
 */
export const wrapWithRollback = <TClient, TClientTran, TContent>(
  outer: TranOuterFn<TClient, TClientTran, TContent>
): WrappedTransactionalFn<TClient, TClientTran, TContent> => {
  const wrapped = async (
    client: TClient,
    rollback: boolean,
    func: TranInnerFn<TClientTran, TContent>
  ): Promise<Result<TContent>> =>
    await handleRollback(client, outer, func, rollback)
  return wrapped
}

const createSuccessResult = <TContent>(
  content: TContent
): Result<TContent> => ({
  success: true,
  content,
  rollback: {
    occurred: false,
    intended: false,
  },
})

const createIntendedRollbackResult = <TContent>(
  content: TContent | null
): Result<TContent> => {
  if (content === null) {
    throw new Unreachable('Intended rollback without content.')
  }
  return {
    success: true,
    content,
    rollback: {
      occurred: true,
      intended: true,
    },
  }
}

const createFailureResult = <TContent>(error: unknown): Result<TContent> => ({
  success: false,
  error,
  rollback: {
    occurred: true,
    intended: false,
  },
})

const createDoubleFailureResult = <TContent>(
  error: unknown,
  rollbackError: unknown
): Result<TContent> => ({
  success: false,
  error,
  rollbackError,
  rollback: {
    occurred: false,
    intended: false,
  },
})

// Wraps `func` to capture its error before rethrowing, allowing the caller
// to detect whether a subsequent outer exception is a rollback failure.
const wrapFuncWithErrorCapture =
  <TClientTran, TContent>(
    func: TranInnerFn<TClientTran, TContent>,
    errors: Array<{ error: unknown }>
  ): TranInnerFn<TClientTran, TContent> =>
  async (something) => {
    try {
      return await func(something)
    } catch (e) {
      errors.push({ error: e })
      throw e
    }
  }

const resolveFromCatch = <TContent>(
  e: unknown,
  content: TContent | null,
  funcErrors: Array<{ error: unknown }>
): Result<TContent> => {
  if (e instanceof IntendedRollback)
    return createIntendedRollbackResult(content)
  if (funcErrors.length > 0 && e !== funcErrors[0].error) {
    return createDoubleFailureResult(funcErrors[0].error, e)
  }
  return createFailureResult(e)
}

/**
 * Handle rollback
 * @param client Client instance (i.e. database client like PrismaClient)
 * @param outer Function that executes the transaction in provided callback
 * @param func Function that performs inside the transaction
 * @param rollback Whether to rollback the transaction
 * @returns Result of the transaction
 */
const handleRollback = async <TClient, TClientTran, TContent>(
  client: TClient,
  outer: TranOuterFn<TClient, TClientTran, TContent>,
  func: TranInnerFn<TClientTran, TContent>,
  rollback: boolean
): Promise<Result<TContent>> => {
  let content: TContent | null = null
  const funcErrors: Array<{ error: unknown }> = []
  const wrappedFunc = wrapFuncWithErrorCapture(func, funcErrors)
  try {
    content = await outer(client, async (something) => {
      const content_ = await wrappedFunc(something)
      // keep the content prepared for intended rollback
      content = content_
      if (rollback) throw new IntendedRollback()
      return content_
    })
    return createSuccessResult(content)
  } catch (e) {
    return resolveFromCatch(e, content, funcErrors)
  }
}
