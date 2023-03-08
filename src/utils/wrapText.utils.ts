export const wrapText = (text: string, offset: number = 72) =>
  text
    .replaceAll('\\n', '\n')
    .replace(new RegExp(`(?![^\\n]{1,${offset}}$)([^\\n]{1,${offset}})\\s`, 'g'), '$1\n')
