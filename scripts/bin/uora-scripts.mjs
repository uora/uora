#!/usr/bin/env node

import assert from 'assert'
import { sync } from 'cross-spawn'
import { existsSync } from 'fs'
import { join } from 'path'
import pico from 'picocolors'
import { fileURLToPath } from 'url'

const argv = process.argv.slice(2)
const [name, ...throughArgs] = argv

const scriptsPath = join(fileURLToPath(import.meta.url), '..', '..', 'cmd', `${name}.ts`)

assert(existsSync(scriptsPath) && !name.startsWith('.'), `Executed script '${pico.red(name)}' does not exist`)

console.log(pico.cyan(`uora-scripts: ${name}\n`))

const scriptPathAsStr = JSON.stringify(scriptsPath)
const spawn = sync('tsx', [scriptPathAsStr, ...throughArgs], {
  env: process.env,
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true,
})
if (spawn.status !== 0) {
  console.log(pico.red(`uora-scripts: ${name} execute fail`))
  process.exit(1)
}
