import ignoreRecurrenceMutation from '../ignoreRecurrence'

it('should match query', () => {
  expect(ignoreRecurrenceMutation).toMatchGraphqlSchema()
})