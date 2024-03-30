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

### PNPM

```bash
pnpm add @kitsuyui/string
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

## License

MIT
