import { extend } from '../extend'

export const Scale = Symbol('Scale')
export const Sum = Symbol('Sum')

export const Symbols = {
  scale: Scale,
  sum: Sum,
} as const

export type NumberArray = Array<number> & {
  [Sum](): number
  [Scale](scaler: number): number[]
}

extend(Array, Scale, (array: number[], scaler: number) => {
  return array.map((value) => value * scaler)
})

extend(Array, Sum, (array: number[]) => {
  return array.reduce((acc, value) => acc + value, 0)
})
