import { isCancel, cancel } from '@clack/prompts'

export const handleUserCancel = <T>(value: T | symbol) => {
  if (isCancel(value)) {
    cancel('Commit manager aborted')

    return process.exit()
  }

  return value
}
