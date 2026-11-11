/** A key's physical position and the finger used to press it. */
export interface TypingKey {
  readonly finger: string
  readonly x: number
  readonly y: number
  /** Whether this character requires Shift. */
  readonly shift?: boolean
}

/** Maps characters to physical keys. */
export type KeyboardLayout = Readonly<Record<string, TypingKey>>

const fingers = [
  'left-pinky',
  'left-ring',
  'left-middle',
  'left-index',
  'left-index',
  'right-index',
  'right-index',
  'right-middle',
  'right-ring',
  'right-pinky',
  'right-pinky',
  'right-pinky',
] as const

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Iterating rows and columns reflects the physical keyboard.
function makeLayout(
  rows: readonly string[],
  shifted: readonly string[]
): KeyboardLayout {
  const keys: Record<string, TypingKey> = {}
  for (const [y, row] of rows.entries()) {
    for (const [x, character] of [...row].entries()) {
      const key = { finger: fingers[x], x, y }
      keys[character] = key
      const upper = shifted[y]?.[x]
      if (upper) keys[upper] = { ...key, shift: true }
    }
  }
  keys['`'] = { finger: 'left-pinky', x: -1, y: 0 }
  keys['~'] = { ...keys['`'], shift: true }
  keys['\\'] = { finger: 'right-pinky', x: 12, y: 1 }
  keys['|'] = { ...keys['\\'], shift: true }
  keys[' '] = { finger: 'right-thumb', x: 5, y: 4 }
  return keys
}

/** Standard US layouts, using conventional touch-typing finger assignments. */
export const qwertyLayout = makeLayout(
  ['1234567890-=', 'qwertyuiop[]', "asdfghjkl;'", 'zxcvbnm,./'],
  ['!@#$%^&*()_+', 'QWERTYUIOP{}', 'ASDFGHJKL:"', 'ZXCVBNM<>?']
)
export const dvorakLayout = makeLayout(
  ['1234567890[]', "',.pyfgcrl/=", 'aoeuidhtns-', ';qjkxbmwvz'],
  ['!@#$%^&*(){}', '"<>PYFGCRL?+', 'AOEUIDHTNS_', ':QJKXBMWVZ']
)

export interface TypingCostOptions {
  /** Additional cost for each repeated physical key; defaults to zero. */
  readonly repeatedKeyCost?: number
}

export interface TypingCostResult {
  /** Physical key presses, including Shift presses. */
  readonly keypresses: number
  readonly shiftPresses: number
  readonly repeatedKeyTransitions: number
  /** Consecutive character keys pressed with the same finger on different keys. */
  readonly sameFingerTransitions: number
  readonly sameFingerDistance: number
  /** Key presses plus same-finger distance and any configured repetition cost. */
  readonly cost: number
  /** Unsupported Unicode characters, which break the transition sequence. */
  readonly skippedCharacters: number
}

/** Estimate effort using character keys and opposite-hand Shift, held across consecutive shifted characters. */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: A single pass tracks modifier and transition state.
export function calculateTypingCost(
  text: string,
  layout: KeyboardLayout = qwertyLayout,
  options: TypingCostOptions = {}
): TypingCostResult {
  let keypresses = 0
  let shiftPresses = 0
  let repeatedKeyTransitions = 0
  let sameFingerTransitions = 0
  let sameFingerDistance = 0
  let skippedCharacters = 0
  let previous: TypingKey | undefined
  let heldShift: string | undefined
  for (const character of text) {
    // biome-ignore lint/suspicious/noPrototypeBuiltins: Object.hasOwn is unavailable in ES2020.
    const key = Object.prototype.hasOwnProperty.call(layout, character)
      ? layout[character]
      : undefined
    if (!key) {
      skippedCharacters++
      previous = undefined
      heldShift = undefined
      continue
    }
    const shift = key.shift
      ? key.finger.startsWith('left-')
        ? 'right'
        : 'left'
      : undefined
    if (shift && shift !== heldShift) {
      keypresses++
      shiftPresses++
    }
    heldShift = shift
    keypresses++
    if (previous && previous.finger === key.finger) {
      const distance = Math.hypot(key.x - previous.x, key.y - previous.y)
      if (distance > 0) {
        sameFingerTransitions++
        sameFingerDistance += distance
      } else {
        repeatedKeyTransitions++
      }
    }
    previous = key
  }
  return {
    keypresses,
    shiftPresses,
    repeatedKeyTransitions,
    sameFingerTransitions,
    sameFingerDistance,
    cost:
      keypresses +
      sameFingerDistance +
      repeatedKeyTransitions * (options.repeatedKeyCost ?? 0),
    skippedCharacters,
  }
}
