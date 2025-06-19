import { writeFileSync } from 'node:fs'
import { uintToRGB, type WaveParameter } from '../src/'

const main = () => {
  const saturationParameter = {
    range: [0.5, 0.8],
    frequency: 1 / 17,
    phase: 0,
  } as WaveParameter
  const brightnessParameter = {
    range: [0.5, 0.8],
    frequency: 1 / 23,
    phase: 0,
  } as WaveParameter
  const colors = Array.from({ length: 4096 }, (_, i) =>
    uintToRGB(i, saturationParameter, brightnessParameter)
  )
  const html = colorsToHtml(colors)

  writeFileSync('example.html', html)
}

const colorsToHtml = (colors: [number, number, number][]) => {
  return colors
    .map(([r, g, b]) => {
      return `<div style="background-color: rgb(${r}, ${g}, ${b}); width: 100px; height: 100px; display: inline-block;"></div>`
    })
    .join('')
}

main()
