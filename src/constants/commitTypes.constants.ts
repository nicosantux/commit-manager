import type { CommitStruct } from 'src/types.js'

export const COMMIT_TYPES: CommitStruct = {
  build: {
    emoji: '🚧',
    description: 'Add or update build scripts',
  },
  change: {
    emoji: '🔄',
    description: 'Change to existing features',
  },
  ci: {
    emoji: '🔗',
    description: 'Add or update CI/CD files',
  },
  core: {
    emoji: '🌟',
    description: 'Add or updates to the project configuration files, e.g. package.json, .eslintrc',
  },
  docs: {
    emoji: '📚',
    description: 'Add or update documentation',
  },
  feat: {
    emoji: '🆕',
    description: 'Add new feature',
  },
  fix: {
    emoji: '🐛',
    description: 'Submit a fix to a bug',
  },
  perf: {
    emoji: '⚡',
    description: 'Improve performance',
  },
  refactor: {
    emoji: '🔨',
    description: 'Refactor code',
  },
  style: {
    emoji: '🎨',
    description: 'Changes in the UI',
  },
  test: {
    emoji: '🧪',
    description: 'Add or update test',
  },
}
