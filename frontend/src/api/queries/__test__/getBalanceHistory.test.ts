import query from '../getBalanceHistory'

it('should match query', () => {
  expect(query).toMatchGraphqlSchema()
})