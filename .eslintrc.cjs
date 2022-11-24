module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	extends: [
		'eslint:recommended',
		'airbnb-base',
		// 'plugin:functional/external-recommended',
		// 'plugin:functional/recommended',
		// 'plugin:functional/stylistic',
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
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
		'import/prefer-default-export': 'off',
		'no-return-assign': 'off',
		'functional/functional-parameters': 'off',
	}
};
