/**
 * Sigmoid function
 * @param x input value to the function
 * @returns the output of the sigmoid function
 */
export const sigmoid = (x: number): number => {
  return 1 / (1 + Math.exp(-x))
}
