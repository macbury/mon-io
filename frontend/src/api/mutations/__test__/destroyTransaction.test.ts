import destroyTransactionMutation from '../destroyTransaction'

it('should match query', () => {
  expect(destroyTransactionMutation).toMatchGraphqlSchema()
})