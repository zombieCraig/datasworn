import { Compiler } from '@swc/core'
import path from 'node:path'
import {
	LEGACY_ID_PATH,
	PKG_DIR_NODE,
	PKG_SCOPE_OFFICIAL,
	SCHEMA_PATH,
	SOURCE_SCHEMA_PATH,
} from '../../const.js'
import Log from '../../utils/Log.js'
import { copyFile, emptyDir } from '../../utils/readWrite.js'

new Compiler()

const corePkgSrcRoot = path.join('src/pkg-core')
const corePkgOutRoot = path.join(PKG_DIR_NODE, PKG_SCOPE_OFFICIAL, 'core')

const id = `${PKG_SCOPE_OFFICIAL}/core`
const jsonDir = path.join(corePkgOutRoot, 'json')

const corePkgDist = path.join(corePkgOutRoot, 'dist')

export const config = {
	id,
	corePkgOutRoot,
	jsonDir,
} as const

/** Assembles the core package from built data, which contains types, schema, and documentation. */
export async function buildCorePackage({
	id,
	jsonDir,
}: typeof config = config) {
	Log.info(`⚙️  Building ${id}...`)

	await Promise.all([emptyDir(jsonDir), emptyDir(corePkgDist)])
	await Promise.all([
		copyFile(SCHEMA_PATH, path.join(jsonDir, 'datasworn.schema.json')),
		copyFile(
			SOURCE_SCHEMA_PATH,
			path.join(jsonDir, 'datasworn-source.schema.json'),
		),
		copyFile(
			// TODO: script to build the legacy ID map?
			LEGACY_ID_PATH,
			path.join(jsonDir, path.basename(LEGACY_ID_PATH)),
		),
	])

	return Log.info(`✅ Finished building ${id}`)
}
