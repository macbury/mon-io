import updateTransactionMutation from '../updateTransaction'

it('should match query', () => {
  expect(updateTransactionMutation).toMatchGraphqlSchema()
})