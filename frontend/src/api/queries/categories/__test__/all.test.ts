import allCategoriesQuery from '../all'
import { validateQuery } from '../../../../test/graphql'

it('should match query', () => {
  expect(validateQuery(allCategoriesQuery)).toEqual([])
})