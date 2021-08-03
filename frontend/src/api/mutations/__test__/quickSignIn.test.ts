import quickSignInMutation from '../quickSignIn'

it('should match query', () => {
  expect(quickSignInMutation).toMatchGraphqlSchema()
})