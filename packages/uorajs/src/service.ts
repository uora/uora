import { performance } from 'perf_hooks'
import { createServer as createDevServer } from 'vite'
import { resolveConfigPath } from './core/config/config'
import logger from './node/utils/logger'

export interface UoraServiceOptions {
  root: string
}

export class UoraService {
  root: string
  constructor(opts: UoraServiceOptions) {
    this.root = opts.root
  }

  async run() {
    const { root } = this
    const { value: userConfig, filePath: userConfigPath } = await resolveConfigPath({
      root,
      command: 'dev',
      mode: 'development',
    })

    console.log(userConfig, userConfigPath)
    const now = performance.now()
    const config = await resolveConfigPath({
      root: this.root,
      command: 'dev',
      mode: 'development',
    })
    const server = await createDevServer({
      ...config.value,
      root,
      plugins: [
        // uora({
        //   root,
        //   adapter: 'node',
        // }),
      ],
    })
    await server.listen(config.value.port || 3000)
    server.printUrls()
    logger.debug('success')
    console.log('success', performance.now() - now)
  }

  async restart() {}
}
