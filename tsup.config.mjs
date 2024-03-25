import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'es2020',
  format: ['cjs', 'esm'],
  entry: [
    './src/**/*.ts',
    '!./src/**/*.spec.ts',
    '!./src/**/*.test.ts',
    '!./src/**/spec.ts',
    '!./src/**/test.ts',
  ],
  sourcemap: true,
  minify: true,
  dts: true,
})
