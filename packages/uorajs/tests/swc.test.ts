import { sum } from '@uora/swc'
import { describe, expect, it } from 'vitest'

describe('sum', () => {
  it('equal', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
