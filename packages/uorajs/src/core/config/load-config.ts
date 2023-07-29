import { promises as fsp } from 'fs'
import path from 'pathe'
import type { ConfigEnv as ViteConfigEnv } from 'vite'
import { loadConfigFromFile } from 'vite'
import type { UserConfig } from '../../types/uora'

const configPaths = ['.uorarc.ts', 'uora.config.ts', 'uora.config.js', 'uora.config.mjs', 'uora.config.cjs']

export type LoadConfigOptions = {
  mode: string
  command: string
  root: string
  configPath?: string
}

async function stat(configPath: string, mustExist: boolean): Promise<boolean> {
  try {
    await fsp.stat(configPath)
    return true
  } catch {
    if (mustExist) {
      throw new Error('Config file not found: ' + configPath)
    }
    return false
  }
}

async function search(root: string) {
  const paths = configPaths.map((p) => path.join(root, p))

  for (const file of paths) {
    // First verify the file event exists
    const exists = await stat(file, false)
    if (exists) {
      return file
    }
  }
}

export async function loadConfig({ root, configPath, mode, command }: LoadConfigOptions) {
  let file: string
  if (configPath) {
    // Go ahead and check if the file exists and throw if not.
    await stat(configPath, true)
    file = configPath
  } else {
    const found = await search(root)
    if (!found) {
      // No config file found, return an empty config that will be populated with defaults
      return {
        value: {} as UserConfig,
        filePath: undefined,
      }
    } else {
      file = found
    }
  }
  const configEnv = { mode, command }
  const res = await loadConfigFromFile(configEnv as ViteConfigEnv, file)

  return {
    value: (res?.config || {}) as UserConfig,
    filePath: file,
  }
}
