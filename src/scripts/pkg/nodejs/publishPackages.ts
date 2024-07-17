import * as pkgConfig from '../pkgConfig.js'
import path from 'node:path'
import { PKG_DIR_NODE } from '../../const.js'
import { updatePackageVersions } from './updatePackageVersions.js'
import { $ } from 'bun'
import {
	getShellCmd,
	shellPromise,
	ValueSeperatorType
} from '../../../shellify.js'
import { kebabCase } from 'lodash-es'
import Log from '../../utils/Log.js'

type npmPublishOptions = { tag?: string; dryRun?: boolean }

async function publishCommand(
	cwd: string,
	{ tag = 'latest', dryRun = true }: npmPublishOptions = {}
) {
	const tail = dryRun ? '--dry-run' : '--otp $OTP'
	try {
		const { stdout, stderr } = await shellPromise({
			command: 'npm publish',
			args: [cwd],
			separator: ValueSeperatorType.Space,
			optionCase: kebabCase,
			cmdOptions: {
				tag,
				dryRun
			}
		})
		if (stdout != null) Log.info(stdout)
		if (stderr != null) Log.info(stderr)
	} catch (e) {
		return Log.error(e)
	}
}

async function releaseIt(
	cwd: string,
	{ tag = 'latest', dryRun = true }: npmPublishOptions = {}
) {
	const cmd = getShellCmd({
		command: 'release-it',
		optionCase: kebabCase,
		cmdOptions: { tag, dryRun }
	})

	return $.cwd(cwd)`${cmd}`
}

// await updatePackageVersions()

const corePkgId = '@datasworn/core'
const corePkgPath = path.join(PKG_DIR_NODE, corePkgId)

const ops: Promise<unknown>[] = []

ops.push(publishCommand(corePkgPath, { dryRun: true }))

for (const { pkg } of Object.values(pkgConfig)) {
	ops.push(
		publishCommand(path.join(PKG_DIR_NODE, pkg.scope, pkg.name), {
			dryRun: true
		})
	)
}

await Promise.all(ops)
