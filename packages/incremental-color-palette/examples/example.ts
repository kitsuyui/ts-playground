import { mkdtempSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
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

  writeFileAtomically('example.html', html)
}

const colorsToHtml = (colors: [number, number, number][]) => {
  return colors
    .map(([r, g, b]) => {
      return `<div style="background-color: rgb(${r}, ${g}, ${b}); width: 100px; height: 100px; display: inline-block;"></div>`
    })
    .join('')
}

const writeFileAtomically = (targetPath: string, content: string) => {
  const targetDir = dirname(targetPath)
  const targetBase = basename(targetPath)
  const tempDir = mkdtempSync(join(targetDir, `.${targetBase}.tmp-`))
  const tempPath = join(tempDir, targetBase)

  try {
    writeFileSync(tempPath, content)
    renameSync(tempPath, targetPath)
  } finally {
    rmSync(tempDir, { recursive: true, force: true })
  }
}

main()
