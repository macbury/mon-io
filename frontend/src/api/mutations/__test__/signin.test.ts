import signInMutation from '../signIn'

it('should match query', () => {
  expect(signInMutation).toMatchGraphqlSchema()
})