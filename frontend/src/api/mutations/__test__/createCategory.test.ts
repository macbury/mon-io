import mutation from '../createCategory'

it('should match query', () => {
  expect(mutation).toMatchGraphqlSchema()
})