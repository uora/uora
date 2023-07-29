import { defineConfig } from 'tsup'

export default defineConfig((opts) => [
  {
    format: ['cjs', 'esm'],
    entry: ['src/*.ts'],
    sourcemap: !!opts.watch,
    outDir: 'dist',
    platform: 'node',
    target: 'node14',
    skipNodeModulesBundle: true,
    tsconfig: './tsconfig.json',
    shims: true,
    dts: true,
    clean: true,
    outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.mjs' }),
  },
])
