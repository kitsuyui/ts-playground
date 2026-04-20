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
  try {
    content = await outer(client, async (something) => {
      const content_ = await func(something)
      // keep the content prepared for intended rollback
      content = content_
      if (rollback) {
        throw new IntendedRollback()
      }
      return content_
    })
    return createSuccessResult(content)
  } catch (e) {
    if (e instanceof IntendedRollback) {
      return createIntendedRollbackResult(content)
    }
    return createFailureResult(e)
  }
}
