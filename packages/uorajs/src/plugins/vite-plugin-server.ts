import Fastify from 'fastify'
import { type Plugin } from 'vite'

export function pluginServer(): Plugin {
  let app: ReturnType<typeof Fastify>
  return {
    name: 'uora-plugin:server',
    enforce: 'pre',
    async configResolved() {
      app = Fastify({ logger: true })
      // logger.debug(app)
      console.log(app)
    },
  }
}
