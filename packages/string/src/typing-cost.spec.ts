import { describe, expect, it } from 'vitest'
import { calculateTypingCost, dvorakLayout, qwertyLayout } from './typing-cost'

describe('calculateTypingCost', () => {
  it('counts same-finger travel separately from repeated keys', () => {
    expect(calculateTypingCost('qaz')).toMatchObject({
      keypresses: 3,
      sameFingerTransitions: 2,
      sameFingerDistance: 2,
      cost: 5,
    })
    expect(calculateTypingCost('qqw')).toMatchObject({
      keypresses: 3,
      repeatedKeyTransitions: 1,
      sameFingerTransitions: 0,
      cost: 3,
    })
    expect(
      calculateTypingCost('qqw', qwertyLayout, { repeatedKeyCost: 0.5 }).cost
    ).toBe(3.5)
  })

  it('includes spaces and layout-specific punctuation positions', () => {
    expect(calculateTypingCost('a a.')).toMatchObject({
      keypresses: 4,
      skippedCharacters: 0,
    })
    expect(calculateTypingCost('p;', qwertyLayout).sameFingerTransitions).toBe(
      1
    )
    expect(calculateTypingCost('l.', dvorakLayout).sameFingerTransitions).toBe(
      0
    )
    expect(calculateTypingCost("a'", dvorakLayout).sameFingerTransitions).toBe(
      1
    )
  })

  it('compares familiar English words across layouts', () => {
    for (const layout of [qwertyLayout, dvorakLayout]) {
      expect(calculateTypingCost('apple', layout)).toMatchObject({
        keypresses: 5,
        repeatedKeyTransitions: 1,
        sameFingerTransitions: 0,
        cost: 5,
        skippedCharacters: 0,
      })
    }
    expect(calculateTypingCost('strawberry', qwertyLayout)).toMatchObject({
      keypresses: 10,
      repeatedKeyTransitions: 1,
      sameFingerTransitions: 1,
      cost: 11,
      skippedCharacters: 0,
    })
    expect(calculateTypingCost('strawberry', dvorakLayout)).toMatchObject({
      keypresses: 10,
      repeatedKeyTransitions: 1,
      sameFingerTransitions: 0,
      cost: 10,
      skippedCharacters: 0,
    })
  })

  it('compares a sentence with capitalization, spaces, and punctuation', () => {
    const text = 'The quick brown fox jumps over the lazy dog.'
    const qwerty = calculateTypingCost(text, qwertyLayout)
    const dvorak = calculateTypingCost(text, dvorakLayout)
    expect(qwerty).toMatchObject({
      keypresses: 45,
      shiftPresses: 1,
      sameFingerTransitions: 4,
      skippedCharacters: 0,
    })
    expect(qwerty.cost).toBeCloseTo(51.2360679775)
    expect(dvorak).toMatchObject({
      keypresses: 45,
      shiftPresses: 1,
      sameFingerTransitions: 1,
      cost: 46,
      skippedCharacters: 0,
    })
  })

  it('uses conventional finger assignments for the number row', () => {
    expect(qwertyLayout['1']?.finger).toBe('left-pinky')
    expect(qwertyLayout['2']?.finger).toBe('left-ring')
    expect(qwertyLayout['3']?.finger).toBe('left-middle')
    expect(qwertyLayout['4']?.finger).toBe('left-index')
    expect(qwertyLayout['5']?.finger).toBe('left-index')
    expect(qwertyLayout['6']?.finger).toBe('right-index')
    expect(qwertyLayout['7']?.finger).toBe('right-index')
    expect(qwertyLayout['8']?.finger).toBe('right-middle')
    expect(qwertyLayout['9']?.finger).toBe('right-ring')
    expect(qwertyLayout['0']?.finger).toBe('right-pinky')
    expect(qwertyLayout['-']?.finger).toBe('right-pinky')
    expect(qwertyLayout['=']?.finger).toBe('right-pinky')
  })

  it('counts Shift presses, holding the same side across shifted characters', () => {
    expect(calculateTypingCost('AA!')).toMatchObject({
      keypresses: 4,
      shiftPresses: 1,
      repeatedKeyTransitions: 1,
    })
    expect(calculateTypingCost('AaA')).toMatchObject({
      keypresses: 5,
      shiftPresses: 2,
      repeatedKeyTransitions: 2,
    })
    expect(calculateTypingCost('A!')).toMatchObject({
      keypresses: 3,
      shiftPresses: 1,
    })
    expect(calculateTypingCost('A?')).toMatchObject({
      keypresses: 4,
      shiftPresses: 2,
    })
  })

  it('breaks transitions at unsupported characters', () => {
    expect(calculateTypingCost('q😀a')).toMatchObject({
      keypresses: 2,
      sameFingerTransitions: 0,
      skippedCharacters: 1,
    })
    expect(calculateTypingCost('')).toMatchObject({
      keypresses: 0,
      cost: 0,
      skippedCharacters: 0,
    })
  })

  it('accepts custom layouts and measures diagonal travel', () => {
    const layout = {
      a: { finger: 'one', x: 0, y: 0 },
      b: { finger: 'one', x: 3, y: 4 },
    }
    expect(calculateTypingCost('ab', layout).cost).toBe(7)
  })
})
