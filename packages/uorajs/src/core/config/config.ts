import type { LoadConfigOptions } from './load-config'
import { loadConfig } from './load-config'

export async function resolveConfigPath({ root, command, mode }: LoadConfigOptions) {
  return loadConfig({
    root,
    mode,
    command,
  })
}

interface ConfigOptions {
  cwd: string
}

export class Config {
  opts: ConfigOptions

  constructor(opts: ConfigOptions) {
    this.opts = opts
  }

  getUserConfig() {
    return {}
  }
}

export function loadUora() {}
