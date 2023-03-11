import type { Argv } from './types.js'

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
import { COMMIT_TYPES, DEFAULT_TEXT_WRAP, DEFAULT_TITLE_LENGTH } from './constants/index.js'
import { wrapText } from './utils/wrapText.utils.js'

const argv = yargs(hideBin(process.argv)).options({
  emoji: { type: 'boolean', default: true },
  title: { type: 'number', default: DEFAULT_TITLE_LENGTH },
  wrap: { type: 'number', default: DEFAULT_TEXT_WRAP },
}).argv as Argv

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

const titleLength = argv.title || DEFAULT_TITLE_LENGTH
const commitTitle = await getTextPrompt({
  message: `Add commit title. Max ${titleLength} characters`,
  validate: (value) => {
    if (!value.length) return 'Title is required'
    if (value.length > titleLength) return 'Title too long, consider add a body message'
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

  const textWrap = argv.wrap || DEFAULT_TEXT_WRAP

  parsedBodyMessage = wrapText(bodyMessage, textWrap)
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
