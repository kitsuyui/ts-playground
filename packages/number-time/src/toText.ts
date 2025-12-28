/**
 * Pad a number with zeros to a given length
 * @param num {number}
 * @param length {number}
 * @returns zero padded number
 * @example
 * zeroPad(1, 2) // '01'
 * zeroPad(1, 3) // '001'
 */
export const zeroPad = (num: number, length: number): string => {
  return String(num).padStart(length, '0')
}

/**
 * Pad a number with zeros to a length of 2
 * @param num {number}
 * @returns {string} zero padded number
 * @example
 * zeroPad2(1) // '01'
 * zeroPad2(10) // '10'
 */
export const zeroPad2 = (num: number): string => {
  return zeroPad(num, 2)
}

/**
 * Pad a number with zeros to a length of 3
 * @param num {number}
 * @returns zero padded number
 * @example
 * zeroPad3(1) // '001'
 * zeroPad3(10) // '010'
 * zeroPad3(100) // '100'
 */
export const zeroPad3 = (num: number): string => {
  return zeroPad(num, 3)
}

/**
 * Convert seconds to formatted time label `mm:ss.SSS`
 * @param seconds
 * @returns formatted time label
 */
export const toText = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const secondsPart = (seconds % 60) | 0
  const milliseconds = ((seconds % 1) * 1000) | 0
  return `${zeroPad2(minutes)}:${zeroPad2(secondsPart)}.${zeroPad3(milliseconds)}`
}
