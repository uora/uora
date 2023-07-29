import { describe, expect, it } from 'vitest'
import { sum } from '../dist'

describe('swc', () => {
  it('sum', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
