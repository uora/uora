import { type Plugin } from 'vite'

export function pluginInjectConfig(): Plugin {
  return {
    name: 'uora-plugin:inject-config',
  }
}
