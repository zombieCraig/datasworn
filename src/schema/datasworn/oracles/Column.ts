import { type TObject, Type, TypeClone } from '@sinclair/typebox'
import { Localize, Metadata } from '../common/index.js'
import { type ColumnLabels } from './TableRow.js'

// metadata necessary to render a single column
const ColumnMeta = Type.Object({
	name: Type.Ref(Localize.Label, {
		description: 'The primary label at the head of this column.'
	}),
	summary: Type.Optional(
		Type.Ref(Localize.MarkdownString, {
			description:
				'Optional secondary text at the head of this column. For best results, this should be no more than a few words in length.'
			// example: SI regional tables.
		})
	),
	color: Type.Optional(
		Type.Ref(Metadata.CssColor, {
			description:
				'An optional thematic color for this column. For an example, see "Basic Creature Form" (Starforged p. 337)'
		})
	),
	icon: Type.Optional(
		Type.Ref(Metadata.SvgImageUrl, {
			description: 'An optional icon for this column.'
		})
	)
})

export function ColumnMixin<OracleRow extends TObject>(
	column_labels: ReturnType<typeof ColumnLabels<OracleRow>>
) {
	return Type.Object({
		...TypeClone.Type(ColumnMeta).properties,
		column_labels
	})
}
