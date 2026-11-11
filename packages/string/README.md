# @kitsuyui/string

A simple string manipulation library

## Installation

### NPM

```bash
npm install @kitsuyui/string
```

### Yarn

```bash
yarn add @kitsuyui/string
```

### Bun

```bash
bun add @kitsuyui/string
```

## Usage

### convertCase

```typescript
import { convertCase } from '@kitsuyui/string';

convertCase('helloWorld', 'kebab-case')  // => `hello-world`
convertCase('hello-world', 'camelCase')  // => `helloWorld`
convertCase('helloWorld', 'kebab-case')  // => `hello-world`
convertCase('hello-world', 'camelCase')  // => `helloWorld`
convertCase('hello-world', 'snake_case')  // => `hello_world`
convertCase('hello-world', 'space separated')  // => `hello world`
convertCase('hello-world', 'UpperCamelCase')  // => `HelloWorld`
convertCase('hello-world', 'PascalCase')  // => `HelloWorld`
convertCase('hello-world', 'lowerCamelCase')  // => `helloWorld`
convertCase('hello-world', 'lowerPascalCase')  // => `helloWorld`
convertCase('hello-world', 'SCREAMING_SNAKE_CASE')  // => `HELLO_WORLD`
convertCase('hello-world', 'MACRO_CASE')  // => `HELLO_WORLD`
convertCase('hello-world', 'Train-Case')  // => `Hello-World`
convertCase('hello-world', 'dot.separated')  // => `hello.world`
convertCase('hello-world', 'flatcase')  // => `helloworld`
convertCase('hello-world', 'ALL CAPS')  // => `HELLO WORLD`
```

### Typing cost

```typescript
import { calculateTypingCost, qwertyLayout, dvorakLayout } from '@kitsuyui/string';

const text = 'The quick brown fox';
console.log(calculateTypingCost(text, qwertyLayout));
console.log(calculateTypingCost(text, dvorakLayout));
```

The score is a relative estimate: one unit per physical keypress (including
Shift) plus the straight-line distance between consecutive character keys
pressed by the same finger. Space is pressed with the right thumb. Built-in US
QWERTY and Dvorak layouts cover printable ASCII, including punctuation and
numbers. Shift is pressed with the opposite hand and held while consecutive
characters use that same Shift key; Caps Lock and Shift travel are not modeled.
Unsupported characters break the sequence and are counted separately.

The result reports repeated key transitions separately. They have no additional
cost by default: studies suggest their speed varies with the typist. Pass
`{ repeatedKeyCost: 0.5 }` as the third argument to assign an additional cost
of 0.5 per repetition (a model parameter, not a measured value). Custom layouts
map every supported character to its physical position and finger; set `shift`
on entries that require Shift. Finger names starting with `left-` select right
Shift; all other names select left Shift. The model is not a measurement of
speed, fatigue, hand size, or individual typing technique.

## License

MIT
