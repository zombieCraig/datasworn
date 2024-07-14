import * as pkgConfig from '../pkgConfig.js'
import path from 'node:path'
import { PKG_DIR_NODE } from '../../const.js'
import { updatePackageVersions } from './updatePackageVersions.js'
import { $ } from 'bun'

function publishCommand(dir: string, tag = 'latest', dryRun = false) {
	const head = `npm publish "${dir}" --tag ${tag}`
	const tail = dryRun ? '--dry-run' : '--otp $OTP'
	return $`${head} ${tail}`
}

await updatePackageVersions()

const corePkgId = '@datasworn/core'
const corePkgPath = path.join(PKG_DIR_NODE, corePkgId)

const ops: Promise<unknown>[] = []

ops.push(publishCommand(corePkgPath))

for (const { pkg } of Object.values(pkgConfig))
	ops.push(publishCommand(path.join(PKG_DIR_NODE, `${pkg.scope}/${pkg.name}`)))

await Promise.all(ops)
