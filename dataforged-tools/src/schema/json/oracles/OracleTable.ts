// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OracleBase, OracleMatch, OracleSet, OracleTableDisplay, OracleTableRow, RowNullStub, Title } from '@schema'

/**
 * Represents an oracle that has a `Table` composed of {@link OracleTableRow} objects. Appears only as a 'leaf' note on the oracle hierarchy 'tree'.
 *
 * @see {@link OracleBase} if you need to type both {@link OracleTable} and {@link OracleSet} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export interface OracleTable extends Omit<OracleBase, 'Sets'|'Tables'> {
  /**
   * @pattern ^(ironsworn|starforged)/oracles/[a-z_-]+((/[a-z_-]+)+)?$
   */
  $id: string
  /**
   * @example
   * ```json
   * {
   *  "Canonical": "Character Revealed Aspect",
   *  "Short": "Revealed Aspect"
   * }
   * ```
   * @example
   * ```json
   * {
   *  "Canonical": "Spaceborne Peril",
   *  "Short": "Peril"
   * }
   * ```
   */
  Title: Title
  Display: OracleTableDisplay
  'Table': Array<OracleTableRow| RowNullStub>
  /**
   * Describes the match behaviour of this oracle's table, if any, and provides a `Text` string describing it. Only appears on a handful of move oracles like Ask the Oracle and Advance a Threat.
   */
  'On a match'?: OracleMatch | undefined
}
