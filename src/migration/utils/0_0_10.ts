import { isEqual } from 'lodash-es'

export const Version = '0.0.10' as const
export const IdKey = '_id' as const

export const PathSep = '/' as const

/** Character sequences that never appear in v0.0.x Datasworn IDs */
export const idCharacterBlacklist = new Set([
	',',
	'. ',
	': ',
	'[',
	']',
	'(',
	')',
	'://',
	'.svg',
	'.webp'
])

export const idKeyBlacklist = new Set([
	'label',
	'name',
	'title',
	'text',
	'description',
	'summary',
	'_comment',
	'result',
	'url',
	'license',
	'icon'
])

export function mightBeId(value: unknown) {
	if (typeof value !== 'string') return false
	if (!value.includes(PathSep)) return false

	// check for character sequences that can occur only in markdown strings
	for (const char of idCharacterBlacklist)
		if (value.includes(char)) return false

	return true
}

export const genericIdReplacements = new Map<RegExp, string | null>([
	[
		// npc variants
		/^(\*|[a-z][a-z0-9_]{3,})\/npcs((?:\/(?:\*|[a-z][a-z_]*)){2,4})\/variants\/(\*|[a-z][a-z_]*)$/,
		'npc.variant:$1$2.$3'
	],
	[
		// asset ability moves
		/^(\*|[a-z][a-z0-9_]{3,})\/assets\/((?:\*|[a-z][a-z_]*)\/(?:\*|[a-z][a-z_]*))\/abilities\/(\*|\d+)\/moves\/(\*|[a-z][a-z_]*)$/,
		'asset.ability.move:$1/$2.$3.$4'
	],
	[
		// asset abilities
		/^(\*|[a-z][a-z0-9_]{3,})\/assets\/((?:\*|[a-z][a-z_]*)\/(?:\*|[a-z][a-z_]*))\/abilities\/(\*|\d+)$/,
		'asset.ability:$1/$2.$3'
	],

	[/^(\*|[a-z][a-z0-9_]{3,})\/assets((?:\/(?:[a-z_]+|\*)){2})$/, 'asset:$1$2'],
	[/^(\*|[a-z][a-z0-9_]{3,})\/moves((?:\/(?:[a-z_]+|\*)){2})$/, 'move:$1$2'],
	[
		/^(\*|[a-z][a-z0-9_]{3,})\/atlas((?:\/(?:[a-z_]+|\*)){2,4})$/,
		'atlas_entry:$1$2'
	],
	[/^(\*|[a-z][a-z0-9_]{3,})\/npcs((?:\/(?:[a-z_]+|\*)){2,4})$/, 'npc:$1$2'],
	[
		/^(\*|[a-z][a-z0-9_]{3,})\/oracles((?:\/(?:[a-z_]+|\*)){2,4})$/,
		'oracle_rollable:$1$2'
	],
	[
		/^(\*|[a-z][a-z0-9_]{3,})\/delve_sites((?:\/(?:[a-z_]+|\*)){1})$/,
		'delve_site:$1$2'
	],
	[/^(\*|[a-z][a-z0-9_]{3,})\/truths((?:\/(?:[a-z_]+|\*)){1})$/, 'truth:$1$2'],
	[
		/^(\*|[a-z][a-z0-9_]{3,})\/site_domains((?:\/(?:[a-z_]+|\*)){1})$/,
		'delve_site_domain:$1$2'
	],
	[
		/^(\*|[a-z][a-z0-9_]{3,})\/site_themes((?:\/(?:[a-z_]+|\*)){1})$/,
		'delve_site_theme:$1$2'
	],
	[
		/^(\*|[a-z][a-z0-9_]{3,})\/rarities((?:\/(?:[a-z_]+|\*)){1})$/,
		'rarity:$1$2'
	],
	[
		// move oracle collections have no direct analogue now; they're simply a dictionary in the `oracles` property of the move.
		/^(\*|[a-z][a-z0-9_]{3,})\/collections\/oracles\/moves(\/(?:\*|[a-z][a-z_]*)){0,2}$/,
		null
	],
	[
		/^(\*|[a-z][a-z0-9_]{3,})\/collections\/oracles((?:\/(?:[a-z_]+|\*)){1,3})$/,
		'oracle_collection:$1$2'
	],
	[
		/^(\*|[a-z][a-z0-9_]{3,})\/collections\/npcs((?:\/(?:[a-z_]+|\*)){1,3})$/,
		'npc_collection:$1$2'
	],
	[
		/^(\*|[a-z][a-z0-9_]{3,})\/collections\/assets((?:\/(?:[a-z_]+|\*)){1})$/,
		'asset_collection:$1$2'
	],
	[
		/^(\*|[a-z][a-z0-9_]{3,})\/collections\/moves((?:\/(?:[a-z_]+|\*)){1})$/,
		'move_category:$1$2'
	],
	[
		/^(\*|[a-z][a-z0-9_]{3,})\/collections\/atlas((?:\/(?:[a-z_]+|\*)){1,3})$/,
		'atlas_collection:$1$2'
	]
])

const stringEntries: [string, string | null][] = []

for (const [regex, replacement] of genericIdReplacements)
	stringEntries.push([regex.source, replacement])

const json = JSON.stringify(Object.fromEntries(stringEntries), null, '\t')

const reparsed = JSON.parse(json) as Record<string, string | null>

const rehydratedIdReplacements = new Map<RegExp, string | null>()

for (const k in reparsed) {
	rehydratedIdReplacements.set(new RegExp(k), reparsed[k])
}

console.log(rehydratedIdReplacements)
console.log(isEqual(genericIdReplacements, rehydratedIdReplacements))

