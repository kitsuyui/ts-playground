export function hello(): string {
  return 'Hello, world!'
}

/**
 * Example of unnecessary type annotation
 * See https://github.com/kitsuyui/ts-playground/issues/3
 * @returns 'unnecessary' {string}
 */
export function exampleOfUnnecessaryTypeAnnotation(): string {
  // This is unnecessary type annotation and warning is shown if it is enabled
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const unnecessary: string = 'unnecessary'

  // Following is better
  // const unnecessary = 'unnecessary'
  return unnecessary
}
