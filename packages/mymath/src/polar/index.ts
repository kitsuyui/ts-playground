import { sum } from '../array'
/**
 * Normalizes a radian value to the range [0, 2π).
 * @param rad - The radian value to normalize.
 * @returns The normalized radian value in the range [0, 2π).
 * @example
 * // Normalizing a radian value
 * const rad = -Math.PI;
 * const normalized = toUnsignedRad(rad);
 * console.log(normalized); // Output: 3.141592653589793
 */
export const toUnsignedRad = (rad: number): number => {
  if (Number.isNaN(rad)) {
    return Number.NaN
  }
  if (rad === Number.POSITIVE_INFINITY || rad === Number.NEGATIVE_INFINITY) {
    return Number.NaN
  }
  let normalized = rad
  while (normalized < 0) {
    normalized += 2 * Math.PI
  }
  while (normalized >= 2 * Math.PI) {
    normalized -= 2 * Math.PI
  }
  return normalized
}

/**
 * Normalizes a radian value to the range [-π, π).
 * @param rad
 * @returns The normalized radian value in the range [-π, π).
 * @example
 * // Normalizing a radian value
 * const rad = 2 * Math.PI;
 * const normalized = toSignedRad(rad);
 * console.log(normalized); // Output: 0
 */
export const toSignedRad = (rad: number): number => {
  if (Number.isNaN(rad)) {
    return Number.NaN
  }
  if (rad === Number.POSITIVE_INFINITY || rad === Number.NEGATIVE_INFINITY) {
    return Number.NaN
  }
  return toUnsignedRad(rad + Math.PI) - Math.PI
}

/**
 * Computes the average of an array of radian values.
 * The average means the average of the angles.
 * The average will be in the range [-π, π).
 * @param rads
 * @returns The average of the radian values in the range [-π, π).
 */
export const average = (rads: number[]): number => {
  if (rads.length === 0) {
    return Number.NaN
  }
  const sines = rads.map((rad) => Math.sin(rad))
  const cosines = rads.map((rad) => Math.cos(rad))
  const avgSin = sum(sines) / rads.length
  const avgCos = sum(cosines) / rads.length
  const avgRad = Math.atan2(avgSin, avgCos)
  return toSignedRad(avgRad)
}

/**
 * Computes the average of an array of radian values in the range [0, 2π).
 * @param rads
 * @returns The average of the radian values in the range [0, 2π).
 */
export const averageUnsigned = (rads: number[]): number => {
  const avg = average(rads)
  return toUnsignedRad(avg)
}

/**
 * Computes the shortest circular distance between two angles.
 * @param rad1
 * @param rad2
 * @returns The shortest distance in radians.
 */
export const distance = (rad1: number, rad2: number): number => {
  const rad1_ = toUnsignedRad(rad1)
  const rad2_ = toUnsignedRad(rad2)
  const diff = Math.abs(rad1_ - rad2_)
  return Math.min(diff, 2 * Math.PI - diff)
}

/**
 * Rotates a radian value and normalizes it to the range [0, 2π).
 * @param rad
 * @param delta
 * @returns The rotated radian value.
 */
export const rotate = (rad: number, delta: number): number => {
  return toUnsignedRad(rad + delta)
}

/**
 * Rotates a radian value by π and normalizes it to the range [0, 2π).
 * @param rad
 * @returns The opposite radian value.
 */
export const opposite = (rad: number): number => {
  return rotate(rad, Math.PI)
}

const findClosestCenterIndex = (rad: number, centers: number[]): number => {
  let minDistance = Math.PI * 2
  let minIndex = -1
  for (let j = 0; j < centers.length; j++) {
    const circularDistance = distance(rad, centers[j])
    if (circularDistance < minDistance) {
      minDistance = circularDistance
      minIndex = j
    }
  }
  return minIndex
}

const assignLabels = (rads: number[], centers: number[]): number[] => {
  return rads.map((rad) => findClosestCenterIndex(rad, centers))
}

/**
 * Runs k-means clustering on circular values.
 * @param rads
 * @param k
 * @param maxIterations
 * @returns A tuple of sorted centers and labels.
 */
export const kMeans = (
  rads: number[],
  k: number,
  maxIterations = 10
): [number[], number[]] => {
  if (rads.length === 0 || k <= 0) {
    return [[], []]
  }
  let centers = new Array(k).fill(0).map((_, i) => (i * 2 * Math.PI) / k)
  let labels = new Array(rads.length).fill(-1)
  let iterations = 0

  while (iterations < maxIterations) {
    iterations++
    labels = assignLabels(rads, centers)
    const prevCenters = [...centers]
    const nextCenters = new Array(k).fill(0).map((_, j) => {
      const clusterItems = rads.filter((_, i) => labels[i] === j)
      if (clusterItems.length === 0) {
        return rads[j % rads.length]
      }
      return averageUnsigned(clusterItems)
    })
    const sorted = nextCenters
      .map((center, oldIndex) => ({ center, oldIndex }))
      .sort((a, b) => a.center - b.center)
    const remap = new Map<number, number>()
    sorted.forEach((item, newIndex) => {
      remap.set(item.oldIndex, newIndex)
    })
    centers = sorted.map((item) => item.center)
    labels = labels.map((label) => remap.get(label) ?? label)
    if (centers.every((center, index) => center === prevCenters[index])) {
      break
    }
  }

  labels = assignLabels(rads, centers)
  return [centers, labels]
}
