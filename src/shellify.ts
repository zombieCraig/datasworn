import { type ExecOptions, exec } from 'node:child_process'
import util from 'node:util'
import { kebabCase, merge } from 'lodash-es'
import type { CamelCase } from 'type-fest'
import Log from './scripts/utils/Log.js'
import { $ } from 'bun'

export enum ValueSeperatorType {
	Equals = '=',
	Space = ' '
}

type ShellCommandOptionValues =
	| boolean
	| string
	| number
	| Exclude<object, null | Array<unknown>>
export type ShellCommandOptions = Record<string, ShellCommandOptionValues>

export function renderShellCommandOptions({
	cmdOptions,
	optionCase = kebabCase,
	separator = ValueSeperatorType.Space
}: Pick<ShellCommandParams, 'cmdOptions' | 'optionCase' | 'separator'>) {
	const optionSubstrings: string[] = []

	for (const key in cmdOptions) {
		const value = cmdOptions[key]
		let str = `--${optionCase(key)}`
		switch (typeof value) {
			case 'boolean':
				if (separator === ValueSeperatorType.Equals) str += separator + value
				break
			case 'number':
				str += separator + value
				break
			case 'string':
				str += `${separator}${$.escape(value)}`
				break
			case 'object':
				str += `${separator}'${JSON.stringify(value)}'`
				break
			default:
				throw new Error(`Expected a command option value, got ${value}`)
		}

		optionSubstrings.push(str)
	}

	return optionSubstrings
}

export function getShellCmd<T extends ShellCommandParams>({
	command,
	args = [],
	cmdOptions = {},
	optionCase = kebabCase,
	separator = ValueSeperatorType.Space
}: T) {
	const substrings: string[] = [
		command,
		...args.map($.escape),
		...renderShellCommandOptions({ cmdOptions, optionCase, separator })
	]

	return substrings.join(' ')
}

export function shellPromise(
	cmdParams: ShellCommandParams | string,
	options?: ExecOptions
) {
	const cmd = typeof cmdParams === 'string' ? cmdParams : getShellCmd(cmdParams)

	return util.promisify(exec)(cmd, options)
}

export type ShellCommandParams<
		Command extends string = string,
		Arguments extends string[] = string[],
		Options extends Record<CamelCase<string>, unknown> = Record<
			CamelCase<string>,
			unknown
		>
	> = {
		command: Command
		args?: Arguments
		cmdOptions?: Options
		/**
		 * @default kebabCase
		 */
		optionCase?: (str: string) => string
		/**
		 * @default ValueSeperatorType.Space
		 */
		separator?: ValueSeperatorType
	}

