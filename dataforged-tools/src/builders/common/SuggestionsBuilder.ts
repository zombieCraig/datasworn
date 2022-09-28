import { GameObjectBuilder } from '@builders'
import type { Asset, EncounterStarforged, GameObject, Move, OracleTable, Suggestions, YamlSuggestions } from '@schema'

/**
 * @internal
 */
export class SuggestionsBuilder implements Suggestions {
  'Game objects'?: GameObject[] | undefined
  'Oracle rolls'?: Array<OracleTable['$id']> | undefined
  'Assets'?: Array<Asset['$id']> | undefined
  'Moves'?: Array<Move['$id']> | undefined
  'Encounters'?: Array<EncounterStarforged['$id']> | undefined
  constructor (data: YamlSuggestions) {
    if (data['Game objects'] != null) {
      // console.info("[Suggestions] Game objects", JSON.stringify(data["Game objects"]));
      this['Game objects'] = data['Game objects'].map(gameObjData => new GameObjectBuilder(gameObjData))
    }
    if (data['Oracle rolls'] != null) {
      // TODO type check against string
      this['Oracle rolls'] = data['Oracle rolls']
    }
    if (data.Moves != null) {
      // TODO type check against string
      this.Moves = data.Moves
    }
    if (data.Assets != null) {
      // TODO type check against string
      this.Assets = data.Assets
    }
  }
}
