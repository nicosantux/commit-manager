import { intro, outro } from '@clack/prompts'
import pc from 'picocolors'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import {
  addToStagingArea,
  createCommit,
  getChangedFiles,
  getConfirmPrompt,
  getMultiSelectPrompt,
  getSelectPrompt,
  getStagedFiles,
  getTextPrompt,
} from './utils/index.js'
import { COMMIT_TYPES } from './constants/index.js'
import { wrapText } from './utils/wrapText.utils.js'

const argv = yargs(hideBin(process.argv)).option({
  emoji: { type: 'boolean', default: true },
  wrap: { type: 'number', default: 72 },
}).argv as { wrap: number; emoji: boolean }

const stagedFiles = await getStagedFiles()
const changedFiles = await getChangedFiles()

let filesToAdd: string[] = []

intro(pc.yellow('Welcome to commit manager'))

if (!stagedFiles.length && !changedFiles.length) {
  outro('There is nothing to commit, your working tree is clean')
  process.exit()
}

if (!stagedFiles.length && changedFiles.length) {
  filesToAdd = await getMultiSelectPrompt({
    message: 'You have no files in the staging area. Please select the files you want to add',
    options: changedFiles.map((file) => ({ value: file, label: file })),
  })

  addToStagingArea(filesToAdd)
}

const commitType = await getSelectPrompt({
  message: 'Choose the commit type',
  options: Object.entries(COMMIT_TYPES).map(([type, value]) => {
    return {
      label: `${value.emoji} ${type.padEnd(8, ' ')} - ${value.description}`,
      value: argv.emoji ? `${value.emoji} ${type}` : type,
    }
  }),
})

const commitTitle = await getTextPrompt({
  message: 'Add commit title. Max 62 characters',
  validate: (value) => {
    if (!value.length) return 'Title is required'
    if (value.length > 62) return 'Title too long, consider add a body message'
  },
})

const addBodyMessage = await getConfirmPrompt({
  initialValue: false,
  message: 'Do you want to add a commit message?',
})

let parsedBodyMessage = ''

if (addBodyMessage) {
  const bodyMessage = await getTextPrompt({
    message: 'Add commit message. You can manually add a line break by using "\\n"',
    validate: (value) => {
      if (!value.length) return 'Body is required'
    },
  })

  parsedBodyMessage = wrapText(bodyMessage, argv.wrap)
}

const commit = parsedBodyMessage
  ? `${commitType}: ${commitTitle}\n\n${parsedBodyMessage}`
  : `${commitType}: ${commitTitle}`

const confirmCommit = await getConfirmPrompt({
  message: `This will be your commit\n${commit}\nDo you want to continue?`,
  initialValue: true,
})

if (!confirmCommit) {
  outro('The commit has been cancelled')

  process.exit()
}

await createCommit(commit)

outro(pc.green('✅ Commit created successfully!'))
