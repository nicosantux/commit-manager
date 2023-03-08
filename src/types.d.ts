type CommitTypes =
  | 'build'
  | 'change'
  | 'ci'
  | 'core'
  | 'docs'
  | 'feat'
  | 'fix'
  | 'perf'
  | 'refactor'
  | 'style'
  | 'test'

type CommitShape = {
  emoji: string
  description: string
}

export type CommitStruct = Record<CommitTypes, CommitShape>

export type Options = { label: string; value: string; hint?: string }[]
