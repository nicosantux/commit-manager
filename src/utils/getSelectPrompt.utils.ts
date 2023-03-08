import type { Options } from 'src/types.js'

import { select, type SelectOptions } from '@clack/prompts'

import { handleUserCancel } from './handleUserCancel.js'

export const getSelectPrompt = async (options: SelectOptions<Options, string>) => {
  const userPrompt = await select(options)

  return await handleUserCancel(userPrompt)
}
