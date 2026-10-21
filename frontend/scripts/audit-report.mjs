// Temporary build diagnostic: print full npm advisory names from npm audit output.
 // This is intentionally non-blocking so the app build can complete while findings are fixed.
import { spawnSync } from 'node:child_process'

const audit = spawnSync('npm', ['audit'], {
  encoding: 'utf8',
  timeout: 60000,
  maxBuffer: 12 * 1024 * 1024
})

if (audit.stdout) process.stdout.write(audit.stdout)
if (audit.stderr) process.stderr.write(audit.stderr)
if (audit.error) console.warn('[npm-audit] Could not complete audit:', audit.error.message)
