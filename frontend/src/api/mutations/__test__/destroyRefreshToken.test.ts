import destroyRefreshTokenMutation from '../destroyRefreshToken'

it('should match query', () => {
  expect(destroyRefreshTokenMutation).toMatchGraphqlSchema()
})