import { join } from 'pathe'

export { version } from '../package.json'

export const PKG_ROOT = join(__dirname, '..')
export const TEMP_DIR = join(PKG_ROOT, './.uora')

export const CLI_PATH = join(PKG_ROOT, './dist/cli.js')

export const PLUGIN_PATH = join(PKG_ROOT, './dist/plugin.js')
