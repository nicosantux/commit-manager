import type { CommitStruct } from 'src/types.js'

export const COMMIT_TYPES: CommitStruct = {
  build: {
    emoji: '๐ง',
    description: 'Add or update build scripts',
  },
  change: {
    emoji: '๐',
    description: 'Change to existing features',
  },
  ci: {
    emoji: '๐',
    description: 'Add or update CI/CD files',
  },
  core: {
    emoji: '๐',
    description: 'Add or updates to the project configuration files, e.g. package.json, .eslintrc',
  },
  docs: {
    emoji: '๐',
    description: 'Add or update documentation',
  },
  feat: {
    emoji: '๐',
    description: 'Add new feature',
  },
  fix: {
    emoji: '๐',
    description: 'Submit a fix to a bug',
  },
  perf: {
    emoji: 'โก',
    description: 'Improve performance',
  },
  refactor: {
    emoji: '๐จ',
    description: 'Refactor code',
  },
  style: {
    emoji: '๐จ',
    description: 'Changes in the UI',
  },
  test: {
    emoji: '๐งช',
    description: 'Add or update test',
  },
}
