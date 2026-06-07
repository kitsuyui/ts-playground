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
 * @param temperature - must be a positive finite number (temperature > 0)
 * @returns array of probabilities
 * @throws {RangeError} if temperature is not a positive finite number
 */
export const softmaxWithTemperature = (
  weights: number[],
  temperature: number
): number[] => {
  if (!Number.isFinite(temperature) || temperature <= 0) {
    throw new RangeError(
      `temperature must be a positive finite number, got ${temperature}`
    )
  }
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
