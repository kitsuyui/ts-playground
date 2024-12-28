type BaseFunction<T, A extends unknown[]> = (
  dummyThis: T,
  ...args: A
) => unknown

/**
 * utility function to bind `this` as the first argument of a function
 * remaining arguments are passed as is to the original function
 * @param fn
 * @returns
 */
export const bindThisAsFirstArgument = <T, A extends unknown[], R>(
  fn: (dummyThis: T, ...args: A) => R
): ((this: T, ...args: A) => R) => {
  return function (this: T, ...args: A): R {
    return fn(this, ...args)
  }
}

/**
 * extend the prototype of a class with a new method
 * @param Target
 * @param symbol
 * @param fn
 */
export const extend = <T, A extends unknown[], R>(
  Target: { prototype: T },
  symbol: symbol,
  fn: BaseFunction<T, A>
): void => {
  Object.defineProperty(Target.prototype, symbol, {
    value: bindThisAsFirstArgument(fn),
    writable: false,
    configurable: false,
    enumerable: false,
  })
}
