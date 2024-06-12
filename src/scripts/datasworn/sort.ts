import { type JSONSchema } from 'json-schema-to-typescript'
import {
	compareObjectKeys,
	dataSwornKeyOrder,
	sortDataswornKeys,
	sortObjectKeys
} from '../../pkg-core/Utils/Sort.js'
import { Keywords } from '../augmentations.js'
import { DefsKey } from '../const.js'

const keywordKeys = [...Object.keys(Keywords)]

export function isSortableObjectSchema(schema: JSONSchema) {
	switch (true) {
		// skip non-object schema or dictionary-like object
		case schema.type !== 'object':
		case schema.patternProperties != null:
			// console.log('SKIP', schema.title ?? schema)
			return false
		default:
			// console.log('Sorting', schema.title ?? schema)
			return true
	}
}

const schemaKeyOrder = [
	'$schema',
	'$id',
	'$ref',
	'title',
	'type',
	'description',
	'remarks',
	'$comment',
	...keywordKeys,
	'default',
	'examples',
	// constant
	'const',
	'enum',
	// string
	'format',
	'pattern',
	// number
	'multipleOf',
	'minimum',
	'maximum',
	// array
	'items',
	'minItems',
	'maxItems',
	// object
	'required',
	'properties',
	'patternProperties',
	'additionalItems',
	'additionalProperties',
	// union
	'allOf',
	'anyOf',
	'oneOf',
	'if',
	'then',
	'else',
	DefsKey
] as const

export function sortSchemaKeys<T extends JSONSchema>(schema: T) {
	const sortedSchema = sortObjectKeys(schema, schemaKeyOrder)
	if (sortedSchema.properties != null)
		sortedSchema.properties = sortDataswornKeys(sortedSchema.properties)
	if (Array.isArray(sortedSchema.required)) {
		sortedSchema.required = sortedSchema.required.sort((a, b) =>
			compareObjectKeys(a, b, dataSwornKeyOrder)
		)
	}

	return sortedSchema
}
