import pluginReact from '@vitejs/plugin-react-swc'
import path from 'pathe'
import { performance } from 'perf_hooks'
import type { PluginOption, ResolvedConfig } from 'vite'
import { createServer as createDevServer } from 'vite'
import { CLI_PATH, PLUGIN_PATH } from './constants'
import { resolveConfigPath } from './core/config/config'
import logger from './node/utils/logger'

interface UoraPluginOptions {
  adapter?: string
  strictMode?: boolean
  swc?: boolean | Record<string, any>
  root?: string
}

export async function uora(opts: UoraPluginOptions, restart?: () => void): Promise<PluginOption[]> {
  let resolvedConfig: ResolvedConfig
  const root = path.resolve(opts.root || '.')
  const { value: userConfig, filePath: userConfigPath } = await resolveConfigPath({
    root,
    command: 'dev',
    mode: 'development',
  })
  console.log(userConfig)
  const createServer = async () => {
    const now = performance.now()
    logger.debug(root)
    const config = await resolveConfigPath({
      root,
      command: 'dev',
      mode: 'development',
    })
    const server = await createDevServer({
      ...config.value,
      root,
      plugins: [
        uora({
          root,
          adapter: 'node',
        }),
      ],
    })
    await server.listen(config.value.port || 3000)
    server.printUrls()
    logger.debug('success')
    console.log('success', performance.now() - now)
  }
  return [
    {
      name: 'uora-plugin:restart',
      configResolved(config) {
        resolvedConfig = config
        console.log(resolvedConfig)
      },
      enforce: 'pre',
      config(config, env) {
        console.log(userConfig, env)
        config.server = {
          ...config.server,
          port: userConfig.port || 3000,
        }
        return config
      },
      configureServer(server) {
        server.watcher.add([CLI_PATH, PLUGIN_PATH])
        if (userConfigPath) {
          server.watcher.add(userConfigPath)
        }

        server.watcher.on('change', async (file) => {
          if (file === CLI_PATH || file === PLUGIN_PATH || file == userConfigPath) {
            // server.restart(true)
            console.log(restart)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            await server.close()
            await createServer()
          }
        })
      },
      resolveId(id) {
        console.log(id)
        if (id === 'internal:uora') {
          return 'internal:uora'
        }
      },
      load(id) {
        if (id === 'internal:uora') {
          console.log('111')
          return `export default ${JSON.stringify(userConfig)}`
        }
      },
    },
    // pluginServer(),
    // pluginApiRoutes(),
    // pluginHtml(),
    // pluginInjectConfig(),
    pluginReact(),
    // pluginInspect(),
  ]
}

export default uora
