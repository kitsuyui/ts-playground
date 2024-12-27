import { sum } from '../array'

/**
 * Softmax function
 * https://en.wikipedia.org/wiki/Softmax_function
 * When the weights are empty, it returns an empty array.
 * @param weights
 * @returns
 */
export const softmax = (weights: number[]): number[] =>
  softmaxWithTemperature(weights, 1)

/**
 * Softmax with temperature function
 * https://en.wikipedia.org/wiki/Softmax_function
 * When the weights are empty, it returns an empty array.
 * @param weights
 * @param temperature
 * @returns array of probabilities
 */
export const softmaxWithTemperature = (
  weights: number[],
  temperature: number
): number[] => {
  if (weights.length === 0) {
    return []
  }
  const maxWeight = Math.max(...weights)
  const exps = weights.map((weight) =>
    Math.exp((weight - maxWeight) / temperature)
  )
  const sumOfExps = sum(exps)
  return exps.map((exp) => exp / sumOfExps)
}
