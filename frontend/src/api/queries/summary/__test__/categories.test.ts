import categoriesQuery from '../categories'
import { validateQuery } from '../../../../test/graphql'

it('should match query', () => {
  expect(validateQuery(categoriesQuery)).toEqual([])
})