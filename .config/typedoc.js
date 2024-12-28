/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ['../packages/**/dist/index.d.ts'],
  out: '../build/typedocs',
  exclude: [
    '**/node_modules/**',
    '**/*.spec.ts',
    '**/*.test.ts',
    '**/examples/**',
  ],
}
