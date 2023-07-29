import { createServer, InlineConfig, resolveConfig } from 'vite'
import uora from '../plugin'

export async function serve({ root }: { root: string }) {
  const inlineConfig: InlineConfig = {
    root,
    configFile: false,
    mode: 'development',
    appType: 'custom',
    server: {
      middlewareMode: true,
    },
    plugins: [uora({})],
  }
  const initialConfig = await resolveConfig(inlineConfig, 'serve')
  console.log('initialConfig', initialConfig)
  const server = await createServer(inlineConfig)
  // await server.listen(3000)
  return server
}
