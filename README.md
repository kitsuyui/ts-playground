# ts-playground

![Coverage](https://raw.githubusercontent.com/kitsuyui/octocov-central/main/badges/kitsuyui/ts-playground/coverage.svg)

Playground for TypeScript

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

## Dependency updates

- Renovate execution is switched to a self-hosted GitHub Action in `.github/workflows/renovate.yml`.
- For this branch experiment, the workflow uses `GITHUB_TOKEN`.
- For stable operation, use `RENOVATE_TOKEN` (classic PAT with at least `repo` and `workflow` scopes).
- Disable previous Renovate App/SaaS execution to avoid duplicate pull requests during migration.

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
