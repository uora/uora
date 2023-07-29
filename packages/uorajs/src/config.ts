import type { MaybePromise } from './types'
import type { ConfigEnv, UserConfig } from './types/uora'

/**
 * Provide intellisense of user config.
 */
export function defineConfig(options: UserConfig | ((overrideOptions: ConfigEnv) => MaybePromise<UserConfig>)) {
  return options
}

export const defineUoraConfig = defineConfig
