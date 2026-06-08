# ts-playground

![Coverage](https://raw.githubusercontent.com/kitsuyui/octocov-central/main/badges/kitsuyui/ts-playground/coverage.svg)
[![TODO/FIXME](https://raw.githubusercontent.com/kitsuyui/ts-playground/gh-counter-assets/badges/maintenance-comments.svg)](https://github.com/kitsuyui/ts-playground/search?q=%28TODO+OR+FIXME%29+path%3Apackages&type=code)

Playground for TypeScript
The repository tracks `TODO` and `FIXME` markers with [`gh-counter`](https://github.com/kitsuyui/gh-counter).
It also tracks built package artifact size with [`gh-build-size`](https://github.com/kitsuyui/gh-build-size).

## Features

- [x] Basis
  - [x] test with vitest
  - [x] coverage with octocov
  - [x] lint / format with biomejs
  - [x] Add TypeDoc for documentation
  - [x] Publish NPM package

- [x] `@kitsuyui/bits128` ... utilities for converting and transforming 128-bit values
- [x] `@kitsuyui/cipher` ... cipher utilities for encryption and decryption
- [x] `@kitsuyui/debug` ... debugging utilities for JavaScript and TypeScript
- [x] `@kitsuyui/hello` ... simple hello world package
- [x] `@kitsuyui/incremental-color-palette` ... incremental color palette generator
- [x] `@kitsuyui/intended-rollback` ... intended transaction rollback for prisma
- [x] `@kitsuyui/is-local` ... determine if a given host is local or not
- [x] `@kitsuyui/luxon-ext` ... extension for [luxon](https://moment.github.io/luxon/)
- [x] `@kitsuyui/mymath` ... simple math package
- [x] `@kitsuyui/number-time` ... treat number as time
- [x] `@kitsuyui/object-version-control` ... object version control with diff and merge
- [x] `@kitsuyui/string` ... simple string package
- [x] `@kitsuyui/symbolic-prototype` ... modern prototype extension with Symbol
- [x] `@kitsuyui/word-stats` ... word statistics package (count, TF-IDF, etc.)

## Docs

- TypeDoc: https://ts-playground.typedoc.kitsuyui.com/

## Usage

### Install

```sh
bun install
```

### Build

```sh
bun run build
```

### Run with development mode (watch mode)

```sh
bun run dev
```

## Test

```sh
bun run test
```

## Additional commands

```sh
bun run check-module-isolation
bun run typecheck
bun run validate
bun run typedoc
```

## License

MIT
