import getSeriesQuery from '../getSeries'
import { validateQuery } from '../../../test/graphql'

it('should match query', () => {
  expect(validateQuery(getSeriesQuery)).toEqual([])
})