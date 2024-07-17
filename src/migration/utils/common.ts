import { CONST } from '../../pkg-core/IdElements/index.js'

export function sortByIdDepth(a: string, b: string): number {
	const typeDepthDifference =
		a.split(CONST.TypeSep).length - b.split(CONST.TypeSep).length
	if (typeDepthDifference !== 0) return typeDepthDifference

	const wildcardDifference =
		a.split(CONST.WildcardString).length - b.split(CONST.WildcardString).length

	if (wildcardDifference !== 0) return wildcardDifference

	const pathDepthDifference =
		a.split(CONST.PathKeySep).length - b.split(CONST.PathKeySep).length

	if (pathDepthDifference !== 0) return pathDepthDifference

	return a.localeCompare(b, 'en-US')
}
