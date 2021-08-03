import seriesQuery from '../series'
import { validateQuery } from '../../../test/graphql'

it('should match query', () => {
  expect(validateQuery(seriesQuery)).toEqual([])
})