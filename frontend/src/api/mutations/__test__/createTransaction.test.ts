import createTransactionMutation from '../createTransaction'

it('should match query', () => {
  expect(createTransactionMutation).toMatchGraphqlSchema()
})