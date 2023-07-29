#!/usr/bin/env node

async function main() {
  console.log('Hello world')
}

main()
  .then(() => {
    console.log('Done')
  })
  .catch((err) => {
    console.error('Error', err)
    process.exit(0)
  })
