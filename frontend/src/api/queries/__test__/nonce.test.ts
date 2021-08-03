import getNonceQuery from '../nonce'

it('should match query', () => {
  expect(getNonceQuery).toMatchGraphqlSchema()
})