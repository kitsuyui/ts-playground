import { errorLogger } from './errorFunctions'
import { isSameDeep } from './testFunctions'

export { errorLogger, errorThrower } from './errorFunctions'
export { isSameDeep, isSameSimple } from './testFunctions'

type Options<Fn extends (...args: Parameters<Fn>) => ReturnType<Fn>> = {
  testFn?: (a: ReturnType<Fn>, b: ReturnType<Fn>) => boolean
  errorFn?: (
    args: Parameters<Fn>,
    resultA: ReturnType<Fn>,
    resultB: ReturnType<Fn>
  ) => void
}

/**
 * Assertion utility to verify that two functions exhibit the same behavior.
 * @param fnA The first function to compare.
 * @param fnB The second function to compare.
 * @param options.testFn A function to assert the equality of the two function results. (optional) defaults to deep equality check with JSON.stringify
 * @param options.errorFn A function to call when the two functions produce different results. (optional) defaults to logging error to console
 * @param args The arguments to pass to the functions.
 * @returns The result of the first function.
 */
export const assertSameBehavior = <
  Fn extends (...args: Parameters<Fn>) => ReturnType<Fn>,
>(
  fnA: Fn,
  fnB: Fn,
  options?: Options<Fn>,
  ...args: Parameters<Fn>
): ReturnType<Fn> => {
  const assertFunction = options?.testFn ?? isSameDeep
  const onErrorFunction = options?.errorFn ?? errorLogger
  return assertSameBehavior0(fnA, fnB, assertFunction, onErrorFunction, ...args)
}

/**
 * Combines two functions into one, asserting that they produce the same result.
 * @param fnA The first function to combine.
 * @param fnB The second function to combine.
 * @param options.testFn A function to assert the equality of the two function results. (optional) defaults to deep equality check with JSON.stringify
 * @param options.errorFn A function to call when the two functions produce different results. (optional) defaults to logging error to console
 * @returns A new function that combines the behavior of the two input functions.
 */
export const assertiveFunctionMerger = <
  Fn extends (...args: Parameters<Fn>) => ReturnType<Fn>,
>(
  fnA: Fn,
  fnB: Fn,
  options?: Options<Fn>
): Fn => {
  const newFn = ((...args: Parameters<Fn>): ReturnType<Fn> => {
    return assertSameBehavior(fnA, fnB, options, ...args)
  }) as Fn // I think this satisfies Fn but it don't seem to infer correctly
  return newFn
}

/**
 * Core implementation of the assertion utility to verify that two functions exhibit the same behavior.
 * Every argument must be provided.
 * @param fnA The first function to compare.
 * @param fnB The second function to compare.
 * @param options.testFn A function to assert the equality of the two function results.
 * @param options.errorFn A function to call when the two functions produce different results.
 * @param args The arguments to pass to the functions.
 * @returns The result of the first function.
 */
const assertSameBehavior0 = <
  Fn extends (...args: Parameters<Fn>) => ReturnType<Fn>,
>(
  fnA: Fn,
  fnB: Fn,
  testFn: (a: ReturnType<Fn>, b: ReturnType<Fn>) => boolean,
  errorFn: (
    args: Parameters<Fn>,
    resultA: ReturnType<Fn>,
    resultB: ReturnType<Fn>
  ) => void,
  ...args: Parameters<Fn>
): ReturnType<Fn> => {
  const resultA = fnA(...args)
  const resultB = fnB(...args)
  const isSame = testFn(resultA, resultB)
  if (!isSame) {
    errorFn(args, resultA, resultB)
  }
  return resultA
}
