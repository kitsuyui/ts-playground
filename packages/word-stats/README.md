# @kitsuyui/word-stats

A simple word-stats manipulation library

## Installation

### NPM

```bash
npm install @kitsuyui/word-stats
```

### Yarn

```bash
yarn add @kitsuyui/word-stats
```

### PNPM

```bash
pnpm add @kitsuyui/word-stats
```

## Usage

### wordCount

```typescript
import { wordCount } from '@kitsuyui/word-stats';
const documents = [
  ['a', 'b', 'c'],
  ['a', 'b', 'd'],
]
const result = wordCount(documents)
result // => { a: 2, b: 2, c: 1, d: 1 }
```

- wordCount: Count the number of words in the documents
- computeTermFrequencies: Compute the term frequencies of the documents
- computeInverseDocumentFrequency: Compute the inverse document frequencies of the documents
- extractUniqueWords: Extract unique words from the documents

## License

MIT
