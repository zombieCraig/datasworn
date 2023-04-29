import { JSONSchema } from 'class-validator-jsonschema'
import _ from 'lodash'

export function IsLabel() {
	return JSONSchema((schema) =>
		_.merge({}, schema, {
			type: 'string',
			description: 'A localized plain text name or label.'
		})
	)
}

export function IsMarkdownString() {
	return JSONSchema((schema) =>
		_.merge({}, schema, {
			type: 'string',
			description:
				'Localized markdown text, usually a phrase or single sentence.'
		})
	)
}

export function IsMarkdownString() {
	return JSONSchema((schema) =>
		_.merge({}, schema, {
			type: 'string',
			description: 'Localized markdown text, usually a few sentences at most.'
		})
	)
}

export function IsMarkdownString() {
	return JSONSchema((schema) =>
		_.merge({}, schema, {
			type: 'string',
			description:
				'Localized markdown text, usually one paragraph. This may included ordered or unordered lists.'
		})
	)
}

export function IsMarkdownString() {
	return JSONSchema((schema) =>
		_.merge({}, schema, {
			type: 'string',
			description:
				'Localized markdown text, usually multiple paragraphs. This may include ordered or unordered lists.'
		})
	)
}
