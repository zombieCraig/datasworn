import { isEqual, mapValues } from 'lodash-es'
import path from 'node:path'
import { formatPath } from '../../../utils.js'
import { PKG_DIR_NODE, VERSION } from '../../const.js'
import Log from '../../utils/Log.js'
import { updateJSON } from '../../utils/readWrite.js'

export async function updatePackageVersions(
	dir = PKG_DIR_NODE,
	newVersion = VERSION
) {
	const pkgs = new Bun.Glob('**/package.json').scan({
		cwd: dir,
		absolute: true,
	})
	const readmes = new Bun.Glob('**/README.md').scan({
		cwd: dir,
		absolute: true,
	})

	const writeOps: Promise<unknown>[] = [
		// the readme in the monorepo root
		updateReadme('./README.md', newVersion),
		updatePackageVersion(path.join(process.cwd(), 'package.json'), newVersion),
	]

	for await (const pkgPath of pkgs)
		writeOps.push(updatePackageVersion(pkgPath, newVersion))

	for await (const readmePath of readmes)
		writeOps.push(updateReadme(readmePath, newVersion))

	return await Promise.all(writeOps)
}

async function updateReadme(filePath: string, newVersion: string) {
	const file = Bun.file(filePath)
	const markdown = await file.text()

	const pattern =
		/^(?:# .+? v)(?<version>(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)/

	const newMarkdown = markdown.replace(pattern, newVersion)

	if (isEqual(markdown, newMarkdown)) return

	Log.info(`Bumping to v${newVersion} in ${formatPath(filePath)}`)

	return await Bun.write(file, newMarkdown)
}
async function updatePackageVersion(filePath: string, newVersion: string) {
	return updateJSON<{
		version: string
		dependencies?: Record<string, unknown>
	}>(filePath, (json) => {
		const oldVersion = json?.version as string

		if (oldVersion !== newVersion) {
			Log.info(
				`Updating from v${oldVersion} to v${newVersion} in ${path.relative(
					process.cwd(),
					filePath
				)}`
			)
			json.version = newVersion
		}

		const newDependencies = mapValues(
			json.dependencies as Record<string, string>,
			(value, key) => (key.startsWith('@datasworn/') ? newVersion : value)
		)

		if (!isEqual(json.dependencies, newDependencies))
			json.dependencies = newDependencies

		return json
	})
}
