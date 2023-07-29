import { join } from 'path'
import { sync as rimrafSync } from 'rimraf'
import { PATHS } from '../internal/constants'
import { spawnSync } from '../internal/utils'

export function run() {
  rimrafSync(join(PATHS.ROOT, 'packages/*/dist'), { glob: true })
  spawnSync('cargo clean', { cwd: join(PATHS.ROOT) })
  // 清理turbo的缓存
  // rimrafSync(join(PATHS.ROOT, 'packages/*/node_modules'), { glob: true }
}

run()
