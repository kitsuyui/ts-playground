/**
 * Sum of all values in the array
 * Example: sum([1, 2, 3, 4]) => 10
 * If the array is empty, it returns 0 (0 is identity element for addition)
 * @param values
 * @returns sum of all values
 */
export const sum = (values: number[]): number => {
  let sum = 0
  for (const value of values) {
    sum += value
  }
  return sum
}

/**
 * Product of all values in the array
 * Example: product([1, 2, 3, 4]) => 24
 * If the array is empty, it returns 1 (1 is identity element for multiplication)
 * @param values
 * @returns product of all values
 */
export const product = (values: number[]): number => {
  let product = 1
  for (const value of values) {
    product *= value
  }
  return product
}

/**
 * Average of all values in the array
 * Example: average([1, 2, 3, 4]) => 2.5
 * If the array is empty, it returns 0 or the defaultValue
 * @param values
 * @param defaultValue
 * @returns average of all values
 */
export const average = (values: number[], defaultValue?: number): number => {
  if (values.length === 0) {
    return defaultValue || 0
  }
  return sum(values) / values.length
}