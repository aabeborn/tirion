# @aabeborn/tirion

## **linting and setup code with style** 💅🏻🕺🏻🔎

[![GitHub version](https://badge.fury.io/gh/aabeborn%2Ftirion.svg)](https://badge.fury.io/gh/aabeborn%2Ftirion)

Lazy (but friendly :) ) dev here! These are my personal `eslint` and `prettier` configurations.

## Usage

### Installation

First add to your `.npmrc` file the npm registry where package is published:

```bash
# .npmrc
@aabeborn:registry='https://npm.pkg.github.com'
```

Then install it by running one of the following commands:

```bash
npm install --save-dev @aabeborn/tirion
pnpm add --save-dev @aabeborn/tirion
bun install --save-dev @aabeborn/tirion
```

### Setup Prettier

To setup prettier add the following lines to `prettier.config.js`:

> **ATTENTION**: It uses `Prettier v3` so remember to setup the project with `type:module` in `package.json` or use a `.prettierrc.cjs` file

```js
import config from '@aabeborn/tirion/prettier'

return {
	...config
}
```
