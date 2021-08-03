import mutation from '../updateCategory'

it('should match query', () => {
  expect(mutation).toMatchGraphqlSchema()
})