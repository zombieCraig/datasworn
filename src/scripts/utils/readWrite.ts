import { type BunFile } from 'bun'
import { merge } from 'lodash-es'
import fs from 'node:fs/promises'
import path from 'node:path'
import Prettier from 'prettier'
import { type Simplify } from 'type-fest'
import yaml from 'yaml'
import type { DataswornSource } from '../../pkg-core/index.js'

const space = '\t'

/**
 * Reads source data from a YAML or JSON file.
 * @return The deserialized object.
 */
export async function readDataswornSourceData<
	T extends DataswornSource.RulesPackage
>(
	filePath: string | BunFile,
	reviver?: (key: unknown, value: unknown) => unknown
): Promise<T> {
	const file = typeof filePath === 'string' ? Bun.file(filePath) : filePath

	const pathStr =
		typeof filePath === 'string' ? filePath : (filePath.name as string)
	switch (path.extname(pathStr)) {
		case '.yaml':
		case '.yml':
			return await readYAML<T>(file, { reviver })
		case '.json':
			return await readJSON<T>(file, reviver)
		default:
			throw new Error(`Unrecognized file extension in "${filePath}"`)
	}
}
export async function readYAML<T>(
	filePath: string | BunFile,
	options: YAMLOptions = {
		// ensures that dates are serialized as strings rather than Date objects (which prevents AJV from validating them)
		schema: 'core',
		merge: true,
		maxAliasCount: 1000,
		logLevel: 'debug'
	}
): Promise<T> {
	const file = typeof filePath === 'string' ? Bun.file(filePath) : filePath

	const str = await file.text()
	return yaml.parse(str, options)
}

export async function ensureDir(dirPath: string) {
	return await fs.mkdir(dirPath, { recursive: true })
}

export async function copyDir(from: string, to: string) {
	return await fs.cp(from, to, { recursive: true })
}

export async function copyFile(from: string | BunFile, to: string | BunFile) {
	const fromFile = typeof from === 'string' ? Bun.file(from) : from
	const toFile = typeof to === 'string' ? Bun.file(to) : to

	const op = await Bun.write(toFile, fromFile)

	// console.debug('wrote', op, 'bytes to', toFile.name, 'from', fromFile.name)

	return op
}

export async function emptyDir(dirPath: string) {
	try {
		// console.debug('emptying', dirPath)
		await fs.rmdir(dirPath)
	} finally {
		return await ensureDir(dirPath)
	}
}

export async function readJSON<T>(
	filePath: string | BunFile,
	reviver?: (this: any, key: string, value: any) => any
): Promise<T> {
	const file =
		typeof filePath === 'string'
			? Bun.file(filePath.toString(), {
					type: 'application/json'
				})
			: filePath

	if (reviver == null) return await file.json()

	return JSON.parse(await file.text(), reviver)
}

type WriteJsonOptions = {
	skipCopyAwait?: boolean
	replacer?: (this: any, key: string, value: any) => any
	prettierOptions?: Prettier.Options
}
export async function writeJSON(
	filePath: string | BunFile,
	jsonContent: any,
	options?: WriteJsonOptions
): Promise<any>
export async function writeJSON(
	filePaths: (string | BunFile)[],
	jsonContent: any,
	options?: WriteJsonOptions
): Promise<any>
export async function writeJSON(
	filePath: string | BunFile | (string | BunFile)[],
	jsonContent: any,
	{ skipCopyAwait = false, replacer, prettierOptions }: WriteJsonOptions = {}
): Promise<any> {
	const pathParams = Array.isArray(filePath) ? filePath : [filePath]

	// nothing to do
	if (pathParams.length === 0) return

	const [writeDestination, ...copyDestinations]: BunFile[] = pathParams.map(
		(destination) =>
			typeof destination === 'string' ? Bun.file(destination) : destination
	)

	if (prettierOptions == null)
		prettierOptions = await getPrettierOptions(writeDestination.name as string)

	const json = await Prettier.format(
		JSON.stringify(jsonContent, replacer, space),
		prettierOptions
	)

	// write to the first destination
	await ensureDir(path.dirname(writeDestination.name as string))
	await Bun.write(writeDestination, json)

	// nothing left to do
	if (copyDestinations.length === 0) return

	const copyOps: Promise<any>[] = []

	for (const copyDestionation of copyDestinations)
		copyOps.push(copyFile(writeDestination, copyDestionation))

	if (skipCopyAwait) return void Promise.all(copyOps)
	else return await Promise.all(copyOps)
}

export async function getPrettierOptions(
	filePath: string | BunFile,
	parser: string = 'json'
): Promise<Prettier.Options> {
	const pathStr =
		typeof filePath === 'string' ? filePath : (filePath.name as string)

	const defaultConfig = (await Prettier.resolveConfig(pathStr)) ?? {}
	const jsonOverrides: Prettier.Options = { filepath: pathStr, parser }
	const prettierOptions = merge({}, defaultConfig, jsonOverrides)
	return prettierOptions
}

type YAMLOptions = Simplify<
	yaml.ParseOptions &
		yaml.DocumentOptions &
		yaml.SchemaOptions &
		yaml.ToJSOptions
>

export async function writeCode(
	filePath: string | BunFile,
	content: string,
	skipFormat = false,
	parser = 'typescript',
	{ prettierOptions }: { prettierOptions?: Prettier.Options } = {}
) {
	const pathStr =
		typeof filePath === 'string' ? filePath : (filePath.name as string)
	const file = typeof filePath === 'string' ? Bun.file(filePath) : filePath

	await ensureDir(path.dirname(pathStr))

	if (skipFormat) {
		await Bun.write(file, content)
	} else {
		if (prettierOptions == null)
			prettierOptions = await getPrettierOptions(file, parser)

		const data = await Prettier.format(content, prettierOptions)
		await Bun.write(file, data)
	}
}
export async function updateJSON<T>(
	path: string | BunFile,
	update: Partial<T> | ((data: T) => T)
) {
	let json = (await readJSON(path)) as T

	// @ts-expect-error
	if (typeof update !== 'function') Object.assign(json, update)
	else json = update(json)

	await writeJSON(path, json)
}
