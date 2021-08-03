import createRecurrencyMutation from '../createRecurrence'

it('should match query', () => {
  expect(createRecurrencyMutation).toMatchGraphqlSchema()
})