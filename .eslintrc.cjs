module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	extends: [
		'eslint:recommended',
		'airbnb-base',
		'plugin:functional/external-recommended',
		'plugin:functional/recommended',
		'plugin:functional/stylistic'
		'prettier'
	],
	plugins: ['svelte3'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	env: {
		browser: true,
		es6: true,
	},
	rules: {
		'no-tabs': 'off',
	}
};
