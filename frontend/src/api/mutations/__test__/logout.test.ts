import logoutMutation from '../logout'

it('should match query', () => {
  expect(logoutMutation).toMatchGraphqlSchema()
})