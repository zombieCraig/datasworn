import path from 'node:path'
import { copyDir, copyFile, updateJSON } from 'scripts/utils/readWrite.js'
import type { RulesPackageConfig } from '../../../schema/tools/build/index.js'
import {
	PKG_DIR_NODE,
	PKG_SCOPE_OFFICIAL,
	ROOT_HISTORY,
	ROOT_OUTPUT,
	VERSION
} from '../../const.js'
import Log from '../../utils/Log.js'
import { emptyDir } from '../../utils/readWrite.js'
import { Glob } from 'bun'

/** Assemble a NodeJS package from a {@link RulesPackageConfig} using data in {@link ROOT_OUTPUT} */
export async function buildContentPackage({
	id,
	pkg,
	paths,
}: RulesPackageConfig) {
	const { name, scope, ...packageUpdate } = pkg

	/** async operations on package JSON files */
	const jsonOps: Promise<unknown>[] = []

	/** scoped package name for NPM */
	const pkgID = path.join(scope, name)

	/** Desination path for built package */
	const pkgRoot = path.join(PKG_DIR_NODE, pkgID)

	/** Path to the NPM package's package.json */
	const nodePackageJsonPath = Bun.file(path.join(pkgRoot, 'package.json'))

	/** async operations on package JSON */
	jsonOps.push(
		// update package.json from data in the RulesPackageConfig
		updateJSON<Record<string, unknown>>(
			nodePackageJsonPath,
			(packageDotJson) => {
				Object.assign(packageDotJson, packageUpdate)
				packageDotJson.version = VERSION

				const dependencies = packageDotJson?.dependencies as
					| Record<string, string>
					| undefined

				if (dependencies != null)
					for (const depId in dependencies)
						if (depId.startsWith(PKG_SCOPE_OFFICIAL))
							dependencies[depId] = VERSION

				return packageDotJson
			}
		)
	)

	/** Destination path for the JSON content directory */
	const pkgJsonDest = path.join(pkgRoot, 'json')
	/** Path to the prebuilt JSON content directory */
	const jsonSrc = path.join(ROOT_OUTPUT, id)

	jsonOps.push(
		// empty JSON destination directory
		emptyDir(pkgJsonDest).then(() => copyDir(jsonSrc, pkgJsonDest))
	)

	/** async operations on package image assets */
	const imgAssetOps: Promise<unknown>[] = []

	for (const imgAssetSrc of paths.assets ?? []) {
		const imgAssetDest = path.join(
			pkgRoot,
			imgAssetSrc.split('/').pop() as string
		)

		imgAssetOps.push(
			emptyDir(imgAssetDest).then(() => copyDir(imgAssetSrc, imgAssetDest))
		)
	}

	const migrationFileGlob = new Glob(`*/${id}/*_map.json`)

	/** Files relative to ROOT_HISTORY which are to be evaluated for copying.
	 * @example "0.1.0/starforged/id_map.json"
	 */
	const migrationFiles = migrationFileGlob.scan(ROOT_HISTORY)

	for await (const sourceFile of migrationFiles) {
		const [version, _id, filename] = sourceFile.split('/')
		// skip if this filepath is for a higher version, somehow
		if (Bun.semver.order(VERSION, version) === -1) continue

		const destination = path.join(pkgRoot, 'migration', version, filename)

		jsonOps.push(copyFile(path.join(ROOT_HISTORY, sourceFile), destination))
	}

	await Promise.all([...jsonOps, ...imgAssetOps])

	return Log.info(`✅ Finished building ${pkgID}`)



}

