This project is an adaptation of miduco, created by [midudev](https://github.com/midudev).

# Commit Manger

Node CLI to write better commits messages.

## Installation

**You can exec commit manager by using**

```bash
npx commit-manager
```

**Or you can install commit manager as a dev dependency in your project.**

npm

```bash
  npm install commit-manager -D
```

pnpm
```bash
  pnpm add commit-manager -D
```

yarn
```bash
  yarn add commit-manager -D
```

**Then create the script that execute commit-manager.**

```json
"scripts": {
  "commit": "commit-manager"
}
```

## Usage/Examples

Commit manager has these configuration options:

- --emoji: use emojis in the commits. Default true
- --title: commit title length. Default 62 characters
- --wrap: body message text wrap. Default 72 characters

```bash
npx commit-manager --no-emoji --title 50 --wrap 50
```

```json
"scripts": {
  "commit": "commit-manager --no-emoji"
}
```
