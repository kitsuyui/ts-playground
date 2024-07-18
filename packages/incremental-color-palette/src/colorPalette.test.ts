import { describe, expect, it, jest } from '@jest/globals'

import { uintToRGB, waveInRange } from './colorPalette'
import type { WaveParameter } from './types'

describe('uintToRGB', () => {
  it('should convert a given number to a color', () => {
    const satuationParameter = {
      range: [1.0, 1.0],
      frequency: 1,
      phase: 0,
    } as WaveParameter
    const brightnessParameter = {
      range: [1.0, 1.0],
      frequency: 1,
      phase: 0,
    } as WaveParameter
    expect(uintToRGB(0, satuationParameter, brightnessParameter)).toEqual([
      255, 0, 0,
    ]) // red
    expect(uintToRGB(1, satuationParameter, brightnessParameter)).toEqual([
      0, 255, 255,
    ]) // cyan
    expect(uintToRGB(2, satuationParameter, brightnessParameter)).toEqual([
      128, 255, 0,
    ])
  })

  it('generate many colors in a loop', () => {
    const satuationParameter = {
      range: [0.5, 1.0],
      frequency: 1,
      phase: 0,
    } as WaveParameter
    const brightnessParameter = {
      range: [0.5, 1.0],
      frequency: 1,
      phase: 0,
    } as WaveParameter
    const colors = Array.from({ length: 256 }, (_, i) =>
      uintToRGB(i, satuationParameter, brightnessParameter)
    )
    expect(colors).toHaveLength(256)
  })
})

describe('waveInRange', () => {
  it('should return a value between min and max by using sin wave', () => {
    const waveParameter = {
      range: [0, 1],
      frequency: 1,
      phase: 0,
    } as WaveParameter
    expect(waveInRange(0, waveParameter)).toBeCloseTo(1)
    expect(waveInRange(Math.PI / 2, waveParameter)).toBeCloseTo(0.5)
    expect(waveInRange(Math.PI, waveParameter)).toBeCloseTo(0)
    expect(waveInRange((Math.PI * 3) / 2, waveParameter)).toBeCloseTo(0.5)
    expect(waveInRange(Math.PI * 2, waveParameter)).toBeCloseTo(1)

    const waveParameter2 = {
      range: [0, 2],
      frequency: 1,
      phase: 0,
    } as WaveParameter
    expect(waveInRange(0, waveParameter2)).toBeCloseTo(2)
    expect(waveInRange(Math.PI / 2, waveParameter2)).toBeCloseTo(1)
    expect(waveInRange(Math.PI, waveParameter2)).toBeCloseTo(0)
    expect(waveInRange((Math.PI * 3) / 2, waveParameter2)).toBeCloseTo(1)
    expect(waveInRange(Math.PI * 2, waveParameter2)).toBeCloseTo(2)

    const waveParameter3 = {
      range: [0, 1],
      frequency: 2,
      phase: 0,
    } as WaveParameter
    expect(waveInRange(0, waveParameter3)).toBeCloseTo(1)
    expect(waveInRange(Math.PI / 4, waveParameter3)).toBeCloseTo(0.5)
    expect(waveInRange(Math.PI / 2, waveParameter3)).toBeCloseTo(0)
    expect(waveInRange((Math.PI * 3) / 4, waveParameter3)).toBeCloseTo(0.5)
    expect(waveInRange(Math.PI, waveParameter3)).toBeCloseTo(1)

    const waveParameter4 = {
      range: [0, 1],
      frequency: 1,
      phase: Math.PI / 2,
    } as WaveParameter
    expect(waveInRange(0, waveParameter4)).toBeCloseTo(0.5)
    expect(waveInRange(Math.PI / 2, waveParameter4)).toBeCloseTo(0)
    expect(waveInRange(Math.PI, waveParameter4)).toBeCloseTo(0.5)
    expect(waveInRange((Math.PI * 3) / 2, waveParameter4)).toBeCloseTo(1)
    expect(waveInRange(Math.PI * 2, waveParameter4)).toBeCloseTo(0.5)
  })
})
