import getTransactionQuery from '../getTransaction'
import { validateQuery } from '../../../test/graphql'

it('should match query', () => {
  expect(validateQuery(getTransactionQuery)).toEqual([])
})