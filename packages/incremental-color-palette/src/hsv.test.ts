import { describe, expect, it, jest } from '@jest/globals'

import { hsvToRgb } from './hsv'

describe('hsvToRgb', () => {
  it('should convert HSV to RGB', () => {
    expect(hsvToRgb(0, 1.0, 1.0)).toEqual([255, 0, 0]) // red
    expect(hsvToRgb(1 / 3, 1.0, 1.0)).toEqual([0, 255, 0]) // green
    expect(hsvToRgb(2 / 3, 1.0, 1.0)).toEqual([0, 0, 255]) // blue

    expect(hsvToRgb(0, 0.5, 1.0)).toEqual([255, 128, 128]) // light red
    expect(hsvToRgb(1 / 3, 0.5, 1.0)).toEqual([128, 255, 128]) // light green
    expect(hsvToRgb(2 / 3, 0.5, 1.0)).toEqual([128, 128, 255]) // light blue

    expect(hsvToRgb(0, 1.0, 0.5)).toEqual([128, 0, 0]) // dark red
    expect(hsvToRgb(1 / 3, 1.0, 0.5)).toEqual([0, 128, 0]) // dark green
    expect(hsvToRgb(2 / 3, 1.0, 0.5)).toEqual([0, 0, 128]) // dark blue
  })
})
