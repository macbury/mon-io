import getPlannedTransactionsQuery from '../getPlannedTransactions'

it('should match query', () => {
  expect(getPlannedTransactionsQuery).toMatchGraphqlSchema()
})