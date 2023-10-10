/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ['../src/**/*.ts'],
  exclude: ['../src/**/*+(.test).ts'],
  out: '../build/typedocs',
}
