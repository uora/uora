import consola from 'consola'
import pic from 'picocolors'

const prefixes = {
  wait: pic.cyan('wait') + '  -',
  error: pic.red('error') + ' -',
  warn: pic.yellow('warn') + '  -',
  ready: pic.green('ready') + ' -',
  info: pic.cyan('info') + '  -',
  event: pic.magenta('event') + ' -',
  debug: pic.gray('debug') + ' -',
}

function wait(...message: any[]) {
  consola.log(prefixes.wait, ...message)
}

function error(...message: any[]) {
  consola.error(prefixes.error, ...message)
}

function warn(...message: any[]) {
  consola.warn(prefixes.warn, ...message.map((s) => pic.yellow(s)))
}

function ready(...message: any[]) {
  consola.log(prefixes.ready, ...message)
}

function info(...message: any[]) {
  consola.log(prefixes.info, ...message)
}

function event(...message: any[]) {
  consola.log(prefixes.event, ...message)
}

function debug(...message: any[]) {
  if (process.env.DEBUG) {
    consola.log(prefixes.debug, ...message)
  }
}

export const logger = {
  wait,
  error,
  warn,
  ready,
  info,
  event,
  debug,
}

export default logger
