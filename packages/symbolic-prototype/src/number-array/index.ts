import { extend } from '../extend'

export const Scale = Symbol('Scale')
export const Sum = Symbol('Sum')

export const Symbols = {
  scale: Scale,
  sum: Sum,
} as const

declare global {
  // FIXME
  // biome-ignore lint/correctness/noUnusedVariables: Hack
  interface Array<T> {
    [Sum](this: Array<number>): number
    [Scale](this: Array<number>, scaler: number): number[]
  }
}

extend(Array, Scale, (array: number[], scaler: number) => {
  return array.map((value) => value * scaler)
})

extend(Array, Sum, (array: number[]) => {
  return array.reduce((acc, value) => acc + value, 0)
})
