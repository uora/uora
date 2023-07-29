import { cac } from 'cac'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function main() {
  const cli = cac('uora')

  const cwd = process.cwd()
  const pkgPath = join(__dirname, '../package.json')
  const pkgJson = JSON.parse(readFileSync(pkgPath, 'utf-8'))

  cli.command('dev', 'Start development server').action(() => {
    console.log('cwd', cwd)
  })

  cli.command('start', 'Start production server').action(() => {
    console.log('cwd', cwd)
  })

  cli.command('build', 'Build production server').action(() => {
    console.log('cwd', cwd)
  })

  cli.version(pkgJson.version)
}
