import quickLoginTokenMutation from '../quickLoginToken'

it('should match query', () => {
  expect(quickLoginTokenMutation).toMatchGraphqlSchema()
})