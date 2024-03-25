/**
 * Returns a greeting message.
 * @returns {string} The greeting message.
 */
export function hello(): string {
  return 'Hello, world!'
}

/**
 * Prints a greeting message.
 */
export function printHello(): void {
  console.log(hello())
}
