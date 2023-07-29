import type { ConfigEnv as ViteConfigEnv, UserConfig as ViteUserConfig } from 'vite'

export interface UserConfig {
  root?: string
  vite?: ViteUserConfig
  port?: number
}

export type ConfigEnv = ViteConfigEnv & {
  watch?: boolean
}
