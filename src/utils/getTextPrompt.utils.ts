import { type TextOptions, text } from '@clack/prompts'

import { handleUserCancel } from './handleUserCancel.js'

export const getTextPrompt = async (options: TextOptions) => {
  const userPrompt = await text(options)

  const handledText = await handleUserCancel(userPrompt)

  return handledText.trim()
}
