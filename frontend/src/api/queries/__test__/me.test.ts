import meQuery from '../me'
import { validateQuery } from '../../../test/graphql'

it('should match query', () => {
  expect(validateQuery(meQuery)).toEqual([])
})