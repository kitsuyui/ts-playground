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

- [x] `@kitsuyui/hello` ... simple hello world package
- [x] `@kitsuyui/string` ... simple string package
- [x] `@kitsuyui/mymath` ... simple math package
- [x] `@kitsuyui/luxon-ext` ... extension for [luxon](https://moment.github.io/luxon/)
- [x] `@kitsuyui/intended-rollback` ... intended transaction rollback for prisma
- [x] `@kitsuyui/incremental-color-palette` ... incremental color palette generator

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
