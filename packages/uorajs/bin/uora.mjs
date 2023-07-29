#!/usr/bin/env node
import { fork } from 'child_process'
import { fileURLToPath } from 'url'

const cliEntry = new URL('../dist/cli.mjs', import.meta.url)

if (process.argv[2] === 'dev') {
  process.env.__CLI_ARGV__ = JSON.stringify(process.argv)
  startSubprocess()
} else {
  import(cliEntry.href)
}

function startSubprocess() {
  let childProc

  const onShutdown = () => {
    if (childProc) {
      childProc.kill()
      childProc = undefined
    }
  }

  process.on('exit', onShutdown)
  process.on('SIGTERM', onShutdown) // Graceful shutdown
  process.on('SIGINT', onShutdown) // Ctrl-C
  process.on('SIGQUIT', onShutdown) // Ctrl-\

  function start() {
    childProc = fork(fileURLToPath(cliEntry))
    childProc.on('close', (code) => {
      if (code) {
        process.exit(code)
      }
    })
    childProc.on('message', (message) => {
      if (message?.type === 'uora:restart') {
        childProc?.kill()
        startSubprocess()
      }
    })
  }

  start()
}
