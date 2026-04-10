import { defineConfig, mergeConfig } from 'tsdown/config'

import baseConfig from '../../tsdown.config.mjs'

export default defineConfig(
  mergeConfig(baseConfig, {
    outputOptions: (options) => ({
      ...options,
      exports: 'named',
    }),
  })
)
