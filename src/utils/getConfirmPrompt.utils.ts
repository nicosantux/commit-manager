import { confirm, type ConfirmOptions } from '@clack/prompts'

import { handleUserCancel } from './handleUserCancel.js'

export const getConfirmPrompt = async (options: ConfirmOptions) => {
  const userPrompt = await confirm(options)

  return await handleUserCancel(userPrompt)
}
