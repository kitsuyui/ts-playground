# ts-playground

[![codecov](https://codecov.io/gh/kitsuyui/ts-playground/graph/badge.svg?token=E6RO7KERTY)](https://codecov.io/gh/kitsuyui/ts-playground)

Playground for TypeScript

## Features

- [x] Basis
  - [x] test with vitest
  - [x] coverage with codecov
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
pnpm install
```

### Build

```sh
pnpm build
```

### Run with development mode (watch mode)

```sh
pnpm dev
```

## Test

```sh
pnpm test
```

## License

MIT
