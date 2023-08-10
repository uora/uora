import { defineConfig } from 'tsup'

export default defineConfig((opts) => [
  {
    format: ['cjs', 'esm'],
    entry: ['src/**/*.ts'],
    sourcemap: !!opts.watch,
    outDir: 'dist',
    platform: 'node',
    skipNodeModulesBundle: true,
    tsconfig: './tsconfig.json',
    dts: true,
    clean: true,
    legacyOutput: true,
  },
])
