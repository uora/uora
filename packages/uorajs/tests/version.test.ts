import fse from 'fs-extra'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { version } from '../src/constants'

describe('version', () => {
  it('equal', () => {
    expect(version).toBe(fse.readJsonSync(path.join(__dirname, '../package.json')).version)
  })
})
