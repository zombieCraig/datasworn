import { expect, test, describe } from 'bun:test'
import { tree, index } from './loadJson.js'

import { IdParser } from '../pkg-core/IdParser.js'
import CONST from '../pkg-core/IdElements/CONST.js'

IdParser.tree = tree

const cases = Array.from(index).map(([id, lookup]) => [
	id,
	(IdParser.get(id as any, tree) as any)?._id
])

describe('IdParser', () => {
	test.each(cases)(`expected %p, got %p`, (id, lookupId) => {
		return expect(id).toBe(lookupId)
	})
})
