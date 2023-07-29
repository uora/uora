import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    passWithNoTests: true,
    threads: true,
    maxThreads: 2,
    minThreads: 1,
    coverage: {
      reporter: ['text', 'clover', 'json'],
      provider: 'v8',
    },
    globals: true,
    environment: 'happy-dom',
  },
})
