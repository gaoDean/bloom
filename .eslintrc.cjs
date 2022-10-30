module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'airbnb-base',
		'airbnb-typescript/base',
		'prettier'
	],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es6: true,
	},
	rules: {
		'import/no-unresolved': 'off',
		'no-tabs': 'off',
		"@typescript-eslint/indent": "off"
	}
};
