import { PATHS } from '../internal/constants'
import { spawnSync } from '../internal/utils'

export function run() {
  spawnSync('prettier --cache --write .', { cwd: PATHS.ROOT })
  spawnSync('taplo format', { cwd: PATHS.ROOT })
  spawnSync('cargo fmt', { cwd: PATHS.ROOT })
}

run()
