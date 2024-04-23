# @kitsuyui/intended-rollback

Provide intended rollback feature for testing.

## Installation

### NPM

```sh
$ npm install @kitsuyui/intended-rollback
```

### Yarn

```sh
$ yarn add @kitsuyui/intended-rollback
```

### pnpm

```sh
$ pnpm add @kitsuyui/intended-rollback
```

## Usage

Following example is for [prisma](https://www.prisma.io/). But you can use this library for any other libraries.

```typescript
import { Prisma, PrismaClient } from '...'
import { intendedRollback } from '@kitsuyui/intended-rollback'

export const prismaIntendedRollback = async <T>(
  prisma: PrismaClient,
  rollback: boolean,
  innerBlock: (prisma: Prisma.TransactionClient) => Promise<T>,
): Promise<Result<T>> => {
  const wrapped = wrapWithRollback<PrismaClient, Prisma.TransactionClient, T>(
    async (prisma, callback) => await prisma.$transaction(callback),
  )
  return await wrapped(prisma, rollback, innerBlock)
}
```

```typescript
import { Prisma, PrismaClient } from '...'
import { prismaIntendedRollback } from '...'

const rollback = process.env.NODE_ENV === 'test'
const result = await prismaIntendedRollback(
  prisma,
  rollback,
  async (prisma) => await createUser(prisma, { email, password }),
)
if (result.success) {
  const user = result.content
  console.log(`User created successfully. ID: ${user.id}`)
  if (result.rollback.intended) {
    console.log(
      'Rollback for testing purposes. No actual data changes were made.',
    )
  }
} else {
  // When the error is not from this library, you can throw it.
  throw result.error
}
```

## License

MIT
