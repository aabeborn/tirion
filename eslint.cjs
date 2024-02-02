const { resolve } = require('path')
const { cwd } = require('process')

require('@rushstack/eslint-patch/modern-module-resolution')

const packageJson = require(resolve(cwd(), 'package.json'))

const runtimeConfig = []
const runtimePlugins = []
let rules = {}
const overrides = []
const settings = {}

if (packageJson?.dependencies?.next || packageJson?.devDependencies?.next) {
	runtimeConfig.push('next/core-web-vitals')
	rules = {
		...rules,
		'@next/next/no-html-link-for-pages': 'off'
	}
}

if (packageJson?.dependencies?.react || packageJson?.devDependencies?.react) {
	runtimeConfig.push(
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/strict'
	)
	runtimePlugins.push('react')
	rules = {
		...rules,
		'react/no-array-index-key': 'error',
		'react/react-in-jsx-scope': 'off'
	}
	settings.react = {
		version: 'detect'
	}
}

if (
	packageJson?.dependencies?.typescript ||
	packageJson?.devDependencies?.typescript
) {
	overrides.push({
		files: ['*.ts', '*.tsx'],
		extends: [
			'plugin:@typescript-eslint/recommended-type-checked',
			'plugin:@typescript-eslint/stylistic-type-checked'
		],
		plugins: ['@typescript-eslint'],
		parser: '@typescript-eslint/parser',
		parserOptions: {
			project: resolve(cwd(), 'tsconfig.json'),
			tsconfigRootDir: __dirname
		}
	})
	settings['import/resolver'] = {
		typescript: {
			project: resolve(cwd(), 'tsconfig.json')
		}
	}
}

if (packageJson?.devDependencies?.vitest) {
	overrides.push({
		files: ['*.test.*', '*.spec.*'],
		extends: ['plugin:vitest/all'],
		plugins: ['vitest'],
		rules: {
			'vitest/prefer-expect-assertions': 'off',
			'vitest/max-expects': 'off',
			'vitest/prefer-snapshot-hint': 'off',
			'vitest/no-hooks': 'off',
			'vitest/no-mocks-import': 'off'
		}
	})
}

if (
	packageJson?.dependencies?.tailwindcss ||
	packageJson?.devDependencies?.tailwindcss
) {
	runtimeConfig.push('plugin:tailwindcss/recommended')
	runtimePlugins.push('tailwindcss')
}

if (packageJson.devDependencies?.turbo) {
	runtimeConfig.push('turbo')
	rules = {
		...rules,
		'turbo/no-undeclared-env-vars': 'off'
	}
}

if (packageJson.devDependencies?.storybook) {
	overrides.push({
		files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
		extends: ['plugin:storybook/recommended']
	})
}

module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
		jest: !!packageJson?.devDependencies?.jest
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	extends: [
		'eslint:recommended',
		...runtimeConfig,
		'plugin:import/recommended',
		'plugin:import/typescript',
		'prettier'
	],
	plugins: [...runtimePlugins, 'prettier', 'unused-imports', 'import'],
	rules: {
		...rules,
		'prefer-const': [
			'error',
			{
				destructuring: 'any',
				ignoreReadBeforeAssign: false
			}
		],
		'no-var': 'error',
		'no-new-object': 'error',
		'object-shorthand': 'error',
		'prefer-object-spread': 'error',
		'no-array-constructor': 'error',
		'array-callback-return': 'error',
		'prefer-destructuring': 'error',
		'prefer-template': 'error',
		'no-eval': 'error',
		'func-style': ['error', 'expression'],
		'no-loop-func': 'error',
		'prefer-rest-params': 'error',
		'default-param-last': 'error',
		'no-new-func': 'error',
		'no-param-reassign': 'error',
		'prefer-spread': 'error',
		'no-useless-constructor': 'error',
		'class-methods-use-this': 'error',
		'no-duplicate-imports': 'error',
		'no-iterator': 'error',
		'generator-star-spacing': ['error', 'both'],
		'dot-notation': 'error',
		'one-var': ['error', 'never'],
		'no-multi-assign': 'error',
		'no-plusplus': 'error',
		'no-nested-ternary': 'error',
		'no-unneeded-ternary': 'error',
		'no-else-return': 'error',
		'no-new-wrappers': 'error',
		radix: 'error',
		camelcase: 'error',
		'new-cap': ['error', { capIsNewExceptionPattern: '^Foo' }],
		'no-underscore-dangle': 'error',

		'import/no-mutable-exports': 'error',
		'import/first': 'error',
		'import/no-webpack-loader-syntax': 'error',
		'import/extensions': [
			'error',
			'never',
			{ svg: 'always', json: 'always', utils: 'always', theme: 'always' }
		],
		'unused-imports/no-unused-imports': 'error',
		'@typescript-eslint/array-type': 'warn'
		// ESLINT from 8.53 and also typescript-eslint deprecated stylistic rules (they are already disabled in prettier). If you want to add theme use the @stylestic/eslint-plugin
	},
	overrides: [
		...overrides,
		{
			files: ['*.config.js', '*.cjs'],
			env: {
				node: true,
				commonjs: true
			},
			rules: {
				'func-style': 'off'
			}
		}
	],
	settings: {
		...settings
	}
}
