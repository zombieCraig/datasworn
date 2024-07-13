import { expect, test, describe } from 'bun:test'
import { tree, index } from './loadJson.js'

import { IdParser } from '../pkg-core/IdParser.js'

IdParser.tree = tree

const cases = Array.from(index).map(([id]) => [id, IdParser.get(id)._id])

describe('IdParser lookup', () => {
	test.each(cases)(`%p`, (id, lookupId) => {
		return expect(id).toBe(lookupId)
	})
})
