import { Type, type Static } from '@sinclair/typebox'
import { keyBy } from 'lodash-es'
import TypeId from '../../pkg-core/IdElements/TypeId.js'
import JtdType from '../../scripts/json-typedef/typedef.js'
import { Dictionary } from '../generic/Dictionary.js'
import { JsonTypeDef } from '../Symbols.js'
import { UnionEnum, Nullable, DiscriminatedUnion } from '../Utils.js'
import Id, { RulesetId } from '../common/Id.js'
import { MarkdownString } from '../common/Localize.js'
import { DiceExpression } from '../common/Rolls.js'
import { canonicalTags } from '../tags/canonicalTags.js'
import { Assign } from '../utils/FlatIntersect.js'
import { pascalCase, type PascalCase } from '../utils/string.js'

type NodeSchemaName<T extends string> = PascalCase<T>
type EmbeddedNodeSchemaName<T extends string> = `Embedded${PascalCase<T>}`
type IdSchemaName<T extends string> = `${PascalCase<T>}Id`
type WildcardIdSchemaName<T extends string> = `${PascalCase<T>}IdWildcard`

function getNodeSchemaName<T extends string>(typeId: T) {
	return pascalCase(typeId)
}

function getEmbeddedNodeSchemaName<T extends string>(typeId: T) {
	return ('Embedded' + pascalCase(typeId)) as EmbeddedNodeSchemaName<T>
}

function getIdSchemaName<T extends string>(typeId: T) {
	return (pascalCase(typeId) + 'Id') as IdSchemaName<T>
}
function getWildcardIdSchemaName<T extends string>(typeId: T) {
	return (pascalCase(typeId) + 'IdWildcard') as WildcardIdSchemaName<T>
}

const AnyPrimary = TypeId.Primary.map(getNodeSchemaName)

const EmbedOnly = TypeId.EmbedOnly.map(getNodeSchemaName)
const EmbeddedPrimary = TypeId.EmbeddablePrimary.map(getEmbeddedNodeSchemaName)

// TODO: could this be generated by iterating over objects and picking the ones with `tags` properties?
const AnyPrimaryId = AnyPrimary.map(getIdSchemaName)
const AnyPrimaryIdWildcard = AnyPrimary.map(getWildcardIdSchemaName)

export const CollectionType = UnionEnum<typeof TypeId.Collection>(
	TypeId.Collection,
	{
		$id: 'CollectionType'
	}
)
export type CollectionType = Static<typeof CollectionType>

export const CollectableType = UnionEnum(TypeId.Collectable, {
	$id: 'CollectableType'
})
export type CollectableType = Static<typeof CollectableType>

export const NonCollectableType = UnionEnum(TypeId.NonCollectable, {
	$id: 'NonCollectableType'
})
export type NonCollectableType = Static<typeof NonCollectableType>

export const EmbedOnlyType = UnionEnum(TypeId.EmbedOnly, {
	$id: 'EmbedOnlyType'
})
export type EmbedOnlyType = Static<typeof EmbedOnlyType>

export const TaggableNodeType = Type.Union(
	[
		Type.Ref(CollectableType),
		Type.Ref(NonCollectableType),
		Type.Ref(CollectionType),
		Type.Ref(EmbedOnlyType)
	],
	{
		[JsonTypeDef]: {
			schema: JtdType.Enum([...TypeId.Primary, ...TypeId.EmbedOnly])
		},
		$id: 'TaggableNodeType'
	}
)
export type TaggableNodeType = Static<typeof TaggableNodeType>

// these are all pretty close to JSON schema already. is it worth taking them all the way?

// or should we favor abstraction to a limited set of datasworn constructs instead?

const TagRuleBase = Type.Object({
	applies_to: Nullable(Type.Array(Type.Ref(TaggableNodeType)), {
		description:
			'Types of object that can receive this tag, or `null` if any type of object accepts it.',
		default: null
	}),
	description: Type.Ref(MarkdownString)
})

const typedTags = keyBy(
	[
		...(['boolean', 'integer'] as const).map((type) =>
			Assign(
				TagRuleBase,
				Type.Object({
					array: Type.Boolean({ default: false }),
					value_type: Type.Literal(type)
				})
			)
		),
		...TypeId.Primary.map((type) =>
			Assign(
				TagRuleBase,
				Type.Object({
					wildcard: Type.Boolean({
						default: false,
						description:
							'If `true`, this field accepts an array of wildcard ID strings. If `false`, this field accepts a single non-wildcard ID string.'
					}),
					value_type: Type.Literal(type)
				})
			)
		),
		Assign(
			TagRuleBase,
			Type.Object({
				array: Type.Boolean({ default: false }),
				value_type: Type.Literal('enum'),
				enum: Type.Array(Type.Ref(Id.DictKey))
			})
		)
	].map((tag) => ({
		...tag,
		title: 'TagRule' + pascalCase(tag.properties.value_type.const)
	})),
	(tag) => tag.properties.value_type.const
)

export const TagRule = DiscriminatedUnion(typedTags, 'value_type', {
	$id: 'TagRule'
})
export type TagRule = Static<typeof TagRule>

const TagValueNonId = [
	Type.Boolean(),
	Type.Integer(),
	Type.Ref(Id.DictKey), // from enums
	Type.Ref(DiceExpression)
]

export const Tag = Type.Union(
	[
		...TagValueNonId,
		...AnyPrimaryId.map((type) => Type.Ref(type)),
		Type.Array(
			Type.Union([
				// Type.Ref(Id.DictKey), // from enums
				// Type.Ref(Rolls.DiceExpression),
				...AnyPrimaryIdWildcard.map((type) => Type.Ref(type))
			])
		)
	],
	{ $id: 'Tag', [JsonTypeDef]: { schema: JtdType.Any() } }
)

export const TagsCore = canonicalTags(
	{
		supernatural: Type.Boolean({
			description:
				'This object is supernatural in nature, and is ideal for settings that feature supernatural or mythic powers.'
		}),
		technological: Type.Boolean({
			description:
				'This object is technological in nature, and is ideal for settings that feature remarkable technologies.'
		}),
		requires_allies: Type.Boolean({
			description:
				'This object requires allies to function, and is intended for co-op play, or guided play with allies. It is not appropriate for solo play.'
		})
	},
	{ $id: 'TagsCore' }
)

export const Tags = Type.Record(
	RulesetId,
	Dictionary(Type.Ref<typeof Tag>('Tag'), { title: 'RulesPackageTags' }),
	{
		releaseStage: 'experimental',
		$id: 'Tags',
		key: Id.RulesetId.pattern,
		description:
			'A dictionary of tags, keyed by the RulesPackageId that the tags are from.'
	}
)
