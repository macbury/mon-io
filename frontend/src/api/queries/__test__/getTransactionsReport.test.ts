import getTransactionsReport from '../getTransactionsReport'

it('should match query', () => {
  expect(getTransactionsReport).toMatchGraphqlSchema()
})