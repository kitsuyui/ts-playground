import { a_n, uintToRadians } from './circularPut'
import { hsvToRgb } from './hsv'
import type {
  HSV0to1,
  number0to1,
  RGB0to256,
  uint0toInf,
  WaveParameter,
} from './types'

export const uintToRGB = (
  n: uint0toInf,
  saturationParameter: WaveParameter,
  brightnessParameter: WaveParameter
): RGB0to256 => {
  const [hue, saturation, brightness] = uintToHSV(
    n,
    saturationParameter,
    brightnessParameter
  )
  return hsvToRgb(hue, saturation, brightness)
}

export const uintToHSV = (
  n: uint0toInf,
  saturationParameter: WaveParameter,
  brightnessParameter: WaveParameter
): HSV0to1 => {
  const hue = uintToHue(n)
  const saturation = uintToSaturation(n, saturationParameter)
  const brightness = uintToBrightness(n, brightnessParameter)
  return [hue, saturation, brightness]
}

/**
 * Convert a given number to a hue value in this color palette.
 */
const uintToHue = (n: uint0toInf): number => {
  return a_n(n)
}

/**
 * Convert a given number to a saturation value in this color palette.
 */
export const uintToSaturation = (
  n: uint0toInf,
  parameter: WaveParameter
): number0to1 => {
  const rad = uintToRadians(n)
  return waveInRange(rad, parameter)
}

/**
 * Convert a given number to a brightness value in this color palette.
 */
export const uintToBrightness = (
  n: uint0toInf,
  parameter: WaveParameter
): number0to1 => {
  const rad = uintToRadians(n)
  return waveInRange(rad, parameter)
}

/**
 * Return a value between min and max by using sin wave.
 * @param rad
 * @param waveParameter.range [min, max] of the return value
 * @param waveParameter.frequency
 * @param waveParameter.phase
 * @returns min <= return value <= max
 */
export const waveInRange = (
  rad: number,
  waveParameter: WaveParameter
): number => {
  const { range, frequency, phase } = waveParameter
  const [min, max] = range
  const amplitude = (max - min) / 2
  const midpoint = (max + min) / 2
  // use cos instead of sin to make the value start from max
  const base = amplitude * Math.cos(rad * frequency + phase)
  return midpoint + base
}
