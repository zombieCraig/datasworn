import { Type, type Static } from '@sinclair/typebox'
import { Generic, ID } from './common/index.js'

export const AtlasEntry = Generic.RecursiveCollectable(
	Type.Ref(ID.AtlasEntryID),
	Generic.CyclopediaMixin,
	{
		$id: '#/$defs/AtlasEntry',
		title: 'Atlas entry',
		description:
			'An atlas entry, like the Ironlands region entries found in classic Ironsworn.'
	}
)

export type TAtlasEntry = typeof AtlasEntry
export type AtlasEntry = Static<typeof AtlasEntry>

const AtlasBase = Generic.Collection(Type.Ref(ID.AtlasID), Type.Ref(AtlasEntry))

export const Atlas = Generic.RecursiveCollection(AtlasBase, {
	$id: '#/$defs/Atlas',
	releaseStage: 'experimental'
})

export type TAtlas = typeof Atlas
export type Atlas = Static<typeof Atlas>
