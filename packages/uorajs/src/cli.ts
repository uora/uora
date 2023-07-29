import { sum } from '@uora/swc'
import { cac } from 'cac'
import path from 'pathe'
import { performance } from 'perf_hooks'
import { createServer } from 'vite'
import { version } from './constants'
import { resolveConfigPath } from './core/config/config'
import { Router } from './core/router'
import { logger } from './node/utils/logger'
import pluginUora from './plugin'

interface GlobalCLIOptions {
  '--'?: string[]
  r?: string
  c?: string
  open?: boolean
}

async function dev(root: string, options: GlobalCLIOptions) {
  root = path.resolve(root || '.')
  const now = performance.now()
  logger.debug(root, options)
  const config = await resolveConfigPath({
    root,
    command: 'dev',
    mode: 'development',
  })
  const server = await createServer({
    ...config.value,
    root,
    plugins: [
      pluginUora({
        root,
        adapter: 'node',
      }),
    ],
  })
  await server.listen(config.value.port || 3000)
  server.printUrls()
  logger.debug('success')
  console.log('sum', sum(1, 2))
  console.log('success', performance.now() - now)
}

async function start(root: string, options: GlobalCLIOptions) {
  root = path.resolve(root || '.')
  const config = await resolveConfigPath({
    root,
    command: 'start',
    mode: 'production',
  })
  logger.debug(config, options)
}

async function build(root: string, options: GlobalCLIOptions) {
  root = path.resolve(root || '.')
  const config = await resolveConfigPath({
    root,
    command: 'build',
    mode: 'production',
  })
  const router = new Router({
    ...config.value,
    root,
  })
  logger.debug(config)
  await router.printRoutes()
  logger.info('build', root, options)
}

async function routes(root: string, options: GlobalCLIOptions) {
  root = path.resolve(root || '.')
  const config = await resolveConfigPath({
    root,
    command: 'routes',
    mode: 'production',
  })
  logger.debug(config)
  logger.info('routes', root, options)
}

export async function cli() {
  const cli = cac('uora')
  const argv = process.env.__CLI_ARGV__ ? JSON.parse(process.env.__CLI_ARGV__) : process.argv

  cli
    .version(version)
    .option('-r, --root <path>', 'Root path')
    .option('-c, --config <path>', 'Path to config file')
    .option('--open', 'Open UI automatically (default: !process.env.CI))')
    .help()

  cli
    .command('dev [root]', 'Start a development server', {
      ignoreOptionDefaultValue: true,
    })
    .action(dev)

  cli
    .command('routes [root]', 'List all routes', {
      ignoreOptionDefaultValue: true,
    })
    .action(routes)

  cli
    .command('build [root]', 'build for production', {
      ignoreOptionDefaultValue: true,
    })
    .action(build)

  cli
    .command('start [root]', 'serve for production', {
      ignoreOptionDefaultValue: true,
    })
    .action(start)

  // Listen to unknown commands
  cli.on('command:*', () => {
    logger.error('Invalid command: %s', cli.args.join(' '))
    process.exit(1)
  })

  cli.parse(argv, { run: false })
  await cli.runMatchedCommand()
}

cli().catch((err) => {
  console.error(err)
  process.exit(1)
})
