import refreshAccessTokenMutation from '../refreshAccessToken'

it('should match query', () => {
  expect(refreshAccessTokenMutation).toMatchGraphqlSchema()
})