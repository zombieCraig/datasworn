import { IdKey, PathKeySep } from '../scripts/const.js'
import type { Datasworn } from '../pkg-core/index.js'
import type { IdNode } from '../schema/Generic.js'

const tree = new Map<string, Datasworn.RulesPackage>()
const index = new Map<string, IdNode<object>>()

const files = new Bun.Glob('*/*.json')

const readOps: Promise<unknown>[] = []

for await (const filePath of files.scan({ cwd: './datasworn', absolute: true }))
	readOps.push(
		Bun.file(filePath)
			.text()
			.then((txt) => {
				const rulesPackage = JSON.parse(txt, (key, value) => {
					if (
						typeof value !== 'object' ||
						value == null ||
						Array.isArray(value)
					)
						return value

					if (IdKey in value) {
						const id = value[IdKey] as string
						if (id.includes(PathKeySep)) index.set(id, value)
					}

					return value
				}) as Datasworn.RulesPackage

				// console.log(rulesPackage)

				tree.set(rulesPackage._id, rulesPackage)
			})
	)

await Promise.all(readOps)

export { index, tree }
