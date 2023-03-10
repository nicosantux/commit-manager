import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { outro } from '@clack/prompts'

const __filename = path.dirname(fileURLToPath(import.meta.url))
const __dirname = path.dirname(__filename)

const execAsync = promisify(exec)

const stdoutAdapter = (stdout: string) => {
  return stdout
    .trim()
    .split('\n')
    .map((line) => line.split(' ').at(-1))
    .filter(Boolean) as string[]
}

export const getChangedFiles = async () => {
  try {
    const { stdout } = await execAsync('git status -u --porcelain')

    return stdoutAdapter(stdout)
  } catch (error) {
    outro('Error. Check if you are in a git repository.')
    process.exit(1)
  }
}

export const getStagedFiles = async () => {
  try {
    const { stdout } = await execAsync('git diff --cached --name-only')

    return stdoutAdapter(stdout)
  } catch (error) {
    outro('Error. Check if you are in a git repository.')
    process.exit(1)
  }
}

export const addToStagingArea = async (files: string[]) => {
  const parsedFiles = files.join(' ')

  await execAsync(`git add ${parsedFiles}`)
}

export const createCommit = async (commit: string) => {
  const commitFileDir =
    process.platform === 'win32' ? `${__dirname}\\commit.txt` : `${__dirname}/commit.txt`

  try {
    await fs.writeFile(commitFileDir, commit)
    await execAsync(`git commit -F ${commitFileDir}`)
    await fs.unlink(commitFileDir)
  } catch (error) {
    outro('An error occurred creating the commit. Please try again.')
    process.exit(1)
  }
}
