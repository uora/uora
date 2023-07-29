import { defineConfig } from 'tsup'

export default defineConfig((opts) => [
  {
    format: ['cjs', 'esm'],
    entry: ['src/**/*.ts'],
    sourcemap: !!opts.watch,
    outDir: 'dist',
    platform: 'node',
    splitting: false,
    shims: true,
    skipNodeModulesBundle: true,
    tsconfig: './tsconfig.json',
    dts: true,
    clean: true,
    outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.mjs' }),
  },
])
