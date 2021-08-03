import getTransactionsQuery from '../getTransactions'
import { validateQuery } from '../../../test/graphql'

it('should match query', () => {
  expect(validateQuery(getTransactionsQuery)).toEqual([])
})