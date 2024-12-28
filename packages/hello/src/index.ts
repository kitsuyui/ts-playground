/**
 * Returns a greeting message.
 * @example
 * ```ts
 * import { hello } from '@kitsuyui/hello'
 * hello() // => 'Hello, world!'
 * ```
 * @returns {string} The greeting message.
 */
export function hello(): string {
  return 'Hello, world!'
}

/**
 * Prints a greeting message.
 * @example
 * ```ts
 * import { printHello } from '@kitsuyui/hello'
 * printHello() // => 'Hello, world!'
 * ```
 */
export function printHello(): void {
  console.log(hello())
}
