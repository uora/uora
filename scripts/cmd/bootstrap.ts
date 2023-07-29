import glob from 'fast-glob'
import { join } from 'path'
import { ROOT } from '../internal/constants'

export async function run() {
  console.log(ROOT)
  const files = await glob.sync(join(ROOT, 'packages/swc/dist/**'))
  console.log(files)
}

run()
