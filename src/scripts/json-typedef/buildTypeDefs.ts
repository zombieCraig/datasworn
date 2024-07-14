import { kebabCase } from 'lodash-es'
import path from 'node:path'
import { ValueSeperatorType, getShellCmd } from '../../shellify.js'
import { PKG_NAME, rootSchemaName } from '../const.js'
import { JTD_JSON_PATH, JTD_TYPES_ROOT } from './const.js'

type JtdOptions = {
	/** Namespace for C# + System.Text.Json generated types */
	csharpSystemTextNamespace: string
	/** Output directory for C# + System.Text.Json code generation */
	csharpSystemTextOut: string
	/** Output directory for Go code generation */
	goOut: string
	/** Package for Go generated types */
	goPackage: string
	/** Output directory for Java + Jackson code generation */
	javaJacksonOut: string
	/** Package for Java + Jackson generated types */
	javaJacksonPackage: string
	/**
	 * Format for diagnostic messages
	 * @default 'pretty'
	 */
	logFormat: 'pretty' | 'minimal' | 'json'
	/** Output directory for Python code generation */
	pythonOut: string
	/** Desired "root" name of generated code */
	rootName: string
	/** Module for Ruby generated types */
	rubyModule: string
	/** Output directory for Ruby code generation */
	rubyOut: string
	/** Module for Ruby Signatures generated types */
	rubySigModule: string
	/** Output directory for Ruby Signatures code generation */
	rubySigOut: string
	/** Output directory for Rust code generation */
	rustOut: string
	/** Output directory for TypeScript code generation */
	typescriptOut?: string
}

const command = 'jtd-codegen'

const args = [JTD_JSON_PATH]

export const cmdOptions = {
	rootName: rootSchemaName,
	logFormat: 'pretty',
	csharpSystemTextNamespace: PKG_NAME,
	csharpSystemTextOut: path.join(JTD_TYPES_ROOT, 'csharp-system-text'),
	goOut: path.join(JTD_TYPES_ROOT, 'go'),
	goPackage: PKG_NAME,
	javaJacksonOut: path.join(JTD_TYPES_ROOT, 'java-jackson'),
	javaJacksonPackage: PKG_NAME,
	pythonOut: path.join(JTD_TYPES_ROOT, 'python'),
	rubyModule: PKG_NAME,
	rubyOut: path.join(JTD_TYPES_ROOT, 'ruby'),
	rubySigModule: PKG_NAME,
	rubySigOut: path.join(JTD_TYPES_ROOT, 'ruby-sig'),
	rustOut: path.join(JTD_TYPES_ROOT, 'rust')
	// typescriptOut: path.join(JTD_TYPES_ROOT, 'typescript')
} satisfies JtdOptions

export function getTypeDefBuildCommand() {
	return getShellCmd({
		command,
		args,
		cmdOptions,
		optionCase: kebabCase,
		separator: ValueSeperatorType.Space
	})
}
