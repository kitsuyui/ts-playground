import type { number0to1, RGB0to1, RGB0to256 } from './types'

/**
 * Generate a color palette with a given number of colors.
 * @param h Hue value in degrees (0 to 1.0) ... 1.0 means 2PI radians (360 degrees)
 * @param s Saturation value (0 to 1.0)
 * @param v Value value (0 to 1.0)
 * @returns
 */
export const hsvToRgb = (h: number, s: number, v: number): RGB0to256 => {
  const h_ = clamp(h)
  const s_ = clamp(s)
  const v_ = clamp(v)
  return hsvToRgb0(h_, s_, v_).map((x) => Math.round(x * 255)) as RGB0to256
}

const hsvToRgb0 = (h: number0to1, s: number0to1, v: number0to1): RGB0to1 => {
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  const h_ = i % 6
  switch (h_) {
    case 0:
      return [v, t, p]
    case 1:
      return [q, v, p]
    case 2:
      return [p, v, t]
    case 3:
      return [p, q, v]
    case 4:
      return [t, p, v]
    case 5:
      return [v, p, q]
  }
  return unreachable()
}

/**
 * throw an error with message 'unreachable'
 */
const unreachable = (): never => {
  throw new Error('unreachable')
}

/**
 * Clamp a number between 0 and 1.
 * @param n
 * @returns n
 */
const clamp = (n: number): number0to1 => Math.max(0, Math.min(1, n))
