/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  name: 'ts-playground',
  entryPoints: ['../packages/*/src/**/*.ts'],
  out: '../build/typedocs',
  exclude: ['**/node_modules/**', '**/*.spec.ts', '**/examples/**'],
}
