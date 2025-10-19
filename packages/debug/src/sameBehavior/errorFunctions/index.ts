/**
 * Logs an error message to the console.
 * @param args
 * @param resultA
 * @param resultB
 */
export const errorLogger = <A extends unknown[], S>(
  args: A,
  resultA: S,
  resultB: S
): void => {
  console.error(
    'Functions exhibit different behavior!\n Args: %s\n Result A: %s\n Result B: %s',
    args,
    resultA,
    resultB
  )
}

/**
 * Throws an error with a detailed message.
 * @param args
 * @param resultA
 * @param resultB
 */
export const errorThrower = <A extends unknown[], S>(
  args: A,
  resultA: S,
  resultB: S
): void => {
  const message = [
    'Functions exhibit different behavior!',
    `Arguments: ${JSON.stringify(args)}`,
    `Result A: ${JSON.stringify(resultA)}`,
    `Result B: ${JSON.stringify(resultB)}`,
  ].join('\n')
  throw new Error(message)
}
