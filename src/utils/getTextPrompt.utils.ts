import { type TextOptions, text } from '@clack/prompts'

import { handleUserCancel } from './handleUserCancel.utils.js'

export const getTextPrompt = async (options: TextOptions) => {
  const userPrompt = await text(options)

  const handledText = handleUserCancel(userPrompt)

  return handledText.trim()
}
