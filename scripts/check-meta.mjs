import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const packageJsonPath = path.join(projectRoot, 'package.json')
const changelogPath = path.join(projectRoot, 'CHANGELOG.md')

const requiredFiles = [
  'README.md',
  'CHANGELOG.md',
  'VERSIONING.md',
  'RELEASE_CHECKLIST.md',
  '.gitignore',
  'docs/roadmap.md',
  'docs/decisions.md',
]

const missing = requiredFiles.filter((relativePath) => {
  const fullPath = path.join(projectRoot, relativePath)
  return !fs.existsSync(fullPath)
})

if (missing.length > 0) {
  console.error('Missing maintenance files:')
  for (const file of missing) {
    console.error(`- ${file}`)
  }
  process.exit(1)
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
const changelog = fs.readFileSync(changelogPath, 'utf8')
const versionHeading = `## [${packageJson.version}]`

if (!changelog.includes('## [Unreleased]')) {
  console.error('CHANGELOG.md is missing the Unreleased section.')
  process.exit(1)
}

if (!changelog.includes(versionHeading)) {
  console.error(
    `CHANGELOG.md is missing the current package version heading: ${versionHeading}`,
  )
  process.exit(1)
}

console.log('Maintenance files and version metadata look good.')
