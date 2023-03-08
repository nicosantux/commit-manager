import type { Options } from 'src/types.js'

import { multiselect, type MultiSelectOptions } from '@clack/prompts'

import { handleUserCancel } from './handleUserCancel.js'

export const getMultiSelectPrompt = async (options: MultiSelectOptions<Options, string>) => {
  const userPrompt = await multiselect(options)

  return await handleUserCancel(userPrompt)
}
