import { type JsonSchema } from 'json-schema-library'
import type { SchemaValidator } from '../../pkg-core/Builders/RulesPackageBuilder.js'
import type { Datasworn, DataswornSource } from '../../pkg-core/index.js'
import { formatPath } from '../../utils.js'
import * as CONST from '../const.js'
import Log from '../utils/Log.js'
import { readJSON } from '../utils/readWrite.js'
import AJV from '../validation/ajv.js'

/**
 * @return A function that validates objects against the DataswornSource schema.
 */
export async function loadDataswornSourceSchema() {
	await loadSchemaFile(CONST.SOURCEDATA_SCHEMA_PATH, CONST.SOURCE_SCHEMA_NAME)
	return <SchemaValidator<DataswornSource.RulesPackage>>(
		_validate.bind(undefined, CONST.SOURCE_SCHEMA_NAME)
	)
}

/**
 * @return A function that validates objects against the Datasworn schema.
 */
export async function loadDataswornSchema() {
	await loadSchemaFile(CONST.SCHEMA_PATH, CONST.SCHEMA_NAME)
	return <SchemaValidator<Datasworn.RulesPackage>>(
		_validate.bind(undefined, CONST.SCHEMA_NAME)
	)
}

async function loadSchemaFile(filePath: string, key: string) {
	const v = await readJSON<JsonSchema>(filePath)

	AJV.addSchema(v, key)

	Log.info(`✅ Loaded ${key} schema from ${formatPath(filePath)}`)

	return {
		AJV
	}
}

function _validate<T>(schemaId: string, data: unknown): data is T {
	const isValid = AJV.validate(schemaId, data)

	if (!isValid) {
		const shortErrors = AJV.errors?.map(
			({ instancePath, parentSchema, message }) => ({
				parentSchema: parentSchema?.$id ?? parentSchema?.title,
				instancePath,
				message
			})
		)
		throw Error(
			`Failed schema validation. ${JSON.stringify(shortErrors, undefined, '\t')}`
		)
	}

	return true
}
