import { ESLint } from 'eslint'
import { default as love } from 'eslint-config-love'
import { default as tsdoc } from 'eslint-plugin-tsdoc'

/**
 * @type {ESLint.ConfigData}
 */
const config = {
	...love,
	plugins: { ...love.plugins, 'eslint-plugin-tsdoc': tsdoc },

	ignores: [
		'pkg',
		'github',
		'vscode',
		'analysis',
		'analysis_strings',
		'i18n',
		'markdown',
		'node_modules',
		'roll20',
		'./*.*',
		'src/adapter',
		'src/data-legacy',
		'src/extras',
		'src/templates',
		'json-typedef',
		'.eslintrc.js',
		'*.d.ts',
		'*.json',
		'*.config.js',
		'*.cjs'
	],
	rules: {
		'@typescript-eslint/class-literal-property-style': 'off',
		'@typescript-eslint/prefer-readonly': 'error',
		'@typescript-eslint/array-type': 'off',
		'@typescript-eslint/no-redeclare': 'off',
		// Pretty fraught since there's a few of them in use. Maybe possible to define, but i'm not sure it's worth the effort right now.
		'@typescript-eslint/naming-convention': 'off',
		'@typescript-eslint/consistent-type-assertions': 'off',
		// 'tsdoc/syntax': 'warn',
		'@typescript-eslint/key-spacing': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{ prefer: 'type-imports', fixStyle: 'inline-type-imports' }
		],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/return-await': 'off',
		'@typescript-eslint/method-signature-style': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				varsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_',
				ignoreRestSiblings: true
			}
		],
		'no-implicit-coercion': ['error', { string: true }]
	}
	// // parserOptions: {
	// // 	tsconfigRootDir: cwd(),
	// // 	project: './tsconfig.json',
	// // 	ecmaVersion: 'latest'
	// // 	// supposedly this is faster: https://typescript-eslint.io/packages/parser/#experimental_useprojectservice
	// // 	// EXPERIMENTAL_useProjectService: true
	// // },
}

/**
 * @type { import('eslint').ESLint.ConfigData }
 */
export default config
