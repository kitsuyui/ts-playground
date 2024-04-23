interface ResultFailure {
  success: false
  error: unknown
  rollback: {
    occurred: true
    intended: false
  }
}

interface ResultSuccess<T> {
  success: true
  content: T
  rollback: {
    occurred: false
    intended: false
  }
}

interface ResultSuccessAndIntendedRollback<T> {
  success: true
  content: T
  rollback: {
    occurred: true
    intended: true
  }
}

export type Result<T> =
  | ResultFailure
  | ResultSuccess<T>
  | ResultSuccessAndIntendedRollback<T>

export type TranInnerFn<TClientTran, TContent> = (
  client: TClientTran,
) => Promise<TContent>
export type TranOuterFn<TClient, TClientTran, TContent> = (
  client: TClient,
  callback: TranInnerFn<TClientTran, TContent>,
) => Promise<TContent>
export type WrappedTransactionalFn<TClient, TClientTran, TContent> = (
  client: TClient,
  rollback: boolean,
  func: TranInnerFn<TClientTran, TContent>,
) => Promise<Result<TContent>>
