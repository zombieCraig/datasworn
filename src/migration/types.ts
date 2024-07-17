import type TypeId from '../pkg-core/IdElements/TypeId.js'

export interface MigrationInfo {
	version: string
	idKey: string
	pathSep: string
	idCharacterBlacklist: Set<string>
	idKeyBlacklist: Set<string>
}

type TypeTransformMap = {
	[K in TypeId.Collection | TypeId.NonCollectable | TypeId.Collectable]: string
}