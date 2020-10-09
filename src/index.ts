#!/usr/bin/env node

import { program } from 'commander'
import { run } from './core'
import { isValidURL } from './utils'
import { version } from '../package.json'

program.version(version, '-v, --version')
program.parse(process.argv)

if (!program.args.length) program.help()

const [url] = program.args

if (!isValidURL(url)) {
  console.error(`💥 Invalid URL!`)
  process.exit(0)
}

run(url)
