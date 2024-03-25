/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ['../packages/**/src/*.ts'],
  exclude: ['../packages/**/src/*+(.test|.spec).ts'],
  out: '../build/typedocs',
}
